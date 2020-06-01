import DtFunction from '../../../src/expression/functions/context/DtFunction';
import Evaluator from '../../../src/expression/Evaluator';
import StubContext from '../../tests/StubContext';
import DefaultContextManager from '../../../src/context/DefaultContextManager';
import DrFunction from '../../../src/expression/functions/context/DrFunction';
import DcFunction from '../../../src/expression/functions/context/DcFunction';
import AvailableFunction from '../../../src/expression/functions/context/AvailableFunction';
import EventAvailableFunction from '../../../src/expression/functions/context/EventAvailableFunction';
import Functions from '../../../src/expression/functions/Functions';
import ContextUtilsConstants from '../../../src/context/ContextUtilsConstants';
import FunctionAvailableFunction from '../../../src/expression/functions/context/FunctionAvailableFunction';
import VariableAvailableFunction from '../../../src/expression/functions/context/VariableAvailableFunction';
import EventGroupFunction from '../../../src/expression/functions/context/EventGroupFunction';
import FunctionGroupFunction from '../../../src/expression/functions/context/FunctionGroupFunction';
import VariableGroupFunction from '../../../src/expression/functions/context/VariableGroupFunction';
import FunctionInputFormatFunction from '../../../src/expression/functions/context/FunctionInputFormatFunction';
import FunctionOutputFormatFunction from '../../../src/expression/functions/context/FunctionOutputFormatFunction';
import VariableFormatFunction from '../../../src/expression/functions/context/VariableFormatFunction';
import EventFormatFunction from '../../../src/expression/functions/context/EventFormatFunction';
import VariableReadableFunction from '../../../src/expression/functions/context/VariableReadableFunction';
import VariableWritableFunction from '../../../src/expression/functions/context/VariableWritableFunction';
import SimpleDataTable from '../../../src/datatable/SimpleDataTable';
import TableFormat from '../../../src/datatable/TableFormat';
import CallFunctionFunction from '../../../src/expression/functions/context/CallFunctionFunction';
import ClassicEncodingSettings from '../../../src/datatable/encoding/ClassicEncodingSettings';
import FireEventFunction from '../../../src/expression/functions/context/FireEventFunction';
import FullDescriptionFunction from '../../../src/expression/functions/context/FullDescriptionFunction';
import GetVariableFunction from '../../../src/expression/functions/context/GetVariableFunction';
import SetVariableFieldFunction from '../../../src/expression/functions/context/SetVariableFieldFunction';
import SetVariableFunction from '../../../src/expression/functions/context/SetVariableFunction';
import SetVariableRecordFunction from '../../../src/expression/functions/context/SetVariableRecordFunction';
import EvaluationEnvironment from '../../../src/expression/EvaluationEnvironment';

class TestContextFunctions {
  public static NOT_AVAILABLE_CONTEXT = 'InaccessibleContext';
  public static NOT_AVAILABLE_FUNCTION = 'InaccessibleFunction';
  public static NOT_AVAILABLE_VARIABLE = 'InaccessibleVariable';
  public static NOT_AVAILABLE_EVENT = 'InaccessibleEvent';
  public static NOT_AVAILABLE_GROUP = 'InaccessibleGroup';
  public static ROOT_CONTEXT = 'root';
  public static CHILD_CONTEXT = 'child';

  public ev: Evaluator;

  constructor() {
    const root = new StubContext(TestContextFunctions.ROOT_CONTEXT);
    const childContext = new StubContext(TestContextFunctions.CHILD_CONTEXT);
    root.addChild(childContext);
    const contextManager = new DefaultContextManager(true);
    contextManager.setRoot(root);
    contextManager.start();
    const evaluator = new Evaluator(contextManager, root, null, contextManager.getCallerController());
    this.ev = evaluator;
  }
}

const evaluationEnvironment = new EvaluationEnvironment();

describe('TestContextFunctions', () => {
  it('testDtFunction', () => {
    const testEnv = new TestContextFunctions();
    const res = new DtFunction().execute(testEnv.ev, evaluationEnvironment, []);
    expect(testEnv.ev.getDefaultResolver().getDefaultTable()).toBe(res);
  });

  it('testDrFunction', () => {
    const testEnv = new TestContextFunctions();
    const res = new DrFunction().execute(testEnv.ev, evaluationEnvironment, []);
    expect(testEnv.ev.getDefaultResolver().getDefaultRow()).toBe(res);
  });

  it('testDcFunction', () => {
    const testEnv = new TestContextFunctions();
    const res = new DcFunction().execute(testEnv.ev, evaluationEnvironment, []);
    const defaultContext = testEnv.ev.getDefaultResolver().getDefaultContext();
    expect(defaultContext).not.toBeNull();
    if (defaultContext != null) {
      expect(defaultContext.getPath()).toBe(res);
    }
  });

  it('testAvailableFunctionFalseCondition', () => {
    const testEnv = new TestContextFunctions();
    const isFalse = new AvailableFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT]);

    expect(isFalse).toBeFalsy();
  });

  it('testAvailableFunctionTrueCondition', () => {
    const testEnv = new TestContextFunctions();
    const isTrue = new AvailableFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT]);

    expect(isTrue).toBeTruthy();
  });

  it('testEventAvailableFunctionFalseCondition', () => {
    const testEnv = new TestContextFunctions();
    const eafunction = new EventAvailableFunction(Functions.GROUP_CONTEXT_RELATED);
    const isFalse = eafunction.execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_EVENT]);

    expect(isFalse).toBeFalsy();
  });

  it('testEventAvailableFunctionTrueCondition', () => {
    const testEnv = new TestContextFunctions();
    const isTrue = new EventAvailableFunction(ContextUtilsConstants.GROUP_DEFAULT).execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.E_TEST]);

    expect(isTrue).toBeTruthy();
  });

  it('testFunctionAvailableFunctionFalseCondition', () => {
    const testEnv = new TestContextFunctions();
    const afFunction = new FunctionAvailableFunction(Functions.GROUP_CONTEXT_RELATED);
    const isFalse = afFunction.execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_FUNCTION]);

    expect(isFalse).toBeFalsy();
  });

  it('testFunctionAvailableFunctionTrueCondition', () => {
    const testEnv = new TestContextFunctions();
    const afFunction = new FunctionAvailableFunction(ContextUtilsConstants.GROUP_DEFAULT);
    const isTrue = afFunction.execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, Functions.COPY]);

    expect(isTrue).toBeTruthy();
  });

  it('testVariableAvailableFunctionFalseCondition', () => {
    const testEnv = new TestContextFunctions();
    const vaFunction = new VariableAvailableFunction(Functions.GROUP_CONTEXT_RELATED);
    const isFalse = vaFunction.execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE]);

    expect(isFalse).toBeFalsy();
  });

  it('testVariableAvailableFunctionTrueCondition', () => {
    const testEnv = new TestContextFunctions();
    const isTrue = new VariableAvailableFunction(ContextUtilsConstants.GROUP_DEFAULT).execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST]);

    expect(isTrue).toBeTruthy();
  });

  it('testEventGroupFunctionNotAvailableCondition', () => {
    const testEnv = new TestContextFunctions();
    const nullable = new EventGroupFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_GROUP]);

    expect(nullable).toBeNull();
  });

  it('testEventGroupFunctionAvailableCondition', () => {
    const testEnv = new TestContextFunctions();
    const result = new EventGroupFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.E_TEST]);

    expect(result).toBe(ContextUtilsConstants.GROUP_DEFAULT);
  });

  it('testFunctionGroupFunctionNotAvailableCondition', () => {
    const testEnv = new TestContextFunctions();
    const nullable = new FunctionGroupFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_GROUP]);

    expect(nullable).toBeNull();
  });

  it('testFunctionGroupFunctionAvailableCondition', () => {
    const testEnv = new TestContextFunctions();
    const result = new FunctionGroupFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.F_TEST]);

    expect(result).toBe(ContextUtilsConstants.GROUP_DEFAULT);
  });

  it('testVariableGroupFunctionNotAvailableCondition', () => {
    const testEnv = new TestContextFunctions();
    const nullable = new VariableGroupFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_GROUP]);

    expect(nullable).toBeNull();
  });

  it('testVariableGroupFunctionAvailableCondition', () => {
    const testEnv = new TestContextFunctions();
    const result = new VariableGroupFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST]);

    expect(result).toBe(ContextUtilsConstants.GROUP_DEFAULT);
  });

  it('testFunctionInputFormatNotAvailableCondition', () => {
    const testEnv = new TestContextFunctions();
    const nullable = new FunctionInputFormatFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_FUNCTION]);

    expect(nullable).toBeNull();
  });

  it('testFunctionInputFormatAvailableCondition', () => {
    const testEnv = new TestContextFunctions();
    const result = new FunctionInputFormatFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.F_TEST]);

    expect(result).not.toBeNull();
  });

  it('testFunctionOutputFormatNotAvailableCondition()', () => {
    const testEnv = new TestContextFunctions();
    const nullable = new FunctionOutputFormatFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_FUNCTION]);

    expect(nullable).toBeNull();
  });

  it('testFunctionOutputFormatAvailableCondition()', () => {
    const testEnv = new TestContextFunctions();
    const result = new FunctionOutputFormatFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.F_TEST]);

    expect(result).not.toBeNull();
  });

  it('testVariableFormatFunctionNotAvailableCondition()', () => {
    const testEnv = new TestContextFunctions();
    const nullable = new VariableFormatFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE]);

    expect(nullable).toBeNull();
  });

  it('testVariableFormatFunctionAvailableCondition()', () => {
    const testEnv = new TestContextFunctions();
    const result = new VariableFormatFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST]);

    expect(result).not.toBeNull();
  });

  it('testEventFormatFunctionNotAvailableCondition()', () => {
    const testEnv = new TestContextFunctions();
    const nullable = new EventFormatFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_EVENT]);

    expect(nullable).toBeNull();
  });

  it('testEventFormatFunctionAvailableCondition()', () => {
    const testEnv = new TestContextFunctions();

    const result = new EventFormatFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.E_TEST]);

    expect(result).not.toBeNull();
  });

  it('testVariableReadableFunctionFalseCondition()', () => {
    const testEnv = new TestContextFunctions();
    const vrFunction = new VariableReadableFunction(Functions.GROUP_CONTEXT_RELATED);
    const isFalse = vrFunction.execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE]);

    expect(isFalse).toBeFalsy();
  });

  it('testVariableReadableFunctionTrueCondition()', () => {
    const testEnv = new TestContextFunctions();
    const isTrue = new VariableReadableFunction(ContextUtilsConstants.GROUP_DEFAULT).execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST]);

    expect(isTrue).toBeTruthy();
  });

  it('testVariableWritableFunctionFalseCondition()', () => {
    const testEnv = new TestContextFunctions();
    const vwFunction = new VariableWritableFunction(Functions.GROUP_CONTEXT_RELATED);
    const isFalse = vwFunction.execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE]);

    expect(isFalse).toBeFalsy();
  });

  it('testVariableWritableFunctionTrueCondition()', () => {
    const testEnv = new TestContextFunctions();
    const isTrue = new VariableWritableFunction(ContextUtilsConstants.GROUP_DEFAULT).execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST]);

    expect(isTrue).toBeTruthy();
  });

  it('testCallFunction()', () => {
    const testEnv = new TestContextFunctions();
    const table = new SimpleDataTable(TableFormat.EMPTY_FORMAT);
    const result = new CallFunctionFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, Functions.COPY, table]);

    expect(result).not.toBeNull();
  });

  it('testCallFunctionWithSameFormat()', () => {
    const testEnv = new TestContextFunctions();
    const format = '<<name><S><F=RHK><A=>><<description><S><F=R><A=><D=Variable>><<replicate><B><A=0><D=Replicate>><<fields><T><A=<F=>><D=Fields>><<value><T><A=<F=>><D=Value>>';
    const table = new SimpleDataTable(TableFormat.createWithFormatAndSettings(format, new ClassicEncodingSettings(true)));
    const result = new CallFunctionFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, Functions.COPY, table]);

    expect(result).not.toBeNull();
  });

  it('testFireEventFunction()', () => {
    const testEnv = new TestContextFunctions();
    const level = 1;
    const result = new FireEventFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.E_TEST, level]);

    expect(result).not.toBeNull();
  });

  it('testFullDescriptionFunction()', () => {
    const testEnv = new TestContextFunctions();
    const delimiter = '|';
    const result = new FullDescriptionFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, delimiter]);

    expect(result).not.toBeNull();
  });

  it('testGetVariableFunction()', async () => {
    const testEnv = new TestContextFunctions();
    const defContext = testEnv.ev.getDefaultResolver().getDefaultContext();
    if (defContext != null) {
      const child = defContext.getChild(TestContextFunctions.CHILD_CONTEXT);
      if (child != null) {
        const expected = await child.getVariable(StubContext.V_TEST).then((value) => value.getFormat().toString());
        const result = await new GetVariableFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST]);

        expect(result).not.toBeNull();
        expect(result.rec()).not.toBeNull();
        expect(result.getFormat().toString()).toBe(expected);
      } else {
        fail();
      }
    } else {
      fail();
    }
  });

  it('testSetVariableFieldFunction()', async () => {
    const testEnv = new TestContextFunctions();
    await new SetVariableFieldFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST, StubContext.VF_TEST_INT, 0, 444]);
    const defContext = testEnv.ev.getDefaultResolver().getDefaultContext();
    if (defContext != null) {
      const context = defContext.getChild(TestContextFunctions.CHILD_CONTEXT);
      if (context != null) {
        const dt = await context.getVariable(StubContext.V_TEST, testEnv.ev.getDefaultResolver().getCallerController());

        const result = dt.rec().getInt(0);

        expect(result).toBe(444);
      } else {
        fail();
      }
    } else {
      fail();
    }
  });

  it('testSetVariableFunction()', async () => {
    const testEnv = new TestContextFunctions();
    await new SetVariableFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST, 42]);
    const defContext = testEnv.ev.getDefaultResolver().getDefaultContext();
    if (defContext != null) {
      const context = defContext.getChild(TestContextFunctions.CHILD_CONTEXT);
      if (context != null) {
        const dt = await context.getVariable(StubContext.V_TEST, testEnv.ev.getDefaultResolver().getCallerController());

        const result = dt.rec().getInt(0);

        expect(result).toBe(42);
      } else {
        fail();
      }
    } else {
      fail();
    }
  });

  /*it('testSetVariableFunctionWithDataTableParam()', () => {
        const testEnv = new TestContextFunctions();
        const tf = new TableFormat(1, 1);
        tf.addField(FieldFormat("<int><I>"));
        const table = new SimpleDataTable(tf, true);
        table.rec().setValue(0, 11);
        new SetVariableFunction().execute(testEnv.ev, null, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST, table]);
        const context = testEnv.ev.getDefaultResolver().getDefaultContext().getChild(TestContextFunctions.CHILD_CONTEXT);
        const dt = context.getVariable(StubContext.V_TEST, testEnv.ev.getDefaultResolver().getCallerController());

        expect(dt).not.toBeNull();
        expect(dt.rec().getInt(0)).toBe(table.rec().getInt(0));
    });*/

  it('testSetVariableRecordFunction()', async () => {
    const testEnv = new TestContextFunctions();
    await new SetVariableRecordFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST, 0, 33]);
    const defContext = testEnv.ev.getDefaultResolver().getDefaultContext();
    if (defContext != null) {
      const context = defContext.getChild(TestContextFunctions.CHILD_CONTEXT);
      if (context != null) {
        const dt = context.getVariable(StubContext.V_TEST, testEnv.ev.getDefaultResolver().getCallerController());

        expect(await dt.then((value) => value.rec().getInt(0))).toBe(33);
      } else {
        fail();
      }
    } else {
      fail();
    }
  });

  it('testCallFunctionEvaluationException()', () => {
    try {
      const testEnv = new TestContextFunctions();
      new CallFunctionFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_FUNCTION]);
      fail();
    } catch (ignore) {
      return;
    }
  });

  it('testFireEventEvaluationException()', () => {
    try {
      const testEnv = new TestContextFunctions();
      new FireEventFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_EVENT, 0]);
      fail();
    } catch (ignore) {
      return;
    }
  });

  it('testFireEventContextException()', () => {
    try {
      const testEnv = new TestContextFunctions();
      new FireEventFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, TestContextFunctions.NOT_AVAILABLE_EVENT, 0]);
      fail();
    } catch (ignore) {
      return;
    }
  });

  it('testFireEventWrongLevel()', () => {
    try {
      const testEnv = new TestContextFunctions();
      new FireEventFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.E_TEST, 10]);
      fail();
    } catch (ignore) {
      return;
    }
  });

  it('testFullDescriptionFunctionEvaluationException()', () => {
    try {
      const testEnv = new TestContextFunctions();
      new FullDescriptionFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT]);
      fail();
    } catch (ignore) {
      return;
    }
  });

  it('testGetVariableFunctionEvaluationException()', () => {
    try {
      const testEnv = new TestContextFunctions();
      new GetVariableFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE]);
      fail();
    } catch (ignore) {
      return;
    }
  });

  it('testGetVariableDoesNotExistVar()', () => {
    try {
      const testEnv = new TestContextFunctions();
      new GetVariableFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE]);
    } catch (ignore) {
      return;
    }
  });

  it('testSetVariableFieldEvaluationException()', () => {
    try {
      const testEnv = new TestContextFunctions();
      new SetVariableFieldFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, StubContext.V_TEST, StubContext.VF_TEST_INT, 0, 444]);
      fail();
    } catch (ignore) {
      return;
    }
  });

  it('testSetVariableFunctionEvaluationException()', () => {
    try {
      const testEnv = new TestContextFunctions();
      new SetVariableFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE]);
      fail();
    } catch (ignore) {
      return;
    }
  });

  it('testSetVariableFunctionContextException()', () => {
    try {
      const testEnv = new TestContextFunctions();
      new SetVariableFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE]);
      fail();
    } catch (ignore) {
      return;
    }
  });

  it('testSetVariableRecordEvaluationException()', () => {
    try {
      const testEnv = new TestContextFunctions();
      new SetVariableRecordFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, StubContext.V_TEST, 0, 33]);
      fail();
    } catch (ignore) {
      return;
    }
  });

  it('testSetVariableRecordContextException()', () => {
    try {
      const testEnv = new TestContextFunctions();
      new SetVariableRecordFunction().execute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE, 0, 33]);
      fail();
    } catch (ignore) {
      return;
    }
  });
});
