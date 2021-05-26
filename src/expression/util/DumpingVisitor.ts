import StringBuilder from '../../util/java/StringBuilder';

import { ParserRuleContext } from 'antlr4';
import ExpressionVisitorFacade from '../ExpressionVisitorFacade';
import AttributedObject from '../AttributedObject';

export default class DumpingVisitor extends ExpressionVisitorFacade {
  private indent = 0;
  private result = '';

  private indentString(): string {
    const sb = new StringBuilder();
    for (let i = 0; i < this.indent; ++i) {
      sb.append(' ');
    }
    return sb.toString();
  }

  public getResult(): string {
    return this.result;
  }

  private dumpNode(ctx: ParserRuleContext): AttributedObject {
    this.result += this.indentString() + ctx.constructor.name + '\n';
    ++this.indent;
    this.visitChildren(ctx);
    --this.indent;
    return new AttributedObject();
  }

  // Visit a parse tree produced by ExpressionGrammarParser#compilationUnit.
  public visitCompilationUnit(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  public visitLogicalAndNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseOrNode.
  public visitBitwiseOrNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseXorNode.
  public visitBitwiseXorNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#NENode.
  public visitNENode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ConditionalNode.
  public visitConditionalNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ModNode.
  public visitModNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LogicalNotNode.
  public visitLogicalNotNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#EQNode.
  public visitEQNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseAndNode.
  public visitBitwiseAndNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#GENode.
  public visitGENode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#UnsignedRightShiftNode.
  public visitUnsignedRightShiftNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#AddNode.
  public visitAddNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LTNode.
  public visitLTNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseNotNode.
  public visitBitwiseNotNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#SubtractNode.
  public visitSubtractNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#GTNode.
  public visitGTNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ValueReferenceNode.
  public visitValueReferenceNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#RegexMatchNode.
  public visitRegexMatchNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LiteralExpression.
  public visitLiteralExpression(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#FunctionNode.
  public visitFunctionNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#RightShiftNode.
  public visitRightShiftNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#DivNode.
  public visitDivNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LeftShiftNode.
  public visitLeftShiftNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ExpressionNode.
  public visitExpressionNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LENode.
  public visitLENode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LogicalOrNode.
  public visitLogicalOrNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#MulNode.
  public visitMulNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#UnaryNode.
  public visitUnaryNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#functionExpression.
  public visitFunctionExpression(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#valueReference.
  public visitValueReference(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LongConstNode.
  public visitLongConstNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#FloatConstNode.
  public visitFloatConstNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#StringConstNode.
  public visitStringConstNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#TrueNode.
  public visitTrueNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#FalseNode.
  public visitFalseNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#NullNode.
  public visitNullNode(ctx: ParserRuleContext): AttributedObject {
    return this.dumpNode(ctx);
  }
}
