import MessageFormat from '../../util/java/MessageFormat';
import CallerController from '../../context/CallerController';
import ContextManager from '../../context/ContextManager';
import Context from '../../context/Context';
import Cres from '../../Cres';
import AbstractFieldValidator from './AbstractFieldValidator';
import FieldConstants from '../field/FieldConstants';

export default class RegexValidator extends AbstractFieldValidator<any> {
  private static readonly SEPARATOR: string = '^^';
  private static readonly SEPARATOR_REGEX: string = '\\^\\^';
  private static readonly JAVA_TO_JS_REGEXP: Map<string, string> = new Map([
    ['p{Lower}', 'a-z'],
    ['p{Upper}', 'A-Z'],
    ['p{ASCII}', '\x00-\x7F'],
    ['p{Alpha}', 'a-zA-Z'],
    ['p{Digit}', 'd'],
    ['p{Alnum}', 'a-zA-Zd'],
    ['p{Punct}', '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'],
    ['p{Graph}', 'a-zA-Zd!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'],
    ['p{Print}', 'a-zA-Zd!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'],
    ['p{Blank}', ' \t'],
    ['p{Cntrl}', '\x00-\x1F\x7F'],
    ['p{XDigit}', '0-9a-fA-F'],
    ['p{Space}', ' \t\n\x0B\f\r'],
    ['p{javaLowerCase}', 'a-z'],
    ['p{javaUpperCase}', 'A-Z'],
    ['p{javaWhitespace}', ' \t\n\x0B\f\r'],
    ['p{javaMirrored}', '[](){}'],
  ]);

  private readonly regex: string;
  private readonly message: string | null = null;
  private readonly jsRegex: string;

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
    this.jsRegex = RegexValidator.convertJavaRegexpToJs(this.regex);
  }

  static convertJavaRegexpToJs(javaRegexp: string): string {
    let jsRegexp: string = javaRegexp;

    RegexValidator.JAVA_TO_JS_REGEXP.forEach((jsPattern: string, javaPattern: string) => (jsRegexp = jsRegexp.replace(new RegExp(javaPattern, 'g'), jsPattern)));

    return jsRegexp;
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
      if (value != null && value.toString().search(this.jsRegex) !== 0) {
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
