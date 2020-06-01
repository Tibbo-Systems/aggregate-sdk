import Evaluator from '../../src/expression/Evaluator';
import TableFormat from '../../src/datatable/TableFormat';
import DataTable from '../../src/datatable/DataTable';
import DataRecord from '../../src/datatable/DataRecord';
import DataTableFactory from '../../src/datatable/DataTableFactory';
import IntersectFunction from '../../src/expression/functions/table/IntersectFunction';
import DataTableReplication from '../../src/datatable/DataTableReplication';
import DistinctFunction from '../../src/expression/functions/table/DistinctFunction';
import EvaluationEnvironment from '../../src/expression/EvaluationEnvironment';

const evaluationEnvironment = new EvaluationEnvironment();

describe('TestDataTableFunctions', () => {
  const ev: Evaluator = new Evaluator(null, null, null);

  it('testIntersectFunction', () => {
    const format: TableFormat = new TableFormat();

    format.addField('<str><S><A=test>');

    const sourceTable: DataTable = DataTableFactory.of(format);
    const sampleTable: DataTable = DataTableFactory.of(format);

    sourceTable.addRecord().setValue('str', 'test');
    sourceTable.addRecord().setValue('str', 'second');
    sourceTable.addRecord().setValue('str', 'third');
    sourceTable.addRecord().setValue('str', 'fourth');
    sourceTable.addRecord().setValue('str', 'fifth');

    DataTableReplication.copy(sourceTable, sampleTable);

    const removableRec = new DataRecord(sampleTable.getFormat());
    DataTableReplication.copyRecord(sampleTable.getRecord(1), removableRec);
    sampleTable.removeRecord(1);
    sampleTable.removeRecord(2);

    let res = new IntersectFunction().execute(ev, evaluationEnvironment, [sourceTable, 'str', sampleTable, 'str']);

    expect(res.findIndex('str', 'second')).toBe(null);
    expect(res.findIndex('str', 'fourth')).toBe(null);
    expect(res.getRecordCount()).toBe(3);

    res = new IntersectFunction().execute(ev, evaluationEnvironment, [sourceTable, 'str', sampleTable, 'str', true]);

    expect(res.findIndex('str', 'second')).toBe(0);
    expect(res.findIndex('str', 'fourth')).toBe(1);
    expect(res.getRecordCount()).toBe(2);
  });

  it('testDistinctFunctions', () => {
    const format = new TableFormat();
    format.addField('<f1><S><A=strval>');
    format.addField('<f2><I><A=456>');
    const table: DataTable = DataTableFactory.of(format);

    table.addRecord().setValue('f1', '1st record');
    table.addRecord().setValue('f1', '2nd record');
    table.addRecord().setValue('f1', '1st record');
    const rec = table.addRecord().setValue('f1', '1st record');
    rec.setValue('f2', 1);

    const res = new DistinctFunction().execute(ev, evaluationEnvironment, [table]);

    expect(res.getRecordCount()).toBe(3);
    expect(res.getRecord(0).getValue(0)).toBe('1st record');
    expect(res.getRecord(1).getValue(0)).toBe('2nd record');
    expect(res.getRecord(2).getValue(0)).toBe('1st record');
    expect(res.getRecord(2).getValue(1)).toBe(1);
  });
});
