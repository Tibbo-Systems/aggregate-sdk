import TableFormat from '../../src/datatable/TableFormat';
import ClassicEncodingSettings from '../../src/datatable/encoding/ClassicEncodingSettings';
import FormatCache from '../../src/datatable/encoding/FormatCache';

const format1 = '<<value><I><F=><A=0>><M=1><X=1>';
const format2 = '<<value><I><F=><A=0><D=>><M=1><X=1>';

describe('TestFormatCache', () => {
  it('testServerFormatCache', () => {
    const f1: TableFormat = TableFormat.createWithFormatAndSettings(format1, new ClassicEncodingSettings(true));

    const f2: TableFormat = TableFormat.createWithFormatAndSettings(format2, new ClassicEncodingSettings(true));

    const fc: FormatCache = new FormatCache('test');

    let id: number = fc.add(f1);

    expect(0 === id).toBeTruthy();

    id = fc.add(f2);

    expect(1 === id).toBeTruthy();

    expect(f1.equals(fc.get(0))).toBeTruthy();

    expect(f2.equals(fc.get(1))).toBeTruthy();

    const newf1: TableFormat = TableFormat.createWithFormatAndSettings(format1, new ClassicEncodingSettings(true));

    let res = fc.getCachedVersion(newf1) as TableFormat;

    expect(f1.equals(res)).toBeTruthy();

    const newf2: TableFormat = TableFormat.createWithFormatAndSettings(format2, new ClassicEncodingSettings(true));

    res = fc.getCachedVersion(newf2) as TableFormat;

    expect(res.equals(f2)).toBeTruthy();
  });

  it('testClientFormatCache', () => {
    const f1: TableFormat = TableFormat.createWithFormatAndSettings(format1, new ClassicEncodingSettings(true));

    const f2: TableFormat = TableFormat.createWithFormatAndSettings(format2, new ClassicEncodingSettings(true));

    const fc: FormatCache = new FormatCache('test');

    fc.put(123, f1);

    expect(f1.equals(fc.get(123))).toBeTruthy();

    //  const id: number = fc.getId(f1) as number;

    //  expect(123 === id).toBeTruthy(); disable reverse cache

    fc.put(456, f1);
    fc.put(456, f2);

    expect(f2.equals(fc.get(456))).toBeTruthy();
  });
});
