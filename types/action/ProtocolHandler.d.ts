import GenericActionCommand from './GenericActionCommand';
import DataTable from '../datatable/DataTable';
import GenericActionResponse from './GenericActionResponse';
export default abstract class ProtocolHandler {
    static readonly FIELD_ACTION_RESPONSE_PARAMETERS = "parameters";
    private static readonly FIELD_ACTION_RESPONSE_REMEMBER;
    private static readonly FIELD_ACTION_RESPONSE_REQUEST_ID;
    private static readonly FIELD_ACTION_COMMAND_TYPE;
    private static readonly FIELD_ACTION_COMMAND_TITLE;
    private static readonly FIELD_ACTION_COMMAND_PARAMETERS;
    private static readonly FIELD_ACTION_COMMAND_LAST;
    private static readonly FIELD_ACTION_COMMAND_BATCH_MEMBER;
    private static readonly FIELD_ACTION_COMMAND_REQUEST_ID;
    private static readonly FORMAT_ACTION_COMMAND;
    static __static_initializer_0(): void;
    private static readonly FORMAT_ACTION_RESPONSE;
    static __static_initializer_1(): void;
    private static _init;
    static initialize(): void;
    static actionCommandFromDataTable(table: DataTable): GenericActionCommand | null;
    static actionResponseToDataTable(response: GenericActionResponse | null): DataTable;
}
