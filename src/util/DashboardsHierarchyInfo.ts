import AggreGateBean from '../datatable/AggreGateBean';
import TableFormat from '../datatable/TableFormat';
import DataRecord from '../datatable/DataRecord';

export default class DashboardsHierarchyInfo extends AggreGateBean {
  public static FORMAT: TableFormat = new TableFormat(1, 1);

  public constructor(data?: DataRecord) {
    super(DashboardsHierarchyInfo.FORMAT, data);
  }
}
