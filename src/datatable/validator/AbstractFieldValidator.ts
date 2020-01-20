import FieldValidator from './FieldValidator';
import ContextManager from '../../context/ContextManager';
import CallerController from '../../context/CallerController';
import JObject from '../../util/java/JObject';
import Context from '../../context/Context';

export default abstract class AbstractFieldValidator<T extends JObject> extends JObject implements FieldValidator<T> {
  public clone(): JObject {
    try {
      return super.clone();
    } catch (ex) {
      throw new Error(ex);
    }
  }

  public equals(obj: JObject): boolean {
    if (obj == null) {
      return false;
    }

    if (!(obj instanceof AbstractFieldValidator)) {
      return false;
    }

    const other: AbstractFieldValidator<T> = obj as AbstractFieldValidator<T>;

    if (this.getType() !== other.getType()) {
      return false;
    }

    if (this.shouldEncode() !== other.shouldEncode()) {
      return false;
    }

    if (this.encode() !== other.encode()) {
      return false;
    }

    return true;
  }

  encode(): string {
    return '';
  }

  getType(): string | null {
    return null;
  }

  shouldEncode(): boolean {
    return false;
  }

  validateValue(value: T): T {
    return this.validate(null, null, null, value);
  }

  abstract validate(context?: Context<any, any> | null, contextManager?: ContextManager<Context<any, any>> | null, caller?: CallerController | null, value?: T): T;
}
