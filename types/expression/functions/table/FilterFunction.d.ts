import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Expression from '../../Expression';
import DataTable from '../../../datatable/DataTable';
import SimpleDataTable from '../../../datatable/SimpleDataTable';
export default class FilterFunction extends AbstractFunction {
    constructor();
    execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any;
    executeSimpleDataTableCase(source: DataTable, filter: Expression, evaluator: Evaluator): SimpleDataTable;
}
