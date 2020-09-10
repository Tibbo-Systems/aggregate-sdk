import FieldFormat from '../../../src/datatable/FieldFormat';
import FieldFormatFactory from '../../../src/datatable/FieldFormatFactory';
import ClassicEncodingSettings from '../../../src/datatable/encoding/ClassicEncodingSettings';
import StringBuilder from '../../../src/util/java/StringBuilder';
import JSBI from 'jsbi';
import LongFieldFormat from '../../../src/datatable/field/LongFieldFormat';
import TableFormat from '../../../src/datatable/TableFormat';
import SimpleDataTable from '../../../src/datatable/SimpleDataTable';
import DataTableFactory from '../../../src/datatable/DataTableFactory';

describe('TestLongFieldFormat', () => {
  it('testValueToAndFromString', () => {
    const ff: FieldFormat<any> = FieldFormatFactory.createType('test', 'L');

    const long: JSBI = JSBI.BigInt(5354135431843451853);

    let nl: JSBI = ff.valueFromString(ff.valueToString(long)) as JSBI;

    expect(JSBI.equal(nl, long)).toBeTruthy();

    const encodedString = ff.valueToEncodedString(long, new ClassicEncodingSettings(false)) as StringBuilder;
    nl = ff.valueFromEncodedString(encodedString.toString(), new ClassicEncodingSettings(false));

    expect(JSBI.equal(nl, long)).toBeTruthy();
  });

  it('testSelectionValues', () => {
    const defValue = '53413841384843843483';
    const ff: FieldFormat<any> = new LongFieldFormat('test');

    ff.setSelectionValues(
      new Map([
        ['53413841384843843483', 'one'],
        ['53413841384843843482', 'two'],
        ['53413841384843843481', 'three'],
      ])
    );

    ff.setDefault(defValue);

    expect(JSBI.equal(ff.getDefaultValue(), JSBI.BigInt(defValue))).toBeTruthy();

    const format: TableFormat = new TableFormat();
    format.addField(ff);
    const table = new SimpleDataTable(format);

    const encodedTable = table.encodeWithSeparators(false);

    const ntable = DataTableFactory.createAndDecode(encodedTable);

    expect(JSBI.equal(ntable.getFormat().getField('test').getDefaultValue(), JSBI.BigInt(defValue))).toBeTruthy();
  });
});
