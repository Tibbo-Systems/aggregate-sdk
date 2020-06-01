import TableFormat from '../../src/datatable/TableFormat';
import FieldFormat from '../../src/datatable/FieldFormat';
import FieldConstants from '../../src/datatable/field/FieldConstants';
import LimitsValidator from '../../src/datatable/validator/LimitsValidator';
import NonNullValidator from '../../src/datatable/validator/NonNullValidator';
import DataTableBuilding from '../../src/datatable/DataTableBuilding';
import DataTableFactory from '../../src/datatable/DataTableFactory';
import DataTable from '../../src/datatable/DataTable';
import EditorOptionsUtils from '../../src/datatable/converter/editor/EditorOptionsUtils';
import DataRecord from '../../src/datatable/DataRecord';
import DataTableBuildingConstants from '../../src/datatable/DataTableBuildingConstants';
import FieldFormatFactory from '../../src/datatable/FieldFormatFactory';

const getTableFormat = () => {
  const format: TableFormat = new TableFormat(1, 10);
  let ff: FieldFormat<any> = FieldFormatFactory.createWith('testField', FieldConstants.INTEGER_FIELD, 'testField', 0);
  ff.setNullable(false);
  ff.addValidator(new LimitsValidator(1, 10));
  format.addField(ff);
  ff = FieldFormatFactory.createWith('testField2', FieldConstants.STRING_FIELD, 'desc for testField2', 'test');
  ff.setReadonly(true);
  ff.addValidator(new NonNullValidator());
  format.addField(ff);
  return format;
};

const getIntValidator = () => {
  const validators: DataTable = DataTableFactory.of(DataTableBuilding.VALIDATORS_FORMAT);
  const validator: DataRecord = validators.addRecord();
  validator.setValue(DataTableBuildingConstants.FIELD_VALIDATORS_VALIDATOR, FieldConstants.VALIDATOR_LIMITS);
  validator.setValue(DataTableBuildingConstants.FIELD_VALIDATORS_OPTIONS, '1 10');
  return validators;
};

const getNonNullValidator = () => {
  const validators: DataTable = DataTableFactory.of(DataTableBuilding.VALIDATORS_FORMAT);
  const validator: DataRecord = validators.addRecord();
  validator.setValue(DataTableBuildingConstants.FIELD_VALIDATORS_VALIDATOR, FieldConstants.VALIDATOR_NON_NULL);
  return validators;
};

const getFormatAsDataTable = () => {
  const dt: DataTable = DataTableFactory.of(DataTableBuilding.TABLE_FORMAT, true);
  dt.rec().setValue(DataTableBuildingConstants.FIELD_TABLE_FORMAT_MIN_RECORDS, 1);
  dt.rec().setValue(DataTableBuildingConstants.FIELD_TABLE_FORMAT_MAX_RECORDS, 10);
  dt.rec().setValue(DataTableBuildingConstants.FIELD_TABLE_FORMAT_MAX_RECORDS, 10);
  dt.rec().setValue(DataTableBuildingConstants.FIELD_TABLE_FORMAT_REORDERABLE, false);
  dt.rec().setValue(DataTableBuildingConstants.FIELD_TABLE_FORMAT_UNRESIZABLE, false);
  dt.rec().setValue(DataTableBuildingConstants.FIELD_TABLE_FORMAT_BINDINGS, DataTableFactory.of(DataTableBuilding.BINDINGS_FORMAT));
  dt.rec().setValue(DataTableBuildingConstants.FIELD_TABLE_FORMAT_ENCODED, '<<testField><I><A=0><D=testField><V=<L=1 10>>><<testField2><S><F=R><A=test><D=desc for testField2><V=<N=>>><M=1><X=10>');

  const fields: DataTable = DataTableFactory.of(DataTableBuilding.FIELDS_FORMAT);
  let field = fields.addRecord();
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_NAME, 'testField');
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_TYPE, FieldConstants.INTEGER_FIELD);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_VALIDATORS, getIntValidator());
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_NULLABLE, false);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_DEFAULT_VALUE, 0);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_DESCRIPTION, 'testField');
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR_OPTIONS, EditorOptionsUtils.createEditorOptionsTable('I', null, null));
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_READONLY, false);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_KEY, false);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_GROUP, null);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_SELVALS, DataTableFactory.of(DataTableBuilding.SELECTION_VALUES_FORMAT));
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_HIDDEN, false);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EXTSELVALS, false);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_HELP, null);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_OLDNAME, 'testField');
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_INLINE, false);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR, null);

  field = fields.addRecord();
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_NAME, 'testField2');
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_TYPE, FieldConstants.STRING_FIELD);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_DESCRIPTION, 'desc for testField2');
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_READONLY, true);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR_OPTIONS, EditorOptionsUtils.createEditorOptionsTable('S', null, null));
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_VALIDATORS, getNonNullValidator());
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_DEFAULT_VALUE, 'test');
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_KEY, false);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_GROUP, null);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_NULLABLE, false);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_SELVALS, DataTableFactory.of(DataTableBuilding.SELECTION_VALUES_FORMAT));
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_HIDDEN, false);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EXTSELVALS, false);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_HELP, null);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_OLDNAME, 'testField2');
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_INLINE, false);
  field.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR, null);
  dt.rec().setValue(DataTableBuildingConstants.FIELD_TABLE_FORMAT_FIELDS, fields);
  return dt;
};

describe('TestDataTableBuilding', () => {
  it('testCreateTableFormat', () => {
    expect(getTableFormat().equals(DataTableBuilding.createTableFormat(getFormatAsDataTable()))).toBeTruthy();
  });

  it('testCreateDataTableFromTableFormat', () => {
    expect(getFormatAsDataTable().equals(DataTableBuilding.formatToTable(getTableFormat()))).toBeTruthy();
  });

  it('testConvertTableFormat', () => {
    const tf: TableFormat = getTableFormat();
    const dt: DataTable = DataTableBuilding.formatToTable(tf);
    expect(getTableFormat().equals(DataTableBuilding.createTableFormat(dt))).toBeTruthy();
  });

  it('testExtendFormat', () => {
    const tf: TableFormat = getTableFormat();
    const dt: DataTable = DataTableBuilding.formatToTable(tf);
    const created = DataTableBuilding.createTableFormat(dt) as TableFormat;
    const extendMessage: any = created.extendMessage(getTableFormat());
    expect(extendMessage).toBeNull();
  });
});
