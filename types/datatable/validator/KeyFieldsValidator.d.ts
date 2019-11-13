import DataTable from '../DataTable';
import DataRecord from '../DataRecord';
import AbstractRecordValidator from './AbstractRecordValidator';
export default class KeyFieldsValidator extends AbstractRecordValidator {
    constructor(source?: string);
    encode(): string;
    getType(): string;
    validate(table: DataTable, record: DataRecord): void;
}
