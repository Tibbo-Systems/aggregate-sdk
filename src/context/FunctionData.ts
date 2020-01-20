import Comparable from '../util/java/Comparable';
import JObject from '../util/java/JObject';
import FunctionDefinition from './FunctionDefinition';

export default class FunctionData extends JObject implements Comparable<FunctionData> {
  private definition: FunctionDefinition;

  private executionCount = 0;

  private implementationCached = false;

  private implementationMethod: PropertyDescriptor | null = null;

  constructor(definition: FunctionDefinition) {
    super();
    this.definition = definition;
  }

  public registerExecution() {
    this.executionCount++;
  }

  public getDefinition(): FunctionDefinition {
    return this.definition;
  }

  public getExecutionCount(): number {
    return this.executionCount;
  }

  public isImplementationCached(): boolean {
    return this.implementationCached;
  }

  public setImplementationCached(implementationCached: boolean) {
    this.implementationCached = implementationCached;
  }

  public getImplementationMethod(): PropertyDescriptor | null {
    return this.implementationMethod;
  }

  public setImplementationMethod(implementationMethod: PropertyDescriptor) {
    this.implementationMethod = implementationMethod;
  }

  public compareTo(d: FunctionData): number {
    if (d != null) {
      return this.definition.compareTo(d.getDefinition());
    }
    return 0;
  }

  public setDefinition(definition: FunctionDefinition) {
    this.definition = definition;
    this.implementationCached = false;
    this.implementationMethod = null;
  }
}
