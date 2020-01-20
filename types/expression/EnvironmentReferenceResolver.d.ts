import AbstractReferenceResolver from './AbstractReferenceResolver';
import EvaluationEnvironment from './EvaluationEnvironment';
import Reference from './Reference';
export default class EnvironmentReferenceResolver extends AbstractReferenceResolver {
    private readonly environment;
    resolveReference(ref: Reference, resolvingEnvironment: EvaluationEnvironment): any;
    set(variable: string, value: any): void;
    get(variable: string): any;
    setEnvironment(environment: Map<string | null, any>): void;
    getEnvironment(): Map<string | null, any>;
}
