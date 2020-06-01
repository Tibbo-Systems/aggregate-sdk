import EvaluationEnvironment from '../../../src/expression/EvaluationEnvironment';
import Expression from '../../../src/expression/Expression';
import CommonsFixture from '../../tests/CommonsFixture';
import EvaluateFunction from '../../../src/expression/functions/other/EvaluateFunction';
import StubContext from '../../tests/StubContext';
import DefaultContextManager from '../../../src/context/DefaultContextManager';
import TraceFunction from '../../../src/expression/functions/other/TraceFunction';
import UncheckedCallerController from '../../../src/context/UncheckedCallerController';
import UserFunction from '../../../src/expression/functions/other/UserFunction';
import LoginFunction from '../../../src/expression/functions/other/LoginFunction';

const evaluationEnvironment = new EvaluationEnvironment();

describe('TestOtherFunctions', () => {
  it('testStoreAndLoadFunctions', () => {
    const ev = CommonsFixture.createTestEvaluator();
    let res = ev.evaluate(new Expression("st('var', 11 + 22 + 33) > 50 ? ld('var') : -1"), new EvaluationEnvironment());
    expect(res).toBe(66);
    res = ev.evaluate(new Expression('st("list", 123) != null ? ld("list") : null'), new EvaluationEnvironment());
    expect(res).toBe(123);
  });

  /*it('testCatchFunction', () => {
        const ev = CommonsFixture.createTestEvaluator();
        let res = ev.evaluate(new Expression("catch(1/0, \"error\")"), new EvaluationEnvironment());

        expect(res).toBe('error');

        res = ev.evaluate(new Expression("catch(1/0)"), new EvaluationEnvironment());
        expect(res).toBe('/ by zero');

        res = ev.evaluate(new Expression("evaluate(\"'result: ' + string(catch(1/0, 'error'))\")"), new EvaluationEnvironment());

        expect(res).toBe('result: error');

        res = ev.evaluate(new Expression("evaluate(\"'result: ' + string(catch(1/0))\")"), new EvaluationEnvironment());

        expect(res).toBe('result: / by zero');
    });*/

  it('testEvaluateFunction', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const result = new EvaluateFunction().execute(CommonsFixture.createTestEvaluator(), evaluationEnvironment, ['dt()']);

    expect(ev.getDefaultResolver().getDefaultTable()?.equals(result)).toBe(true);
  });

  it('testEvaluateFunctionWithAdditionalParams', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const context = new StubContext('root');
    context.addChild(new StubContext('child'));
    const defaultTable = ev.getDefaultResolver().getDefaultTable();
    const contextManager = new DefaultContextManager(true);
    contextManager.setRoot(context);
    ev.getDefaultResolver().setContextManager(contextManager);

    const result = new EvaluateFunction().execute(ev, evaluationEnvironment, ['dt()', 'root', defaultTable, 0]);

    expect(result).toBe(defaultTable);
  });

  /*it('testFormatFunction', () => {
        const ev = CommonsFixture.createTestEvaluator();
        const pattern = "%1$tm %1$te,%1$tY";
        const date = new Date(1521705584);
        const expected = "01 18,1970";

        const result = new FormatFunction().execute(ev, null, [pattern, date]);

        expect(result).toBe(expected);
    })*/

  it('testTraceFunction,', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const value = 'Trace value';

    const result = new TraceFunction().execute(ev, evaluationEnvironment, [value]);

    expect(result).toBe(value);
  });

  it('testUserFunction', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const username = 'Test username';
    ev.getDefaultResolver().setCallerController(new UncheckedCallerController(username));

    const result = new UserFunction().execute(ev, evaluationEnvironment, []);

    expect(result).toBe(username);
  });

  it('testLoginFunction', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const username = 'Test username';
    ev.getDefaultResolver().setCallerController(new UncheckedCallerController(username));
    const result = new LoginFunction().execute(ev, evaluationEnvironment, []);
    expect(result).toBe(username);
  });

  /*it('testExpressionEditorOptions', () => {
        const ev = CommonsFixture.createTestEvaluator();
        const root = new StubContext("root");
        root.addChild(new StubContext("child"));
        const contextManager = new DefaultContextManager(root, true);

        ev.getDefaultResolver().setContextManager(contextManager);
        ev.getDefaultResolver().setCallerController(contextManager.getCallerController());
        ev.getDefaultResolver().setDefaultContext(root);

        const tf = new TableFormat(1, 1);
        tf.addField(FieldFormat.create("<int><I>"));
        tf.addField(FieldFormat.create("<reference><S>"));
        tf.addField(FieldFormat.create("<description><S><D=description>"));
        const table = new SimpleDataTable(tf, true);

        const expFunction = new ExpressionEditorOptionsFunction();
        const result = expFunction.execute(ev, null, "child", "str", "1", table);

        assertNotNull(result);
        assertFalse(result.isEmpty());
    });*/
});
