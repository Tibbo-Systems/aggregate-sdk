import DataTable from '../datatable/DataTable';
import GenericActionCommand from './GenericActionCommand';
export default class ActionCommandFactory {
    static createActionCommand(type: string, title: string, parameters: DataTable): GenericActionCommand;
}
