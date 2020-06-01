import Reference from '../../src/expression/Reference';
import Expression from '../../src/expression/Expression';
import ContextUtils from '../../src/context/ContextUtils';
import Util from '../../src/util/Util';

describe('TestDecodeReference', () => {
  it('testField', () => {
    const ri = new Reference('field');
    expect(ri.getField()).toBe('field');
  });

  it('testComplex', () => {
    const ri = new Reference('schema/server^users.admin:func("par1", "par2", \'{fref} + 1\', null)$field[2]#property');
    expect(ri.getSchema()).toBe('schema');
    expect(ri.getServer()).toBe('server');
    expect(ri.getContext()).toBe('users.admin');
    expect(ri.getEntity()).toBe('func');
    expect(ri.getParameters().length).toBe(4);
    expect(ri.getParameters()[0]).toBe('par1');
    expect(ri.getParameters()[2] instanceof Expression).toBeTruthy();
    expect(ri.getParameters()[3].toString()).toBe('null');
    expect(ri.getField()).toBe('field');
    expect(ri.getRow()).toBe(2);
    expect(ri.getProperty()).toBe('property');
  });

  it('testContextEvent', () => {
    const ri = new Reference('users.admin.devices.dev1:shutdown@');
    expect(ri.getEntity()).toBe('shutdown');
    expect(ri.getEntityType()).toBe(ContextUtils.ENTITY_EVENT);
  });

  it('testContextActionWithParams', () => {
    const ri = new Reference('users.admin.devices.dev1:action("param", 1)!');
    expect(ri.getEntity()).toBe('action');
    expect(ri.getEntityType()).toBe(ContextUtils.ENTITY_ACTION);
    expect(ri.getParameters()[0]).toBe('param');
    expect(ri.getParameters().length).toBe(2);
  });

  it('testContext', () => {
    const ri = new Reference('.:');
    expect(ri.getContext()).toBe('.');
  });

  it('testContextEntityProperty', () => {
    const ri = new Reference('.:#property');
    expect(ri.getContext()).toBe('.');
    expect(ri.getProperty()).toBe('property');
    expect(ri.getEntity()).toBeNull();
  });

  it('testEntityProperty', () => {
    const ri = new Reference('entity$#property');
    expect(ri.getEntity()).toBe('entity');
    expect(ri.getProperty()).toBe('property');
  });

  it('testFunctionWithQuotedParameters', () => {
    const ri = new Reference('check("\\"" + {invokerContext} + "\\"!=null")');
    expect(ri.getEntity()).toBe('check');
  });

  it('testFunctionWithEmptyParameters', () => {
    const ri = new Reference('test()');
    expect(ri.getEntity()).toBe('test');
    expect(ri.getField()).toBeNull();
  });

  it('testFunction', () => {
    const ri = new Reference("test('true')");
    expect(ri.getEntity()).toBe('test');
    expect(ri.getField()).toBeNull();
  });

  it('testSchemaWithContext', () => {
    const ri = new Reference('test/Label1:');
    expect(ri.getEntity()).toBeNull();
  });

  it('testFunctionWithExpressionParameters', () => {
    const ri = new Reference(':eventsByMask(exp1, {expref}, null)');
    expect(ri.getParameters().length).toBe(3);
    expect(ri.getParameters()[0] instanceof Expression).toBeTruthy();
    expect(ri.getParameters()[1] instanceof Expression).toBeTruthy();
    expect(ri.getParameters()[2] instanceof Expression).toBeTruthy();
  });

  it('testFunctionWithDifferentParameters', () => {
    const ri = new Reference(':eventsByMask(\'{contextMask}\', {expr}, null, "str", "xx\\"yy\\\'zz")');
    expect(ri.getParameters().length).toBe(5);
    expect(ri.getParameters()[0] instanceof Expression).toBeTruthy();
    expect(ri.getParameters()[1] instanceof Expression).toBeTruthy();
    expect(ri.getParameters()[2] instanceof Expression).toBeTruthy();
    expect(Util.isString(ri.getParameters()[3])).toBeTruthy();
    expect(ri.getContext()).toBe('');
    expect(ri.getParameters()[0].toString()).toBe('{contextMask}');
    expect(ri.getParameters()[1].toString()).toBe('{expr}');
    expect(ri.getParameters()[2].toString()).toBe('null');
    expect(ri.getParameters()[3]).toBe('str');
    expect(ri.getParameters()[4]).toBe('xx"yy\'zz');
  });

  it('testEvent', () => {
    const ri = new Reference('entity@$');
    expect(ri.getEntity()).toBe('entity');
    expect(ri.getEntityType()).toBe(ContextUtils.ENTITY_EVENT);
    expect(ri.getField()).toBeNull();
  });

  it('testContextWithEntity', () => {
    const ri = new Reference('context:entity');
    expect(ri.getEntity()).toBe('entity');
    expect(ri.getContext()).toBe('context');
    expect(ri.getField()).toBeNull();
  });

  it('testEntityWithoutField', () => {
    const ri = new Reference('entity$');
    expect(ri.getEntity()).toBe('entity');
    expect(ri.getField()).toBeNull();
  });
});
