import AbstractFieldValidator from './AbstractFieldValidator';
import FieldFormat from '../FieldFormat';
import StringUtils from '../../util/StringUtils';
import Data from '../../data/Data';
import Context from '../../context/Context';
import ContextManager from '../../context/ContextManager';
import CallerController from '../../context/CallerController';
import Cres from '../../Cres';
import MessageFormat from '../../util/java/MessageFormat';
import Util from '../../util/Util';
import FieldConstants from '../field/FieldConstants';
import JSBI from 'jsbi';

export default class LimitsValidator extends AbstractFieldValidator<any> {
  private static readonly MIN_MAX_SEPARATOR = ' ';

  private min: JSBI | number | null = null;
  private max: JSBI | number | null = null;

  constructor(min: JSBI | number | null, max: JSBI | number | null) {
    super();
    this.setLimits(min, max);
  }

  protected setLimits(min: JSBI | number | null, max: JSBI | number | null): void {
    this.min = min;
    this.max = max;
  }

  public static createFromMinMax(min: JSBI | number, max: JSBI | number): LimitsValidator {
    return new LimitsValidator(min, max);
  }

  public static createFromFieldFormatAndSource(fieldFormat: FieldFormat<any>, source: string): LimitsValidator {
    const minMax: Array<string> = StringUtils.split(source, LimitsValidator.MIN_MAX_SEPARATOR);

    if (fieldFormat.getType() == FieldConstants.LONG_FIELD) {
      if (minMax.length > 1) {
        return new LimitsValidator(JSBI.BigInt(minMax[0]), JSBI.BigInt(minMax[1]));
      } else {
        return new LimitsValidator(null, JSBI.BigInt(minMax[1]));
      }
    } else if (fieldFormat.getType() == FieldConstants.DATA_FIELD || fieldFormat.getType() == FieldConstants.STRING_FIELD) {
      if (minMax.length > 1) {
        return new LimitsValidator(Number(minMax[0]), Number(minMax[1]));
      } else {
        return new LimitsValidator(null, Number(minMax[0]));
      }
    } else {
      if (minMax.length > 1) {
        return new LimitsValidator(fieldFormat.valueFromString(minMax[0], null, false), fieldFormat.valueFromString(minMax[1], null, false));
      } else {
        return new LimitsValidator(null, fieldFormat.valueFromString(minMax[0], null, false));
      }
    }
  }

  public getMin(): JSBI | number | null {
    return this.min;
  }

  public getMax(): JSBI | number | null {
    return this.max;
  }

  public encode(): string {
    return this.min != null ? this.min.toString() + (this.max != null ? LimitsValidator.MIN_MAX_SEPARATOR + this.max.toString() : '') : this.max != null ? this.max.toString() : '';
  }

  public getType(): string {
    return FieldConstants.VALIDATOR_LIMITS;
  }

  public validate(context: Context<any, any> | null, contextManager: ContextManager<Context<any, any>> | null, caller: CallerController | null, value: any): any {
    if (value == null) {
      return value;
    }

    if (Util.isBigInt(value)) {
      this.compare(value, null, null);
    } else if (value instanceof Data) {
      const data: Data = value as Data;
      const dataBuffer = data.getData();

      if (dataBuffer != null) {
        const size: number = dataBuffer.limit;
        this.compare(size, null, null);
      }
    } else if (Util.isString(value)) {
      this.compare(value.toString().length, Cres.get().getString('dtValueTooShort'), Cres.get().getString('dtValueTooLong'));
    } else {
      const cv: number = value as number;
      this.compare(cv, null, null);
    }

    return value;
  }

  private compare(cv: JSBI | number, smallMessage: string | null, bigMessage: string | null): void {
    if (this.min != null) {
      if (Util.compare(cv, this.min) < 0) {
        throw new Error(MessageFormat.format(smallMessage != null ? smallMessage : Cres.get().getString('dtValueTooSmall'), cv, this.min));
      }
    }

    if (this.max != null) {
      if (Util.compare(cv, this.max) > 0) {
        throw new Error(MessageFormat.format(bigMessage != null ? bigMessage : Cres.get().getString('dtValueTooBig'), cv, this.max));
      }
    }
  }

  public shouldEncode(): boolean {
    return true;
  }

  public equals(obj: any): boolean {
    if (this == obj) {
      return true;
    }
    if (!super.equals(obj)) {
      return false;
    }
    if (!(obj instanceof LimitsValidator)) {
      return false;
    }
    const other: LimitsValidator = obj as LimitsValidator;
    if (this.max == null) {
      if (other.max != null) {
        return false;
      }
    } else if (other.max == null) {
      if (this.max != null) {
        return false;
      }
    } else if (Util.compare(this.max, other.max) !== 0) {
      return false;
    }
    if (this.min == null) {
      if (other.min != null) {
        return false;
      }
    } else if (other.min == null) {
      if (this.min != null) {
        return false;
      }
    } else if (Util.compare(this.min, other.min) !== 0) {
      return false;
    }
    return true;
  }
}
