import LimitsValidator from '../../../src/datatable/validator/LimitsValidator';
import JSBI from 'jsbi';

describe('TestLimitValidator', () => {
  it('testValidateNumber', () => {
    const min = 20;
    const max = 30;
    const validator = new LimitsValidator(min, max);
    expect(() => validator.validate(null, null, null, 19)).toThrow();
    expect(validator.validate(null, null, null, 20)).toEqual(20);
    expect(validator.validate(null, null, null, 25)).toEqual(25);
    expect(validator.validate(null, null, null, 30)).toEqual(30);
    expect(() => validator.validate(null, null, null, 31)).toThrow();
  });

  it('testValidateBigInt', () => {
    const min: JSBI = JSBI.BigInt('53413841384843843403');
    const max: JSBI = JSBI.add(min, JSBI.BigInt('100'));
    const validator = new LimitsValidator(min, max);
    expect(() => validator.validate(null, null, null, JSBI.subtract(min, JSBI.BigInt('1')))).toThrow();
    expect(JSBI.equal(validator.validate(null, null, null, min), min)).toBeTruthy();
    const value: JSBI = JSBI.add(min, JSBI.BigInt('50'));
    expect(JSBI.equal(validator.validate(null, null, null, value), value)).toBeTruthy();
    expect(JSBI.equal(validator.validate(null, null, null, max), max)).toBeTruthy();
    expect(() => validator.validate(null, null, null, JSBI.add(max, JSBI.BigInt('1')))).toThrow();
  });

  it('testValidateEncoding', () => {
    const min: JSBI = JSBI.BigInt('53413841384843843403');
    const max: JSBI = JSBI.add(min, JSBI.BigInt('100'));
    const validator = new LimitsValidator(min, max);
    expect(validator.encode()).toEqual('53413841384843843403 53413841384843843503');
  });
});
