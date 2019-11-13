import AbstractTableValidator from './AbstractTableValidator';
import DataTable from '../DataTable';
export default class TableKeyFieldsValidator extends AbstractTableValidator {
    constructor(source?: string);
    encode(): string;
    getType(): string;
    validate(table: DataTable): void;
    private validateRecord;
}
