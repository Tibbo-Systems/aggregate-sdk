import CommonsFixture from '../../tests/CommonsFixture';
import TableFormat from '../../../src/datatable/TableFormat';
import SimpleDataTable from '../../../src/datatable/SimpleDataTable';
import AddRecordsFunction from '../../../src/expression/function/table/AddRecordsFunction';
import EvaluationEnvironment from '../../../src/expression/EvaluationEnvironment';
import AdjustRecordLimitsFunction from '../../../src/expression/function/table/AdjustRecordLimitsFunction';
import CellFunction from '../../../src/expression/function/table/CellFunction';
import ClearFunction from '../../../src/expression/function/table/ClearFunction';
import CopyFunction from '../../../src/expression/function/table/CopyFunction';
import DescribeFunction from '../../../src/expression/function/table/DescribeFunction';
import DescriptionFunction from '../../../src/expression/function/table/DescriptionFunction';
import GetFormatFunction from '../../../src/expression/function/table/GetFormatFunction';
import HasFieldFunction from '../../../src/expression/function/table/HasFieldFunction';
import PrintFunction from '../../../src/expression/function/table/PrintFunction';
import RemoveRecordsFunction from '../../../src/expression/function/table/RemoveRecordsFunction';
import SelectFunction from '../../../src/expression/function/table/SelectFunction';
import SetFunction from '../../../src/expression/function/table/SetFunction';
import ConvertFunction from '../../../src/expression/function/table/ConvertFunction';
import DistinctFunction from '../../../src/expression/function/table/DistinctFunction';
import FieldConstants from '../../../src/datatable/field/FieldConstants';
import FieldFormatFactory from '../../../src/datatable/FieldFormatFactory';
import EncodeFunction from '../../../src/expression/function/table/EncodeFunction';
import DecodeFunction from '../../../src/expression/function/table/DecodeFunction';
import FilterFunction from '../../../src/expression/function/table/FilterFunction';
import IntersectFunction from '../../../src/expression/function/table/IntersectFunction';
import DataRecord from '../../../src/datatable/DataRecord';
import DataTableReplication from '../../../src/datatable/DataTableReplication';
import RecordsFunction from '../../../src/expression/function/table/RecordsFunction';
import RemoveColumnsFunction from '../../../src/expression/function/table/RemoveColumnsFunction';
import SortFunction from '../../../src/expression/function/table/SortFunction';
import SubtableFunction from '../../../src/expression/function/table/SubtableFunction';
import ClassicEncodingSettings from '../../../src/datatable/encoding/ClassicEncodingSettings';
import TableFunction from '../../../src/expression/function/table/TableFunction';
import SetMultipleFunction from '../../../src/expression/function/table/SetMultipleFunction';
import UnionFunction from '../../../src/expression/function/table/UnionFunction';
import JoinFunction from '../../../src/expression/function/table/JoinFunction';
import DataTableFactory from '../../../src/datatable/DataTableFactory';
import JConstants from '../../../src/util/java/JConstants';
import DataTable from '../../../src/datatable/DataTable';
import AddColumnsFunction from '../../../src/expression/function/table/AddColumnsFunction';
import DefaultReferenceResolver from '../../../src/expression/DefaultReferenceResolver';
import AggregateFunction from '../../../src/expression/function/table/AggregateFunction';

describe('TestDataTableFunctions', () => {
  it('testAddRecordsFunction', async () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const format = new TableFormat(2, 5);
    format.addField('<f1><S><A=strval>');
    format.addField('<f2><I><A=456>');
    const table = new SimpleDataTable(format, true);
    const ee = new EvaluationEnvironment();
    const recordFunction = new AddRecordsFunction();
    const res = await recordFunction.asyncExecute(evaluator, ee, [table, 'abc', 123, 'def', 456]);
    expect(res.getRecordCount()).toBe(4);
    expect(res.getRecord(3).getString('f1')).toBe('def');
  });
  it('testAddColumnsFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const evaluationEnvironment = new EvaluationEnvironment();
    const defaultTable = evaluator.getDefaultResolver().getDefaultTable() as DataTable;
    const newField = '<usage><S>';
    const exp = '{}';
    expect(defaultTable.getFieldCount()).toBe(3);
    const result = new AddColumnsFunction().execute(evaluator, evaluationEnvironment, [defaultTable, newField, exp]);
    expect(result.getFieldCount()).toBe(4);
  });

  it('testAdjustRecordLimitsFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const defaultTable = evaluator.getDefaultResolver().getDefaultTable();
    expect(defaultTable?.getFormat().getMinRecords()).toBe(5);
    const result = new AdjustRecordLimitsFunction().execute(evaluator, ee, [defaultTable, 1, 1]);
    expect(result.getFormat().getMinRecords()).toBe(1);
  });

  it('testCellFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const defaultTable = evaluator.getDefaultResolver().getDefaultTable();
    const ee = new EvaluationEnvironment();
    const result = new CellFunction().execute(evaluator, ee, [defaultTable, 'str', 0]);
    expect(result).toBe('test');
  });

  it('testCellFunctionWithAdditionalParams', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const defaultTable = evaluator.getDefaultResolver().getDefaultTable();
    const ee = new EvaluationEnvironment();
    const result = new CellFunction().execute(evaluator, ee, [defaultTable, 0, 0]);
    expect(result).toBe('test');
  });
  it('testClearFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const defaultTable = evaluator.getDefaultResolver().getDefaultTable() as DataTable;
    expect(defaultTable.getRecordCount()).toBe(7);
    const result = new ClearFunction().execute(evaluator, ee, [defaultTable]);
    expect(result.getRecordCount()).toBe(5);
  });
  it('testCopyFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const sourceTable = evaluator.getDefaultResolver().getDefaultTable();
    const targetFormat = new TableFormat(5, 10);
    const targetTable = new SimpleDataTable(targetFormat, false);
    expect(targetTable.getRecordCount()).toBe(0);
    new CopyFunction().execute(evaluator, ee, [sourceTable, targetTable]);
    expect(targetTable.getRecordCount()).toBe(7);
  });
  it('testDescribeFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const defaultTable = evaluator.getDefaultResolver().getDefaultTable();
    const defaultDescription = defaultTable?.getFormat().getField(0).getDescription();
    expect(defaultDescription).toBe('Str');
    const result = new DescribeFunction().execute(evaluator, ee, [defaultTable, 'str', 'new desc']);
    const resultDescription = result.getFormat().getField(0).getDescription();
    expect(resultDescription).toBe('new desc');
  });
  it('testDescriptionFunction', async () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const defaultTable = evaluator.getDefaultResolver().getDefaultTable();
    const tableDescription = await defaultTable?.getDescription();
    const result = await new DescriptionFunction().asyncExecute(evaluator, ee, [defaultTable]);
    expect(result).toBe(tableDescription);
  });
  it('testGetFormatFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const defaultTable = evaluator.getDefaultResolver().getDefaultTable() as DataTable;
    const expected = defaultTable.getFormat().encodeDataTable(false);
    const result = new GetFormatFunction().execute(evaluator, ee, [defaultTable]);
    expect(expected).toBe(result);
  });
  it('testGetFormatFunctionWithNullParam', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const nullable = new GetFormatFunction().execute(evaluator, ee, [null, null]);
    expect(nullable).toBeNull();
  });
  it('testHasFieldFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    evaluator.setDefaultTable(CommonsFixture.createTestTable());
    const defaultTable = evaluator.getDefaultResolver().getDefaultTable();
    const isHasField = new HasFieldFunction().execute(evaluator, ee, [defaultTable, 'str']);
    expect(isHasField).toBe(true);
  });
  it('testPrintFunction', async () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const defaultTable = evaluator.getDefaultResolver().getDefaultTable();
    const expected = 'test, second, third, fourth, fifth, sixth, seventh';
    const result = await new PrintFunction().asyncExecute(evaluator, ee, [defaultTable, '{str}', ', ']);
    expect(result).toBe(expected);
  });
  it('testRemoveRecordsFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const defaultTable = evaluator.getDefaultResolver().getDefaultTable() as DataTable;
    const ee = new EvaluationEnvironment();
    expect(defaultTable.getRecordCount()).toBe(7);
    const result = new RemoveRecordsFunction().execute(evaluator, ee, [defaultTable, 'str', 'test']);
    expect(result.getRecordCount()).toBe(6);
  });
  it('testSelectFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const defaultTable = evaluator.getDefaultResolver().getDefaultTable();
    const ee = new EvaluationEnvironment();
    const result = new SelectFunction().execute(evaluator, ee, [defaultTable, 'str', 'str', 'test']);
    expect(result).toBe('test');
  });
  it('testSetFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const defaultTable = evaluator.getDefaultResolver().getDefaultTable() as DataTable;
    expect(defaultTable.getRecord(0).getValue(0)).toBe('test');
    const result = new SetFunction().execute(evaluator, ee, [defaultTable, 'str', 0, 'new value']);
    expect(result.getRecord(0).getValue(0)).toBe('new value');
  });
  it('testSubtableFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const defaultTable = evaluator.getDefaultResolver().getDefaultTable() as DataTable;
    expect(defaultTable.getFieldCount()).toBe(3);
    const result = new SubtableFunction().execute(evaluator, ee, [defaultTable, 'str']);
    expect(result.getFieldCount()).toBe(1);
  });
  it('testConvertFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const format = new TableFormat(2, 5);
    format.addField('<f1><S><A=strval>');
    format.addField('<f2><I><A=456>');
    const table = new SimpleDataTable(format, true);
    const ee = new EvaluationEnvironment();
    const res = new ConvertFunction().execute(evaluator, ee, [table, '<<f2><S><A=123>> <<f3><B>>', true]);
    expect(res.getFormat().hasField('f3')).toBeTruthy();
    expect(res.getRecordCount() == 2).toBeTruthy();
    expect(res.rec().getString('f2')).toBe('456');
  });
  it('testDistinctFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const format = new TableFormat();
    format.addField('<f1><S><A=strval>');
    format.addField('<f2><I><A=456>');
    const table = new SimpleDataTable(format, true);
    table.addRecordWith('1st field', 1);
    table.addRecordWith('2nd field', 2);
    table.addRecordWith('1st field', 1);
    table.addRecordWith('1st field', 4);
    const ee = new EvaluationEnvironment();
    const result = new DistinctFunction().execute(evaluator, ee, [table]);
    expect(result.getRecordCount()).toBe(3);
    expect(result.getRecord(0).getValue(0)).toBe('1st field');
    expect(result.getRecord(1).getValue(0)).toBe('2nd field');
    expect(result.getRecord(2).getValue(0)).toBe('1st field');
    expect(result.getRecord(2).getValue(1)).toBe(4);
  });
  it('testEncodeAndDecodeFunctions', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const tf = new TableFormat(2, JConstants.INTEGER_MAX_VALUE);
    tf.addField(FieldFormatFactory.createType('A', FieldConstants.BOOLEAN_FIELD));
    tf.addField(FieldFormatFactory.createType('B', FieldConstants.INTEGER_FIELD));
    tf.addField(FieldFormatFactory.createType('C', FieldConstants.STRING_FIELD));
    tf.addField(FieldFormatFactory.createType('D', FieldConstants.STRING_FIELD));
    const originalTable = new SimpleDataTable(tf);
    originalTable.addRecordWith(true, 1, '1', '33');
    originalTable.addRecordWith(true, 2, '2', '44');

    const encodedDataTableVisSep = new EncodeFunction().execute(evaluator, ee, [originalTable, true]);
    const decodedDataTableVisSep = new DecodeFunction().execute(evaluator, ee, [encodedDataTableVisSep]);
    const encodedDataTableInvisSep = new EncodeFunction().execute(evaluator, ee, [originalTable, false]);
    const decodedDataTableInvisSep = new DecodeFunction().execute(evaluator, ee, [encodedDataTableInvisSep]);

    expect(decodedDataTableVisSep).toEqual(originalTable);
    expect(decodedDataTableInvisSep).toEqual(originalTable);
  });

  it('testFilter', async () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const defaultTable = evaluator.getDefaultResolver().getDefaultTable();
    evaluator.getDefaultResolver().setDefaultTable(null);
    const result = await new FilterFunction().asyncExecute(evaluator, ee, [defaultTable, '{int} > 100']);
    expect(result.getRecordCount()).toBe(4);
    expect(result.getFieldCount()).toBe(3);
    expect(result.getRecord(2).getValue('int')).toBe(444);
  });

  it('testIntersectFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    evaluator.getDefaultResolver().setDefaultTable(null);
    const sourceTable = CommonsFixture.createTestTable();
    const sampleTable = CommonsFixture.createTestTable();
    const removableRec = new DataRecord(sampleTable.getFormat());
    DataTableReplication.copyRecord(sampleTable.getRecord(1), removableRec);
    sampleTable.removeRecord(1);
    sampleTable.removeRecord(2);
    let result = new IntersectFunction().execute(evaluator, ee, [sourceTable, 'str', sampleTable, 'str']);
    expect(result.findIndexUsingRecord(removableRec)).toBe(null);
    expect(result.getRecordCount()).toBe(5);

    sourceTable.addRecordFromRecord(removableRec);
    result = new IntersectFunction().execute(evaluator, ee, [sourceTable, 'str', sampleTable, 'str', true]);
    expect(result.findIndexUsingRecord(removableRec)).toBe(0);
    expect(result.getRecordCount()).toBe(1);
  });

  it('testRecords', () => {
    const ee = new EvaluationEnvironment();
    const result = new RecordsFunction().execute(CommonsFixture.createTestEvaluator(), ee, [CommonsFixture.createTestTable()]);
    expect(result).toBe(7);
  });

  it('testRemoveColumnsFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const format = new TableFormat(2, 5);
    format.addField('<f1><S><A=strval>');
    format.addField('<f2><I><A=456>');
    const result = new RemoveColumnsFunction().execute(evaluator, ee, [new SimpleDataTable(format, true), 'f1']);
    expect(result.getRecordCount()).toBe(2);
    expect(result.getFieldCount()).toBe(1);
    expect(result.getRecord(1).getValue(0)).toBe(456);
  });
  it('testSortFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    let result = new SortFunction().execute(evaluator, ee, [CommonsFixture.createTestTable(), 'int', true]);
    expect(result.getRecord(0).getValue('int')).toBe(-111);
    expect(result.getRecord(result.getRecordCount() - 1).getValue('str')).toBe('fifth');
    const table = new SimpleDataTable(TableFormat.createWithFormatAndSettings('<<value><I><F=N>>', new ClassicEncodingSettings(true)));
    table.addRecordWith(9);
    table.addRecordWith(5);
    table.addRecordWith(8);
    table.addRecordWith(null);
    table.addRecordWith(4);
    table.addRecordWith(9);
    table.addRecordWith(3);
    result = new SortFunction().execute(evaluator, ee, [table, 'value', false]);
    expect(result.getRecord(0).getValue('value')).toBe(9);
    expect(result.getRecord(1).getValue('value')).toBe(9);
    expect(result.getRecord(2).getValue('value')).toBe(8);
    expect(result.getRecord(3).getValue('value')).toBe(5);
    expect(result.getRecord(4).getValue('value')).toBe(4);
    expect(result.getRecord(5).getValue('value')).toBe(3);
    expect(result.getRecord(6).getValue('value')).toBe(null);
  });
  it('testTableFunction', async () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const tableFunction = new TableFunction();
    const result = await tableFunction.asyncExecute(evaluator, ee, ['<<str><S>><<int><I>>', 's11', 11, 's22', 22]);
    expect(result.getRecordCount()).toBe(2);
    expect(result.getFieldCount()).toBe(2);
    expect(result.getRecord(0).getValue('str')).toBe('s11');
    expect(result.getRecord(1).getValue('int')).toBe(22);
  });
  it('testTableFunctionWithEmptyParam', async () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const tableFunction = new TableFunction();
    const result = await tableFunction.asyncExecute(evaluator, ee, []);
    expect(result).toEqual(new SimpleDataTable());
  });

  it('testAggregateFunction', async () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const format = new TableFormat();
    format.addField('<num><I>');
    const table = new SimpleDataTable(format);
    table.addRecordWith(6);
    table.addRecordWith(8);
    table.addRecordWith(3);
    table.addRecordWith(7);
    const exp = '({env/previous} * {#' + DefaultReferenceResolver.ROW + '} + {num}) / ({#' + DefaultReferenceResolver.ROW + '} + 1)';
    const result = await new AggregateFunction().asyncExecute(evaluator, ee, [table, exp, 0]);
    expect(result).toBe(6);
  });
  it('testSetMultipleFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    evaluator.getEnvironmentResolver().set('test', true);
    const env = new Map();
    env.set('test2', true);
    const ee = new EvaluationEnvironment(undefined, env);
    const format = new TableFormat();
    format.addField('<num><I>');
    const table = new SimpleDataTable(format);
    table.addRecordWith(6);
    const condition = 'true == true';
    const result = new SetMultipleFunction().execute(evaluator, ee, [table, 'num', 111, condition]);
    expect(result.get()).toBe(111);
  });

  it('testSetMultipleFunctionWhenSettingDataTableField', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const format = new TableFormat();
    format.addField('<num><I>');
    format.addField('<table><T>');
    const table = new SimpleDataTable(format, 1);
    const tf = TableFormat.createWithFormatAndSettings('<<1><S>>', new ClassicEncodingSettings(true));
    const dt = new SimpleDataTable(tf);
    dt.addRecord().setValue(0, 1);
    const expected = DataTableFactory.of(format);
    expected.addRecord().setValue(1, dt);
    const result = new SetMultipleFunction().execute(evaluator, ee, [table, 'table', dt]);
    expect(result.getRecord(0).getData(1)).toBe(expected.getRecord(0).getData(1));
  });

  it('testUnionFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const leftFormat = new TableFormat();
    leftFormat.addField(FieldFormatFactory.createType('A', FieldConstants.BOOLEAN_FIELD));
    leftFormat.addField(FieldFormatFactory.createType('B', FieldConstants.INTEGER_FIELD));
    leftFormat.addField(FieldFormatFactory.createType('C', FieldConstants.STRING_FIELD));
    const leftTable = new SimpleDataTable(leftFormat);
    leftTable.addRecordWith(true, 1, '1');
    leftTable.addRecordWith(true, 2, '2');
    const rightFormat = new TableFormat(2, 2);
    rightFormat.addField(FieldFormatFactory.createType('B', FieldConstants.INTEGER_FIELD));
    rightFormat.addField(FieldFormatFactory.createType('C', FieldConstants.STRING_FIELD));
    rightFormat.addField(FieldFormatFactory.createType('D', FieldConstants.STRING_FIELD));
    const rightTable = new SimpleDataTable(rightFormat);
    rightTable.addRecordWith(3, '3', '33');
    rightTable.addRecordWith(4, '4', '44');

    const leftResultFormat = new TableFormat(2, JConstants.INTEGER_MAX_VALUE);
    leftResultFormat.addField(FieldFormatFactory.createType('A', FieldConstants.BOOLEAN_FIELD));
    leftResultFormat.addField(FieldFormatFactory.createType('B', FieldConstants.INTEGER_FIELD));
    leftResultFormat.addField(FieldFormatFactory.createType('C', FieldConstants.STRING_FIELD));
    leftResultFormat.addField(FieldFormatFactory.createType('D', FieldConstants.STRING_FIELD));

    const leftResultDataTable = new SimpleDataTable(leftResultFormat);
    leftResultDataTable.addRecordWith(true, 1, '1');
    leftResultDataTable.addRecordWith(true, 2, '2');
    leftResultDataTable.addRecordWith(false, 3, '3', '33');
    leftResultDataTable.addRecordWith(false, 4, '4', '44');

    const rightResultFormat = new TableFormat(2, JConstants.INTEGER_MAX_VALUE);
    rightResultFormat.addField(FieldFormatFactory.createType('B', FieldConstants.STRING_FIELD));
    rightResultFormat.addField(FieldFormatFactory.createType('C', FieldConstants.STRING_FIELD));
    rightResultFormat.addField(FieldFormatFactory.createType('D', FieldConstants.STRING_FIELD));
    rightResultFormat.addField(FieldFormatFactory.createType('A', FieldConstants.STRING_FIELD));

    const rightResultDataTable = new SimpleDataTable(rightResultFormat);
    rightResultDataTable.addRecordWith(3, '3', '33', false);
    rightResultDataTable.addRecordWith(4, '4', '44', false);
    rightResultDataTable.addRecordWith(1, '1', '', true);
    rightResultDataTable.addRecordWith(2, '2', '', true);

    let calculateDataTable = new UnionFunction().execute(evaluator, ee, [leftTable, rightTable]);
    expect(calculateDataTable.getRecordCount()).toBe(4);
    calculateDataTable = new UnionFunction().execute(evaluator, ee, [calculateDataTable, rightTable]);
    expect(calculateDataTable.getRecordCount()).toBe(6);
    expect(calculateDataTable.hasField('C')).toBeTruthy();
  });

  it('testJoinFunction', () => {
    const evaluator = CommonsFixture.createTestEvaluator();
    const ee = new EvaluationEnvironment();
    const leftFormat = new TableFormat();
    leftFormat.addField(FieldFormatFactory.createType('A', FieldConstants.BOOLEAN_FIELD));
    leftFormat.addField(FieldFormatFactory.createType('B', FieldConstants.INTEGER_FIELD));
    leftFormat.addField(FieldFormatFactory.createType('C', FieldConstants.STRING_FIELD));
    const leftTable = new SimpleDataTable(leftFormat);
    leftTable.addRecordWith(true, 1, '1');
    leftTable.addRecordWith(true, 2, '2');
    const rightFormat = new TableFormat(2, 2);
    rightFormat.addField(FieldFormatFactory.createType('B', FieldConstants.INTEGER_FIELD));
    rightFormat.addField(FieldFormatFactory.createType('C', FieldConstants.STRING_FIELD));
    rightFormat.addField(FieldFormatFactory.createType('D', FieldConstants.STRING_FIELD));
    const rightTable = new SimpleDataTable(rightFormat);
    rightTable.addRecordWith(3, '3', '33');
    rightTable.addRecordWith(4, '4', '44');

    const leftResultFormat = new TableFormat(2, JConstants.INTEGER_MAX_VALUE);
    leftResultFormat.addField(FieldFormatFactory.createType('A', FieldConstants.BOOLEAN_FIELD));
    leftResultFormat.addField(FieldFormatFactory.createType('B', FieldConstants.INTEGER_FIELD));
    leftResultFormat.addField(FieldFormatFactory.createType('C', FieldConstants.STRING_FIELD));
    leftResultFormat.addField(FieldFormatFactory.createType('D', FieldConstants.STRING_FIELD));

    const leftResultDataTable = new SimpleDataTable(leftResultFormat);
    leftResultDataTable.addRecordWith(true, 1, '1', '33');
    leftResultDataTable.addRecordWith(true, 2, '2', '44');

    const rightResultFormat = new TableFormat(2, JConstants.INTEGER_MAX_VALUE);
    rightResultFormat.addField(FieldFormatFactory.createType('B', FieldConstants.INTEGER_FIELD));
    rightResultFormat.addField(FieldFormatFactory.createType('C', FieldConstants.STRING_FIELD));
    rightResultFormat.addField(FieldFormatFactory.createType('D', FieldConstants.STRING_FIELD));
    rightResultFormat.addField(FieldFormatFactory.createType('A', FieldConstants.BOOLEAN_FIELD));

    const rightResultDataTable = new SimpleDataTable(rightResultFormat);
    rightResultDataTable.addRecordWith(3, '3', '33', true);
    rightResultDataTable.addRecordWith(4, '4', '44', true);

    let calculateDataTable = new JoinFunction().execute(evaluator, ee, [leftTable, rightTable]);
    expect(calculateDataTable).toEqual(leftResultDataTable);
    calculateDataTable = new JoinFunction().execute(evaluator, ee, [rightTable, leftTable]);
    expect(calculateDataTable).toEqual(rightResultDataTable);
  });
});
