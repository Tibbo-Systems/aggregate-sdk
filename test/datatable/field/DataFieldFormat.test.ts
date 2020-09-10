import FieldFormat from '../../../src/datatable/FieldFormat';
import FieldFormatFactory from '../../../src/datatable/FieldFormatFactory';
import Data from '../../../src/data/Data';
import ByteBuffer from 'bytebuffer';
import ClassicEncodingSettings from '../../../src/datatable/encoding/ClassicEncodingSettings';
import StringBuilder from '../../../src/util/java/StringBuilder';
import JSBI from 'jsbi';

describe('TestDataFieldFormat', () => {
  it('testValueToAndFromString', () => {
    const ff: FieldFormat<any> = FieldFormatFactory.createType('test', 'A');

    let data: Data = new Data();

    let nd: Data = ff.valueFromString(ff.valueToString(data)) as Data;

    expect(nd.getId()).toBeNull();
    expect(nd.getName()).toBeNull();
    expect(nd.getPreview()).toBeNull();
    expect(nd.getData()).toBeNull();

    data = new Data();

    const preview = '/preview//';
    let originalData = '/data';

    for (let i = 0; i < 250; i++) {
      originalData += i + '';
    }

    data.setId(JSBI.BigInt(123));
    data.setName('name');
    data.setPreview(ByteBuffer.fromUTF8(preview));
    data.setData(ByteBuffer.fromUTF8(originalData));

    const encodedString = ff.valueToEncodedString(data, new ClassicEncodingSettings(false)) as StringBuilder;
    nd = ff.valueFromEncodedString(encodedString.toString(), new ClassicEncodingSettings(false));

    const id = nd.getId();
    expect(id !== null && JSBI.equal(JSBI.BigInt(123), id)).toBeTruthy();
    expect('name' === nd.getName()).toBeTruthy();
    let ndData = nd.getPreview() as ByteBuffer;
    expect(preview === ndData.toUTF8()).toBeTruthy();
    ndData = nd.getData() as ByteBuffer;
    expect(originalData === ndData.toUTF8()).toBeTruthy();
  });
});
