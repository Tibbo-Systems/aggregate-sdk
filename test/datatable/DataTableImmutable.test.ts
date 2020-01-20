import TableFormat from '../../src/datatable/TableFormat';
import ClassicEncodingSettings from '../../src/datatable/encoding/ClassicEncodingSettings';
import DataTableFactory from '../../src/datatable/DataTableFactory';
import DataTable from '../../src/datatable/DataTable';

const createDataTable = () => {
  const format: TableFormat = TableFormat.createWithFormatAndSettings('<<type><S>><<devices><T><A=<F=<<devicePath><S><A=><D=Device Path>>><R=<aaa>><R=<bbb>>>>', new ClassicEncodingSettings(true));
  return DataTableFactory.createWithFirstRecord(format, 3);
};

describe('TestDataTableImmutable', () => {
  it('testThrowsExceptionOnScalarField', () => {
    const dataTable: DataTable = createDataTable();

    dataTable.makeImmutable();

    expect(() => dataTable.rec().setValue('type', 'new value')).toThrow();
  });

  it('testThrowsExceptionOnSubtableField', () => {
    const dataTable = createDataTable();

    dataTable.makeImmutable();

    const deicesTable: DataTable = dataTable.rec().getDataTable('devices');

    expect(() => deicesTable.rec().setValue('devicesPath', 'new device path')).toThrow('Immutable');
  });
});
