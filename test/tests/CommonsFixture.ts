import Evaluator from '../../src/expression/Evaluator';
import DataTable from '../../src/datatable/DataTable';
import TableFormat from '../../src/datatable/TableFormat';
import SimpleDataTable from '../../src/datatable/SimpleDataTable';

export default class CommonsFixture {
  public static createTestEvaluator(): Evaluator {
    return new Evaluator(null, null, CommonsFixture.createTestTable());
  }

  public static createTestTable(): DataTable {
    const rf = new TableFormat(5, 10);

    rf.addField('<str><S><A=test>');
    rf.addField('<int><I><A=123>');
    rf.addField('<bool><B><A=1>');

    const table = new SimpleDataTable(rf);

    table.addRecordWith('test', 123, true);
    table.addRecordWith('second', 222, true);
    table.addRecordWith('third', -111, false);
    table.addRecordWith('fourth', 444, false);
    table.addRecordWith('fifth', 666, true);
    table.addRecordWith('sixth', -7, true);
    table.addRecordWith('seventh', 7, false);

    return table;
  }
}
