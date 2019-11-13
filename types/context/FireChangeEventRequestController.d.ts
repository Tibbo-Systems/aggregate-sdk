import FireEventRequestController from '../event/FireEventRequestController';
import VariableDefinition from './VariableDefinition';
import DataTable from '../datatable/DataTable';
export default class FireChangeEventRequestController extends FireEventRequestController {
    private readonly def;
    private readonly value;
    constructor(customExpirationPeriod: number, def: VariableDefinition, value: DataTable);
}
