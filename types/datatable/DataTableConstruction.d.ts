import TableFormat from './TableFormat';
import Evaluator from '../expression/Evaluator';
import EvaluationEnvironment from '../expression/EvaluationEnvironment';
import DataTable from './DataTable';
export default class DataTableConstruction {
    static constructTable(parameters: Array<any>, format: TableFormat | null, evaluator: Evaluator | null, environment: EvaluationEnvironment): DataTable;
    private static resolveParameters;
    private static fillDataTable;
}
