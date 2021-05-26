import AbstractEvaluatingVisitor from './AbstractEvaluatingVisitor';
import { ParserRuleContext } from 'antlr4';
import Evaluator from './Evaluator';
import EvaluationEnvironment from './EvaluationEnvironment';
import AttributedObject from './AttributedObject';
export default class DefaultEvaluatingVisitor extends AbstractEvaluatingVisitor {
    constructor(evaluator: Evaluator, environment: EvaluationEnvironment);
    visitValueReferenceNode(ctx: ParserRuleContext): Promise<AttributedObject>;
}
