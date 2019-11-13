import AbstractFieldValidator from './AbstractFieldValidator';
import Context from '../../context/Context';
import ContextManager from '../../context/ContextManager';
import CallerController from '../../context/CallerController';
import Cres from '../../Cres';
import FieldConstants from '../field/FieldConstants';

export default class NonNullValidator extends AbstractFieldValidator<any> {
  private message: string | null = null;

  constructor(message?: string | null) {
    super();
    if (message) {
      this.message = message;
    }
  }

  getType(): string | null {
    return FieldConstants.VALIDATOR_NON_NULL;
  }

  public validate(
    context: Context<any, any>,
    contextManager: ContextManager<Context<any, any>>,
    caller: CallerController,
    value: any
  ): any {
    if (value == null) {
      throw new Error(this.message != null ? this.message : Cres.get().getString('dtValueIsRequired'));
    }

    return value;
  }

  public shouldEncode(): boolean {
    return true;
  }

  public encode(): string {
    return '';
  }

  public equals(obj: any): boolean {
    if (this == obj) {
      return true;
    }
    if (!super.equals(obj)) {
      return false;
    }
    if (!(obj instanceof AbstractFieldValidator)) {
      return false;
    }

    const other: NonNullValidator = obj as NonNullValidator;
    if (this.message == null) {
      if (other.message != null) {
        return false;
      }
    } else if (this.message !== other.message) {
      return false;
    }
    return true;
  }
}
