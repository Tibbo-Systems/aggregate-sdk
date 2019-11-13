import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import GenericActionResponse from '../GenericActionResponse';
import DataTable from '../../datatable/DataTable';
export default class Confirm extends GenericActionCommand {
    static readonly CF_MESSAGE: string;
    static readonly CF_OPTION_TYPE: string;
    static readonly CF_MESSAGE_TYPE: string;
    static readonly RF_OPTION: string;
    static readonly CFT_CONFIRM: TableFormat;
    static __static_initializer_0(): void;
    private static _init;
    static initialize(): void;
    static readonly RFT_CONFIRM: TableFormat;
    private message;
    private optionType;
    private messageType;
    constructor();
    static createDefault(): Confirm;
    static createConfirmWithDataTable(title: string, parameters: DataTable): Confirm;
    static createConfirm(title: string, message: string, optionType: number, messageType: number): Confirm;
    createDefaultResponse(): GenericActionResponse;
    getMessage(): string | null;
    getOptionType(): number | null;
    getMessageType(): number | null;
    setMessage(message: string): void;
    setOptionType(optionType: number): void;
    setMessageType(messageType: number): void;
}
