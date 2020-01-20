import AttributedObject from './AttributedObject';
import Expression from './Expression';
export default class ExpressionUtils {
    static useVisibleSeparators(formatString: string | null): boolean;
    static getValue(ao: AttributedObject | null): any;
    static toAttributed(value: any, first?: AttributedObject | null, second?: AttributedObject | null): AttributedObject;
    static parse(expression: Expression, showExpressionInErrorText: boolean): any;
}
