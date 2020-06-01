import TableFormat from '../../src/datatable/TableFormat';
import StaticTestUtils from './StaticTestUtils';
import DataTable from '../../src/datatable/DataTable';
import DataTableConversion from '../../src/datatable/DataTableConversion';
import GageBean from './GageBean';
import GageGageBean from './GageGageBean';
import DataTableFactory from '../../src/datatable/DataTableFactory';
import Data from '../../src/data/Data';
import ByteBuffer from 'bytebuffer';
import MegaGageBean from './MegaGageBean';

class GageCreator {
  private static initGageCreator = false;

  public static GG_TEST_TABLE_FORMAT: TableFormat;

  private static initializeGageCreator0() {
    GageCreator.GG_TEST_TABLE_FORMAT = StaticTestUtils.TEST_TABLE_FORMAT.clone();
    GageCreator.GG_TEST_TABLE_FORMAT.addField('<gages><T>');
  }

  public static initializeGageCreator() {
    if (GageCreator.initGageCreator) {
      return;
    }

    GageCreator.initializeGageCreator0();
    GageCreator.initGageCreator = true;
  }

  public static getGageBean(): GageBean {
    const gageTable: DataTable = StaticTestUtils.createTestDataTable(false, 1);
    return DataTableConversion.beanFromTable(gageTable, GageBean, StaticTestUtils.TEST_TABLE_FORMAT, true) as GageBean;
  }

  public static getGageBeanList(count: number): Array<GageBean> {
    const gageTable: DataTable = StaticTestUtils.createTestDataTable(false, count);
    return DataTableConversion.beansFromTable(gageTable, GageBean, StaticTestUtils.TEST_TABLE_FORMAT, true) as Array<GageBean>;
  }
}

GageCreator.initializeGageCreator();

describe('TestDataTableConversion', () => {
  it('testGageBeanConversion', () => {
    const gage: GageBean = GageCreator.getGageBean();

    const gageTable: DataTable = DataTableConversion.beanToTable(gage, StaticTestUtils.TEST_TABLE_FORMAT);
    const blackSheep: GageBean = DataTableConversion.beanFromTable(gageTable, GageBean, StaticTestUtils.TEST_TABLE_FORMAT, true);
    const blackSheepTable: DataTable = DataTableConversion.beanToTable(blackSheep, StaticTestUtils.TEST_TABLE_FORMAT);

    expect(gageTable.equals(blackSheepTable)).toBeTruthy();
  });

  it('testSeveralGageBeanConversion', () => {
    const beans: Array<GageBean> = GageCreator.getGageBeanList(5);
    const gageTable: DataTable = DataTableConversion.beansToTable(beans, StaticTestUtils.TEST_TABLE_FORMAT, true);
    const blackSheeps: Array<any> = DataTableConversion.beansFromTable(gageTable, GageBean, StaticTestUtils.TEST_TABLE_FORMAT, true);
    const blackSheepsTable: DataTable = DataTableConversion.beansToTable(blackSheeps, StaticTestUtils.TEST_TABLE_FORMAT, true);

    expect(gageTable.equals(blackSheepsTable)).toBeTruthy();
  });

  it('testWrappedGageBeanConversion', () => {
    const ggb: GageGageBean = new GageGageBean();
    ggb.setBooleanField(true);
    ggb.setString('assa');
    ggb.setIntField(444);
    const data: Data = new Data(ByteBuffer.fromUTF8('rrr'));
    data.setName('rrr');
    ggb.setData(data);
    ggb.setDate(new Date());
    ggb.setDoubleField(777);
    ggb.setLongField(863);
    ggb.setFloatField(135);
    ggb.setTable(DataTableFactory.of());
    // ggb.setColor(Color.MAGENTA);
    const gageBeans: Array<GageBean> = new Array<GageBean>();
    gageBeans.push(GageCreator.getGageBean());
    ggb.setGage(gageBeans);

    const ggbTable: DataTable = DataTableConversion.beanToTable(ggb, GageCreator.GG_TEST_TABLE_FORMAT);
    const blackSheep: GageBean = DataTableConversion.beanFromTable(ggbTable, GageGageBean, GageCreator.GG_TEST_TABLE_FORMAT, true) as GageBean;
    const blackSheepTable: DataTable = DataTableConversion.beanToTable(blackSheep, GageCreator.GG_TEST_TABLE_FORMAT);

    expect(ggbTable.equals(blackSheepTable)).toBeTruthy();
  });

  it('testAgregateBean', () => {
    const gageBean: GageBean = GageCreator.getGageBean();
    const sourceDt: DataTable = DataTableConversion.beanToTable(gageBean, StaticTestUtils.TEST_TABLE_FORMAT);
    const ab: MegaGageBean = MegaGageBean.fromGageBean(gageBean);

    const blackSheep: MegaGageBean = DataTableConversion.beanFromTable(ab.toDataTable(), MegaGageBean, StaticTestUtils.TEST_TABLE_FORMAT, true);

    expect(sourceDt.equals(blackSheep.toDataTable())).toBeTruthy();
  });
});
