import JObject from '../util/java/JObject';
import DataTable from '../datatable/DataTable';
import ReferenceResolver from './ReferenceResolver';
import Reference from './Reference';
import EvaluationEnvironment from './EvaluationEnvironment';
import ContextManager from '../context/ContextManager';
import Evaluator from './Evaluator';
import Context from '../context/Context';
import CallerController from '../context/CallerController';

export default abstract class AbstractReferenceResolver extends JObject implements ReferenceResolver {
  private contextManager: ContextManager<Context<any, any>> | null = null;
  private callerController: CallerController | null = null;
  private defaultContext: Context<any, any> | null = null;
  private evaluator: Evaluator | null = null;

  private defaultRow: number | null = null;

  private defaultTable: DataTable | null = null;

  public setDefaultTable(defaultTable: DataTable | null) {
    this.defaultTable = defaultTable;
  }

  public getDefaultTable(): DataTable | null {
    return this.defaultTable;
  }

  abstract resolveReference(ref: Reference, environment: EvaluationEnvironment): any;

  public setContextManager(contextManager: ContextManager<Context<any, any>> | null): void {
    this.contextManager = contextManager;
  }

  public setCallerController(callerController: CallerController | null): void {
    this.callerController = callerController;
  }

  public setDefaultContext(defaultContext: Context<any, any> | null): void {
    this.defaultContext = defaultContext;
  }

  public setEvaluator(evaluator: Evaluator): void {
    this.evaluator = evaluator;
  }

  public getCallerController(): CallerController | null {
    return this.callerController;
  }

  public getDefaultContext(): Context<any, any> | null {
    return this.defaultContext;
  }

  public getContextManager(): ContextManager<any> | null {
    return this.contextManager;
  }

  public getDefaultRow(): number | null {
    return this.defaultRow;
  }

  public getEvaluator(): Evaluator | null {
    return this.evaluator;
  }

  public addContextManager(schema: string, cm: ContextManager<any>) {}

  public setDefaultRow(defaultRow: number) {
    this.defaultRow = defaultRow;
  }
}
