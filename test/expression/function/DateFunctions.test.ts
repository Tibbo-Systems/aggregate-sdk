import DateAddFunction from '../../../src/expression/function/date/DateAddFunction';
import CommonsFixture from '../../tests/CommonsFixture';
import TimeHelper from '../../../src/util/TimeHelper';
import DateCreateFunction from '../../../src/expression/function/date/DateCreateFunction';
import DateDiffFunction from '../../../src/expression/function/date/DateDiffFunction';
import DateFieldFunction from '../../../src/expression/function/date/DateFieldFunction';
import TimeFunction from '../../../src/expression/function/date/TimeFunction';
import PrintPeriodFunction from '../../../src/expression/function/date/PrintPeriodFunction';
import ParseDateFunction from '../../../src/expression/function/date/ParseDateFunction';
import FormatDateFunction from '../../../src/expression/function/date/FormatDateFunction';
import NewDateFunction from '../../../src/expression/function/date/NewDateFunction';
import EvaluationEnvironment from '../../../src/expression/EvaluationEnvironment';

describe('TestDateFunctions', () => {
  const ts = 'Australia/Sydney';
  const year = 2014;
  const month = 9;
  const day = 18;
  const hour = 14;
  const minutes = 55;
  const seconds = 0;
  it('testDateCreateFunction', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const environment = new EvaluationEnvironment();
    const res = new DateCreateFunction().execute(ev, environment, [year, month, day, hour, minutes, seconds]);
    expect(new Date(res).getHours()).toBe(hour);
  });
  it('testDataCreateFunctionWithLongParameter', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const environment = new EvaluationEnvironment();
    const res = new DateCreateFunction().execute(ev, environment, [year, month, day, hour, minutes, seconds, 0, ts]);
    expect(new Date(res).getHours()).toBe(hour + 7);
  });

  it('testDateAddFunction', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const environment = new EvaluationEnvironment();
    const date = new Date(1413629700243);
    const res = new DateAddFunction().execute(ev, environment, [date.getTime(), 2, TimeHelper.NAME_HOUR]);
    date.setHours(date.getHours() + 2);
    expect(res.getHours()).toBe(date.getHours());
  });
  it('testDateDiffFunction', () => {
    const firstDate = new Date();
    const secondDate = new Date();
    const ev = CommonsFixture.createTestEvaluator();
    const environment = new EvaluationEnvironment();
    secondDate.setDate(secondDate.getDate() + 1);
    const diff = new DateDiffFunction().execute(ev, environment, [firstDate, secondDate, TimeHelper.NAME_SECOND]);
    expect(diff).toBe(TimeHelper.DAY_IN_SECONDS);
  });
  it('testDateFunction', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const environment = new EvaluationEnvironment();
    const date = new Date(1413629700243);
    const y = new DateFieldFunction(TimeHelper.CALENDAR_YEAR).execute(ev, environment, [date.getTime()]);
    const h = new DateFieldFunction(TimeHelper.CALENDAR_HOUR).execute(ev, environment, [date.getTime()]);
    const hoursSyndeyTimeZone = new DateFieldFunction(TimeHelper.CALENDAR_HOUR).execute(ev, environment, [date.getTime(), ts]);
    expect(y).toBe(year);
    expect(h).toBe(hour);
    expect(hoursSyndeyTimeZone).toBe(hour + 7);
  });
  it('testTimeFunction', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const environment = new EvaluationEnvironment();
    const date = new Date();
    const ms = new Date().getTime();
    const result = new TimeFunction().execute(ev, environment, [date]);
    expect(result).toBe(ms);
  });
  it('testPrintPeriodFunction', () => {
    const period = 1000;
    const expected = '1 Seconds';
    const ev = CommonsFixture.createTestEvaluator();
    const environment = new EvaluationEnvironment();
    const result = new PrintPeriodFunction().execute(ev, environment, [period]);
    expect(result).toBe(expected);
  });
  it('testNewDateFunction', () => {
    const expected = new Date();
    const ev = CommonsFixture.createTestEvaluator();
    const environment = new EvaluationEnvironment();
    const result = new NewDateFunction().execute(ev, environment, []);
    expect(result.getFullYear()).toBe(expected.getFullYear());
    expect(result.getMonth()).toBe(expected.getMonth());
    expect(result.getDate()).toBe(expected.getDate());
    expect(result.getHours()).toBe(expected.getHours());
    expect(result.getMinutes()).toBe(expected.getMinutes());
  });
  it('testPrintPeriodFunctionWithTimeUnits', () => {
    const period = 1000;
    const expected = '1 Seconds';
    const ev = CommonsFixture.createTestEvaluator();
    const environment = new EvaluationEnvironment();
    const result = new PrintPeriodFunction().execute(ev, environment, [period, '1', '4']);
    expect(result).toBe(expected);
  });
  it('testCharacterFunction', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const environment = new EvaluationEnvironment();
    const result = new ParseDateFunction().execute(ev, environment, ['2011-11-11 11:11:11', 'yyyy-MM-dd HH:mm:ss']);
    expect(result.getFullYear()).toBe(2011);
    expect(result.getMonth()).toBe(10);
    expect(result.getDate()).toBe(11);
    expect(result.getHours()).toBe(11);
    expect(result.getMinutes()).toBe(11);
    expect(result.getSeconds()).toBe(11);
  });
  it('testCalendarFunctionWithTimeZone', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const environment = new EvaluationEnvironment();
    const result = new ParseDateFunction().execute(ev, environment, ['2011-11-11 11:11:11', 'yyyy-MM-DD HH:mm:ss', ts]);
    expect(result.getHours()).toBe(18);
  });
  it('testFormatDateFunction', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const environment = new EvaluationEnvironment();
    const pattern = 'yyyy.MM.dd HH:mm:ss';
    const date = new Date(1413629700243);
    const result = new FormatDateFunction().execute(ev, environment, [date, pattern]);
    const expected = '2014.10.18 14:55:00';
    expect(result).toBe(expected);
  });
  it('testFormatDateFunctionWithEmptyParams', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const environment = new EvaluationEnvironment();
    const result = new FormatDateFunction().execute(ev, environment, [0, '', '']);
    expect(result).toBe('');
  });
});
