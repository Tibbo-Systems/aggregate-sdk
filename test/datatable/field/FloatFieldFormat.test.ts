import FieldFormat from '../../../src/datatable/FieldFormat';
import FieldFormatFactory from '../../../src/datatable/FieldFormatFactory';
import FieldConstants from '../../../src/datatable/field/FieldConstants';
import ClassicEncodingSettings from '../../../src/datatable/encoding/ClassicEncodingSettings';

describe('test FloatFieldFormat', () => {
  const ff: FieldFormat<any> = FieldFormatFactory.createType('test', FieldConstants.FLOAT_FIELD);
  const defaultValue = 0.0;
  const stringValue = '3.4028235E38f';
  const stringMinValue = '1.17549435E-38f';
  const numberValue = 3.4028235e38;
  const numberMinValue = 1.17549435e-38;
  const emptyStringValue = '';
  const encodingSetting = new ClassicEncodingSettings(false);

  it('test valueFromString method', () => {
    expect(ff.valueFromString(null, encodingSetting, false)).toBe(0);
    expect(ff.valueFromString(emptyStringValue, encodingSetting, false)).toBe(defaultValue);
    expect(ff.valueFromString(stringValue, encodingSetting, false)).toBe(numberValue);
    expect(ff.valueFromString(stringMinValue, encodingSetting, false)).toBe(numberMinValue);
  });

  it('test valueToString method', () => {
    expect(ff.valueToString(ff.valueFromString(stringValue, encodingSetting, false))).toBe(stringValue);
    expect(ff.valueToString(ff.valueFromString(stringMinValue, encodingSetting, false))).toBe(stringMinValue);
  });

  it('test getType method', () => {
    expect(ff.getType()).toBe(FieldConstants.FLOAT_FIELD);
  });

  it('test getNotNullDefault method', () => {
    expect(ff.getNotNullDefault()).toBe(defaultValue);
  });

  it('test getSuitableEditors method', () => {
    expect(ff.getSuitableEditors()).toStrictEqual([FieldConstants.EDITOR_LIST, FieldConstants.EDITOR_BAR, FieldConstants.EDITOR_BYTES, FieldConstants.EDITOR_INSTANCE]);
  });

  it('test isAssignableFrom method', () => {
    expect(ff.isAssignableFrom(stringValue)).toBeFalsy();
    expect(ff.isAssignableFrom(numberValue)).toBeTruthy();
  });
});
