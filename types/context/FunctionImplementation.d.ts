import Context from './Context';
import DataTable from '../datatable/DataTable';
import CallerController from './CallerController';
import RequestController from './RequestController';
import FunctionDefinition from './FunctionDefinition';
export default interface FunctionImplementation {
    execute(con: Context<any, any>, def: FunctionDefinition, parameters: DataTable, caller?: CallerController, request?: RequestController): DataTable | null;
}
