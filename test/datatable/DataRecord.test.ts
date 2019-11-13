import DataRecord from '../../src/datatable/DataRecord';
import TableFormat from '../../src/datatable/TableFormat';
import ClassicEncodingSettings from '../../src/datatable/encoding/ClassicEncodingSettings';
import FieldFormat from '../../src/datatable/FieldFormat';
import LimitsValidator from '../../src/datatable/validator/LimitsValidator';
import DataTable from '../../src/datatable/DataTable';
import SimpleDataTable from '../../src/datatable/SimpleDataTable';
import DataTableQuery from '../../src/datatable/DataTableQuery';
import QueryCondition from '../../src/datatable/QueryCondition';
import FieldFormatFactory from '../../src/datatable/FieldFormatFactory';

describe('TestDataRecord', () => {
  it('testDataRecord', () => {
    let tableFormat = TableFormat.createWithFormatAndSettings(
      '<<str><S>> <<int><I>> <<bool><B>> <<long><L>>',
      new ClassicEncodingSettings(true)
    );
    let rec: DataRecord = new DataRecord(tableFormat);

    expect(rec.getString('str')).toBe('');
    expect(rec.getInt('int')).toBe(0);
    expect(rec.getBoolean('bool')).toBe(false);
    expect(rec.getInt('long')).toBe(0);

    try {
      rec.addString('ok');
      rec.addString('failure');
      expect(false).toBeTruthy();
    } catch (ex) {}

    try {
      rec.getBoolean('int');
      expect(false).toBeTruthy();
    } catch (ex1) {}

    rec.setValue('long', 80);
    expect(rec.getInt('long')).toBe(80);
    expect(rec.getValue('int')).toBe(0);

    tableFormat = TableFormat.createWithFormatAndSettings(
      '<<str><S><F=N>> <<int><I><F=N>> <<bool><B><F=N>> <<long><L><F=N>>',
      new ClassicEncodingSettings(true)
    );
    rec = new DataRecord(tableFormat);
    expect(null).toBe(rec.getString('str'));
    expect(null).toBe(rec.getValue('int'));
    expect(null).toBe(rec.getValue('bool'));
    expect(null).toBe(rec.getValue('long'));

    tableFormat = TableFormat.createWithFormatAndSettings(
      '<<str><S><F=N><A=duck>> <<int><I><F=N><A=11>> <<bool><B><F=N><A=1>> <<long><L><F=N><A=123>>',
      new ClassicEncodingSettings(true)
    );
    rec = new DataRecord(tableFormat);
    expect('duck').toBe(rec.getString('str'));
    expect(11).toBe(rec.getValue('int'));
    expect(true).toBe(rec.getValue('bool'));
    expect(123).toBe(rec.getValue('long'));

    tableFormat = TableFormat.createWithFormatAndSettings(
      '<<str><S><F=N><A=duck>> <<int><I><F=N><A=11>> <<bool><B><F=N><A=1>> <<long><L><F=N><A=123>>',
      new ClassicEncodingSettings(true)
    );
    let rec2 = new DataRecord(tableFormat);
    expect(rec).toEqual(rec2);

    tableFormat = TableFormat.createWithFormatAndSettings(
      '<<str><S><F=N><A=duck>> <<int><I><F=N><A=11>> <<bool><B><F=N><A=1>>',
      new ClassicEncodingSettings(true)
    );
    rec2 = new DataRecord(tableFormat);
    expect(rec.equals(rec2)).toBeFalsy();

    let ff1: FieldFormat<any> = FieldFormatFactory.createType('test', 'I');
    let rf1: TableFormat = TableFormat.createWithFormat(ff1);
    rec = new DataRecord(rf1);
    rec.addInt(0);

    rf1 = TableFormat.createWithFormatAndSettings(
      '<<str><S><F=N><A=duck>> <<st2><S><F=N>> <<int><I><F=N><A=11>> <<bool><B><F=N><A=1>>',
      new ClassicEncodingSettings(true)
    );
    rec = DataRecord.createAndFill(rf1, 'xx1', null, 4, true);

    expect('xx1').toBe(rec.getString('str'));
    expect(null).toBe(rec.getString('st2'));
    expect(4).toBe(rec.getValue('int'));
    expect(true).toBe(rec.getBoolean('bool'));

    const rf3: TableFormat = TableFormat.createWithFormatAndSettings(
      '<<str><S><F=N><A=duck>> <<int><I><F=N><A=11>> <<bool><B><F=N><A=1>>',
      new ClassicEncodingSettings(true)
    );
    rec = new DataRecord(rf3);

    rec.setValue('int', null);
    expect(null).toBe(rec.getValue('int'));

    rec.setValue('bool', true);
    expect(true).toBe(rec.getValue('bool'));

    tableFormat = TableFormat.createWithFormatAndSettings(
      '<<str><S><F=N><A=duck>> <<int><I><F=N><A=11>> <<bool><B><F=N><A=1>>',
      new ClassicEncodingSettings(true)
    );
    rec = new DataRecord(tableFormat);
    rec.setValue('bool', true);
    expect(true).toBe(rec.getBoolean('bool'));

    ff1 = FieldFormatFactory.create('<val><I>');
    const validators = ff1.getValidators();
    validators !== null ? validators.push(new LimitsValidator(10, 20)) : null;

    rec = new DataRecord(TableFormat.createWithFormat(ff1));

    rec.setValue(0, 15);

    try {
      rec.setValue(0, 5);
      expect(false).toBeTruthy();
    } catch (ex2) {}

    try {
      rec.setValue(0, 25);
      expect(false).toBeTruthy();
    } catch (ex2) {}
  });

  it('testSelect', () => {
    const rf: TableFormat = new TableFormat();
    rf.addField('<str><S>');
    rf.addField('<int><I>');
    rf.addField('<val><S>');
    const dataTable: DataTable = new SimpleDataTable(rf);

    dataTable
      .addRecord()
      .addString('line1')
      .addInt(1)
      .addValue('test1');
    dataTable
      .addRecord()
      .addString('line2')
      .addInt(2)
      .addValue('test2');
    dataTable
      .addRecord()
      .addString('line3')
      .addInt(3)
      .addValue('test3');
    dataTable
      .addRecord()
      .addString('line3')
      .addInt(4)
      .addValue('test4');

    let dataRecord = dataTable.select('str', 'line2');
    expect('test2').toBe(dataRecord !== null ? dataRecord.getString('val') : null);

    const queryCondition1 = new QueryCondition('str', 'line3');
    const queryCondition2 = new QueryCondition('int', 4);
    const dataTableQuery = new DataTableQuery(queryCondition1, queryCondition2);

    dataRecord = dataTable.selectByQuery(dataTableQuery);
    expect('test4').toBe(dataRecord !== null ? dataRecord.getString('val') : null);
  });

  // TODO create this test than hashCode will be implemented
  // public void testHashCodeDataRecord()
  //     {
  //         TableFormat format1 = new TableFormat();
  //         format1.addField("<st><S><F=K>");
  //         format1.getField("<val><I>");
  //
  //         DataTable table1 = new SimpleDataTable(format1);
  //         table1.addRecord().addString("line1").addInt(11);
  //
  //         TableFormat format2 = new TableFormat();
  //         format2.addField("<st><S><F=K>");
  //         format2.getField("<val><I>");
  //
  //         DataTable table2 = new SimpleDataTable(format2);
  //         table2.addRecord().addString("line1").addInt(11);
  //
  //         assertEquals(true, table1.getRecord(0).hashCode() == table2.getRecord(0).hashCode());
  //     }
  it('testEqualsDataRecord', () => {
    const format1: TableFormat = new TableFormat();
    format1.addField('<st><S><F=K>');
    format1.addField('<val><I>');

    const table1: DataTable = new SimpleDataTable(format1);
    table1
      .addRecord()
      .addString('line1')
      .addInt(11);

    const format2: TableFormat = new TableFormat();
    format2.addField('<st><S><F=K>');
    format2.addField('<val><I>');

    const table2: DataTable = new SimpleDataTable(format2);
    table2
      .addRecord()
      .addString('line1')
      .addInt(11);

    expect(true).toBe(table1.getRecord(0).equals(table2.getRecord(0)));
  });
});
