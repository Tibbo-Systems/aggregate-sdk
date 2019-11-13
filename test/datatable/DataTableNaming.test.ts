import TableFormat from '../../src/datatable/TableFormat';
import DataTableFactory from '../../src/datatable/DataTableFactory';
import DataTable from '../../src/datatable/DataTable';

const createTable = () => {
  const rf: TableFormat = new TableFormat();
  rf.addField('<f1><S>');
  rf.addField('<f2><S>');
  rf.addField('<b><B>');
  rf.setNamingExpression("{f1} + ' ' + ({b}?{f1}:{f2})");
  return DataTableFactory.of(rf);
};

describe('TestDataTableNaming', () => {
  it('testGetDescription', () => {
    //TODO fix this after adding expression language
    /* const dataTable: DataTable = createTable();
        dataTable.addRecord().addString("field1").addString("field2");

        let expectedReturn: string = "field1 field2";
        let actualReturn: string = dataTable.getDescription() as string;
        expect(actualReturn).toBe(expectedReturn);

        dataTable.rec().setValue("b", true);
        expectedReturn = "field1 field1";
        actualReturn = dataTable.getDescription() as string;
        expect(actualReturn).toBe(expectedReturn);*/
  });
});
