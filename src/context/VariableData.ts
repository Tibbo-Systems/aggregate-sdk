import VariableDefinition from './VariableDefinition';
import Comparable from '../util/java/Comparable';

export default class VariableData implements Comparable<VariableData> {
  private definition: VariableDefinition;

  private value: any;

  private getCount: number = 0;

  private setCount: number = 0;

  private getterCached: boolean = false;

  private setterCached: boolean = false;

  private getterMethod: PropertyDescriptor | null = null;

  private setterMethod: PropertyDescriptor | null = null;

  public constructor(definition: VariableDefinition) {
    this.definition = definition;
  }

  public registerGetOperation() {
    this.getCount++;
  }

  public registerSetOperation() {
    this.setCount++;
  }

  public getDefinition(): VariableDefinition {
    return this.definition;
  }

  getValue(): any {
    return this.value;
  }

  setValue(value: any) {
    this.value = value;
  }

  public getGetCount(): number {
    return this.getCount;
  }

  public getSetCount(): number {
    return this.setCount;
  }

  public isGetterCached(): boolean {
    return this.getterCached;
  }

  public setGetterCached(getterCached: boolean) {
    this.getterCached = getterCached;
  }

  public isSetterCached(): boolean {
    return this.setterCached;
  }

  public setSetterCached(setterCached: boolean) {
    this.setterCached = setterCached;
  }

  public getGetterMethod(): PropertyDescriptor | null {
    return this.getterMethod;
  }

  public setGetterMethod(getter: PropertyDescriptor) {
    this.getterMethod = getter;
  }

  public getSetterMethod(): PropertyDescriptor | null {
    return this.setterMethod;
  }

  public setSetterMethod(setter: PropertyDescriptor) {
    this.setterMethod = setter;
  }

  public compareTo(d: VariableData): number {
    if (d != null) {
      return this.definition.compareTo(d.getDefinition());
    }
    return 0;
  }

  public setDefinition(definition: VariableDefinition) {
    this.definition = definition;
    this.getterCached = false;
    this.setterCached = false;
    this.getterMethod = null;
    this.setterMethod = null;
  }
}
