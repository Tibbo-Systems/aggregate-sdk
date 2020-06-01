import FieldFormat from '../FieldFormat';
import MessageFormat from '../../util/java/MessageFormat';
import CallerController from '../../context/CallerController';
import ContextManager from '../../context/ContextManager';
import Context from '../../context/Context';
import Cres from '../../Cres';
import AbstractFieldValidator from './AbstractFieldValidator';
import JObject from '../../util/java/JObject';
import FieldConstants from '../field/FieldConstants';

export default class RegexValidator extends AbstractFieldValidator<any> {
  private static readonly SEPARATOR: string = '^^';
  private static readonly SEPARATOR_REGEX: string = '\\^\\^';

  private readonly regex: string;
  private readonly message: string | null = null;

  constructor(regex: string, message: string | null = null) {
    super();
    if (message === null) {
      const parts: Array<string> = regex.split(new RegExp(RegexValidator.SEPARATOR_REGEX));
      this.regex = parts[0];
      if (parts.length > 1) {
        this.message = parts[1];
      }
    } else {
      this.regex = regex;
      this.message = message;
    }
  }

  public shouldEncode(): boolean {
    return true;
  }

  public encode(): string {
    return this.regex + (this.message != null ? RegexValidator.SEPARATOR + this.message : '');
  }

  public getType(): string | null {
    return FieldConstants.VALIDATOR_REGEX;
  }

  public validate(context?: Context<any, any> | null, contextManager?: ContextManager<Context<any, any>> | null, caller?: CallerController | null, value?: any): any {
    try {
      if (value != null && !value.toString().match(this.regex)) {
        throw new Error(this.message != null ? this.message : MessageFormat.format(Cres.get().getString('dtValueDoesNotMatchPattern'), value, this.regex));
      }
    } catch (ex) {
      throw new Error(ex.message);
    }

    return value;
  }

  public equals(obj: any): boolean {
    if (this == obj) {
      return true;
    }
    if (!super.equals(obj)) {
      return false;
    }
    if (obj instanceof AbstractFieldValidator) {
      return false;
    }
    const other: RegexValidator = obj as RegexValidator;
    if (this.message == null) {
      if (other.message != null) {
        return false;
      }
    } else if (this.message !== other.message) {
      return false;
    }
    if (this.regex == null) {
      if (other.regex != null) {
        return false;
      }
    } else if (this.regex !== other.regex) {
      return false;
    }
    return true;
  }
}
