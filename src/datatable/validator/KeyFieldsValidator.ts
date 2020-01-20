import TableFormat from '../TableFormat';
import DataTable from '../DataTable';
import DataRecord from '../DataRecord';
import MessageFormat from '../../util/java/MessageFormat';
import Cres from '../../Cres';
import StringUtils from '../../util/StringUtils';
import AbstractRecordValidator from './AbstractRecordValidator';
import DataTableQuery from '../DataTableQuery';
import JObject from '../../util/java/JObject';
import QueryCondition from '../QueryCondition';

export default class KeyFieldsValidator extends AbstractRecordValidator {
  constructor(source?: string) {
    super();
  }

  public encode(): string {
    return '';
  }

  public getType(): string {
    return TableFormat.RECORD_VALIDATOR_KEY_FIELDS;
  }

  public validate(table: DataTable, record: DataRecord): void {
    const keyFields: Array<string> = table.getFormat().getKeyFields();

    if (keyFields.length === 0) {
      return;
    }

    const query: DataTableQuery = new DataTableQuery();
    const key: Array<JObject | null> = new Array<JObject>();

    keyFields.forEach(keyField => {
      const value: JObject | null = record.getValue(keyField);
      key.push(value);
      query.addCondition(new QueryCondition(keyField, value));
    });

    const rec: DataRecord | null = table.selectByQuery(query);

    if (rec != null && rec != record) {
      throw new Error(MessageFormat.format(Cres.get().getString('dtKeyFieldViolation'), key, StringUtils.print(keyFields)));
    }
  }
}
