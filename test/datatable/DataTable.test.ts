import TableFormat from '../../src/datatable/TableFormat';
import ClassicEncodingSettings from '../../src/datatable/encoding/ClassicEncodingSettings';
import DataTable from '../../src/datatable/DataTable';
import DataTableFactory from '../../src/datatable/DataTableFactory';
import DataRecord from '../../src/datatable/DataRecord';
import FieldFormatFactory from '../../src/datatable/FieldFormatFactory';
import FieldConstants from '../../src/datatable/field/FieldConstants';
import TransferEncodingHelper from '../../src/datatable/encoding/TransferEncodingHelper';
import DataTableUtils from '../../src/datatable/DataTableUtils';
import AggreGateCommand from '../../src/protocol/AggreGateCommand';
import Data from '../../src/data/Data';
import ByteBuffer from 'bytebuffer';
import ExpressionUtils from '../../src/expression/ExpressionUtils';
import FieldFormat from '../../src/datatable/FieldFormat';
import StringBuilder from '../../src/util/java/StringBuilder';

const createFormat = (format: string) => {
  return TableFormat.createWithFormatAndSettings(format, new ClassicEncodingSettings(true));
};

describe('TestDataTable', () => {
  it('testDatatable', () => {
    const format: TableFormat = createFormat('<<val><I>> <<str><S>> <<bool><B>>');
    const emptyRecords = 20;
    const dt: DataTable = DataTableFactory.of(format, emptyRecords);

    expect(dt.getRecordCount()).toBe(emptyRecords);
    expect(dt.getFieldCount()).toBe(3);

    // Test datatable type field

    const tbl: DataTable = DataTableFactory.createWithFirstRecord(createFormat('<<int><I>> <<str><S>> <<bool><B>>'), 5, 'test', true);

    const rec: DataRecord = new DataRecord(FieldFormatFactory.create('<tbl><T>').wrap());
    rec.addDataTable(tbl);

    let t1: DataTable = DataTableFactory.createFromDataRecord(rec);

    t1 = DataTableFactory.createAndDecode(t1.encodeWithSeparators(false));

    t1 = t1.rec().getDataTable('tbl');

    expect(t1.getRecordCount()).toBe(1);
    expect(t1.getFieldCount()).toBe(3);
    expect(t1.rec().getInt('int')).toBe(5);
    expect(t1.rec().getString('str')).toBe('test');
    expect(t1.rec().getBoolean('bool')).toBeTruthy();
  });

  it('testClone', () => {
    const format: TableFormat = FieldFormatFactory.create('<s1><S><F=N><A=default><D=Test><S=<desc=default><desc2=val2>><V=<L=1 10>>').wrap();
    const dt: DataTable = DataTableFactory.of(format, 5);

    const selectionValues: Map<any, string> = dt.getFormat().getField('s1').getSelectionValues() as Map<any, string>;
    expect(selectionValues.size).toBe(2);

    const clone: DataTable = dt.clone();

    expect(format === clone.getFormat()).toBeTruthy();

    const selectionValuesFromClone: Map<any, string> = clone.getFormat().getField('s1').getSelectionValues() as Map<any, string>;

    expect(selectionValuesFromClone.size).toBe(2);

    dt.getRecord(2).setValue('s1', 'val2');

    expect(clone.getRecord(2).getString('s1')).toBe('default');
  });

  it('testParameterizedReportThatWorksIncorrectly', () => {
    const format: TableFormat = createFormat('<<devices><T><A=<F=<<devicePath><S><A=><D=Device Path>>><R=<aaa>><R=<bbb>>>>');

    const result: DataTable = DataTableFactory.of(format, 1);
    const devices: DataTable = result.rec().getDataTable('devices');
    expect(devices.getRecordCount()).toBe(2);
    expect(devices.getRecord(0).getString('devicePath')).toBe('aaa');
    expect(devices.getRecord(1).getString('devicePath')).toBe('bbb');
  });

  it('testInnerTableRecordsAreFilledProperly', () => {
    const innerFormat: TableFormat = new TableFormat();
    innerFormat.addField(FieldFormatFactory.createWith('devicePath', FieldConstants.STRING_FIELD, 'Device Path'));
    const defaultInnerTable: DataTable = DataTableFactory.of(innerFormat);
    defaultInnerTable.addRecordWith('aaa');
    defaultInnerTable.addRecordWith('bbb');

    const outerFormat: TableFormat = new TableFormat();
    outerFormat.addFieldWithTypeAndName(FieldConstants.DATATABLE_FIELD, 'devices');
    outerFormat.getField(0).setDefault(defaultInnerTable);

    const encodedFormat: string = outerFormat.encodeUseSeparator(true);
    expect(encodedFormat).toBe('<<devices><T><A=<F=<<devicePath><S><A=><D=Device Path>>><R=<aaa>><R=<bbb>>>>');

    const decodedFormat: TableFormat = createFormat(encodedFormat);
    const innerDefaultTable: DataTable = decodedFormat.getField('devices').getDefaultValue() as DataTable;
    expect(innerDefaultTable.getRecordCount()).toBe(2);
    expect(innerDefaultTable.getRecord(0).getString('devicePath')).toBe('aaa');

    const result: DataTable = DataTableFactory.of(decodedFormat, 1);
    const devices: DataTable = result.rec().getDataTable('devices');
    expect(devices.getRecordCount()).toBe(2);
    expect(devices.getRecord(0).getString('devicePath')).toBe('aaa');
    expect(devices.getRecord(1).getString('devicePath')).toBe('bbb');
  });

  it('testDataTableEncodingLigth', () => {
    const data: string =
      TransferEncodingHelper.ESCAPE_CHAR +
      ' ' +
      TransferEncodingHelper.ESCAPE_CHAR +
      TransferEncodingHelper.ESCAPE_CHAR +
      ' ' +
      AggreGateCommand.CLIENT_COMMAND_SEPARATOR +
      TransferEncodingHelper.SEPARATOR_CHAR +
      DataTableUtils.ELEMENT_START +
      DataTableUtils.ELEMENT_VISIBLE_START +
      DataTableUtils.ELEMENT_END +
      DataTableUtils.ELEMENT_VISIBLE_END +
      DataTableUtils.ELEMENT_NAME_VALUE_SEPARATOR +
      DataTableUtils.ELEMENT_VISIBLE_NAME_VALUE_SEPARATOR +
      AggreGateCommand.START_CHAR +
      TransferEncodingHelper.START_CHAR +
      AggreGateCommand.END_CHAR +
      TransferEncodingHelper.END_CHAR;

    const tf: TableFormat = FieldFormatFactory.createType('DATATABLE_FIELD', FieldConstants.DATATABLE_FIELD).wrap();

    const table: DataTable = DataTableFactory.of(tf);
    const record: DataRecord = table.addRecord();
    const table2: DataTable = table.clone();
    record.setValue(0, table2);
    const table3: DataTable = table.clone();
    table2.getRecord(0).setValue(0, table3);

    const e: string = table.encodeWithSeparators(false);
    const r: DataTable = DataTableFactory.createAndDecode(e);

    expect(table.equals(r)).toBeTruthy();
  });

  it('testTransfer', () => {
    const data = 'FDATATABLE_FIELDTAF';

    const res: string = (TransferEncodingHelper.encode(data) as StringBuilder).toString();
    const res2: string = (TransferEncodingHelper.encode(res) as StringBuilder).toString();
    const res3: string = (TransferEncodingHelper.encode(res2) as StringBuilder).toString();

    const res4: string = (TransferEncodingHelper.encode(data, null, 0) as StringBuilder).toString();
    const res5: string = (TransferEncodingHelper.encode(data, null, 1) as StringBuilder).toString();
    const res6: string = (TransferEncodingHelper.encode(data, null, 2) as StringBuilder).toString();
    const res7: string = (TransferEncodingHelper.encode(data, null, 3) as StringBuilder).toString();

    expect(res === res5).toBeTruthy();
    expect(res2 === res6).toBeTruthy();
    expect(res3 === res7).toBeTruthy();

    const dec: string = TransferEncodingHelper.decode(res7);
    const dec2: string = TransferEncodingHelper.decode(dec);
    const dec3: string = TransferEncodingHelper.decode(dec2);

    console.log(dec);
    console.log(res3);
    console.log(res7);
  });

  it('testDataTableEncoding', () => {
    const data: string =
      TransferEncodingHelper.ESCAPE_CHAR +
      ' ' +
      TransferEncodingHelper.ESCAPE_CHAR +
      TransferEncodingHelper.ESCAPE_CHAR +
      ' ' +
      AggreGateCommand.CLIENT_COMMAND_SEPARATOR +
      TransferEncodingHelper.SEPARATOR_CHAR +
      DataTableUtils.ELEMENT_START +
      DataTableUtils.ELEMENT_VISIBLE_START +
      DataTableUtils.ELEMENT_END +
      DataTableUtils.ELEMENT_VISIBLE_END +
      DataTableUtils.ELEMENT_NAME_VALUE_SEPARATOR +
      DataTableUtils.ELEMENT_VISIBLE_NAME_VALUE_SEPARATOR +
      AggreGateCommand.START_CHAR +
      TransferEncodingHelper.START_CHAR +
      AggreGateCommand.END_CHAR +
      TransferEncodingHelper.END_CHAR;

    const tf: TableFormat = FieldFormatFactory.createType('STRING_FIELD', FieldConstants.STRING_FIELD).wrap();

    tf.addField(FieldFormatFactory.createType('BOOLEAN_FIELD', FieldConstants.BOOLEAN_FIELD));
    tf.addField(FieldFormatFactory.createType('DATA_FIELD', FieldConstants.DATA_FIELD));
    tf.addField(FieldFormatFactory.createType('DATE_FIELD', FieldConstants.DATE_FIELD));
    tf.addField(FieldFormatFactory.createType('DATATABLE_FIELD', FieldConstants.DATATABLE_FIELD));

    const dataF: Data = new Data();
    const dateValue = ByteBuffer.fromUTF8('test data % %% %%%');
    dataF.setData(dateValue);

    const table: DataTable = DataTableFactory.of(tf);
    const record: DataRecord = table.addRecord();
    record.setValue(0, 'test data % %% %%%');
    record.setValue(1, true);
    record.setValue(2, dataF);
    record.setValue(3, new Date());

    const table2: DataTable = table.clone();
    record.setValue(4, table2);

    const table3: DataTable = table.clone();

    table2.getRecord(0).setValue(4, table3);

    const e: string = table.encodeWithSeparators(false);

    const r: DataTable = DataTableFactory.createAndDecode(e);

    expect(table.equals(r)).toBeTruthy();
  });

  it('testEncodingOfNestedTableWithoutDefaultValue', () => {
    const tableFromat: TableFormat = FieldFormatFactory.createType('DATATABLE_FIELD', FieldConstants.DATATABLE_FIELD).wrap();
    const mainTable: DataTable = DataTableFactory.of(tableFromat);

    const nestedTableFormat: TableFormat = FieldFormatFactory.createType('STRING_FIELD', FieldConstants.STRING_FIELD).wrap();
    const nestedTable1: DataTable = DataTableFactory.of(nestedTableFormat);
    const nestedRecord11: DataRecord = nestedTable1.addRecord();
    nestedRecord11.addString('aaa1');
    const nestedRecord12: DataRecord = nestedTable1.addRecord();
    nestedRecord12.addString('bbb1');

    const nestedTable2: DataTable = DataTableFactory.of(nestedTableFormat);
    const nestedRecord21: DataRecord = nestedTable2.addRecord();
    nestedRecord21.addString('aaa2');
    const nestedRecord22: DataRecord = nestedTable2.addRecord();
    nestedRecord22.addString('bbb2');

    const record1: DataRecord = mainTable.addRecord();
    record1.addDataTable(nestedTable1);
    const record2: DataRecord = mainTable.addRecord();
    record2.addDataTable(nestedTable2);

    const encoded: string = mainTable.encodeWithSeparators(false);

    const decoded: DataTable = DataTableFactory.createAndDecode(encoded, new ClassicEncodingSettings(ExpressionUtils.useVisibleSeparators(encoded)), true);

    expect(mainTable.equals(decoded)).toBeTruthy();
  });

  it('testEncodingOfNestedTableWithDefaultValue', () => {
    const tableFormat: TableFormat = new TableFormat(1, 1);

    const ff: FieldFormat<any> = FieldFormatFactory.createType('DATATABLE_FIELD', FieldConstants.DATATABLE_FIELD);

    const nestedTableFormat: TableFormat = FieldFormatFactory.createType('STRING_FIELD', FieldConstants.STRING_FIELD).wrap();
    const nestedTable: DataTable = DataTableFactory.of(nestedTableFormat);
    const nestedRecord: DataRecord = nestedTable.addRecord();
    nestedRecord.addString('aaa1');

    ff.setDefault(nestedTable);

    tableFormat.addField(ff);

    const mainTable: DataTable = DataTableFactory.of(tableFormat);

    const nestedTable2: DataTable = DataTableFactory.of(nestedTableFormat);
    const nestedRecord21: DataRecord = nestedTable2.addRecord();
    nestedRecord21.addString('aaa2');
    const nestedRecord22: DataRecord = nestedTable2.addRecord();
    nestedRecord22.addString('bbb2');

    const record1: DataRecord = mainTable.addRecord();
    record1.addDataTable(nestedTable2);

    const encoded: string = mainTable.encodeWithSeparators(false);

    const decoded: DataTable = DataTableFactory.createAndDecode(encoded, new ClassicEncodingSettings(ExpressionUtils.useVisibleSeparators(encoded)), true);

    expect(mainTable.equals(decoded)).toBeTruthy();
  });

  it('testPutDataTableInItself', () => {
    const tf: TableFormat = new TableFormat(1, 1);
    tf.addField('<str><S>');
    tf.addField('<int><I>');
    tf.addField('<float><F>');
    tf.addField('<datatable><T>');
    tf.addField('<date><D>');
    const dt: DataTable = DataTableFactory.of(tf, true);
    dt.rec().setValue(0, 'str');
    dt.rec().setValue(1, 1);
    dt.rec().setValue(2, 2);
    dt.rec().setValue(4, new Date());
    const expected: DataTable = dt.clone();
    dt.rec().setValue(3, dt);

    expect(expected.equals(dt.rec().getValue('datatable'))).toBeTruthy();
  });
});
