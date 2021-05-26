import FieldFormat from '../../../src/datatable/FieldFormat';
import FieldFormatFactory from '../../../src/datatable/FieldFormatFactory';
import FieldConstants from '../../../src/datatable/field/FieldConstants';

describe('test DateFieldFormat', () => {
  const ff: FieldFormat<any> = FieldFormatFactory.createType('test', FieldConstants.DATE_FIELD);
  const dv = '2000-02-01 12:00:00.000';
  it('check valueToString method', () => {
    expect(ff.valueToString(ff.getNotNullDefault())).toBe(dv);
  });
  it('check valueFromString method', () => {
    expect(ff.valueFromString(dv)).toStrictEqual(ff.getNotNullDefault());
  });
  it('check getType method', () => {
    expect(ff.getType()).toBe(FieldConstants.DATE_FIELD);
  });
  it('check getNotNullDefault method', () => {
    expect(ff.getNotNullDefault() instanceof Date).toBeTruthy();
  });
  it('check getSuitableEditors method', () => {
    expect(ff.getSuitableEditors()).toStrictEqual(['list', 'date', 'time']);
  });
  it('check isAssignableFrom method', () => {
    expect(ff.isAssignableFrom(ff.getNotNullDefault())).toBeTruthy();
  });
});
