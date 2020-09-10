import JObject from '../util/java/JObject';
import Reference from './Reference';

export default class EvaluationEnvironment extends JObject {
  private cause: Reference | null = null;
  private environment: Map<string | null, any>;

  constructor(cause?: Reference, environment?: Map<string | null, any>) {
    super();
    if (cause) this.cause = cause;
    if (environment) this.environment = environment;
    else this.environment = new Map<string | null, any>();
  }

  public getCause(): Reference | null {
    return this.cause;
  }

  public setCause(cause: Reference) {
    this.cause = cause;
  }

  public getEnvironment(): Map<string | null, any> {
    return this.environment;
  }

  public setEnvironment(environment: Map<string, any>) {
    this.environment = environment;
  }

  public clone(): EvaluationEnvironment {
    return new EvaluationEnvironment(this.cause?.clone(), this.environment);
  }
}
