import JObject from '../util/java/JObject';
import Reference from './Reference';
export default class EvaluationEnvironment extends JObject {
    private cause;
    private environment;
    constructor(cause?: Reference, environment?: Map<string, any>);
    getCause(): Reference | null;
    setCause(cause: Reference): void;
    getEnvironment(): Map<string | null, any>;
    setEnvironment(environment: Map<string, any>): void;
}
