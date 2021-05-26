import AttributedObject from './AttributedObject';
import Expression from './Expression';
import Reference from './Reference';
export default class ExpressionUtils {
    static useVisibleSeparators(formatString: string | null): boolean;
    static getValue(ao: AttributedObject | null): any;
    static toAttributed(value: any, first?: AttributedObject | null, second?: AttributedObject | null): AttributedObject;
    static validateSyntax(expression: Expression, showExpressionInErrorText: boolean): void;
    static dump(expression: string): void;
    static parse(expression: Expression, showExpressionInErrorText: boolean): any;
    static deduplicateExpressionsReferences(expressions: Array<string>): Set<Reference>;
    static findReferences(expression: Expression): Array<Reference>;
    static generateBindingId(): number;
    static copyAttributes(source: AttributedObject, destination: AttributedObject): void;
}
