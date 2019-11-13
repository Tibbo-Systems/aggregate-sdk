import AttributedObject from "./AttributedObject";
export default class ExpressionUtils {
    static readonly PARAM_ESCAPE_SINGLE: string;
    static readonly PARAM_ESCAPE_DOUBLE: string;
    private static readonly PARAMS_DELIM;
    private static readonly PARAMS_ESCAPE;
    static readonly NULL_PARAM: string;
    static useVisibleSeparators(formatString: string | null): boolean;
    private static prepareParameter;
    static getFunctionParameters(paramsString: string, allowExpressions: boolean): any[];
    static getFunctionParametersFromArray(params: Array<any>): string;
    static getValue(ao: AttributedObject | null): any;
    static toAttributed(value: any, first?: AttributedObject | null, second?: AttributedObject | null): AttributedObject;
}
