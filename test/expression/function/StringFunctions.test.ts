import Evaluator from '../../../src/expression/Evaluator';
import GroupsFunction from '../../../src/expression/function/other/GroupsFunction';
import IsDigitFunction from '../../../src/expression/function/string/IsDigitFunction';
import SplitFunction from '../../../src/expression/function/string/SplitFunction';
import DataTable from '../../../src/datatable/DataTable';
import UrlDecodeFunction from '../../../src/expression/function/string/UrlDecodeFunction';
import UrlEncodeFunction from '../../../src/expression/function/string/UrlEncodeFunction';
import DataBlockFunction from '../../../src/expression/function/string/DataBlockFunction';
import TrimFunction from '../../../src/expression/function/string/TrimFunction';
import EvaluationEnvironment from '../../../src/expression/EvaluationEnvironment';
import ToUpperCaseFunction from '../../../src/expression/function/string/ToUpperCaseFunction';
import ToLowerCaseFunction from '../../../src/expression/function/string/ToLowerCaseFunction';
import SubstringFunction from '../../../src/expression/function/string/SubstringFunction';
import StartsWithFunction from '../../../src/expression/function/string/StartsWithFunction';
import EndsWithFunction from '../../../src/expression/function/string/EndsWithFunction';
import ReplaceFunction from '../../../src/expression/function/string/ReplaceFunction';
import LengthFunction from '../../../src/expression/function/string/LengthFunction';
import LastIndexOfFunction from '../../../src/expression/function/string/LastIndexOfFunction';
import IsWhitespaceFunction from '../../../src/expression/function/string/IsWhitespaceFunction';
import IsUpperCaseFunction from '../../../src/expression/function/string/IsUpperCaseFunction';
import IsLowerCaseFunction from '../../../src/expression/function/string/IsLowerCaseFunction';
import IsLetterFunction from '../../../src/expression/function/string/IsLetterFunction';
import IndexOfFunction from '../../../src/expression/function/string/IndexOfFunction';
import ContainsFunction from '../../../src/expression/function/string/ContainsFunction';
import CommonsFixture from '../../tests/CommonsFixture';

const evaluationEnvironment = new EvaluationEnvironment();
const ev = CommonsFixture.createTestEvaluator();

describe('TestStringFunctions', () => {
  it('testGroupsFunction', () => {
    const ev: Evaluator = new Evaluator();
    const res = new GroupsFunction().execute(ev, evaluationEnvironment, ['Testing123Testing', '^[a-zA-Z]+([0-9]+).*']);
    expect(res).toBe('123');
  });

  it('testCharacterFunction', () => {
    const ev: Evaluator = new Evaluator();
    let res = new IsDigitFunction().execute(ev, evaluationEnvironment, '5blabla');
    expect(res).toBeTruthy();

    res = new IsDigitFunction().execute(ev, evaluationEnvironment, 'blabla');
    expect(res).toBeFalsy();
  });

  it('testSplitFunction', () => {
    const data = "It's a simple string";
    const regex = ' ';
    const result: DataTable = new SplitFunction().execute(ev, evaluationEnvironment, [data, regex]);

    expect(result).not.toBeNull();
    expect(result.getRecordCount()).toBe(4);
  });

  it('testUrlDecodeFunction', () => {
    const url = 'https%3A%2F%2Fmywebsite%2Fdocs%2Fenglish%2Fsite%2Fmybook.do%3Frequest_type';
    const expected = 'https://mywebsite/docs/english/site/mybook.do?request_type';
    const result = new UrlDecodeFunction().execute(ev, evaluationEnvironment, [url, 'UTF-8']);

    expect(result).toBe(expected);
  });

  it('testUrlEncodeFunction', () => {
    const url = 'https://mywebsite/docs/english/site/mybook.do?request_type';
    const expected = 'https%3A%2F%2Fmywebsite%2Fdocs%2Fenglish%2Fsite%2Fmybook.do%3Frequest_type';
    const result = new UrlEncodeFunction().execute(ev, evaluationEnvironment, [url, 'UTF-8']);

    expect(result).toBe(expected);
  });

  it('testDataBlockFunction', () => {
    const dataForEncode = 'String for encode';
    const expected = '0/\u001A/\u001A/-1/17/String for encode';
    const result = new DataBlockFunction().execute(ev, evaluationEnvironment, [dataForEncode, 'utf8']);

    expect(result).toBe(expected);
  });
  it('testTrimFunction', () => {
    const result = new TrimFunction().execute(ev, evaluationEnvironment, ['   foo  ']);
    expect(result).toBe('foo');
  });
  it('testToUpperCaseFunction', () => {
    const result = new ToUpperCaseFunction().execute(ev, evaluationEnvironment, ['abc']);
    expect(result).toBe('ABC');
  });
  it('testToLowerCaseFunction', () => {
    const result = new ToLowerCaseFunction().execute(ev, evaluationEnvironment, ['ABC']);
    expect(result).toBe('abc');
  });
  it('testSubstringFunction', () => {
    expect(new SubstringFunction().execute(ev, evaluationEnvironment, ['abcstring', 3])).toBe('string');
    expect(new SubstringFunction().execute(ev, evaluationEnvironment, ['abcstring', 1, 5])).toBe('bcst');
  });
  it('testStartsWithFunction', () => {
    const result = new StartsWithFunction().execute(ev, evaluationEnvironment, ['foo', 'f']);
    expect(result).toBeTruthy();
  });
  it('testEndsWithFunction', () => {
    const result = new EndsWithFunction().execute(ev, evaluationEnvironment, ['foo', 'o']);
    expect(result).toBeTruthy();
  });
  it('testReplaceFunction', () => {
    const result = new ReplaceFunction().execute(ev, evaluationEnvironment, ['foobar', 'foo', 'bar']);
    expect(result).toBe('barbar');
  });
  it('testLengthFunction', () => {
    const result = new LengthFunction().execute(ev, evaluationEnvironment, ['foobar']);
    expect(result).toBe(6);
  });
  it('testLastIndexOfFunction', () => {
    const result = new LastIndexOfFunction().execute(ev, evaluationEnvironment, ['foobar', 'o']);
    expect(result).toBe(2);
  });
  it('testIsWhitespaceFunction', () => {
    const result = new IsWhitespaceFunction().execute(ev, evaluationEnvironment, [' foobar']);
    expect(result).toBeTruthy();
  });
  it('testIsUpperCaseFunction', () => {
    expect(new IsUpperCaseFunction().execute(ev, evaluationEnvironment, ['Foo'])).toBeTruthy();
    expect(new IsUpperCaseFunction().execute(ev, evaluationEnvironment, [' Foo'])).toBeFalsy();
  });
  it('testIsLowerCaseFunction', () => {
    expect(new IsLowerCaseFunction().execute(ev, evaluationEnvironment, ['foo'])).toBeTruthy();
    expect(new IsLowerCaseFunction().execute(ev, evaluationEnvironment, [' foo'])).toBeFalsy();
  });
  it('testIsLetterFunction', () => {
    expect(new IsLetterFunction().execute(ev, evaluationEnvironment, ['12d'])).toBeFalsy();
    expect(new IsLetterFunction().execute(ev, evaluationEnvironment, ['f2d'])).toBeTruthy();
  });
  it('testIndexOfFunction', () => {
    expect(new IndexOfFunction().execute(ev, evaluationEnvironment, ['fffssd', 's'])).toBe(3);
  });
  it('testContainsFunction', () => {
    expect(new ContainsFunction().execute(ev, evaluationEnvironment, ['string2fsstring', '2fs'])).toBeTruthy();
  });
});
