import Comparable from '../util/java/Comparable';
import JObject from '../util/java/JObject';
import FunctionDefinition from './FunctionDefinition';
export default class FunctionData extends JObject implements Comparable<FunctionData> {
    private definition;
    private executionCount;
    private implementationCached;
    private implementationMethod;
    constructor(definition: FunctionDefinition);
    registerExecution(): void;
    getDefinition(): FunctionDefinition;
    getExecutionCount(): number;
    isImplementationCached(): boolean;
    setImplementationCached(implementationCached: boolean): void;
    getImplementationMethod(): PropertyDescriptor | null;
    setImplementationMethod(implementationMethod: PropertyDescriptor): void;
    compareTo(d: FunctionData): number;
    setDefinition(definition: FunctionDefinition): void;
}
