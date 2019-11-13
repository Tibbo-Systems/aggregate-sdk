import AbstractTableValidator from './AbstractTableValidator';
import TableFormat from '../TableFormat';
import DataTable from '../DataTable';
import DataRecord from '../DataRecord';
import MessageFormat from '../../util/java/MessageFormat';
import StringUtils from '../../util/StringUtils';
import Cres from '../../Cres';
import DataTableQuery from '../DataTableQuery';
import QueryCondition from '../QueryCondition';

export default class TableKeyFieldsValidator extends AbstractTableValidator {
  constructor(source?: string) {
    super();
  }

  public encode(): string {
    return '';
  }

  public getType(): string {
    return TableFormat.TABLE_VALIDATOR_KEY_FIELDS;
  }

  public validate(table: DataTable): void {
    for (let i: number = 0; i < table.getRecordCount(); i++) {
      const rec: DataRecord = table.getRecord(i);
      this.validateRecord(table, rec);
    }
  }

  private validateRecord(table: DataTable, record: DataRecord) {
    const keyFields: Array<string> = table.getFormat().getKeyFields();

    if (keyFields.length === 0) {
      return;
    }

    const query: DataTableQuery = new DataTableQuery();
    const key: Array<any> = new Array<any>();

    keyFields.forEach(keyField => {
      const value: any = record.getValue(keyField);
      key.push(value);
      query.addCondition(new QueryCondition(keyField, value));
    });

    const rec: DataRecord | null = table.selectByQuery(query);

    if (rec != null && rec != record) {
      throw new Error(
        MessageFormat.format(Cres.get().getString('dtKeyFieldViolation'), key, StringUtils.print(keyFields))
      );
    }
  }
}
