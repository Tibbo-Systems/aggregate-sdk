import RegexValidator from '../../../src/datatable/validator/RegexValidator';

describe('TestRegexValidator', () => {
  it('testConverterJavaRegexpToJs', () => {
    const javaRegexp = '[p{Lower}_0-9p{Lower}]+';
    const result = RegexValidator.convertJavaRegexpToJs(javaRegexp);
    expect(result).toEqual('[a-z_0-9a-z]+');
  });

  it('testValidate', () => {
    const checkRegexpValidation = (javaRegexp: string, correctStr: string, wrongStr: string) => {
      const validator = new RegexValidator(javaRegexp);
      expect(validator.validate(null, null, null, correctStr)).toEqual(correctStr);
      expect(() => validator.validate(null, null, null, wrongStr)).toThrow();
    };

    checkRegexpValidation('[p{Lower}_0-9]+', 'status', 'Status');
  });
});
