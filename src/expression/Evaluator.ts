import JObject from '../util/java/JObject';
import Expression from './Expression';
import ContextManager from '../context/ContextManager';
import Context from '../context/Context';
import DataTable from '../datatable/DataTable';
import CallerController from '../context/CallerController';
import ReferenceResolver from './ReferenceResolver';
import DefaultReferenceResolver from './DefaultReferenceResolver';
import EnvironmentReferenceResolver from './EnvironmentReferenceResolver';
import Reference from './Reference';
import Util from '../util/Util';
import EvaluationEnvironment from './EvaluationEnvironment';
import ExpressionUtils from './ExpressionUtils';
import Cres from '../Cres';
import MessageFormat from '../util/java/MessageFormat';
import AttributedObject from './AttributedObject';
import DefaultEvaluatingVisitor from './DefaultEvaluatingVisitor';

import Function from './functions/Function';
import AbstractEvaluatingVisitor from './AbstractEvaluatingVisitor';
import Tracer from './util/Tracer';

export default class Evaluator extends JObject {
  private static readonly ENVIRONMENT_PREVIOUS: string = 'previous';
  private static readonly ENVIRONMENT_COUNT: string = 'count';

  private readonly resolvers: Map<string | null, ReferenceResolver | null> = new Map<string | null, ReferenceResolver | null>();
  private keepPreviousResult = false;

  private readonly customFunctions = new Map<string, Function>();

  private tracer: Tracer | null = null;

  private previousResult: any;
  private count = 0;

  private setKeepPreviousResult(keepPreviousResult: boolean): void {
    this.keepPreviousResult = keepPreviousResult;
  }

  private getKeepPreviousResult(): boolean {
    return this.keepPreviousResult;
  }

  private getCount(): number {
    return this.count;
  }

  public getPreviousResult(): any {
    return this.previousResult;
  }

  public restorePreviousResult(previousResult: any): void {
    this.previousResult = previousResult;
  }

  private readonly environmentResolver: EnvironmentReferenceResolver = new (class LocalEnvironmentResolver extends EnvironmentReferenceResolver {
    private parentClass: Evaluator;

    constructor(evaluator: Evaluator) {
      super();
      this.parentClass = evaluator;
    }

    public resolveReference(ref: Reference, environment: EvaluationEnvironment): any {
      if (Util.equals(Evaluator.ENVIRONMENT_PREVIOUS, ref.getField())) {
        if (this.parentClass.getKeepPreviousResult()) {
          return this.parentClass.getPreviousResult();
        } else {
          throw new Error("Previous result was not keep because the were no references to 'count'");
        }
      }

      if (Util.equals(Evaluator.ENVIRONMENT_COUNT, ref.getField())) {
        this.parentClass.setKeepPreviousResult(true);
        return this.parentClass.getCount();
      }

      return super.resolveReference(ref, environment);
    }
  })(this);

  constructor(cm: ContextManager<any> | null = null, defaultContext: Context<any, any> | null = null, defaultTable: DataTable | null = null, caller: CallerController | null = null) {
    super();

    const resolver: DefaultReferenceResolver = new DefaultReferenceResolver();
    resolver.setContextManager(cm);
    resolver.setCallerController(caller);
    resolver.setDefaultContext(defaultContext);
    resolver.setDefaultTable(defaultTable);
    this.init(resolver);
  }

  evaluateToString(expression: Expression | null): string {
    const result: any = this.evaluate(expression);

    return result != null ? result.toString() : '';
  }

  private init(defaultResolver: ReferenceResolver): void {
    defaultResolver.setEvaluator(this);

    this.resolvers.set(null, defaultResolver);

    this.setResolver(Reference.SCHEMA_ENVIRONMENT, this.environmentResolver);
  }

  public setResolver(schema: string, resolver: ReferenceResolver | null) {
    this.resolvers.set(schema, resolver);
  }

  //TODO: not-implemented
  public static createWithResolver(resolver: ReferenceResolver) {
    return new Evaluator();
  }

  public evaluate(expression: Expression | null, environment: EvaluationEnvironment = new EvaluationEnvironment(), attributed = false): any {
    try {
      if (expression == null || expression.getText().length == 0) {
        return null;
      }

      let root = expression.getRootNode();

      if (root == null) {
        root = ExpressionUtils.parse(expression, true);
        expression.setRootNode(root);
      }

      const visitor: DefaultEvaluatingVisitor = new DefaultEvaluatingVisitor(this, environment);

      visitor.visitCompilationUnit(root);
      let result: any = visitor.getResult();
      if (!attributed && result instanceof AttributedObject) {
        result = (result as AttributedObject).getValue();
      }

      if (this.keepPreviousResult) {
        this.previousResult = result;
      }

      return result;
    } catch (ex) {
      throw new Error(MessageFormat.format(Cres.get().getString('exprErrEvaluatingExpr'), expression) + ex.message);
    } finally {
      this.count++;
    }
  }

  evaluateToBoolean(prefilter: Expression): boolean {
    return false;
  }

  public getEnvironmentResolver(): EnvironmentReferenceResolver {
    return this.environmentResolver;
  }

  evaluateToDataTable(expression: Expression): DataTable {
    const SimpleDataTable = require('../datatable/SimpleDataTable').default;
    return new SimpleDataTable();
  }

  setDefaultTable(data: DataTable | null) {}

  getDefaultResolver(): ReferenceResolver {
    return new DefaultReferenceResolver();
  }

  getResolvers(): Map<string | null, ReferenceResolver | null> {
    return this.resolvers;
  }

  public evaluateToBooleanOrNull(expression: Expression): boolean | null {
    const result: any = this.evaluate(expression);
    return Util.convertToBoolean(result, true, true);
  }

  getCustomFunction(functionName: string): Function | undefined {
    return this.customFunctions.get(functionName);
  }

  getTracer(): Tracer | null {
    return this.tracer;
  }

  registerCustomFunction(name: string, impl: Function) {
    if (AbstractEvaluatingVisitor.DEFAULT_FUNCTIONS.has(name) || this.customFunctions.has(name)) {
      throw new Error('Function already registered:' + name);
    }

    this.customFunctions.set(name, impl);
  }
}
