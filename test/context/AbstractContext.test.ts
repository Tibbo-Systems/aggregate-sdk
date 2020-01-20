import StubContext from '../tests/StubContext';
import DefaultContextManager from '../../src/context/DefaultContextManager';
import AbstractContext from '../../src/context/AbstractContext';
import ContextUtilsConstants from '../../src/context/ContextUtilsConstants';
import BasicActionDefinition from '../../src/action/BasicActionDefinition';
import EventDefinition from '../../src/context/EventDefinition';
import TableFormat from '../../src/datatable/TableFormat';
import FunctionDefinition from '../../src/context/FunctionDefinition';
import VariableDefinition from '../../src/context/VariableDefinition';
import FieldConstants from '../../src/datatable/field/FieldConstants';
import DataRecord from '../../src/datatable/DataRecord';
import DataTableFactory from '../../src/datatable/DataTableFactory';
import DataTable from '../../src/datatable/DataTable';
import VariableStatus from '../../src/context/VariableStatus';
import ContextUtils from '../../src/context/ContextUtils';

describe('TestAbstractContext', () => {
  let contextManager: DefaultContextManager<any>;
  let root: AbstractContext<any, any>;

  beforeEach(() => {
    root = new StubContext('root');
    contextManager = new DefaultContextManager(true);
    contextManager.setRoot(root);
    contextManager.start();
  });

  it('testAddChild', () => {
    const child1 = new StubContext('child1');
    root.addChild(child1);
    expect(root.getChildren().length).toBe(1);
    expect(root.getChildren()[0]).toBe(child1);
    expect(child1.getParent()).toBe(root);
  });

  it('testAddChildWithIndexWhenSortingEnabled', () => {
    const child1 = new StubContext('child1');
    root.addChild(child1);
    const child2 = new StubContext('child2');
    expect(() => {
      root.addChild(child2, 0);
    }).toThrowError('Cannot add child with pre-defined index as children sorting is enabled');
  });

  it('testAddChildWithIndexWhenSortingDisabled', () => {
    root.setChildrenSortingEnabled(false);
    const child1 = new StubContext('child1');
    root.addChild(child1);
    const child2 = new StubContext('child2');
    root.addChild(child2, 0);
    expect(root.getChildren()[0]).toBe(child2);
  });

  it('testDestroyChild', () => {
    const child1 = new StubContext('child1');
    root.addChild(child1);
    root.destroyChild(child1, false);
    expect(root.getChildren().length).toBe(0);
    expect(child1.getParent()).toBe(null);
  });

  it('testDestroy', () => {
    const child1 = new StubContext('child1');
    root.addChild(child1);
    expect(root.isStarted()).toBeTruthy();
    root.destroy(false);
    expect(root.getChildren().length).toBe(0);
    expect(child1.isStopped()).toBeTruthy();
  });

  it('testMoveAndRename', () => {
    const child1 = new StubContext('child1');
    root.addChild(child1);
    const child2 = new StubContext('child2');
    root.addChild(child2);
    child2.move(root, 'newChild2');
    expect(root.getChildren().length).toBe(2);
    expect(root.getChild('newChild2')).toBe(child2);
    expect(child1.getChild('child2')).toBe(null);
  });

  it('testReoderChildWhenSortingEnabled', () => {
    const child1 = new StubContext('child1');
    root.addChild(child1);
    const child2 = new StubContext('child2');
    root.addChild(child2);

    expect(() => {
      root.reorderChild(child2, 0);
    }).toThrowError('Cannot reorder children when children sorting is enabled');
  });

  it('testReorderChildWhenSortingDisabled', () => {
    root.setChildrenSortingEnabled(false);
    const child1 = new StubContext('child1');
    root.addChild(child1);
    const child2 = new StubContext('child2');
    root.addChild(child2);

    root.reorderChild(child2, 0);
    expect(root.getChildren()[0]).toBe(child2);
  });

  it('testGetFunctionDefinitions', () => {
    expect(root.getFunctionDefinitions().length).toBe(3);
  });

  it('testGetFunctionDefinitionsFromDefaultGroup', () => {
    expect(root.getFunctionDefinitionsByGroup(ContextUtilsConstants.GROUP_DEFAULT).length !== 0).toBeTruthy();
  });

  it('testGetFunctionDefinitionsIncludeHidden', () => {
    expect(root.getFunctionDefinitions(null, true).length).toBe(6);
  });

  it('testGetActionDefinitions', () => {
    root.addActionDefinition(new BasicActionDefinition('action'));
    expect(root.getActionDefinitions().length).toBe(1);
  });

  it('testAddAlreadyExistentActionDefinitions', () => {
    root.addActionDefinition(new BasicActionDefinition('action'));

    const newDefinition = new BasicActionDefinition('action');
    root.addActionDefinition(newDefinition);

    expect(root.getActionDefinition('action')).toBe(newDefinition);
  });

  it('testGetActionDefinition', () => {
    const ad = new BasicActionDefinition('action');

    root.addActionDefinition(ad);

    const newDefinition = new BasicActionDefinition('action2');
    root.addActionDefinition(newDefinition);

    expect(root.getActionDefinition('action')).toBe(ad);
  });

  it('testRemoveActionDefinition', () => {
    const ad = new BasicActionDefinition('action');
    root.addActionDefinition(ad);
    root.removeActionDefinition('action');
    expect(root.getActionDefinition('action')).toBeNull();
  });

  it('testGetEventDefinitions', () => {
    expect(root.getEventDefinitions().length).toBe(2);
  });

  it('testGetEventDefinition', () => {
    expect(root.getEventDefinitions(null, true).length).toBe(17);
  });

  it('testGetEventDefinitionDefaultGroup', () => {
    expect(root.getEventDefinitionsByGroup(ContextUtilsConstants.GROUP_DEFAULT).length).toBe(2);
  });

  it('testAddEventDefinition', () => {
    const ad = new EventDefinition('event', new TableFormat());
    root.addEventDefinition(ad);
    expect(root.getEventDefinition('event')).toBe(ad);
  });

  it('testAddAlreadyExistentEventDefinition', () => {
    const ad = new EventDefinition('test', new TableFormat());
    root.addEventDefinition(ad);
    expect(root.getEventDefinition('test')).toBe(ad);
  });

  it('testRemoveEventDefinition', () => {
    const ad = new EventDefinition('event', new TableFormat());
    root.addEventDefinition(ad);
    root.removeEventDefinition('event');
    expect(root.getEventDefinition('event')).toBeNull();
  });

  it('testAddFunctionDefinition', () => {
    const ad = new FunctionDefinition('testFunction', new TableFormat(), new TableFormat());
    root.addFunctionDefinition(ad);
    expect(root.getFunctionDefinition('testFunction')).toBe(ad);
  });

  it('testAddAlreadyExistentFunctionDefinition', () => {
    const ad = new FunctionDefinition('function', new TableFormat(), new TableFormat());
    root.addFunctionDefinition(ad);
    expect(root.getFunctionDefinition('function')).toBe(ad);
  });

  it('testRemoveFunctionDefinition', () => {
    const ad = new FunctionDefinition('testFunction', new TableFormat(), new TableFormat());
    root.addFunctionDefinition(ad);
    root.removeFunctionDefinition('testFunction');
    expect(root.getFunctionDefinition('testFunction')).toBeNull();
  });

  it('testAddVariableDefinition', () => {
    const ad = new VariableDefinition('variable', new TableFormat(), true, true);
    root.addVariableDefinition(ad);
    expect(root.getVariableDefinition('variable')).toBe(ad);
  });

  it('testAddAlreadyExistentVariableDefinition', () => {
    let variableDefinition = new VariableDefinition('variable', new TableFormat(), true, true);
    root.addVariableDefinition(variableDefinition);
    variableDefinition = new VariableDefinition('variable', new TableFormat(), true, false);
    root.addVariableDefinition(variableDefinition);
    expect(root.getVariableDefinition('variable')).toBe(variableDefinition);
  });

  it('testModifyVariableDefinitionFormat', async() => {
    const varName = 'variable';

    const format1 = new TableFormat();
    format1.addFieldWithTypeAndName(FieldConstants.STRING_FIELD, 'strField');

    const variableDefinition = new VariableDefinition(varName, format1, true, true);
    root.addVariableDefinition(variableDefinition);

    const record = new DataRecord(format1);
    record.addString('abc');
    await root.addVariableRecord(varName, root.getContextManager().getCallerController(), record);

    const expectedTable1 = DataTableFactory.of(format1);
    expectedTable1.addRecordFromRecord(record);
    expect((await root.getVariable(varName)).equals(expectedTable1)).toBe(true);

    const variableData1 = root.getVariableData(varName).getValue() as DataTable;
    expect(variableData1.equals(expectedTable1)).toBe(true);

    const format2 = new TableFormat();
    format2.addFieldWithTypeAndName(FieldConstants.STRING_FIELD, 'strField');
    format2.addFieldWithTypeAndName(FieldConstants.INTEGER_FIELD, 'intField');
    variableDefinition.setFormat(format2);
    root.addVariableDefinition(variableDefinition);

    const expectedTable2 = DataTableFactory.of(format2);
    const rec = expectedTable2.addRecord();
    rec.addString('abc');
    rec.addInt(0);

    expect((await root.getVariable(varName)).equals(expectedTable2)).toBe(true);

    const variableData2 = root.getVariableData(varName).getValue() as DataTable;
    expect(variableData2.equals(expectedTable2)).toBe(true);

    const format3 = new TableFormat();
    format3.addFieldWithTypeAndName(FieldConstants.STRING_FIELD, 'strField');
    variableDefinition.setFormat(format3);
    root.addVariableDefinition(variableDefinition);

    expect((await root.getVariable(varName)).equals(expectedTable1)).toBe(true);

    const variableData3 = root.getVariableData(varName).getValue() as DataTable;

    expect(variableData3.equals(expectedTable1)).toBe(true);

  });

  it('testRemoveVariableDefinition', () => {
    const ad = new VariableDefinition('variable', new TableFormat(), true, true);
    root.addVariableDefinition(ad);
    root.removeVariableDefinition('variable');
    expect(root.getVariableDefinition('variable')).toBeNull();
  });

  it('testHasParent', () => {
    const child1 = new StubContext('child1');
    root.addChild(child1);
    const child2 = new StubContext('child2');
    root.addChild(child2);
    const child3 = new StubContext('child3');
    child2.addChild(child3);

    expect(child1.hasParent(root)).toBeTruthy();
    expect(child3.hasParent(root)).toBeTruthy();
    expect(child3.hasParent(child1)).toBeFalsy();
    expect(root.hasParent(child1)).toBeFalsy();
  });

  it('testExceptionWhenGetVariableObject', async () => {
    await expect(root.getVariableObject('test', null)).rejects.toThrow('Value class not defined for variable: Test (test)')
  });
  
  it('testSetVariableField', async () => {
    await root.setVariableField(StubContext.V_TEST, StubContext.VF_TEST_INT, 0, 123, null);
    expect((await root.getVariable(StubContext.V_TEST)).rec().getInt(StubContext.VF_TEST_INT)).toBe(123);
  });

  it('testExceptionWhenSettingVariableField', () => {return new Promise(done => {
    root.setVariableField(StubContext.V_TEST, StubContext.VF_TEST_INT, 1, 123, null).catch(reason => {
      expect(reason.message).toBe('index is out of range');
      done();
    });
  })});

  it('testAddRecordToVariable', async () => {
    root.addVariableDefinition(
      new VariableDefinition('testVar', StubContext.VFT_TEST.clone().setMaxRecords(10), true, true)
    );
    await root.addVariableRecord('testVar', null, [123]);
    expect((await root.getVariable('testVar', null)).getRecord(1).getInt(StubContext.VF_TEST_INT)).toBe(123);
  });

  it('testRemoveRecordFromVariable', async () => {
    root.addVariableDefinition(
      new VariableDefinition('testVar', StubContext.VFT_TEST.clone().setMaxRecords(10), true, true)
    );
    await root.addVariableRecord('testVar', null, [123]);
    await root.addVariableRecord('testVar', null, [124]);
    await root.removeVariableRecords('testVar', null, StubContext.VF_TEST_INT, 123);

    expect((await root.getVariable('testVar', null)).getRecordCount()).toBe(2);
    expect((await root.getVariable('testVar', null)).getRecord(1).getInt(StubContext.VF_TEST_INT)).toBe(124);
  });

  it('testVariableStatus', () => {
    root.enableVariableStatuses(true);
    let vs = new VariableStatus('status', 'comment');
    root.updateVariableStatus(StubContext.V_TEST, vs, true);
    expect(root.getVariableStatus(StubContext.V_TEST).getStatus()).toBe(vs.getStatus());
    expect(root.getVariableStatus(StubContext.V_TEST).getComment()).toBe(vs.getComment());

    vs = new VariableStatus('status2', 'comment2');
    root.updateVariableStatus(StubContext.V_TEST, vs, true);

    expect(root.getVariableStatus(StubContext.V_TEST).getStatus()).toBe(vs.getStatus());
    expect(root.getVariableStatus(StubContext.V_TEST).getComment()).toBe(vs.getComment());
  });

  it('testVariableStatusWhenDisabledStatuses', () => {
    expect(() => {
      root.updateVariableStatus(StubContext.V_TEST, new VariableStatus('status', 'comment'), true);
    }).toThrowError('conEvtNotAvailExtvariableStatusChangedroot');
  });

  it('testStatusWhenDisabled', () => {
    expect(() => {
      root.setStatus(1, 'comment');
    }).toThrowError('Status is disabled');
  });

  it('testStatus', () => {
    root.enableStatus();
    root.setStatus(1, 'comment');

    expect(root.getStatus()?.getStatus()).toBe(1);

    expect(root.getStatus()?.getComment()).toBe('comment');
  });

  it('testInvalidNames', () => {
    expect(ContextUtils.isValidContextName('invalid name')).toBeFalsy();
  });

  it('testValidNames', () => {
    expect(ContextUtils.isValidContextName('')).toBeTruthy();
  });
});
