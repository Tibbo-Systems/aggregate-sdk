import EqFunction from '../../../src/expression/functions/number/EqFunction';
import NeFunction from '../../../src/expression/functions/number/NeFunction';
import GeFunction from '../../../src/expression/functions/number/GeFunction';
import GtFunction from '../../../src/expression/functions/number/GtFunction';
import LtFunction from '../../../src/expression/functions/number/LtFunction';
import EvaluationEnvironment from '../../../src/expression/EvaluationEnvironment';

const evaluationEnvironment = new EvaluationEnvironment();

describe('TestNumberFunctions', () => {
  it('testEqFunction', () => {
    const num = 42;
    const isEqual = new EqFunction().execute(null, evaluationEnvironment, [num, 42]);
    expect(isEqual).toBeTruthy();
  });

  it('testNeFunction', () => {
    const num = 42;
    const isNotEqual = new NeFunction().execute(null, evaluationEnvironment, [num, 40]);
    expect(isNotEqual).toBeTruthy();
  });

  it('testGeFunction', () => {
    const geFunction = new GeFunction();
    const numbersAreEqual = geFunction.execute(null, evaluationEnvironment, [1, 1]);
    expect(numbersAreEqual).toBeTruthy();
    const firstNumGtSecondNum = geFunction.execute(null, evaluationEnvironment, [2, 1]);
    expect(firstNumGtSecondNum).toBeTruthy();
  });

  it('testGtFunction', () => {
    const gtFunction = new GtFunction();
    const firstNumGtSecondNum = gtFunction.execute(null, evaluationEnvironment, [2, 1]);
    expect(firstNumGtSecondNum).toBeTruthy();
    const numbersAreEqual = gtFunction.execute(null, evaluationEnvironment, [1, 1]);
    expect(numbersAreEqual).toBeFalsy();
  });

  it('testLtFunction', () => {
    const ltFunction = new LtFunction();
    const firstNumLeSecondNum = ltFunction.execute(null, evaluationEnvironment, [1, 2]);
    expect(firstNumLeSecondNum).toBeTruthy();
    const numbersAreEqual = ltFunction.execute(null, evaluationEnvironment, [1, 1]);
    expect(numbersAreEqual).toBeFalsy();
  });
});
