import JObject from '../util/java/JObject';
import Reference from './Reference';

export default class EvaluationEnvironment extends JObject {
  private cause: Reference | null = null;
  private environment: Map<string | null, any> | null = null;

  constructor(cause?: Reference, environment?: Map<string, any>) {
    super();
    if (cause) this.cause = cause;
    if (environment) this.environment = environment;
  }

  public getCause(): Reference | null {
    return this.cause;
  }

  public setCause(cause: Reference) {
    this.cause = cause;
  }

  public getEnvironment(): Map<string | null, any> {
    if (this.environment == null) {
      this.environment = new Map<string | null, any>();
    }

    return this.environment;
  }

  public setEnvironment(environment: Map<string, any>) {
    this.environment = environment;
  }
}
