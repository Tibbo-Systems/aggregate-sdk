import FireEventRequestController from '../event/FireEventRequestController';
import VariableDefinition from './VariableDefinition';
import DataTable from '../datatable/DataTable';
import Event from '../data/Event';
export default class FireChangeEventRequestController extends FireEventRequestController {
    private readonly def;
    private readonly value;
    constructor(customExpirationPeriod: number, def: VariableDefinition, value: DataTable);
    process(event: Event): Event | null;
}
