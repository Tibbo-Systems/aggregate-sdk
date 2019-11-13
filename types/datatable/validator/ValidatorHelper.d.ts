import RegexValidator from './RegexValidator';
import LimitsValidator from './LimitsValidator';
export default class ValidatorHelper {
    static readonly NAME_SYNTAX_VALIDATOR: RegexValidator;
    static readonly MIN_NAME_LENGTH: number;
    static readonly MAX_NAME_LENGTH: number;
    static readonly MIN_TYPE_LENGTH: number;
    static readonly MAX_TYPE_LENGTH: number;
    static readonly MIN_DESCRIPTION_LENGTH: number;
    static readonly MAX_DESCRIPTION_LENGTH: number;
    static readonly NAME_LENGTH_VALIDATOR: LimitsValidator;
    static readonly DESCRIPTION_SYNTAX_VALIDATOR: RegexValidator;
    static readonly DESCRIPTION_LENGTH_VALIDATOR: LimitsValidator;
    static readonly TYPE_SYNTAX_VALIDATOR: RegexValidator;
    static readonly TYPE_LENGTH_VALIDATOR: LimitsValidator;
    private static readonly IP_PART;
    static readonly IP_ADDRESS_VALIDATOR: RegexValidator;
    static readonly PORT_VALIDATOR: LimitsValidator;
    static readonly EMAIL_VALIDATOR: RegexValidator;
    static readonly NON_ZERO_LENGTH_VALIDATOR: LimitsValidator;
}
