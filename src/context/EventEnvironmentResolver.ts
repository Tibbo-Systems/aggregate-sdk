import AbstractReferenceResolver from '../expression/AbstractReferenceResolver';
import EvaluationEnvironment from '../expression/EvaluationEnvironment';
import Reference from '../expression/Reference';
import EnvironmentReferenceResolver from '../expression/EnvironmentReferenceResolver';
import EventUtils from '../event/EventUtils';
import Event from '../data/Event';
import CallerController from './CallerController';
import Context from './Context';
import ContextManager from './ContextManager';
import Evaluator from '../expression/Evaluator';
import DataTable from '../datatable/DataTable';

export default class EventEnvironmentResolver extends AbstractReferenceResolver {
  private resolver: EnvironmentReferenceResolver;

  private ev: Event;

  constructor(environmentResolver: EnvironmentReferenceResolver, ev: Event) {
    super();
    this.resolver = environmentResolver;
    this.ev = ev;
  }

  resolveReference(ref: Reference, environment: EvaluationEnvironment): any {
    if (ref.getField() != null) {
      switch (ref.getField()) {
        case EventUtils.ENVIRONMENT_ID:
          return this.ev.getId();

        case EventUtils.ENVIRONMENT_CONTEXT:
          return this.ev.getContext();

        case EventUtils.ENVIRONMENT_EVENT:
          return this.ev.getName();

        case EventUtils.ENVIRONMENT_LEVEL:
          return this.ev.getLevel();

        case EventUtils.ENVIRONMENT_TIME:
          return this.ev.getCreationtime();

        case EventUtils.ENVIRONMENT_ACKNOWLEDGEMENTS:
          return this.ev.getAcknowledgementsTable();

        case EventUtils.ENVIRONMENT_ENRICHMENTS:
          return this.ev.getEnrichmentsTable();

        case EventUtils.ENVIRONMENT_VALUE:
          return this.ev.getData();
      }
    }

    return this.resolver.resolveReference(ref, environment);
  }

  public getCallerController(): CallerController | undefined {
    return this.resolver.getCallerController();
  }

  public getDefaultContext(): Context<any, any> | null {
    return this.resolver.getDefaultContext();
  }

  public getContextManager(): ContextManager<any> | null {
    return this.resolver.getContextManager();
  }

  public getDefaultRow(): number | null {
    return this.resolver.getDefaultRow();
  }

  public getEvaluator(): Evaluator | null {
    return this.resolver.getEvaluator();
  }

  public addContextManager(schema: string, cm: ContextManager<any>) {
    this.resolver.addContextManager(schema, cm);
  }

  public setCallerController(callerController?: CallerController) {
    this.resolver.setCallerController(callerController);
  }

  public setDefaultContext(defaultContext: Context<any, any>) {
    this.resolver.setDefaultContext(defaultContext);
  }

  public setContextManager(contextManager: ContextManager<any>) {
    this.resolver.setContextManager(contextManager);
  }

  public setDefaultRow(defaultRow: number) {
    this.resolver.setDefaultRow(defaultRow);
  }

  public setEvaluator(evaluator: Evaluator) {
    this.resolver.setEvaluator(evaluator);
  }

  setDefaultTable(defaultTable: DataTable | null) {
    this.resolver.setDefaultTable(defaultTable);
  }

  getDefaultTable(): DataTable | null {
    return this.resolver.getDefaultTable();
  }

  public set(variable: string, value: any): void {
    this.resolver.set(variable, value);
  }

  public get(variable: string): any {
    return this.resolver.get(variable);
  }

  public setEnvironment(environment: Map<string, any>): void {
    this.resolver.setEnvironment(environment);
  }

  public getEnvironment(): Map<string | null, any> {
    return this.resolver.getEnvironment();
  }
}
