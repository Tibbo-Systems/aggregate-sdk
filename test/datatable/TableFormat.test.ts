import TableFormat from '../../src/datatable/TableFormat';
import ClassicEncodingSettings from '../../src/datatable/encoding/ClassicEncodingSettings';

class FormatCreator {
  public static createFormat(format: string) {
    return TableFormat.createWithFormatAndSettings(format, new ClassicEncodingSettings(true));
  }
}

describe('TestTableFormant', () => {
  it('testTableFormat', () => {
    let rf1 = FormatCreator.createFormat('<<s1><S>> <<s2><S><i1><I>> <<i2><I>>');
    let rf2 = FormatCreator.createFormat('<<s1><S>> <<s2><S><i1><I>> <<i2><I>>');
    expect(rf1.extend(rf2)).toBeTruthy();

    rf1 = FormatCreator.createFormat('<<s1><S>> <<l1><L>> <<s2><S>> <<i1><I>> <<i2><I>>');
    rf2 = FormatCreator.createFormat('<<s1><S>> <<s2><S>> <<i1><I>> <<i2><I>> <<b1><B><F=O>>');
    expect(rf1.extend(rf2)).toBeTruthy();

    rf1 = FormatCreator.createFormat('<<s1><S>> <<l1><L>> <<s2><S>> <<i1><I>> <<i2><I>>');
    rf2 = FormatCreator.createFormat('<<s1><S>> <<s2><S>> <<i1><I><F=N>> <<i2><I>> <<b1><B><F=O>>');
    expect(rf1.extend(rf2)).toBeFalsy();

    rf1 = FormatCreator.createFormat('<<s1><S>> <<l1><L>> <<s2><S><i1><I>> <<i2><I>>');
    rf2 = FormatCreator.createFormat('<<s1><S>> <<s2><S>> <<i2><I>> <<b1><B><F=O>> <<b2><B>>');
    expect(rf1.extend(rf2)).toBeFalsy();

    rf1 = FormatCreator.createFormat('<<one><S>>');
    rf2 = FormatCreator.createFormat('<<one><I>>');
    expect(rf1.extend(rf2)).toBeFalsy();

    rf1 = FormatCreator.createFormat('<<0><S><A=test><D=test>>');

    expect(rf1.getField(0).isNullable()).toBeFalsy();

    expect(rf1.getField(0).getDefaultValue()).toBe('test');
  });

  it('testEmptyFieldLookup', () => {
    const format: TableFormat = FormatCreator.createFormat('<<one><S>>');
    // Set 'fieldLookup' to 'null' as it happens when import legacy properties
    // ReflectUtils.setPrivateField(format, "fieldLookup", null);
    expect(format.getFieldIndex('one')).toBe(0);
  });
});
