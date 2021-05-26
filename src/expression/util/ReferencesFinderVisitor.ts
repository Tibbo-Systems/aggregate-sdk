import ExpressionVisitorFacade from '../ExpressionVisitorFacade';
import { ParserRuleContext } from 'antlr4';
import AttributedObject from '../AttributedObject';
import Reference from '../Reference';
import Expression from '../Expression';
import ExpressionUtils from '../ExpressionUtils';

export default class ReferencesFinderVisitor extends ExpressionVisitorFacade {
  private readonly references = new Array<Reference>();

  visitValueReference(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    const ref = new Reference(ctx.getText());
    this.references.push(ref);
    for (const param of ref.getParameters()) {
      if (param instanceof Expression) {
        this.references.push(...ExpressionUtils.findReferences(param as Expression));
      }
    }
    return new AttributedObject();
  }

  getReferences(): Array<Reference> {
    return this.references;
  }
}
