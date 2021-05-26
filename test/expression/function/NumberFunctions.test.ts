import EqFunction from '../../../src/expression/function/number/EqFunction';
import NeFunction from '../../../src/expression/function/number/NeFunction';
import GeFunction from '../../../src/expression/function/number/GeFunction';
import GtFunction from '../../../src/expression/function/number/GtFunction';
import LtFunction from '../../../src/expression/function/number/LtFunction';
import AbsFunction from '../../../src/expression/function/number/AbsFunction';
import AsinFunction from '../../../src/expression/function/number/AsinFunction';
import AcosFunction from '../../../src/expression/function/number/AcosFunction';
import AtanFunction from '../../../src/expression/function/number/AtanFunction';
import CbrtFunction from '../../../src/expression/function/number/CbrtFunction';
import CeilFunction from '../../../src/expression/function/number/CeilFunction';
import CosFunction from '../../../src/expression/function/number/CosFunction';
import CoshFunction from '../../../src/expression/function/number/CoshFunction';
import ExpFunction from '../../../src/expression/function/number/ExpFunction';
import FloorFunction from '../../../src/expression/function/number/FloorFunction';
import LogFunction from '../../../src/expression/function/number/LogFunction';
import Log10Function from '../../../src/expression/function/number/Log10Function';
import MinFunction from '../../../src/expression/function/number/MinFunction';
import MaxFunction from '../../../src/expression/function/number/MaxFunction';
import PowFunction from '../../../src/expression/function/number/PowFunction';
import RoundFunction from '../../../src/expression/function/number/RoundFunction';
import SignumFunction from '../../../src/expression/function/number/SignumFunction';
import SinFunction from '../../../src/expression/function/number/SinFunction';
import SinhFunction from '../../../src/expression/function/number/SinhFunction';
import SqrtFunction from '../../../src/expression/function/number/SqrtFunction';
import TanFunction from '../../../src/expression/function/number/TanFunction';
import TanhFunction from '../../../src/expression/function/number/TanhFunction';
import FormatNumberFunction from "../../../src/expression/function/number/FormatNumberFunction";
import EvaluationEnvironment from '../../../src/expression/EvaluationEnvironment';
import CommonsFixture from '../../tests/CommonsFixture';

const evaluationEnvironment = new EvaluationEnvironment();

describe('TestNumberFunctions', () => {
  const ev = CommonsFixture.createTestEvaluator();
  it('testEqFunction', () => {
    const num = 42;
    const isEqual = new EqFunction().execute(ev, evaluationEnvironment, [num, 42]);
    expect(isEqual).toBeTruthy();
  });

  it('testNeFunction', () => {
    const num = 42;
    const isNotEqual = new NeFunction().execute(ev, evaluationEnvironment, [num, 40]);
    expect(isNotEqual).toBeTruthy();
  });

  it('testGeFunction', () => {
    const geFunction = new GeFunction();
    const numbersAreEqual = geFunction.execute(ev, evaluationEnvironment, [1, 1]);
    expect(numbersAreEqual).toBeTruthy();
    const firstNumGtSecondNum = geFunction.execute(ev, evaluationEnvironment, [2, 1]);
    expect(firstNumGtSecondNum).toBeTruthy();
  });

  it('testGtFunction', () => {
    const gtFunction = new GtFunction();
    const firstNumGtSecondNum = gtFunction.execute(ev, evaluationEnvironment, [2, 1]);
    expect(firstNumGtSecondNum).toBeTruthy();
    const numbersAreEqual = gtFunction.execute(ev, evaluationEnvironment, [1, 1]);
    expect(numbersAreEqual).toBeFalsy();
  });

  it('testLtFunction', () => {
    const ltFunction = new LtFunction();
    const firstNumLeSecondNum = ltFunction.execute(ev, evaluationEnvironment, [1, 2]);
    expect(firstNumLeSecondNum).toBeTruthy();
    const numbersAreEqual = ltFunction.execute(ev, evaluationEnvironment, [1, 1]);
    expect(numbersAreEqual).toBeFalsy();
  });

  it('testAbsFunction', () => {
    const result = new AbsFunction().execute(ev, evaluationEnvironment, [-123]);
    expect(result).toBe(123);
  });
  it('testAcosFunction', () => {
    const result = new AcosFunction().execute(ev, evaluationEnvironment, [0.5]);
    expect(result).toBe(1.0471975511965979);
  });
  it('testAsinFunction', () => {
    const result = new AsinFunction().execute(ev, evaluationEnvironment, [0.5]);
    expect(result).toBe(0.5235987755982989);
  });
  it('testAtanFunction', () => {
    const result = new AtanFunction().execute(ev, evaluationEnvironment, [1]);
    expect(result).toBe(0.7853981633974483);
  });
  it('testCrbtFunction', () => {
    const result = new CbrtFunction().execute(ev, evaluationEnvironment, [8]);
    expect(result).toBe(2);
  });
  it('testCeilFunction', () => {
    const result = new CeilFunction().execute(ev, evaluationEnvironment, [7.004]);
    expect(result).toBe(8);
  });
  it('testCosFunction', () => {
    const result = new CosFunction().execute(ev, evaluationEnvironment, [1]);
    expect(result).toBe(0.5403023058681398);
  });
  it('testCoshFunction', () => {
    const result = new CoshFunction().execute(ev, evaluationEnvironment, [1]);
    expect(result).toBe(1.5430806348152437);
  });
  it('testExpFunction', () => {
    const result = new ExpFunction().execute(ev, evaluationEnvironment, [1]);
    expect(result).toBe(2.718281828459045);
  });
  it('testFloorFunction', () => {
    const result = new FloorFunction().execute(ev, evaluationEnvironment, [45.95]);
    expect(result).toBe(45);
  });
  it('testLog10Function', () => {
    const result = new Log10Function().execute(ev, evaluationEnvironment, [100000]);
    expect(result).toBe(5);
  });
  it('testLogFunction', () => {
    const result = new LogFunction().execute(ev, evaluationEnvironment, [10]);
    expect(result).toBe(2.302585092994046);
  });
  it('testMaxFunction', () => {
    const result = new MaxFunction().execute(ev, evaluationEnvironment, [2, 7]);
    expect(result).toBe(7);
  });
  it('testMinFunction', () => {
    const result = new MinFunction().execute(ev, evaluationEnvironment, [10, 3]);
    expect(result).toBe(3);
  });
  it('testPowFunction', () => {
    const result = new PowFunction().execute(ev, evaluationEnvironment, [3, 4]);
    expect(result).toBe(81);
  });
  it('testRoundFunction', () => {
    const result = new RoundFunction().execute(ev, evaluationEnvironment, [20.49]);
    expect(result).toBe(20);
  });
  it('testSignumFunction', () => {
    const result = new SignumFunction().execute(ev, evaluationEnvironment, [-3]);
    expect(result).toBe(-1);
  });
  it('testSinFunction', () => {
    const result = new SinFunction().execute(ev, evaluationEnvironment, [1]);
    expect(result).toBe(0.8414709848078965);
  });
  it('testSinhFunction', () => {
    const result = new SinhFunction().execute(ev, evaluationEnvironment, [1]);
    expect(result).toBe(1.1752011936438014);
  });
  it('testSqrtFunction', () => {
    const result = new SqrtFunction().execute(ev, evaluationEnvironment, [9]);
    expect(result).toBe(3);
  });
  it('testTanFunction', () => {
    const result = new TanFunction().execute(ev, evaluationEnvironment, [1]);
    expect(result).toBe(1.5574077246549023);
  });
  it('testTanhFunction', () => {
    const result = new TanhFunction().execute(ev, evaluationEnvironment, [1]);
    expect(result).toBe(0.7615941559557649);
  });
  it('testNumberFunction', () => {
    const number = 123456.789;
    const format = '###.##';
    expect(new FormatNumberFunction().execute(ev, evaluationEnvironment, [number, format])).toBe('123456.79');
  });
});
