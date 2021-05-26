import ByteBuffer from 'bytebuffer';
import Expression from '../../../src/expression/Expression';
import Evaluator from '../../../src/expression/Evaluator';
import CommonsFixture from '../../tests/CommonsFixture';
import LongFunction from '../../../src/expression/function/type/LongFunction';
import BooleanFunction from '../../../src/expression/function/type/BooleanFunction';
import DoubleFunction from '../../../src/expression/function/type/DoubleFunction';
import FloatFunction from '../../../src/expression/function/type/FloatFunction';
import IntegerFunction from '../../../src/expression/function/type/IntegerFunction';
import StringFunction from '../../../src/expression/function/type/StringFunction';
import TimestampFunction from '../../../src/expression/function/type/TimestampFunction';
import StubContext from '../../tests/StubContext';
import DefaultContextManager from '../../../src/context/DefaultContextManager';
import FetchDataBlockFunction from '../../../src/expression/function/type/FetchDataBlockFunction';
import Data from '../../../src/data/Data';
import EvaluationEnvironment from '../../../src/expression/EvaluationEnvironment';

const ev = CommonsFixture.createTestEvaluator();
const ee = new EvaluationEnvironment();

describe('testTypeConversionFunctions', () => {
  it('testLongFunction', () => {
    const res = ev.evaluate(new Expression('long(123456789.0)'));
    expect(res).toBe(123456789);
  });
  it('testLongFunctionWithOneParam', () => {
    const result = new LongFunction().execute(ev, ee, [true]);
    expect(result).toBe(1);
  });
  it('testLongFunctionWithSeveralParameters', () => {
    const radix = '16';
    const result = new LongFunction().execute(ev, ee, ['50000', radix]);
    expect(result).toBe(327680);
  });
  it('testBooleanFunction', () => {
    const isTrue = new BooleanFunction().convert('true');
    expect(isTrue).toBe(true);
  });
  it('testDoubleFunction', () => {
    const result = new DoubleFunction().convert('42');
    expect(result).toBe(42);
  });
  it('testFloatFunction', () => {
    const result = new FloatFunction().convert('42.2');
    expect(result).toBe(42.2);
  });
  it('testIntegerFunction', () => {
    const result = new IntegerFunction().execute(ev, ee, ['10000']);
    expect(result).toBe(10000);
  });
  it('testIntegerFunctionWithSeveralParameters', () => {
    const radix = '2';
    const result = new IntegerFunction().execute(ev, ee, ['100', radix]);
    expect(result).toBe(4);
  });
  it('testStringFunction', () => {
    const data = new Data(ByteBuffer.fromUTF8('ABC'));
    const result = new StringFunction().convert(data);
    expect(result).toBe('ABC');
  });
  it('testStringFunctionWithNullParam', () => {
    const nullable = new StringFunction().convert(null);
    expect(nullable).toBeNull();
  });
  it('testTimestampFunction', () => {
    const ms = Date.now();
    const date = new TimestampFunction().convert(ms);
    expect(date).not.toBeNull();
    expect(date).toEqual(new Date(ms));
  });
  it('testFetchDataBlockFunction', async () => {
    const ev: Evaluator = CommonsFixture.createTestEvaluator();
    const context = new StubContext('root');
    const contextManager = new DefaultContextManager(true);
    ev.getDefaultResolver().setDefaultContext(context);
    ev.getDefaultResolver().setContextManager(contextManager);
    ev.getDefaultResolver().setCallerController(contextManager.getCallerController());
    const result = await new FetchDataBlockFunction().asyncExecute(ev, ee, [new Data(ByteBuffer.fromUTF8('ABC'))]);
    expect(result.buffer.length).toBe(3);
  });
});
