import AbstractReferenceResolver from './AbstractReferenceResolver';
import EvaluationEnvironment from './EvaluationEnvironment';
import Reference from './Reference';
import Cres from '../Cres';

export default class EnvironmentReferenceResolver extends AbstractReferenceResolver {
  private readonly environment: Map<string | null, any> = new Map<string | null, any>();

  public resolveReference(ref: Reference, resolvingEnvironment: EvaluationEnvironment): any {
    if (
      Reference.SCHEMA_ENVIRONMENT !== ref.getSchema() ||
      ref.getServer() != null ||
      ref.getContext() != null ||
      ref.getEntity() != null ||
      ref.getProperty() != null ||
      ref.getRow() != null
    ) {
      throw new Error('Unexpected reference syntax: ' + ref);
    }

    const variable: string | null = ref.getField();

    if (
      resolvingEnvironment != null &&
      resolvingEnvironment.getEnvironment() != null &&
      resolvingEnvironment.getEnvironment().has(variable)
    ) {
      return resolvingEnvironment.getEnvironment().get(variable);
    }

    if (this.environment == null) {
      throw new Error(Cres.get().getString('exprEnvNotDefined'));
    }

    if (!this.environment.has(variable)) {
      throw new Error(Cres.get().getString('exprEnvVarNotFound') + variable);
    }

    return this.environment.get(variable);
  }

  public set(variable: string, value: any): void {
    this.environment.set(variable, value);
  }

  public get(variable: string): any {
    return this.environment.get(variable);
  }

  public setEnvironment(environment: Map<string, any>): void {
    for (let el of environment) {
      this.environment.set(...el);
    }
  }

  public getEnvironment(): Map<string | null, any> {
    return this.environment;
  }
}
