import AggreGateBean from '../../src/datatable/AggreGateBean';
import GageBean from './GageBean';
import TableFormat from '../../src/datatable/TableFormat';
import DataRecord from '../../src/datatable/DataRecord';
import StaticTestUtils from './StaticTestUtils';
import DataTable from '../../src/datatable/DataTable';
import Data from '../../src/data/Data';

export default class MegaGageBean extends AggreGateBean {
  private gageBean: GageBean | null = this.getGageBean();

  constructor(format?: TableFormat, data?: DataRecord) {
    super(format ? format : StaticTestUtils.TEST_TABLE_FORMAT, data);
  }

  public static fromGageBean(gageBean: GageBean, format?: TableFormat): MegaGageBean {
    const bean: MegaGageBean = new MegaGageBean(format);
    bean.gageBean = gageBean;
    return bean;
  }

  public getIntField(): number {
    return this.getGageBean().getIntField();
  }

  public setIntField(intField: number) {
    this.getGageBean().setIntField(intField);
  }

  public getStr(): string | null {
    return this.getGageBean().getString();
  }

  public setStr(str: string | null) {
    this.getGageBean().setString(str);
  }

  public getFloatField(): number {
    return this.getGageBean().getFloatField();
  }

  public setFloatField(floatField: number) {
    this.getGageBean().setFloatField(floatField);
  }

  public getTable(): DataTable | null {
    return this.getGageBean().getTable();
  }

  public setTable(table: DataTable | null) {
    this.getGageBean().setTable(table);
  }

  public getBooleanField(): boolean {
    return this.getGageBean().isBooleanField();
  }

  public setBooleanField(booleanField: boolean) {
    this.getGageBean().setBooleanField(booleanField);
  }

  public getLongField(): number {
    return this.getGageBean().getLongField();
  }

  public setLongField(longField: number) {
    this.getGageBean().setLongField(longField);
  }

  public getDoubleField(): number {
    return this.getGageBean().getDoubleField();
  }

  public setDoubleField(doubleField: number) {
    this.getGageBean().setDoubleField(doubleField);
  }

  public getDate(): Date | null {
    return this.getGageBean().getDate();
  }

  public setDate(date: Date | null) {
    this.getGageBean().setDate(date);
  }

  public getData(): Data | null {
    return this.getGageBean().getData();
  }

  public setData(data: Data | null) {
    this.getGageBean().setData(data);
  }

  public getGageBean(): GageBean {
    if (this.gageBean == null) {
      this.gageBean = new GageBean();
    }
    return this.gageBean;
  }
}
