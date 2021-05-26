import Util from '../../src/util/Util';
import JSBI from 'jsbi';

describe('TestUtil', () => {
  it('testConvertToNumber with hexadecimal dictionary', () => {
    const num = Util.convertToNumber('0xA', true, false);
    expect(num).toBe(10);
  });
  it('testConvertToNumber with zero at the beginning', () => {
    const num = Util.convertToNumber('0101', true, false);
    expect(num).toBe(101);
  });
  it('testConvertToNumber with float', () => {
    const num = Util.convertToNumber('42.23', true, false);
    expect(num).toBe(42.23);
  });
  it('testConvertToNumber with zero', () => {
    const num = Util.convertToNumber('0', true, false);
    expect(num).toBe(0);
  });
  it('testConvertToNumber with negative value', () => {
    const num = Util.convertToNumber('-10', true, false);
    expect(num).toBe(-10);
  });
  it('testConvertToNumber with boolean', () => {
    const num = Util.convertToNumber(true, true, false);
    expect(num).toBe(1);
  });
  it('testConvertToNumber with boolean in string form', () => {
    const num = Util.convertToNumber('true', true, false);
    expect(num).toBe(1);
  });
  it('testConvertToNumber with Exponential notation', () => {
    const floatNumber = Util.convertToNumber('1e-2', true, false);
    const num = Util.convertToNumber('1e+2', true, false);
    expect(floatNumber).toBe(0.01);
    expect(num).toBe(100);
  });
  it('testConvertToLong', () => {
    const num = Util.convertToLong('1234567890098776653', true, false);
    expect(num.toString()).toBe(JSBI.BigInt('1234567890098776653').toString());
  });
});
