import Evaluator from '../../../src/expression/Evaluator';
import GroupsFunction from '../../../src/expression/functions/other/GroupsFunction';
import IsDigitFunction from '../../../src/expression/functions/string/IsDigitFunction';
import SplitFunction from '../../../src/expression/functions/string/SplitFunction';
import DataTable from '../../../src/datatable/DataTable';
import UrlDecodeFunction from '../../../src/expression/functions/string/UrlDecodeFunction';
import UrlEncodeFunction from '../../../src/expression/functions/string/UrlEncodeFunction';
import DataBlockFunction from '../../../src/expression/functions/string/DataBlockFunction';
import EvaluationEnvironment from '../../../src/expression/EvaluationEnvironment';

const evaluationEnvironment = new EvaluationEnvironment();

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
    const result: DataTable = new SplitFunction().execute(null, evaluationEnvironment, [data, regex]);

    expect(result).not.toBeNull();
    expect(result.getRecordCount()).toBe(4);
  });

  it('testUrlDecodeFunction', () => {
    const url = 'https%3A%2F%2Fmywebsite%2Fdocs%2Fenglish%2Fsite%2Fmybook.do%3Frequest_type';
    const expected = 'https://mywebsite/docs/english/site/mybook.do?request_type';
    const result = new UrlDecodeFunction().execute(null, evaluationEnvironment, [url, 'UTF-8']);

    expect(result).toBe(expected);
  });

  it('testUrlEncodeFunction', () => {
    const url = 'https://mywebsite/docs/english/site/mybook.do?request_type';
    const expected = 'https%3A%2F%2Fmywebsite%2Fdocs%2Fenglish%2Fsite%2Fmybook.do%3Frequest_type';
    const result = new UrlEncodeFunction().execute(null, evaluationEnvironment, [url, 'UTF-8']);

    expect(result).toBe(expected);
  });

  it('testDataBlockFunction', () => {
    const dataForEncode = 'String for encode';
    const expected = '0/\u001A/\u001A/-1/17/String for encode';
    const result = new DataBlockFunction().execute(null, evaluationEnvironment, [dataForEncode, 'utf8']);

    expect(result).toBe(expected);
  });
});
