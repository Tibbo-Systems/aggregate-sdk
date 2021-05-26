import ExpressionVisitorFacade from '../ExpressionVisitorFacade';
import { ParserRuleContext } from 'antlr4';
import AttributedObject from '../AttributedObject';
import Reference from '../Reference';
export default class ReferencesFinderVisitor extends ExpressionVisitorFacade {
    private readonly references;
    visitValueReference(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject;
    getReferences(): Array<Reference>;
}
