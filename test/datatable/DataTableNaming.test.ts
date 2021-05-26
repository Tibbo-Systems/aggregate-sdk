import DataTableFactory from '../../src/datatable/DataTableFactory';

import TableFormat from '../../src/datatable/TableFormat';

describe('TestDataTableNaming', () => {
  it('testGetDescription', async () => {
    const rf: TableFormat = new TableFormat();
    rf.addField('<f1><S>');
    rf.addField('<f2><S>');
    rf.addField('<b><B>');
    rf.setNamingExpression("{f1} + ' ' + ({b}?{f1}:{f2})");
    const dataTable = DataTableFactory.of(rf);

    dataTable.addRecord().addString('field1').addString('field2');

    let expectedReturn = 'field1 field2';
    let actualReturn: string = (await dataTable.getDescription()) as string;
    expect(actualReturn).toBe(expectedReturn);

    dataTable.rec().setValue('b', true);
    expectedReturn = 'field1 field1';
    actualReturn = (await dataTable.getDescription()) as string;
    expect(actualReturn).toBe(expectedReturn);
  });
});
