import TableFormat from '../../src/datatable/TableFormat';
import FieldFormat from '../../src/datatable/FieldFormat';
import FieldFormatFactory from '../../src/datatable/FieldFormatFactory';
import FieldConstants from '../../src/datatable/field/FieldConstants';
import LimitsValidator from '../../src/datatable/validator/LimitsValidator';
import NonNullValidator from '../../src/datatable/validator/NonNullValidator';
import Icons from '../../src/util/Icons';
import TableKeyFieldsValidator from '../../src/datatable/validator/TableKeyFieldsValidator';
import TableExpressionValidator from '../../src/datatable/validator/TableExpressionValidator';
import DataTable from '../../src/datatable/DataTable';
import DataTableFactory from '../../src/datatable/DataTableFactory';
import DataRecord from '../../src/datatable/DataRecord';
import Data from '../../src/data/Data';
import ByteBuffer from 'bytebuffer';

export default class StaticTestUtils {
  private static initStaticTestUtils = false;

  private static readonly STRING_FIELD_VALUE: string = 'test77NNxxG0';
  private static readonly INT_FIELD_VALUE: number = 2156;
  private static readonly FLOAT_FIELD_VALUE: number = 12.78;
  private static readonly LONG_VALUE: number = 12;
  private static readonly DOUBLE_VALUE: number = 12.56;

  private static readonly STRING_FIELD: string = 'str';
  private static readonly BOOLEAN_TRUE_DESCRIPTION: string = 'not false';
  private static readonly BOOLEAN_FALSE_DESCRIPTION: string = 'not true';

  public static readonly TEST_TABLE_FORMAT: TableFormat = new TableFormat(1, 100);

  private static initializeStaticTestUtils0() {
    const strFF: FieldFormat<any> = FieldFormatFactory.create('<' + StaticTestUtils.STRING_FIELD + '><' + FieldConstants.STRING_FIELD + '><F=N>');
    strFF.setDefault('zzz');
    strFF.setKeyField(true);
    strFF.setDescription('Description for this field');
    strFF.setHelp('This is help containing some tags </help>');
    const intFF: FieldFormat<any> = FieldFormatFactory.create('<intField><' + FieldConstants.INTEGER_FIELD + '>');
    intFF.addValidator(new LimitsValidator(1, StaticTestUtils.INT_FIELD_VALUE + 1));
    intFF.setKeyField(true);
    const selectionValues: Map<number, string> = new Map<number, string>();
    for (let i = 1; i < 10; i++) {
      selectionValues.set(i, i + '');
    }
    intFF.setSelectionValues(selectionValues);
    intFF.setExtendableSelectionValues(true);
    const floatFF: FieldFormat<any> = FieldFormatFactory.create('<floatField><' + FieldConstants.FLOAT_FIELD + '>');
    floatFF.setInlineData(true);
    const dataTableFF: FieldFormat<any> = FieldFormatFactory.create('<table><' + FieldConstants.DATATABLE_FIELD + '>');
    dataTableFF.addValidator(new NonNullValidator());
    const booleanFF: FieldFormat<any> = FieldFormatFactory.create('<booleanField><' + FieldConstants.BOOLEAN_FIELD + '>');
    const bValues: Map<boolean, string> = new Map<boolean, string>();
    bValues.set(true, StaticTestUtils.BOOLEAN_TRUE_DESCRIPTION);
    bValues.set(false, StaticTestUtils.BOOLEAN_FALSE_DESCRIPTION);
    booleanFF.setSelectionValues(bValues);
    booleanFF.setReadonly(true);
    const longFF: FieldFormat<any> = FieldFormatFactory.create('<longField><' + FieldConstants.LONG_FIELD + '>');
    longFF.setOptional(true);
    const doubleFF: FieldFormat<any> = FieldFormatFactory.create('<doubleField><' + FieldConstants.DOUBLE_FIELD + '>');
    doubleFF.setNotReplicated(true);
    const dateFF: FieldFormat<any> = FieldFormatFactory.create('<date><' + FieldConstants.DATE_FIELD + '><F=N>');
    dateFF.setDefault(new Date(11));
    dateFF.setGroup('date');
    dateFF.setEditorOptions('editor options with invalid html markup <tab <ff gg="\'""">');
    // const colorFF: FieldFormat<any> = FieldFormatFactory.create("<color><" + FieldConstants.COLOR_FIELD + ">");
    // colorFF.setHidden(true);
    const dataFF: FieldFormat<any> = FieldFormatFactory.create('<data><' + FieldConstants.DATA_FIELD + '>');
    dataFF.setEditor(FieldConstants.EDITOR_SOUND);
    dataFF.setIcon(Icons.ST_ALERT);

    StaticTestUtils.TEST_TABLE_FORMAT.addField(strFF);
    StaticTestUtils.TEST_TABLE_FORMAT.addField(intFF);
    StaticTestUtils.TEST_TABLE_FORMAT.addField(floatFF);
    StaticTestUtils.TEST_TABLE_FORMAT.addField(dataTableFF);
    StaticTestUtils.TEST_TABLE_FORMAT.addField(booleanFF);
    StaticTestUtils.TEST_TABLE_FORMAT.addField(longFF);
    StaticTestUtils.TEST_TABLE_FORMAT.addField(doubleFF);
    StaticTestUtils.TEST_TABLE_FORMAT.addField(dateFF);
    // StaticTestUtils.TEST_TABLE_FORMAT.addField(colorFF);
    StaticTestUtils.TEST_TABLE_FORMAT.addField(dataFF);

    StaticTestUtils.TEST_TABLE_FORMAT.addTableValidator(new TableKeyFieldsValidator());
    StaticTestUtils.TEST_TABLE_FORMAT.addTableValidator(new TableExpressionValidator("2 >= 1 ? null : 'Validation failed'"));
  }

  public static createTestDataTable(defaultStringValue: boolean, recordCount: number): DataTable {
    const dt: DataTable = DataTableFactory.of(StaticTestUtils.TEST_TABLE_FORMAT);
    let rec: DataRecord | null = null;
    for (let i = 0; i < recordCount; i++) {
      rec = dt.addRecord();
      StaticTestUtils.fulfillRecord(defaultStringValue, rec);
    }

    return dt;
  }

  private static fulfillRecord(defaultStringValue: boolean, rec: DataRecord) {
    if (defaultStringValue) {
      const ff: FieldFormat<any> = rec.getFormat().getField(StaticTestUtils.STRING_FIELD);
      rec.setValue(StaticTestUtils.STRING_FIELD, ff.getDefaultValue());
    } else {
      rec.setValue(StaticTestUtils.STRING_FIELD, StaticTestUtils.STRING_FIELD_VALUE);
    }

    rec.setValue('intField', StaticTestUtils.INT_FIELD_VALUE);
    rec.setValue('floatField', StaticTestUtils.FLOAT_FIELD_VALUE);
    rec.setValue('table', DataTableFactory.of(new TableFormat(1, 1)));
    rec.setValue('booleanField', true);
    rec.setValue('longField', StaticTestUtils.LONG_VALUE);
    rec.setValue('doubleField', StaticTestUtils.DOUBLE_VALUE);
    rec.setValue('date', null);
    // rec.setValue("color", Color.BLUE);
    const value: Data = new Data(ByteBuffer.fromUTF8('ABC'));
    value.setName('zzzz');
    rec.setValue('data', value);
  }

  public static initializeStaticTestUtils() {
    if (StaticTestUtils.initStaticTestUtils) {
      return;
    }

    StaticTestUtils.initializeStaticTestUtils0();
    StaticTestUtils.initStaticTestUtils = true;
  }
}

StaticTestUtils.initializeStaticTestUtils();
