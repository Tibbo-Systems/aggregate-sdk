import Evaluator from '../../src/expression/Evaluator';
import Expression from '../../src/expression/Expression';
import AbstractFunction from '../../src/expression/function/AbstractFunction';
import Functions from '../../src/expression/function/Functions';
import EvaluationEnvironment from '../../src/expression/EvaluationEnvironment';
import Cres from '../../src/Cres';
import JSBI from 'jsbi';

describe('TestExpressions', () => {
  const ev: Evaluator = new Evaluator();

  it('testGeExpressionEqualsConditionZero', () => {
    expect(ev.evaluate(new Expression('0 < 0'))).toBeFalsy();
  });

  it('testGeExpressionEqualsConditionZeroTo', () => {
    expect(ev.evaluate(new Expression('0 > 0'))).toBeFalsy();
  });

  it('testGeExpressionEqualsCondition', () => {
    expect(ev.evaluate(new Expression('1 >= 1'))).toBeTruthy();
  });

  it('testGeExpressionLargerCondition', () => {
    expect(ev.evaluate(new Expression('4 >= 2'))).toBeTruthy();
  });

  it('testGeExpressionFalseCondition', () => {
    expect(ev.evaluate(new Expression('4 >= 42'))).toBeFalsy();
  });

  it('testGeExpressionStringCondition', () => {
    expect(ev.evaluate(new Expression('"a" >= "b"'))).toBeFalsy();
  });

  it('testGeExpressionDoubleCondition', () => {
    expect(ev.evaluate(new Expression('2.1 > 1.1'))).toBeTruthy();
  });

  it('testGtExpressionTrueCondition', () => {
    expect(ev.evaluate(new Expression('2 > 1'))).toBeTruthy();
  });

  it('testGtExpressionFalseCondition', () => {
    expect(ev.evaluate(new Expression('1 > 1'))).toBeFalsy();
  });

  it('testGtExpressionDoubleCondition', () => {
    expect(ev.evaluate(new Expression('0.1 > 1.1'))).toBeFalsy();
  });

  it('testGtExpressionStringCondition', () => {
    expect(ev.evaluate(new Expression('"bb" > "aa"'))).toBeTruthy();
  });

  it('testLeExpressionTrueCondition', () => {
    expect(ev.evaluate(new Expression(' 1 <= 1'))).toBeTruthy();
  });

  it('testLeExpressionFalseCondition', () => {
    expect(ev.evaluate(new Expression('4 <= 2'))).toBeFalsy();
  });

  it('testLeExpressionDoubleCondition', () => {
    expect(ev.evaluate(new Expression('5.5 <= 6.6'))).toBeTruthy();
  });

  it('testLeExpressionStringCondition', () => {
    expect(ev.evaluate(new Expression('"worlds" <= "world"'))).toBeFalsy();
  });

  it('testLtExpressionTrueCondition', () => {
    expect(ev.evaluate(new Expression('1 < 2'))).toBeTruthy();
  });

  it('testLtExpressionFalseCondition', () => {
    expect(ev.evaluate(new Expression(' 42 < 24'))).toBeFalsy();
  });

  it('testLtExpressionDoubleCondition', () => {
    expect(ev.evaluate(new Expression('4.47 < 5.559587'))).toBeTruthy();
  });

  it('testLtExpressionStringCondition', () => {
    expect(ev.evaluate(new Expression('"abc" < "bca"'))).toBeTruthy();
  });

  it('testNullCondition', () => {
    expect(ev.evaluate(new Expression('null > null'))).toBeFalsy();
  });

  it('testNullConditionOfFirstVariable', () => {
    expect(ev.evaluate(new Expression('null < 1'))).toBeTruthy();
  });

  it('testNullConditionOfSecondVariable', () => {
    expect(ev.evaluate(new Expression('24 <= null'))).toBeTruthy();
  });

  it('testFloatingPointCondition', () => {
    expect(ev.evaluate(new Expression('float(2.3) >= 2.1'))).toBeTruthy();
  });

  it('testRegexMatchExpression', () => {
    expect(ev.evaluate(new Expression('"abXXXX" ~= "^abc.*"'))).toBeFalsy();
  });

  it('testRegexMatchWithNullParamExpression', () => {
    expect(ev.evaluate(new Expression('null ~= "^abc.*"'))).toBe('^abc.*');
    expect(ev.evaluate(new Expression('"^abc.*"~=null'))).toBeNull();
  });

  it('testAddExpression', () => {
    expect(ev.evaluate(new Expression('"test" + 123'))).toBe('test123');
  });

  it('testAddNullParamExpression', () => {
    expect(ev.evaluate(new Expression('123 + null'))).toBeNull();
  });

  it('testEqExpression', () => {
    expect(ev.evaluate(new Expression(' 1 == 1'))).toBeTruthy();
  });

  it('testFalseExpression', () => {
    expect(ev.evaluate(new Expression('false'))).toBeFalsy();
  });

  it('testTrueExpression', () => {
    expect(ev.evaluate(new Expression('true'))).toBeTruthy();
  });

  it('testNullExpression', () => {
    expect(ev.evaluate(new Expression('null'))).toBeNull();
  });

  it('testFunctionExpression', () => {
    expect(ev.evaluate(new Expression('substring("smiles", 1, 5)'))).toBe('mile');
  });

  it('testCatchFunction', () => {
    expect(ev.evaluate(new Expression('catch(fun(), "error")'))).toBe('error');

    expect(ev.evaluate(new Expression('catch(fun())'))).toBe(Cres.get().getString('exprUnknownFunction') + 'fun');
  });

  it('testCustomFunctionExpression', () => {
    ev.registerCustomFunction(
      'mock',
      new (class Mock extends AbstractFunction {
        constructor() {
          super(Functions.GROUP_OTHER, '', '');
        }
        execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
          return 'mock';
        }
      })()
    );
    expect(ev.evaluate(new Expression('mock()'))).toBe('mock');
  });

  it('testBitwiseAndExpression', () => {
    expect(ev.evaluate(new Expression('1 & 0'))).toBe(0);
  });

  it('testPerformanceVisitor', () => {
    let i = 0;
    const start = Date.now();
    while (i < 10000) {
      expect(ev.evaluate(new Expression('2+2==4 ? substring("smiles", 1, 5):substring("smiles", 2, 3)'))).toBe('mile');
      i++;
    }
    console.log('Expression evaluated ' + 10000 + ' times in ' + (Date.now() - start) + ' ms');
  });

  it('testBitwiseAndExpressionWithIntegerVariables', () => {
    expect(ev.evaluate(new Expression('integer(0) & integer(1)'))).toBe(0);
  });

  it('testBitwiseAndExpressionWithNullVariable', () => {
    expect(ev.evaluate(new Expression('null & 1'))).toBeNull();
  });

  it('testBitwiseNotExpression', () => {
    expect(ev.evaluate(new Expression('~0x00000000'))).toBe(-1);
  });
  it('testBitwiseNotExpressionWithIntegerVariable', () => {
    expect(ev.evaluate(new Expression('~integer(0)'))).toBe(-1);
  });

  it('testBitwiseOrExpression', () => {
    expect(ev.evaluate(new Expression('60|13'))).toBe(61);
  });

  it('testBitwiseOrExpressionWithIntegerVariables', () => {
    expect(ev.evaluate(new Expression('integer(60)|integer(13)'))).toBe(61);
  });
  it('testBitwiseOrExpressionWithNullVariable', () => {
    expect(ev.evaluate(new Expression('null|13'))).toBeNull();
  });
  it('testBitwiseXorExpression', () => {
    expect(ev.evaluate(new Expression('60^13'))).toBe(49);
  });

  it('testBitwiseXorExpressionWithIntegerVariables', () => {
    expect(ev.evaluate(new Expression('integer(60)^integer(13)'))).toBe(49);
  });

  it('testBitwiseExpressionWithNullVariable', () => {
    expect(ev.evaluate(new Expression('60^null'))).toBeNull();
  });

  it('testLeftShiftExpression', () => {
    expect(ev.evaluate(new Expression('2<<1'))).toBe(4);
  });

  it('testLeftShiftIntExpression', () => {
    expect(ev.evaluate(new Expression('integer(2) << integer(1)'))).toBe(4);
  });

  it('testLeftShiftNullExpression', () => {
    expect(ev.evaluate(new Expression('2 << null'))).toBeNull();
  });

  it('testRightShiftExpression', () => {
    expect(ev.evaluate(new Expression('2>>1'))).toBe(1);
  });

  it('testRightShiftExpressionWithNullVariable', () => {
    expect(ev.evaluate(new Expression('null>>1'))).toBeNull();
  });

  it('testUnsignedRightShiftExpression', () => {
    expect(ev.evaluate(new Expression('60>>>2'))).toBe(15);
  });

  it('testUnsignedRightShiftExpressionWithNullVariable', () => {
    expect(ev.evaluate(new Expression('60>>>null'))).toBeNull();
  });

  it('testLogicalAndExpression', () => {
    expect(ev.evaluate(new Expression('1 < 2 && 2 == 2'))).toBeTruthy();
  });

  it('testLogicalOrExpression', () => {
    expect(ev.evaluate(new Expression('1 > 2 || 1 == 1'))).toBeTruthy();
  });

  it('testNeExpression', () => {
    expect(ev.evaluate(new Expression('true != false'))).toBeTruthy();
  });

  it('testDivExpression', () => {
    expect(ev.evaluate(new Expression('100.5 / 10'))).toBe(10.05);
  });
  it('testDivExpressionWithNullVariable', () => {
    expect(ev.evaluate(new Expression('null/12'))).toBeNull();
  });

  it('testSubtractExpression', () => {
    expect(ev.evaluate(new Expression('43-1'))).toBe(42);
  });

  it('testSubtractExpressionWithNullVariable', () => {
    expect(ev.evaluate(new Expression('1- null'))).toBeNull();
  });

  it('testMulExpression', () => {
    expect(ev.evaluate(new Expression('42*1'))).toBe(42);
  });

  it('testMulExpressionWithNullVariable', () => {
    expect(ev.evaluate(new Expression('null*134'))).toBeNull();
  });

  it('testModExpression', () => {
    expect(ev.evaluate(new Expression('24.42 % 10'))).toBe(4);
  });

  it('testFloatExpression', () => {
    expect(ev.evaluate(new Expression('3.4028235E38f'))).toBe(3.4028235e38);
    expect(ev.evaluate(new Expression('3.4028235e38f'))).toBe(3.4028235e38);
    expect(ev.evaluate(new Expression('3.4028235e38F'))).toBe(3.4028235e38);
    expect(ev.evaluate(new Expression('3.4028235E38F'))).toBe(3.4028235e38);
    expect(ev.evaluate(new Expression('3.4028235E38'))).toBe(3.4028235e38);
    expect(ev.evaluate(new Expression('3.4028235e38'))).toBe(3.4028235e38);
    expect(ev.evaluate(new Expression('3.4028235e38'))).toBe(3.4028235e38);
    expect(ev.evaluate(new Expression('3.4028235E38'))).toBe(3.4028235e38);

    expect(ev.evaluate(new Expression('1.17549435E-38f'))).toBe(1.17549435e-38);
    expect(ev.evaluate(new Expression('1.17549435E-38F'))).toBe(1.17549435e-38);
    expect(ev.evaluate(new Expression('1.17549435E-38f'))).toBe(1.17549435e-38);

    //result does not match with java result
    expect(ev.evaluate(new Expression('1.4028235E38f + 1.4028235E38f'))).toBe(2.805647e38);
  });

  it('testLongExpression', () => {
    const actual = ev.evaluate(new Expression('5354135431843451853'));
    const expected = JSBI.BigInt('5354135431843451853');

    expect(JSBI.equal(actual, expected)).toBeTruthy();
  });

  it('testModExpression2', () => {
    expect(ev.evaluate(new Expression('24.92 % 10'))).toBe(4);
  });

  it('testModeExpressionWithNullVariable', () => {
    expect(ev.evaluate(new Expression('null & 0'))).toBeNull();
  });

  it('testNotExpression', () => {
    expect(ev.evaluate(new Expression('!(1 > 0)'))).toBeFalsy();
  });

  it('testEmptyExpression', () => {
    expect(ev.evaluate(new Expression(''))).toBeNull();
  });
});
