import TestServer from '../tests/TestServer';
import Evaluator from '../../src/expression/Evaluator';
import Expression from '../../src/expression/Expression';

describe('Expressions', () => {
  const server = new TestServer(false);

  beforeEach(async () => {
    await server.beforeEach();
  });

  afterEach(async () => {
    await server.afterEach();
  });

  it('testExpressionWithServerReference', async () => {
    const evaluator = new Evaluator(server.getRlc().getContextManager());
    const res = await evaluator.evaluateToDataTable(new Expression('{users.admin.models.test:test}'));
    console.log(res.getRecord(0).getValue(0));
  });
});
