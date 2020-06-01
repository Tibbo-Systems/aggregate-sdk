import AbstractEvaluatingVisitor from './AbstractEvaluatingVisitor';
import { ParserRuleContext } from 'antlr4';
import Evaluator from './Evaluator';
import EvaluationEnvironment from './EvaluationEnvironment';
import Reference from './Reference';
import Cres from '../Cres';
import ExpressionUtils from './ExpressionUtils';
import MessageFormat from '../util/java/MessageFormat';
import AttributedObject from './AttributedObject';

export default class DefaultEvaluatingVisitor extends AbstractEvaluatingVisitor {
  constructor(evaluator: Evaluator, environment: EvaluationEnvironment) {
    super(evaluator, environment);
  }

  visitValueReferenceNode(ctx: ParserRuleContext): AttributedObject {
    const r = (ctx as any).reference;
    let ref;
    if (!r) {
      ref = new Reference(ctx.getChild(1).getText());
      (ctx as any).reference = ref;
    } else {
      ref = r as Reference;
    }

    try {
      const resolver = this.evaluator.getResolver(ref.getSchema());

      if (resolver == null) {
        throw new Error(Cres.get().getString('exprNoResolverForSchema') + ref.getSchema());
      }

      return ExpressionUtils.toAttributed(resolver.resolveReference(ref, this.environment));
    } catch (ex) {
      throw new Error(MessageFormat.format(Cres.get().getString('exprErrResolvingReference'), ref) + ex.message + ex.stackTrace);
    }
  }
}
