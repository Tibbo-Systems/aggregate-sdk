import Evaluator from '../../src/expression/Evaluator';
import Expression from '../../src/expression/Expression';
import CommonsFixture from '../tests/CommonsFixture';
import Quality from '../../src/util/Quality';

import StubContext from '../tests/StubContext';
import TableFormat from '../../src/datatable/TableFormat';
import FieldFormatFactory from '../../src/datatable/FieldFormatFactory';
import FieldConstants from '../../src/datatable/field/FieldConstants';
import DataTableFactory from '../../src/datatable/DataTableFactory';
import VariableDefinition from '../../src/context/VariableDefinition';

describe('TestExpressionEvaluation', () => {
  const ev: Evaluator = CommonsFixture.createTestEvaluator();
  it('testConstants', () => {
    expect(ev.evaluate(new Expression('0123'))).toBe(83);
    expect(ev.evaluate(new Expression('0xFF'))).toBe(255);
    expect(ev.evaluate(new Expression('0b00000110'))).toBe(6);
    expect(ev.evaluate(new Expression("'тест'"))).toBe('тест');
    expect(ev.evaluate(new Expression('"Unescaping 1: \\\\ "'))).toBe('Unescaping 1: \\ ');
    expect(ev.evaluate(new Expression('"Unescaping 2: \\\\r\\\\n\\\\t"'))).toBe('Unescaping 2: \\r\\n\\t');
    expect(ev.evaluate(new Expression('"System chars: \\r\\n"'))).toBe('System chars: \r\n');
    expect(ev.evaluate(new Expression('"Unicode: \\u0000\\u0123\\uFFFF"'))).toBe('Unicode: \u0000\u0123\uFFFF');
    expect(ev.evaluate(new Expression("'\"'"))).toBe('"');
    expect(ev.evaluate(new Expression("'\\\"'"))).toBe('"');
    expect(ev.evaluate(new Expression("'\\''"))).toBe("'");
    expect(() => {
      ev.evaluate(new Expression("'''"));
    }).toThrow("Error evaluating expression ''''':Error parsing expression ''''': Error on line: 1 column: 2 message: extraneous input ''' expecting <EOF>");
    expect(ev.evaluate(new Expression('"\'"'))).toBe("'");
    expect(ev.evaluate(new Expression('"\\\'"'))).toBe("'");
    expect(ev.evaluate(new Expression('"\\""'))).toBe('"');
    expect(() => {
      ev.evaluate(new Expression('"""'));
    }).toThrow('Error evaluating expression \'"""\':Error parsing expression \'"""\': Error on line: 1 column: 2 message: extraneous input \'"\' expecting <EOF>');
  });

  it('testOperators', () => {
    expect(Math.abs(ev.evaluate(new Expression('5-7.2')) + 2.2) < 0.000001).toBeTruthy();
    expect(ev.evaluate(new Expression('1 | 2'))).toBe(3);
    expect(ev.evaluate(new Expression('1 & 3'))).toBe(1);
    expect(ev.evaluate(new Expression('false ? {test} : 123'))).toBe(123);
    expect(ev.evaluate(new Expression('true ? 5 : now()'))).toBe(5);

    expect(ev.evaluate(new Expression('integer(-128) >> integer(2)'))).toBe(-32);
    expect(ev.evaluate(new Expression('integer(-128) >>> integer(2)'))).toBe(1073741792);
    expect(ev.evaluate(new Expression('5 << 5'))).toBe(160);
    expect(ev.evaluate(new Expression('5629 >> 5'))).toBe(175);

    // expect(ev.evaluate(new Expression('5 << 50'))).toBe(5629499534213120);
    //expect(ev.evaluate(new Expression('5629499534213120 >> 50'))).toBe(5);
  });

  it('testPrecedence', () => {
    expect(ev.evaluate(new Expression('true && !false'))).toBeTruthy();
    expect(ev.evaluate(new Expression('5 > 3 && 1 < 2'))).toBeTruthy();
    expect(ev.evaluate(new Expression('(1 + 1 == 2) ? (5 > 3 && 1 < 2) : (5 == 6)'))).toBeTruthy();
    expect(ev.evaluate(new Expression('1 + 2 << 3 * 4 == (1 + 2) << (3 * 4)'))).toBeTruthy();
  });

  it('testReferenceResolving', async () => {
    expect(await ev.evaluate(new Expression('{int[3]}'))).toBe(444);
    expect(await ev.evaluate(new Expression('string({int[3]})'))).toBe('444');
    expect(await ev.evaluate(new Expression('{#records}'))).toBe(7);
  });

  it('testMathFunctions', () => {
    expect(ev.evaluate(new Expression('abs(-123)'))).toBe(123);
    expect(ev.evaluate(new Expression('max(4, 7)'))).toBe(7);
    expect(ev.evaluate(new Expression('abs(-123.456)')) - 123.456).toBeLessThan(0.0001);
    expect(ev.evaluate(new Expression('lt(4, 5)'))).toBe(true);
    expect(ev.evaluate(new Expression('ge(5, 5)'))).toBe(true);
    expect(ev.evaluate(new Expression('ge(4, 5)'))).toBe(false);
  });

  it('testStringFunctions', () => {
    expect(ev.evaluate(new Expression("substring('abcdef', 1, 4)"))).toBe('bcd');
    expect(ev.evaluate(new Expression("length('test')"))).toBe(4);
    expect(ev.evaluate(new Expression("index('test', 'a')"))).toBe(-1);
    expect(ev.evaluate(new Expression("index('test', 'e')"))).toBe(1);
  });

  //TODO test
  /* it('testDateFunctions', () => {
    expect(ev.evaluate(new Expression('dateDiff(date(2011, 0, 30, 12, 0, 0), date(2011, 1, 4, 12, 0, 0), "day")'))).toBe(5);
    expect(ev.evaluate(new Expression('time(dateAdd(date(2011, 11, 30, 23, 55, 55), 1, "hour")) - time(date(2011, 11, 30, 23, 55, 55))'))).toBeGreaterThan(3580000);
  });*/

  it('testOtherFunctions', () => {
    expect(ev.evaluate(new Expression('integer(3.141592)'))).toBe(3);
  });

  it('testComplexExpressions', () => {
    expect(ev.evaluate(new Expression("'test\\ntest'"))).toBe('test\ntest');
    expect(ev.evaluate(new Expression('false && {test}'))).toBe(false);
    expect(ev.evaluate(new Expression('true || {test}'))).toBe(true);
    expect(ev.evaluate(new Expression("((length('abcde') == 5) && (length('test') == 4)) ? 'xxx' : 'yyy'"))).toBe('xxx');
  });

  //TODO test
  /* it('testDatesAndTimezones', () => {
    expect(ev.evaluate(new Expression('date(2016, 5, 1, 0, 0, 0, "Europe/Moscow")'))).toBe(5);
  });*/

  it('testComments', () => {
    expect(ev.evaluate(new Expression('/*start comment*/1 + /*%^//$internal comment*&#*/ 2 + //end line comment\n 3 + 4/*end comment*/\n+5//abracadabra'))).toBe(15);
    expect(ev.evaluate(new Expression("'/*not a comment*/'/*a comment*/"))).toBe('/*not a comment*/');
  });

  it('testCommentsOnly', () => {
    expect(ev.evaluate(new Expression('//2+2'))).toBeNull();
    expect(ev.evaluate(new Expression('/*{.:}*/'))).toBeNull();
    expect(ev.evaluate(new Expression('//comment1 /*comment2*/'))).toBeNull();
  });

  it('testAttributedEvaluation', async () => {
    ev.getDefaultResolver().getDefaultTable()?.setQuality(Quality.GOOD_NON_SPECIFIC);
    ev.getDefaultResolver().getDefaultTable()?.setTimestamp(new Date());

    const result = await ev.evaluateAttributed(new Expression('({int} * 2) + 1'));
    expect(result.getQuality()).toBe(Quality.GOOD_NON_SPECIFIC);
  });

  it('testBinding', async () => {
    const ev = new Evaluator();

    const stubContext = new StubContext('context');

    const tf = TableFormat.createWithFormat(FieldFormatFactory.createType('test', FieldConstants.INTEGER_FIELD));
    tf.addBinding('test#choices', "table('<<value><I>><<description><S>>', 1, 'one', 2, 'two',3 , 'three')");
    tf.addBinding('test#choices', "table('<<value><I>><<description><S>>', 1, 'one_1', 2, 'two_2',3 , 'three_3')");
    stubContext.addVariableDefinition(new VariableDefinition('test', tf, true, true));

    await stubContext.setVariable('test', DataTableFactory.createWithFirstRecord(tf, 2));

    ev.getDefaultResolver().setDefaultContext(stubContext);

    const result = await ev.evaluate(new Expression('{.:test$test#svdesc}'));

    expect(result).toBe('two_2');
  });
});
