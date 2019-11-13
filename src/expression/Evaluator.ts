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

export default class Evaluator extends JObject {
  private static readonly ENVIRONMENT_PREVIOUS: string = 'previous';
  private static readonly ENVIRONMENT_COUNT: string = 'count';

  private readonly resolvers: Map<string | null, ReferenceResolver | null> = new Map<
    string | null,
    ReferenceResolver | null
  >();
  private keepPreviousResult: boolean = false;

  private previousResult: any;
  private count: number = 0;

  private setKeepPreviousResult(keepPreviousResult: boolean): void {
    this.keepPreviousResult = keepPreviousResult;
  }

  // private readonly environmentResolver: EnvironmentReferenceResolver = new LocalEnvironmentResolver();
  private getKeepPreviousResult(): boolean {
    return this.keepPreviousResult;
  }

  private getCount(): number {
    return this.count;
  }

  private getPreviousResult(): any {
    return this.previousResult;
  }

  // TODO check this logic
  private readonly environmentResolver: EnvironmentReferenceResolver = new (class LocalEnvironmentResolver extends EnvironmentReferenceResolver {
    private setKeepPreviousResult: Function;
    private getKeepPreviousResult: Function;
    private getCount: Function;
    private getPreviousResult: Function;

    constructor(
      keepPreviousResult: Function,
      setKeepPreviousResult: Function,
      getCount: Function,
      getPreviousResult: Function
    ) {
      super();
      this.getKeepPreviousResult = keepPreviousResult;
      this.setKeepPreviousResult = setKeepPreviousResult;
      this.getCount = getCount;
      this.getPreviousResult = getPreviousResult;
    }

    public resolveReference(ref: Reference, environment: EvaluationEnvironment): any {
      if (Util.equals(Evaluator.ENVIRONMENT_PREVIOUS, ref.getField())) {
        if (this.getKeepPreviousResult()) {
          return this.getPreviousResult();
        } else {
          throw new Error("Previous result was not keep because the were no references to 'count'");
        }
      }

      if (Util.equals(Evaluator.ENVIRONMENT_COUNT, ref.getField())) {
        this.setKeepPreviousResult(true);
        return this.getCount();
      }

      return super.resolveReference(ref, environment);
    }
  })(this.getKeepPreviousResult, this.setKeepPreviousResult, this.getCount, this.getPreviousResult);

  constructor(
    cm: ContextManager<any> | null = null,
    defaultContext: Context<any, any> | null = null,
    defaultTable: DataTable | null = null,
    caller: CallerController | null = null
  ) {
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

  public evaluate(
    expression: Expression | null,
    environment: EvaluationEnvironment = new EvaluationEnvironment(),
    attributed: boolean = false
  ): any {
    return null;
    // try {
    //     if ((expression == null) || (expression.getText().length == 0)) {
    //         return null;
    //     }
    //
    //     let root: ASTStart;
    //
    //
    //     root = expression.getRootNode();
    //
    //     if (root == null) {
    //         root = ExpressionUtils.parse(expression, true);
    //         expression.setRootNode(root);
    //     }
    //
    //     const visitor: DefaultEvaluatingVisitor = new DefaultEvaluatingVisitor(this);
    //
    //     root.jjtAccept(visitor, environment);
    //     const result: any = visitor.getResult();
    //
    //     if (!attributed && result instanceof AttributedObject) {
    //         result = (result as AttributedObject).getValue();
    //     }
    //
    //     if (keepPreviousResult) {
    //         previousResult = result;
    //     }
    //
    //     return result;
    // } catch (ex) {
    //     throw new Error(MessageFormat.format(Cres.get().getString("exprErrEvaluatingExpr"), expression) + ex.message);
    // } finally {
    //     count++;
    // }
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

  public evaluateToBooleanOrNull(expression: Expression): boolean | null {
    const result: any = this.evaluate(expression);
    return Util.convertToBoolean(result, true, true);
  }
}
