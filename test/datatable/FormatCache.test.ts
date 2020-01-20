import TableFormat from '../../src/datatable/TableFormat';
import ClassicEncodingSettings from '../../src/datatable/encoding/ClassicEncodingSettings';
import FormatCache from '../../src/datatable/encoding/FormatCache';

const format1 = '<<value><I><F=><A=0>><M=1><X=1>';
const format2 = '<<value><I><F=><A=0><D=>><M=1><X=1>';

describe('TestFormatCache', () => {
  it('testServerFormatCache', () => {return new Promise(done => {
    const f1: TableFormat = TableFormat.createWithFormatAndSettings(format1, new ClassicEncodingSettings(true));

    const f2: TableFormat = TableFormat.createWithFormatAndSettings(format2, new ClassicEncodingSettings(true));

    const fc: FormatCache = new FormatCache('test');

    let id: number = fc.add(f1);

    expect(0 === id).toBeTruthy();

    id = fc.add(f2);

    expect(1 === id).toBeTruthy();

    fc.get(0).then(result => {
      expect(f1 == result).toBeTruthy();
      done();
    });

    fc.get(1).then(result => {
      expect(f2 == result).toBeTruthy();
      done();
    });

    const newf1: TableFormat = TableFormat.createWithFormatAndSettings(format1, new ClassicEncodingSettings(true));

    let res = fc.getCachedVersion(newf1) as TableFormat;

    expect(f1 == res).toBeTruthy();

    const newf2: TableFormat = TableFormat.createWithFormatAndSettings(format2, new ClassicEncodingSettings(true));

    res = fc.getCachedVersion(newf2) as TableFormat;

    expect(res == f2).toBeTruthy();
  })});

  it('testClientFormatCache', () => {return new Promise(done => {
    const f1: TableFormat = TableFormat.createWithFormatAndSettings(format1, new ClassicEncodingSettings(true));

    const f2: TableFormat = TableFormat.createWithFormatAndSettings(format2, new ClassicEncodingSettings(true));

    const fc: FormatCache = new FormatCache('test');

    fc.put(123, f1);

    fc.get(123).then(result => {
      expect(f1 == result).toBeTruthy();
      done();
    });

    const id: number = fc.getId(f1) as number;

    expect(123 === id).toBeTruthy();

    fc.put(456, f1);
    fc.put(456, f2);

    fc.get(456).then(result => {
      expect(f2 .equals(result)).toBeTruthy();
      done();
    });
  })});
});
