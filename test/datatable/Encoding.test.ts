import DataTable from '../../src/datatable/DataTable';
import DataTableFactory from '../../src/datatable/DataTableFactory';
import TableFormat from '../../src/datatable/TableFormat';
import FieldFormatFactory from '../../src/datatable/FieldFormatFactory';
import FieldConstants from '../../src/datatable/field/FieldConstants';
import ClassicEncodingSettings from '../../src/datatable/encoding/ClassicEncodingSettings';
import DataTableUtils from '../../src/datatable/DataTableUtils';
import TransferEncodingHelper from '../../src/datatable/encoding/TransferEncodingHelper';
import AggreGateCommand from '../../src/protocol/AggreGateCommand';
import FieldFormat from '../../src/datatable/FieldFormat';
import Data from '../../src/data/Data';
import ByteBuffer from 'bytebuffer';
import moment from 'moment';
import DataRecord from '../../src/datatable/DataRecord';
import EditProperties from '../../src/action/command/EditProperties';
import FormatCache from '../../src/datatable/encoding/FormatCache';
import KnownFormatCollector from '../../src/datatable/encoding/KnownFormatCollector';
import AbstractContext from '../../src/context/AbstractContext';

describe('TestEncoding', () => {
  it('testUtfEncoding', () => {
    const s = '\uFFFF\u0000\u0123';

    const st: DataTable = DataTableFactory.createWithFirstRecord(new TableFormat(1, 1, FieldFormatFactory.createType('f', FieldConstants.STRING_FIELD)), s);

    const enc: string = st.encodeWithSeparators(false);

    const dt: DataTable = DataTableFactory.createAndDecode(enc);

    const d: string = dt.rec().getString('f');

    expect(d === s).toBeTruthy();
  });

  it('testSpecialCharacterEncoding', () => {
    let s: string = DataTableUtils.ELEMENT_START + DataTableUtils.ELEMENT_END + DataTableUtils.ELEMENT_NAME_VALUE_SEPARATOR;

    s += TransferEncodingHelper.ESCAPE_CHAR + TransferEncodingHelper.SEPARATOR_CHAR;

    s += AggreGateCommand.CLIENT_COMMAND_SEPARATOR;

    s += String.fromCharCode(AggreGateCommand.START_CHAR) + String.fromCharCode(AggreGateCommand.END_CHAR);

    const st: DataTable = DataTableFactory.createWithFirstRecord(new TableFormat(1, 1, FieldFormatFactory.createType('f', FieldConstants.STRING_FIELD)), s);

    const enc: string = st.encodeWithSeparators(false);

    const dt: DataTable = DataTableFactory.createAndDecode(enc);

    const d: string = dt.rec().getString('f');

    expect(s === d).toBeTruthy();
  });

  it('testNestedTableEncoding', () => {
    const strData = 'test % %% %%% test';

    const tf: TableFormat = new TableFormat();

    const ff: FieldFormat<any> = FieldFormatFactory.createType('strfield', FieldConstants.STRING_FIELD);

    ff.setDefault(strData);

    tf.addField(ff);

    const table: DataTable = DataTableFactory.createWithFirstRecord(tf, strData + 'value');

    let wrapped: DataTable = table;

    for (let i = 0; i < 2; i++) {
      const wtf: TableFormat = new TableFormat();

      const wff: FieldFormat<any> = FieldFormatFactory.createType('dtfield', FieldConstants.DATATABLE_FIELD);

      wff.setDefault(wrapped);

      wtf.addField(wff);

      wrapped = DataTableFactory.createWithFirstRecord(wtf, wrapped);
    }

    const encoded: string = wrapped.encodeWithSeparators(false);

    const restored: DataTable = DataTableFactory.createAndDecode(encoded);

    expect(wrapped.equals(restored)).toBeTruthy();
  });

  it('testHardNestedTableEncoding', () => {
    const tf: TableFormat = FieldFormatFactory.createType('STRING_FIELD', FieldConstants.STRING_FIELD).setDefault('test % %% %%% test').wrap();

    tf.addField(FieldFormatFactory.createType('BOOLEAN_FIELD', FieldConstants.BOOLEAN_FIELD).setDefault(false));
    const dataF: Data = new Data();
    dataF.setData(ByteBuffer.fromUTF8('test data % %% %%%'));
    tf.addField(FieldFormatFactory.createType('DATA_FIELD', FieldConstants.DATA_FIELD).setDefault(dataF));
    tf.addField(FieldFormatFactory.createType('DATE_FIELD', FieldConstants.DATE_FIELD).setDefault(new Date()));

    let wrapped: DataTable = DataTableFactory.of(tf);

    for (let i = 0; i < 1; i++) {
      const wtf: TableFormat = new TableFormat();

      const wff: FieldFormat<any> = FieldFormatFactory.createType('dtfield', FieldConstants.DATATABLE_FIELD);

      wff.setDefault(wrapped);

      wtf.addField(wff);

      wrapped = DataTableFactory.createWithFirstRecord(wtf, wrapped);
    }

    const encoded: string = wrapped.encodeWithSeparators(false);

    const restored: DataTable = DataTableFactory.createAndDecode(encoded);

    expect(wrapped.equals(restored)).toBeTruthy();
  });

  it('testTest', () => {
    const tf: TableFormat = TableFormat.createWithFormatAndSettings('<<int><I>><<string><S>>', new ClassicEncodingSettings(true));
    const table: DataTable = new DataRecord(tf).wrap();

    const encode: string = table.encodeWithSeparators(true);
    expect(encode).toBe('<F=<<int><I><A=0>><<string><S><A=>>><R=<0><>>');
  });

  it('testInnerTable', () => {
    const editData: EditProperties = EditProperties.createEditProperties('t', 'c', ['p1', 'p2']);

    const expectedTable: DataTable = editData.getParameters() as DataTable;

    const settings: ClassicEncodingSettings = new ClassicEncodingSettings(true);
    const encode: string = expectedTable.encodeWithSettings(settings);
    const decodedTable: DataTable = DataTableFactory.createAndDecode(encode, settings, false);

    expect(expectedTable.equals(decodedTable)).toBeTruthy();
  });

  it('testInnerDynamicFormatTable', () => {
    const format: TableFormat = new TableFormat(1, 1, FieldFormatFactory.createType('table', 'T'));
    const dataRecord: DataRecord = new DataRecord(format);
    const recordFormat: FieldFormat<any> = FieldFormatFactory.createWith('int', 'I', 'Int', 777);
    dataRecord.setValue(0, new DataRecord(TableFormat.createWithFormat(recordFormat)).wrap());
    const table: DataTable = dataRecord.wrap();

    const settings: ClassicEncodingSettings = new ClassicEncodingSettings(true);
    settings.setEncodeFormat(false);
    const encodedTable: string = table.encodeWithSettings(settings);

    expect('<R=<<F=<<int><I><A=777><D=Int>>><R=<777>>>>' === encodedTable).toBeTruthy();
  });

  it('testFirstEncoding', () => {
    const tf: TableFormat = new TableFormat(1, 1);
    tf.addFieldWithTypeAndName(FieldConstants.FLOAT_FIELD, 'value');
    tf.addFieldWithTypeAndName(FieldConstants.INTEGER_FIELD, 'quality');

    const nested: DataTable = DataTableFactory.createWithFirstRecord(tf, 12345.67, 123);

    const ces: ClassicEncodingSettings = new ClassicEncodingSettings(true);
    ces.setFormatCache(new FormatCache('test'));
    ces.setKnownFormatCollector(new KnownFormatCollector());

    const table: DataTable = DataTableFactory.createWithFirstRecord(AbstractContext.EF_UPDATED.clone(), 'test', nested, null);

    const encodedTable: string = table.encodeWithSettings(ces);
    const expected: string = '<F=<<variable><S><A=>><<value><T><A=<F=>>><<user><S><F=N><A=<NULL>>>' + '<M=1><X=1>><D=0><R=<test>' + '<<F=<<value><F><A=0.0>>' + '<<quality><I><A=0>><M=1><X=1>><D=1>' + '<R=<12345.67><123>>><<NULL>>>';

    expect(encodedTable === expected).toBeTruthy();
  });

  it('testCachedEncoding', () => {
    const tf: TableFormat = new TableFormat(1, 1);
    tf.addFieldWithTypeAndName(FieldConstants.FLOAT_FIELD, 'value');
    tf.addFieldWithTypeAndName(FieldConstants.INTEGER_FIELD, 'quality');

    const nested: DataTable = DataTableFactory.createWithFirstRecord(tf, 12345.67, 123);

    const ces: ClassicEncodingSettings = new ClassicEncodingSettings(true);
    ces.setFormatCache(new FormatCache('test'));

    ces.setKnownFormatCollector(new KnownFormatCollector());

    const table: DataTable = DataTableFactory.createWithFirstRecord(AbstractContext.EF_UPDATED, 'test', nested, null);

    table.encodeWithSettings(ces);
    const encodedTable: string = table.encodeWithSettings(ces);
    const expected = '<D=0><R=<test><<D=1><R=<12345.67><123>>><<NULL>>>';
    expect(encodedTable === expected).toBeTruthy();
  });

  it('testTimestampAndQualityEncoding', () => {
    const tf: TableFormat = new TableFormat(1, 1);
    tf.addFieldWithTypeAndName(FieldConstants.FLOAT_FIELD, 'value');

    const nested = DataTableFactory.createWithFirstRecord(tf, 12345.67);

    nested.setTimestamp(moment('2000013121', 'YYYYMMDDHH').toDate());
    nested.setQuality(198);

    const ces: ClassicEncodingSettings = new ClassicEncodingSettings(true);
    ces.setEncodeFormat(false);

    nested.encodeWithSettings(ces);
    const encodedTable: string = nested.encodeWithSettings(ces);
    const expected = '<R=<12345.67>><Q=198><T=2000-01-31 21:00:00.000>';
    expect(expected === encodedTable).toBeTruthy();
  });
});
