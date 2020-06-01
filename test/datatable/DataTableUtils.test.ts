import TableFormat from '../../src/datatable/TableFormat';
import DataTable from '../../src/datatable/DataTable';
import DataTableFactory from '../../src/datatable/DataTableFactory';
import DataTableReplication from '../../src/datatable/DataTableReplication';

describe('TestDataTableUtils', () => {
  it('testCopyWithKeysFieldsAndSort', () => {
    const rf1: TableFormat = new TableFormat();
    rf1.addField('<st><S><F=K>');
    rf1.addField('<val><I>');
    const master: DataTable = DataTableFactory.of(rf1);

    master.addRecord().addString('line1').addInt(11);
    master.addRecord().addString('line2').addInt(33);
    master.addRecord().addString('line3').addInt(22);
    master.addRecord().addString('line4').addInt(44);

    const rf2: TableFormat = new TableFormat(0, 10);
    rf2.addField('<st><S><F=K>');
    rf2.addField('<va><I>');
    rf2.addField('<test><I><A=555>');
    const slave: DataTable = DataTableFactory.of(rf2);

    slave.addRecord().addString('line4').addInt(11).addInt(111);
    slave.addRecord().addString('line3').addInt(22).addInt(222);
    slave.addRecord().addString('line2').addInt(11).addInt(111);
    slave.addRecord().addString('line1').addInt(22).addInt(222);

    DataTableReplication.copy(master, slave, false, true, true);

    expect(4 === master.getRecordCount()).toBeTruthy();
    expect(4 === slave.getRecordCount()).toBeTruthy();

    expect(slave.getRecord(0).getString('st')).toBe('line4');
    expect(slave.getRecord(1).getString('st')).toBe('line3');
    expect(slave.getRecord(2).getString('st')).toBe('line2');
    expect(slave.getRecord(3).getString('st')).toBe('line1');
  });

  it('testCopyWithoutKeysFields', () => {
    const rf: TableFormat = new TableFormat();
    rf.addField('<st><S>');
    rf.addField('<val><I>');
    const master: DataTable = DataTableFactory.of(rf);

    master.addRecord().addString('line1').addInt(11);
    master.addRecord().addString('line2').addInt(22);
    master.addRecord().addString('line3').addInt(33);
    master.addRecord().addString('line4').addInt(44);

    const rf2: TableFormat = new TableFormat(0, 10);
    rf2.addField('<st><S>');
    rf2.addField('<val><I>');
    rf2.addField('<test><I><A=555>');
    const slave: DataTable = DataTableFactory.of(rf2);

    slave.addRecord().addString('xxx1').addInt(111).addInt(111);
    slave.addRecord().addString('xxx2').addInt(222).addInt(222);
    slave.addRecord().addString('xxx3').addInt(333).addInt(333);

    DataTableReplication.copy(master, slave);

    expect(4 === master.getRecordCount()).toBeTruthy();
    expect(4 === slave.getRecordCount()).toBeTruthy();

    expect(slave.getRecord(0).getString('st')).toBe('line1');
    expect(slave.getRecord(3).getInt('test')).toBe(555);

    expect(master.getRecord(1).getString('st')).toBe('line2');
  });
});
