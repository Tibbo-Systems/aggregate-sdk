import GenericActionCommand from './GenericActionCommand';
import DataTable from '../datatable/DataTable';
import RequestIdentifier from './RequestIdentifier';
import SimpleDataTable from '../datatable/SimpleDataTable';
import TableFormat from '../datatable/TableFormat';
import GenericActionResponse from './GenericActionResponse';
import DataRecord from '../datatable/DataRecord';

export default abstract class ProtocolHandler {
  public static readonly FIELD_ACTION_RESPONSE_PARAMETERS = 'parameters';
  private static readonly FIELD_ACTION_RESPONSE_REMEMBER: string = 'remember';
  private static readonly FIELD_ACTION_RESPONSE_REQUEST_ID: string = 'requestId';
  private static readonly FIELD_ACTION_COMMAND_TYPE: string = 'type';
  private static readonly FIELD_ACTION_COMMAND_TITLE: string = 'title';
  private static readonly FIELD_ACTION_COMMAND_PARAMETERS: string = 'parameters';
  private static readonly FIELD_ACTION_COMMAND_LAST: string = 'last';
  private static readonly FIELD_ACTION_COMMAND_BATCH_MEMBER: string = 'batchMember';
  private static readonly FIELD_ACTION_COMMAND_REQUEST_ID: string = 'requestId';

  private static readonly FORMAT_ACTION_COMMAND: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    ProtocolHandler.FORMAT_ACTION_COMMAND.addField('<' + ProtocolHandler.FIELD_ACTION_COMMAND_TYPE + '><S>');
    ProtocolHandler.FORMAT_ACTION_COMMAND.addField('<' + ProtocolHandler.FIELD_ACTION_COMMAND_TITLE + '><S><F=N>');
    ProtocolHandler.FORMAT_ACTION_COMMAND.addField('<' + ProtocolHandler.FIELD_ACTION_COMMAND_PARAMETERS + '><T><F=N>');
    ProtocolHandler.FORMAT_ACTION_COMMAND.addField('<' + ProtocolHandler.FIELD_ACTION_COMMAND_LAST + '><B>');
    ProtocolHandler.FORMAT_ACTION_COMMAND.addField('<' + ProtocolHandler.FIELD_ACTION_COMMAND_BATCH_MEMBER + '><B>');
    ProtocolHandler.FORMAT_ACTION_COMMAND.addField('<' + ProtocolHandler.FIELD_ACTION_COMMAND_REQUEST_ID + '><S><F=N>');
  }

  private static readonly FORMAT_ACTION_RESPONSE: TableFormat = new TableFormat(1, 1);

  static __static_initializer_1() {
    ProtocolHandler.FORMAT_ACTION_RESPONSE.addField('<' + ProtocolHandler.FIELD_ACTION_RESPONSE_PARAMETERS + '><T><F=N>');
    ProtocolHandler.FORMAT_ACTION_RESPONSE.addField('<' + ProtocolHandler.FIELD_ACTION_RESPONSE_REMEMBER + '><B>');
    ProtocolHandler.FORMAT_ACTION_RESPONSE.addField('<' + ProtocolHandler.FIELD_ACTION_RESPONSE_REQUEST_ID + '><S><F=N>');
  }

  private static _init = false;

  public static initialize() {
    if (ProtocolHandler._init) return;
    ProtocolHandler.__static_initializer_0();
    ProtocolHandler.__static_initializer_1();
    ProtocolHandler._init = true;
  }

  public static actionCommandFromDataTable(table: DataTable): GenericActionCommand | null {
    if (table.getRecordCount() == 0) {
      return null;
    }

    const type: string = table.rec().getString(ProtocolHandler.FIELD_ACTION_COMMAND_TYPE);

    const actionCmd: GenericActionCommand = new GenericActionCommand(type, table.rec().getString(ProtocolHandler.FIELD_ACTION_COMMAND_TITLE));

    actionCmd.setParameters(table.rec().getDataTable(ProtocolHandler.FIELD_ACTION_COMMAND_PARAMETERS));
    actionCmd.setLast(table.rec().getBoolean(ProtocolHandler.FIELD_ACTION_COMMAND_LAST));
    actionCmd.setBatchEntry(table.rec().getBoolean(ProtocolHandler.FIELD_ACTION_COMMAND_BATCH_MEMBER));

    const requestIdString: string = table.rec().getString(ProtocolHandler.FIELD_ACTION_COMMAND_REQUEST_ID);
    actionCmd.setRequestId(requestIdString && requestIdString.length > 0 ? new RequestIdentifier(requestIdString) : null);

    return actionCmd;
  }

  public static actionResponseToDataTable(response: GenericActionResponse | null): DataTable {
    const table: DataTable = new SimpleDataTable(ProtocolHandler.FORMAT_ACTION_RESPONSE);

    if (response == null) {
      return table;
    }

    const rec: DataRecord = table.addRecord();

    const responseRequestId = response.getRequestId();

    rec.setValue(ProtocolHandler.FIELD_ACTION_RESPONSE_PARAMETERS, response.getParameters());
    rec.setValue(ProtocolHandler.FIELD_ACTION_RESPONSE_REMEMBER, response.shouldRemember());
    rec.setValue(ProtocolHandler.FIELD_ACTION_RESPONSE_REQUEST_ID, responseRequestId != null ? responseRequestId.toString() : null);

    return table;
  }
}

ProtocolHandler.initialize();
