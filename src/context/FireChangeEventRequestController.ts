import FireEventRequestController from '../event/FireEventRequestController';
import VariableDefinition from './VariableDefinition';
import DataTable from '../datatable/DataTable';
import AbstractContext from './AbstractContext';
import ClassicEncodingSettings from '../datatable/encoding/ClassicEncodingSettings';
import Event from '../data/Event';

export default class FireChangeEventRequestController extends FireEventRequestController {
  private readonly def: VariableDefinition;
  private readonly value: DataTable;

  constructor(customExpirationPeriod: number, def: VariableDefinition, value: DataTable) {
    super(customExpirationPeriod);
    this.def = def;
    this.value = value;
  }

  process(event: Event): Event | null {
    if (event.getExpirationtime() == null) {
      return null;
    }

    const fullValue = this.def.getFormat() == null ? this.value : null;
    event.getData().rec().setValue(AbstractContext.EF_CHANGE_VALUE, fullValue);

    const cs = new ClassicEncodingSettings(false);
    cs.setEncodeFieldNames(true);

    const dataOnly = this.def.getFormat() == null ? null : this.value.getEncodedDataFromEncodingSettings(cs);
    event.getData().rec().setValue(AbstractContext.EF_CHANGE_DATA, dataOnly);

    return event;
  }
}
