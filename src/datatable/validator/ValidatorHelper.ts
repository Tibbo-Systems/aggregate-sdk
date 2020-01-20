import Cres from '../../Cres';
import RegexValidator from './RegexValidator';
import LimitsValidator from './LimitsValidator';
import JConstants from '../../util/java/JConstants';

export default class ValidatorHelper {
  public static readonly NAME_SYNTAX_VALIDATOR: RegexValidator = new RegexValidator('\\w+', Cres.get().getString('dtInvalidName'));

  public static readonly MIN_NAME_LENGTH: number = 1;

  public static readonly MAX_NAME_LENGTH: number = 50;

  public static readonly MIN_TYPE_LENGTH: number = 1;

  public static readonly MAX_TYPE_LENGTH: number = 50;

  public static readonly MIN_DESCRIPTION_LENGTH: number = 0;

  public static readonly MAX_DESCRIPTION_LENGTH: number = 100;

  public static readonly NAME_LENGTH_VALIDATOR: LimitsValidator = new LimitsValidator(ValidatorHelper.MIN_NAME_LENGTH, ValidatorHelper.MAX_NAME_LENGTH);
  public static readonly DESCRIPTION_SYNTAX_VALIDATOR: RegexValidator = new RegexValidator('[^\\p{Cntrl}]*', Cres.get().getString('dtInvalidDescr'));
  public static readonly DESCRIPTION_LENGTH_VALIDATOR: LimitsValidator = new LimitsValidator(ValidatorHelper.MIN_DESCRIPTION_LENGTH, ValidatorHelper.MAX_DESCRIPTION_LENGTH);
  public static readonly TYPE_SYNTAX_VALIDATOR: RegexValidator = new RegexValidator('\\w+', Cres.get().getString('dtInvalidType'));
  public static readonly TYPE_LENGTH_VALIDATOR: LimitsValidator = new LimitsValidator(ValidatorHelper.MIN_TYPE_LENGTH, ValidatorHelper.MAX_TYPE_LENGTH);
  private static readonly IP_PART: string = '(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

  public static readonly IP_ADDRESS_VALIDATOR: RegexValidator = new RegexValidator('^(?:' + ValidatorHelper.IP_PART + '\\.){3}' + ValidatorHelper.IP_PART + '|$', Cres.get().getString('dtInvalidIp'));
  public static readonly PORT_VALIDATOR: LimitsValidator = new LimitsValidator(1, 65535);
  public static readonly EMAIL_VALIDATOR: RegexValidator = new RegexValidator('^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[_A-Za-z0-9-]+)^^');
  public static readonly NON_ZERO_LENGTH_VALIDATOR: LimitsValidator = new LimitsValidator(1, JConstants.INTEGER_MAX_VALUE);
}
