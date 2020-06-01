import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
export default class XPathFunction extends AbstractFunction {
    static FIELD_NODE_NAME: string;
    static FIELD_NODE_CONTENT: string;
    static FIELD_NODE_CHILDREN: string;
    constructor();
    execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any;
}
