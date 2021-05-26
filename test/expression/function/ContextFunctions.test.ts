import DtFunction from '../../../src/expression/function/context/DtFunction';
import Evaluator from '../../../src/expression/Evaluator';
import StubContext from '../../tests/StubContext';
import DefaultContextManager from '../../../src/context/DefaultContextManager';
import DrFunction from '../../../src/expression/function/context/DrFunction';
import DcFunction from '../../../src/expression/function/context/DcFunction';
import AvailableFunction from '../../../src/expression/function/context/AvailableFunction';
import EventAvailableFunction from '../../../src/expression/function/context/EventAvailableFunction';
import Functions from '../../../src/expression/function/Functions';
import ContextUtilsConstants from '../../../src/context/ContextUtilsConstants';
import FunctionAvailableFunction from '../../../src/expression/function/context/FunctionAvailableFunction';
import VariableAvailableFunction from '../../../src/expression/function/context/VariableAvailableFunction';
import EventGroupFunction from '../../../src/expression/function/context/EventGroupFunction';
import FunctionGroupFunction from '../../../src/expression/function/context/FunctionGroupFunction';
import VariableGroupFunction from '../../../src/expression/function/context/VariableGroupFunction';
import FunctionInputFormatFunction from '../../../src/expression/function/context/FunctionInputFormatFunction';
import FunctionOutputFormatFunction from '../../../src/expression/function/context/FunctionOutputFormatFunction';
import VariableFormatFunction from '../../../src/expression/function/context/VariableFormatFunction';
import EventFormatFunction from '../../../src/expression/function/context/EventFormatFunction';
import VariableReadableFunction from '../../../src/expression/function/context/VariableReadableFunction';
import VariableWritableFunction from '../../../src/expression/function/context/VariableWritableFunction';
import SimpleDataTable from '../../../src/datatable/SimpleDataTable';
import TableFormat from '../../../src/datatable/TableFormat';
import CallFunctionFunction from '../../../src/expression/function/context/CallFunctionFunction';
import ClassicEncodingSettings from '../../../src/datatable/encoding/ClassicEncodingSettings';
import FireEventFunction from '../../../src/expression/function/context/FireEventFunction';
import FullDescriptionFunction from '../../../src/expression/function/context/FullDescriptionFunction';
import GetVariableFunction from '../../../src/expression/function/context/GetVariableFunction';
import SetVariableFieldFunction from '../../../src/expression/function/context/SetVariableFieldFunction';
import SetVariableFunction from '../../../src/expression/function/context/SetVariableFunction';
import SetVariableRecordFunction from '../../../src/expression/function/context/SetVariableRecordFunction';
import EvaluationEnvironment from '../../../src/expression/EvaluationEnvironment';
import FieldFormatFactory from '../../../src/datatable/FieldFormatFactory';
import Cres from '../../../src/Cres';
import MessageFormat from '../../../src/util/java/MessageFormat';
import Context from '../../../src/context/Context';

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
    const defaultContext = testEnv.ev.getDefaultResolver().getDefaultContext() as Context<any, any>;
    expect(defaultContext).not.toBeNull();
    expect(defaultContext.getPath()).toBe(res);
  });

  it('testAvailableFunctionFalseCondition', async () => {
    const testEnv = new TestContextFunctions();
    const isFalse = await new AvailableFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT]);

    expect(isFalse).toBeFalsy();
  });

  it('testAvailableFunctionTrueCondition', async () => {
    const testEnv = new TestContextFunctions();
    const isTrue = await new AvailableFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT]);

    expect(isTrue).toBeTruthy();
  });

  it('testEventAvailableFunctionFalseCondition', async () => {
    const testEnv = new TestContextFunctions();
    const eafunction = new EventAvailableFunction(Functions.GROUP_CONTEXT_RELATED);
    const isFalse = await eafunction.asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_EVENT]);

    expect(isFalse).toBeFalsy();
  });

  it('testEventAvailableFunctionTrueCondition', async () => {
    const testEnv = new TestContextFunctions();
    const isTrue = await new EventAvailableFunction(ContextUtilsConstants.GROUP_DEFAULT).asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.E_TEST]);

    expect(isTrue).toBeTruthy();
  });

  it('testFunctionAvailableFunctionFalseCondition', async () => {
    const testEnv = new TestContextFunctions();
    const afFunction = new FunctionAvailableFunction(Functions.GROUP_CONTEXT_RELATED);
    const isFalse = await afFunction.asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_FUNCTION]);

    expect(isFalse).toBeFalsy();
  });

  it('testFunctionAvailableFunctionTrueCondition', async () => {
    const testEnv = new TestContextFunctions();
    const afFunction = new FunctionAvailableFunction(ContextUtilsConstants.GROUP_DEFAULT);
    const isTrue = await afFunction.asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, Functions.COPY]);

    expect(isTrue).toBeTruthy();
  });

  it('testVariableAvailableFunctionFalseCondition', async () => {
    const testEnv = new TestContextFunctions();
    const vaFunction = new VariableAvailableFunction(Functions.GROUP_CONTEXT_RELATED);
    const isFalse = await vaFunction.asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE]);

    expect(isFalse).toBeFalsy();
  });

  it('testVariableAvailableFunctionTrueCondition', async () => {
    const testEnv = new TestContextFunctions();
    const isTrue = await new VariableAvailableFunction(ContextUtilsConstants.GROUP_DEFAULT).asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST]);

    expect(isTrue).toBeTruthy();
  });

  it('testEventGroupFunctionNotAvailableCondition', async () => {
    const testEnv = new TestContextFunctions();
    const nullable = await new EventGroupFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_GROUP]);

    expect(nullable).toBeNull();
  });

  it('testEventGroupFunctionAvailableCondition', async () => {
    const testEnv = new TestContextFunctions();
    const result = await new EventGroupFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.E_TEST]);

    expect(result).toBe(ContextUtilsConstants.GROUP_DEFAULT);
  });

  it('testFunctionGroupFunctionNotAvailableCondition', async () => {
    const testEnv = new TestContextFunctions();
    const nullable = await new FunctionGroupFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_GROUP]);

    expect(nullable).toBeNull();
  });

  it('testFunctionGroupFunctionAvailableCondition', async () => {
    const testEnv = new TestContextFunctions();
    const result = await new FunctionGroupFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.F_TEST]);

    expect(result).toBe(ContextUtilsConstants.GROUP_DEFAULT);
  });

  it('testVariableGroupFunctionNotAvailableCondition', async () => {
    const testEnv = new TestContextFunctions();
    const nullable = await new VariableGroupFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_GROUP]);

    expect(nullable).toBeNull();
  });

  it('testVariableGroupFunctionAvailableCondition', async () => {
    const testEnv = new TestContextFunctions();
    const result = await new VariableGroupFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST]);

    expect(result).toBe(ContextUtilsConstants.GROUP_DEFAULT);
  });

  it('testFunctionInputFormatNotAvailableCondition', async () => {
    const testEnv = new TestContextFunctions();
    const nullable = await new FunctionInputFormatFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_FUNCTION]);

    expect(nullable).toBeNull();
  });

  it('testFunctionInputFormatAvailableCondition', async () => {
    const testEnv = new TestContextFunctions();
    const result = await new FunctionInputFormatFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.F_TEST]);

    expect(result).not.toBeNull();
  });

  it('testFunctionOutputFormatNotAvailableCondition()', async () => {
    const testEnv = new TestContextFunctions();
    const nullable = await new FunctionOutputFormatFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_FUNCTION]);

    expect(nullable).toBeNull();
  });

  it('testFunctionOutputFormatAvailableCondition()', async () => {
    const testEnv = new TestContextFunctions();
    const result = await new FunctionOutputFormatFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.F_TEST]);

    expect(result).not.toBeNull();
  });

  it('testVariableFormatFunctionNotAvailableCondition()', async () => {
    const testEnv = new TestContextFunctions();
    const nullable = await new VariableFormatFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE]);

    expect(nullable).toBeNull();
  });

  it('testVariableFormatFunctionAvailableCondition()', async () => {
    const testEnv = new TestContextFunctions();
    const result = await new VariableFormatFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST]);

    expect(result).not.toBeNull();
  });

  it('testEventFormatFunctionNotAvailableCondition()', async () => {
    const testEnv = new TestContextFunctions();
    const nullable = await new EventFormatFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_EVENT]);

    expect(nullable).toBeNull();
  });

  it('testEventFormatFunctionAvailableCondition()', async () => {
    const testEnv = new TestContextFunctions();

    const result = await new EventFormatFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.E_TEST]);

    expect(result).not.toBeNull();
  });

  it('testVariableReadableFunctionFalseCondition()', async () => {
    const testEnv = new TestContextFunctions();
    const vrFunction = new VariableReadableFunction(Functions.GROUP_CONTEXT_RELATED);
    const isFalse = await vrFunction.asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE]);

    expect(isFalse).toBeFalsy();
  });

  it('testVariableReadableFunctionTrueCondition()', async () => {
    const testEnv = new TestContextFunctions();
    const isTrue = await new VariableReadableFunction(ContextUtilsConstants.GROUP_DEFAULT).asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST]);

    expect(isTrue).toBeTruthy();
  });

  it('testVariableWritableFunctionFalseCondition()', async () => {
    const testEnv = new TestContextFunctions();
    const vwFunction = new VariableWritableFunction(Functions.GROUP_CONTEXT_RELATED);
    const isFalse = await vwFunction.asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE]);

    expect(isFalse).toBeFalsy();
  });

  it('testVariableWritableFunctionTrueCondition()', async () => {
    const testEnv = new TestContextFunctions();
    const isTrue = await new VariableWritableFunction(ContextUtilsConstants.GROUP_DEFAULT).asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST]);

    expect(isTrue).toBeTruthy();
  });

  it('testCallFunction()', async () => {
    const testEnv = new TestContextFunctions();
    const table = new SimpleDataTable(TableFormat.EMPTY_FORMAT);
    const result = await new CallFunctionFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, Functions.COPY, table]);

    expect(result).not.toBeNull();
  });

  it('testCallFunctionWithSameFormat()', async () => {
    const testEnv = new TestContextFunctions();
    const format = '<<name><S><F=RHK><A=>><<description><S><F=R><A=><D=Variable>><<replicate><B><A=0><D=Replicate>><<fields><T><A=<F=>><D=Fields>><<value><T><A=<F=>><D=Value>>';
    const table = new SimpleDataTable(TableFormat.createWithFormatAndSettings(format, new ClassicEncodingSettings(true)));
    const result = await new CallFunctionFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, Functions.COPY, table]);

    expect(result).not.toBeNull();
  });

  it('testFireEventFunction()', async () => {
    const testEnv = new TestContextFunctions();
    const level = 1;
    const result = await new FireEventFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.E_TEST, level]);

    expect(result).not.toBeNull();
  });

  it('testFullDescriptionFunction()', async () => {
    const testEnv = new TestContextFunctions();
    const delimiter = '|';
    const result = await new FullDescriptionFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, delimiter]);

    expect(result).not.toBeNull();
  });

  it('testGetVariableFunction()', async () => {
    const testEnv = new TestContextFunctions();
    const defContext = testEnv.ev.getDefaultResolver().getDefaultContext() as Context<any, any>;
    const child = (await defContext.getChild(TestContextFunctions.CHILD_CONTEXT)) as Context<any, any>;
    const expected = (await child.getVariable(StubContext.V_TEST)).getFormat().toString();
    const result = await new GetVariableFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST]);

    expect(result).not.toBeNull();
    expect(result.rec()).not.toBeNull();
    expect(result.getFormat().toString()).toBe(expected);
  });

  it('testSetVariableFieldFunction()', async () => {
    const testEnv = new TestContextFunctions();
    await new SetVariableFieldFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST, StubContext.VF_TEST_INT, 0, 444]);
    const defContext = testEnv.ev.getDefaultResolver().getDefaultContext() as Context<any, any>;
    const context = (await defContext.getChild(TestContextFunctions.CHILD_CONTEXT)) as Context<any, any>;
    const dt = await context.getVariable(StubContext.V_TEST, testEnv.ev.getDefaultResolver().getCallerController());

    const result = dt.rec().getInt(0);

    expect(result).toBe(444);
  });

  it('testSetVariableFunction()', async () => {
    const testEnv = new TestContextFunctions();
    await new SetVariableFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST, 42]);
    const defContext = testEnv.ev.getDefaultResolver().getDefaultContext() as Context<any, any>;
    const context = (await defContext.getChild(TestContextFunctions.CHILD_CONTEXT)) as Context<any, any>;

    const dt = await context.getVariable(StubContext.V_TEST, testEnv.ev.getDefaultResolver().getCallerController());

    const result = dt.rec().getInt(0);

    expect(result).toBe(42);
  });

  it('testSetVariableFunctionWithDataTableParam()', async () => {
    const testEnv = new TestContextFunctions();
    const tf = new TableFormat(1, 1);
    tf.addField(FieldFormatFactory.create('<int><I>'));
    const table = new SimpleDataTable(tf, true);
    table.rec().setValue(0, 11);
    await new SetVariableFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST, table]);
    const context = (await testEnv.ev.getDefaultResolver().getDefaultContext()) as Context<any, any>;
    const childContext = (await context.getChild(TestContextFunctions.CHILD_CONTEXT)) as Context<any, any>;
    const dt = await childContext.getVariable(StubContext.V_TEST, testEnv.ev.getDefaultResolver().getCallerController());
    expect(dt).not.toBeNull();
    expect(dt.rec().getInt(0)).toBe(table.rec().getInt(0));
  });

  it('testSetVariableRecordFunction()', async () => {
    const testEnv = new TestContextFunctions();
    await new SetVariableRecordFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.V_TEST, 0, 33]);
    const defContext = testEnv.ev.getDefaultResolver().getDefaultContext() as Context<any, any>;
    const context = (await defContext.getChild(TestContextFunctions.CHILD_CONTEXT)) as Context<any, any>;

    const dt = await context.getVariable(StubContext.V_TEST, testEnv.ev.getDefaultResolver().getCallerController());

    expect(dt.rec().getInt(0)).toBe(33);
  });

  it('testCallFunctionEvaluationException()', async () => {
    const testEnv = new TestContextFunctions();
    await expect(new CallFunctionFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_FUNCTION])).rejects.toThrowError(
      Cres.get().getString('conNotAvail') + TestContextFunctions.NOT_AVAILABLE_CONTEXT
    );
  });

  it('testFireEventEvaluationException()', async () => {
    const testEnv = new TestContextFunctions();
    await expect(new FireEventFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_EVENT, 0])).rejects.toThrowError(
      Cres.get().getString('conNotAvail') + TestContextFunctions.NOT_AVAILABLE_CONTEXT
    );
  });

  it('testFireEventContextException()', async () => {
    const testEnv = new TestContextFunctions();
    await expect(new FireEventFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, TestContextFunctions.NOT_AVAILABLE_EVENT, 0])).rejects.toThrowError(
      MessageFormat.format(Cres.get().getString('conEvtNotAvailExt'), TestContextFunctions.NOT_AVAILABLE_EVENT, TestContextFunctions.CHILD_CONTEXT)
    );
  });

  it('testFireEventWrongLevel()', async () => {
    const testEnv = new TestContextFunctions();
    await expect(new FireEventFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, StubContext.E_TEST, 10])).rejects.toThrowError('Invalid event level: 10');
  });

  it('testFullDescriptionFunctionEvaluationException()', async () => {
    const testEnv = new TestContextFunctions();
    await expect(new FullDescriptionFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT])).rejects.toThrowError(
      Cres.get().getString('conNotAvail') + TestContextFunctions.NOT_AVAILABLE_CONTEXT
    );
  });

  it('testGetVariableFunctionEvaluationException()', async () => {
    const testEnv = new TestContextFunctions();
    await expect(new GetVariableFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE])).rejects.toThrowError(
      Cres.get().getString('conNotAvail') + TestContextFunctions.NOT_AVAILABLE_CONTEXT
    );
  });

  it('testGetVariableDoesNotExistVar()', async () => {
    const testEnv = new TestContextFunctions();
    await expect(new GetVariableFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE])).rejects.toThrowError(
      MessageFormat.format(Cres.get().getString('conVarNotAvailExt'), TestContextFunctions.NOT_AVAILABLE_VARIABLE, TestContextFunctions.CHILD_CONTEXT)
    );
  });

  it('testSetVariableFieldEvaluationException()', async () => {
    const testEnv = new TestContextFunctions();
    await expect(new SetVariableFieldFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, StubContext.V_TEST, StubContext.VF_TEST_INT, 0, 444])).rejects.toThrowError(
      Cres.get().getString('conNotAvail') + TestContextFunctions.NOT_AVAILABLE_CONTEXT
    );
  });

  it('testSetVariableFunctionEvaluationException()', async () => {
    const testEnv = new TestContextFunctions();
    await expect(new SetVariableFieldFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE])).rejects.toThrowError(
      MessageFormat.format(Cres.get().getString('exprInvalidParamCount'), 5, 2)
    );
  });

  it('testSetVariableFunctionContextException()', async () => {
    const testEnv = new TestContextFunctions();
    await expect(new SetVariableFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE])).rejects.toThrowError();
  });

  it('testSetVariableRecordEvaluationException()', async () => {
    const testEnv = new TestContextFunctions();
    await expect(new SetVariableRecordFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.NOT_AVAILABLE_CONTEXT, StubContext.V_TEST, 0, 33])).rejects.toThrowError(
      Cres.get().getString('conNotAvail') + TestContextFunctions.NOT_AVAILABLE_CONTEXT
    );
  });

  it('testSetVariableRecordContextException()', async () => {
    const testEnv = new TestContextFunctions();
    await expect(new SetVariableRecordFunction().asyncExecute(testEnv.ev, evaluationEnvironment, [TestContextFunctions.CHILD_CONTEXT, TestContextFunctions.NOT_AVAILABLE_VARIABLE, 0, 33])).rejects.toThrowError(
      Cres.get().getString('conVarNotAvailExt')
    );
  });
});
