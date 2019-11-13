import FireEventRequestController from '../event/FireEventRequestController';
import VariableDefinition from './VariableDefinition';
import DataTable from '../datatable/DataTable';

export default class FireChangeEventRequestController extends FireEventRequestController {
  private readonly def: VariableDefinition;
  private readonly value: DataTable;

  constructor(customExpirationPeriod: number, def: VariableDefinition, value: DataTable) {
    super(customExpirationPeriod);
    this.def = def;
    this.value = value;
  }
}
