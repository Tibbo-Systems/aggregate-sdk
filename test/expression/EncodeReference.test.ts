import Reference from '../../src/expression/Reference';
import ContextUtils from '../../src/context/ContextUtils';

describe('TestEncodeReference', () => {
  it('testSchemaVariable', () => {
    const ri = new Reference();
    ri.setSchema('schema');
    ri.setEntity('variable');
    ri.setEntityType(ContextUtils.ENTITY_VARIABLE);
    expect(ri.getImage()).toBe('schema/variable$');
  });

  it('testEvent', () => {
    const ri = new Reference();
    ri.setEntity('entity');
    ri.setEntityType(ContextUtils.ENTITY_EVENT);
    expect(ri.getImage()).toBe('entity@');
  });

  it('testAction', () => {
    const ri = new Reference();
    ri.setEntity('entity');
    ri.setEntityType(ContextUtils.ENTITY_ACTION);
    expect(ri.getImage()).toBe('entity!');
  });

  it('testActionWithParams', () => {
    const ri = new Reference();
    ri.setEntity('entity');
    ri.setEntityType(ContextUtils.ENTITY_ACTION);
    ri.addParameter('param');
    expect(ri.getImage()).toBe('entity("param")!');
  });

  it('testVariable', () => {
    const ri = new Reference();
    ri.setEntity('entity');
    ri.setEntityType(ContextUtils.ENTITY_VARIABLE);
    expect(ri.getImage()).toBe('entity$');
  });

  it('testContextVariable', () => {
    const ri = new Reference();
    ri.setContext('context');
    ri.setEntity('entity');
    ri.setEntityType(ContextUtils.ENTITY_VARIABLE);
    expect(ri.getImage()).toBe('context:entity');
  });

  it('testFunctionWithParameters', () => {
    const ri = new Reference();
    ri.setContext('context');
    ri.setEntity('function');
    ri.setEntityType(ContextUtils.ENTITY_FUNCTION);
    ri.addParameter('1');
    ri.addParameter('string');
    expect(ri.getImage()).toBe('context:function("1","string")');
  });
});
