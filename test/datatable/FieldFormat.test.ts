import FieldFormat from '../../src/datatable/FieldFormat';
import ClassicEncodingSettings from '../../src/datatable/encoding/ClassicEncodingSettings';
import LimitsValidator from '../../src/datatable/validator/LimitsValidator';
import TableFormat from '../../src/datatable/TableFormat';
import KeyFieldsValidator from '../../src/datatable/validator/KeyFieldsValidator';
import TableKeyFieldsValidator from '../../src/datatable/validator/TableKeyFieldsValidator';
import FieldFormatFactory from '../../src/datatable/FieldFormatFactory';

describe('TestFieldFormat', () => {
  it('testFieldFormat', () => {
    let ff1 = FieldFormatFactory.create('<s1><S><F=N><D=Test>');
    let ff2 = FieldFormatFactory.create('<s1><S><D=Test>');

    expect(ff1.extend(ff2)).toBeTruthy();
  });

  it('testDefaultValue', () => {
    let ff1 = FieldFormatFactory.create('<s1><F><A=123.456>');
    expect(Math.abs(123.456 - Number(ff1.getDefaultValue())) < 0.0000000000001).toBeTruthy();
  });

  // TODO TransferEncodingHelper.DIRECT doesn't work as it have to
  it('testClone', () => {
    const format: string = '<s1><S><F=N><A=default><D=Test><S=<desc=default><desc2=val2>><V=<L=1 10>>';
    const ff: FieldFormat<any> = FieldFormatFactory.create(format);
    const cl: FieldFormat<any> = ff.clone();

    expect(format).toBe(cl.encode(new ClassicEncodingSettings(true)));
  });

  it('testDefaultDescription', () => {
    const ff: FieldFormat<any> = FieldFormatFactory.create('<theBigValue><S>');

    expect('The Big Value').toBe(ff.getDescription());
  });

  it('testFloatStorage', () => {
    const ff: FieldFormat<any> = FieldFormatFactory.create('<s1><F>');
    const float: number = 12345678901234567890.1234567890123456789;

    expect(float).toBe(ff.valueFromString(ff.valueToString(float), null, false));
  });

  it('testDoubleStorage', () => {
    const ff: FieldFormat<any> = FieldFormatFactory.create('<s1><E>');
    const double: number = 12345678901234567890.1234567890123456789;

    expect(double).toBe(ff.valueFromString(ff.valueToString(double), null, false));
  });

  // TODO decide how to implement hashCode
  // it("testHashCodesAreEqual", () => {
  //     const ff1: FieldFormat<any> = FieldFormat.create("<value><E><A=0.0>");
  //     const ff2: FieldFormat<any> = FieldFormat.create("<value><E><A=0.0>");
  //
  //     const m = new Map();
  //     m.set(ff1, 1);
  //     m.set(ff2, 2);
  //
  //     expect(m.size).toBe(1);
  //     // expect(ff1.getDefaultValue().hashCode()).toBe(ff2.getDefaultValue().hashCode());
  //
  //     // expect(ff1.hashCode()).toBe(ff2.hashCode());
  // });

  // it("testHashCodesDiffer", () => {
  //     const ff1: FieldFormat<any> = FieldFormat.create("<value><E><A=0.0>");
  //     const ff2: FieldFormat<any> = FieldFormat.create("<value><E><A=0.0>");
  //
  //     expect(ff1.hashCode()).toBe(ff2.hashCode());
  // });

  it('testEquals', () => {
    const ff1: FieldFormat<any> = FieldFormatFactory.create('<value><I><A=0>');
    ff1.addValidator(new LimitsValidator(5, 10));

    const tf1: TableFormat = ff1.wrap();
    tf1.addRecordValidator(new KeyFieldsValidator());
    tf1.addTableValidator(new TableKeyFieldsValidator());

    const ff2: FieldFormat<any> = FieldFormatFactory.create('<value><I><A=0>');
    ff2.addValidator(new LimitsValidator(5, 10));

    const tf2: TableFormat = ff2.wrap();
    tf2.addRecordValidator(new KeyFieldsValidator());
    tf2.addTableValidator(new TableKeyFieldsValidator());

    expect(tf1.equals(tf2)).toBeTruthy();
    // TODO decide how to implement hashCode
    // expect(tf1.hashCode()).toBe(tf2.hashCode());
  });
});
