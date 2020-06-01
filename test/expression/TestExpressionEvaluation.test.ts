import Evaluator from '../../src/expression/Evaluator';
import Expression from '../../src/expression/Expression';
import CommonsFixture from '../tests/CommonsFixture';
import Quality from '../../src/util/Quality';

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
    }).toThrow("Error evaluating expression ''''': Error parsing expression ''''': Error on line: 1 column: 2 message: extraneous input ''' expecting <EOF>");
    expect(ev.evaluate(new Expression('"\'"'))).toBe("'");
    expect(ev.evaluate(new Expression('"\\\'"'))).toBe("'");
    expect(ev.evaluate(new Expression('"\\""'))).toBe('"');
    expect(() => {
      ev.evaluate(new Expression('"""'));
    }).toThrow('Error evaluating expression \'"""\': Error parsing expression \'"""\': Error on line: 1 column: 2 message: extraneous input \'"\' expecting <EOF>');
  });

  it('testOperators', () => {
    expect(Math.abs(ev.evaluate(new Expression('5-7.2')) + 2.2) < 0.000001).toBeTruthy();
    expect(ev.evaluate(new Expression('1 | 2'))).toBe(3);
    expect(ev.evaluate(new Expression('1 & 3'))).toBe(1);
    expect(ev.evaluate(new Expression('false ? {test} : 123'))).toBe(123);
    expect(ev.evaluate(new Expression('true ? 5 : now()'))).toBe(5);

    expect(ev.evaluate(new Expression('integer(-128) >> integer(2)'))).toBe(-32);
    expect(ev.evaluate(new Expression('integer(-128) >>> integer(2)'))).toBe(1073741792);
    // expect(ev.evaluate(new Expression("5 << 50"))).toBe(5629499534213120);
    // expect(ev.evaluate(new Expression("5629499534213120 >> 50"))).toBe(5);
  });

  it('testReferenceResolving', () => {
    expect(ev.evaluate(new Expression('{int[3]}'))).toBe(444);
  });

  it('testComments', () => {
    expect(ev.evaluate(new Expression('/*start comment*/1 + /*%^//$internal comment*&#*/ 2 + //end line comment\n 3 + 4/*end comment*/\n+5//abracadabra'))).toBe(15);
    expect(ev.evaluate(new Expression("'/*not a comment*/'/*a comment*/"))).toBe('/*not a comment*/');
  });

  it('testCommentsOnly', () => {
    expect(ev.evaluate(new Expression('//2+2'))).toBeNull();
    expect(ev.evaluate(new Expression('/*{.:}*/'))).toBeNull();
    expect(ev.evaluate(new Expression('//comment1 /*comment2*/'))).toBeNull();
  });

  it('testAttributedEvaluation', () => {
    ev.getDefaultResolver().getDefaultTable()?.setQuality(Quality.GOOD_NON_SPECIFIC);
    ev.getDefaultResolver().getDefaultTable()?.setTimestamp(new Date());

    const result = ev.evaluateAttributed(new Expression('({int} * 2) + 1'));
    expect(result.getQuality()).toBe(Quality.GOOD_NON_SPECIFIC);
  });
});
