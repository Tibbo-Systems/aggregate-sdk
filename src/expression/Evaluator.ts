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

import Function from './function/Function';
import AbstractEvaluatingVisitor from './AbstractEvaluatingVisitor';
import Tracer from './util/Tracer';
import ErrorCollector from '../util/ErrorCollector';
import DataTableConversion from '../datatable/DataTableConversion';

export default class Evaluator extends JObject {
  private static readonly ENVIRONMENT_PREVIOUS: string = 'previous';
  private static readonly ENVIRONMENT_COUNT: string = 'count';

  private readonly resolvers: Map<string | null, ReferenceResolver | null> = new Map<string | null, ReferenceResolver | null>();
  private keepPreviousResult = false;

  // eslint-disable-next-line @typescript-eslint/ban-types
  private readonly customFunctions = new Map<string, Function>();

  private tracer: Tracer | null = null;

  private previousResult: any;
  private count = 0;

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

  constructor(cm: ContextManager<any> | null = null, defaultContext: Context<any, any> | null = null, defaultTable: DataTable | null = null, caller?: CallerController) {
    super();
    const resolver: DefaultReferenceResolver = new DefaultReferenceResolver();
    resolver.setContextManager(cm);
    resolver.setCallerController(caller);
    resolver.setDefaultContext(defaultContext);
    resolver.setDefaultTable(defaultTable);
    this.init(resolver);
  }

  public init(defaultResolver: ReferenceResolver): void {
    defaultResolver.setEvaluator(this);

    this.resolvers.set(null, defaultResolver);

    this.setResolver(Reference.SCHEMA_ENVIRONMENT, this.environmentResolver);
  }

  public evaluate(expression: Expression | null, environment: EvaluationEnvironment = new EvaluationEnvironment(), attributed = false): Promise<any> | any {
    try {
      if (expression == null || expression.getText().length == 0) {
        return null;
      }

      let root = expression.getRootNode();

      if (!root) {
        root = ExpressionUtils.parse(expression, true);
        expression.setRootNode(root);
      }

      const visitor: DefaultEvaluatingVisitor = new DefaultEvaluatingVisitor(this, environment);

      let result = visitor.visitCompilationUnit(root);
      if (!attributed && result instanceof AttributedObject) {
        result = (result as AttributedObject).getValue();
      }

      if (!attributed && result instanceof Promise) {
        result = result.then((res) => {
          return res.getValue();
        });
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

  public evaluateAttributed(expression: Expression, environment: EvaluationEnvironment = new EvaluationEnvironment()): Promise<AttributedObject> | AttributedObject {
    const result = this.evaluate(expression, environment, true);
    if (result instanceof Promise) {
      return result.then((res) => {
        return ExpressionUtils.toAttributed(res);
      });
    }
    return ExpressionUtils.toAttributed(result);
  }

  public evaluateToString(expression: Expression | null): Promise<string> | string {
    const result = this.evaluate(expression);
    if (result instanceof Promise) {
      return result.then((res) => {
        return res != null ? res.toString() : '';
      });
    }
    return result != null ? result.toString() : '';
  }

  public evaluateToBooleanOrNull(expression: Expression): Promise<boolean | null> | boolean | null {
    const result = this.evaluate(expression);
    if (result instanceof Promise) {
      return result.then((res) => {
        return Util.convertToBoolean(res, true, true);
      });
    }
    return Util.convertToBoolean(result, true, true);
  }

  public evaluateToBoolean(expression: Expression): Promise<boolean> | boolean {
    const result = this.evaluate(expression);
    if (result instanceof Promise) {
      return result.then((res) => {
        return Util.convertToBoolean(res, true, false) as boolean;
      });
    }
    return Util.convertToBoolean(result, true, false) as boolean;
  }

  evaluateToDataTable(expression: Expression): Promise<DataTable> | DataTable {
    const result = this.evaluateAttributed(expression);
    if (result instanceof Promise) {
      return result.then((value) => {
        return this.wrapAttributedObject(value);
      });
    } else {
      return this.wrapAttributedObject(result);
    }
  }

  private wrapAttributedObject(result: any): DataTable {
    if (result.getValue() != null && result.getValue() instanceof DataTable) {
      return result.getValue();
    }
    const values = new Array<any>();
    values.push(result.getValue());
    const data = DataTableConversion.wrapToTable(values);
    ExpressionUtils.copyAttributes(result, data);
    return data;
  }

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

  public setResolver(schema: string, resolver: ReferenceResolver | null) {
    this.resolvers.set(schema, resolver);
  }

  public getEnvironmentResolver(): EnvironmentReferenceResolver {
    return this.environmentResolver;
  }

  setDefaultTable(data: DataTable | null): void {
    this.getDefaultResolver().setDefaultTable(data);
  }

  public setDefaultContext(aContext: Context<any, any>): void {
    this.getDefaultResolver().setDefaultContext(aContext);
  }

  getDefaultResolver(): ReferenceResolver {
    return this.resolvers.get(null) as ReferenceResolver;
  }

  getResolvers(): Map<string | null, ReferenceResolver | null> {
    return this.resolvers;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  getCustomFunction(functionName: string): Function | undefined {
    return this.customFunctions.get(functionName);
  }

  getTracer(): Tracer | null {
    return this.tracer;
  }

  setTracer(tracer: Tracer | null): void {
    this.tracer = tracer;
  }

  setPreviousResult(previousResult: any) {
    this.keepPreviousResult = true;
    this.previousResult = previousResult;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  registerCustomFunction(name: string, impl: Function) {
    if (AbstractEvaluatingVisitor.DEFAULT_FUNCTIONS.has(name) || this.customFunctions.has(name)) {
      throw new Error('Function already registered:' + name);
    }

    this.customFunctions.set(name, impl);
  }

  public static processBindings(table: DataTable, evaluator: Evaluator, errorCollector: ErrorCollector | null = null, split = false): DataTable {
    if (table == null) {
      return table;
    }

    if (table.getFormat().getBindings().length == 0) {
      return table;
    }

    let result: DataTable;
    if (split) {
      result = table.clone();
      result.splitFormat();
    } else {
      result = table;
    }

    evaluator.getDefaultResolver().setDefaultTable(result);
    return result;
  }

  getResolver(schema: string | null): ReferenceResolver | null {
    return this.resolvers.get(schema) ?? null;
  }
}
