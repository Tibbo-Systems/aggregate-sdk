import AbstractTableValidator from './AbstractTableValidator';
import DataTable from '../DataTable';
export default class TableExpressionValidator extends AbstractTableValidator {
    private readonly expression;
    constructor(expression: string);
    static valueOf(encodedBase64: string): TableExpressionValidator;
    encode(): string;
    getType(): string;
    validate(table: DataTable): void;
}
