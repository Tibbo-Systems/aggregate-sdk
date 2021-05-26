import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Expression from '../../Expression';
import DataTable from '../../../datatable/DataTable';
export default class FilterFunction extends AbstractFunction {
    constructor();
    asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any>;
    asyncExecuteSimpleDataTableCase(source: DataTable, filter: Expression, evaluator: Evaluator): Promise<any>;
    isAsync(): boolean;
}
