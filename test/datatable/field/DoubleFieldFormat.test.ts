import FieldFormat from '../../../src/datatable/FieldFormat';
import FieldFormatFactory from '../../../src/datatable/FieldFormatFactory';
import FieldConstants from '../../../src/datatable/field/FieldConstants';
import ClassicEncodingSettings from '../../../src/datatable/encoding/ClassicEncodingSettings';

//TODO min positive value in js 5e-324, but in java 4.9E-324 pay attention on it

describe('test DoubleFieldFormat', () => {
  const ff: FieldFormat<any> = FieldFormatFactory.createType('test', FieldConstants.DOUBLE_FIELD);
  const defaultValue = 0.0;
  const stringValue = '1.7976931348623157E308';
  const stringMinValue = '5E-324';
  const numberValue = 1.7976931348623157e308;
  const numberMinValue = 5e-324;
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
    expect(ff.getType()).toBe(FieldConstants.DOUBLE_FIELD);
  });

  it('test getNotNullDefault method', () => {
    expect(ff.getNotNullDefault()).toBe(defaultValue);
  });

  it('test getSuitableEditors method', () => {
    expect(ff.getSuitableEditors()).toStrictEqual([FieldConstants.EDITOR_LIST, FieldConstants.EDITOR_BAR, FieldConstants.EDITOR_INSTANCE]);
  });

  it('test isAssignableFrom method', () => {
    expect(ff.isAssignableFrom(stringValue)).toBeFalsy();
    expect(ff.isAssignableFrom(numberValue)).toBeTruthy();
  });
});
