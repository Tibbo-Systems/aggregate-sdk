import StringBuilder from '../util/java/StringBuilder';

import { ParserRuleContext } from 'antlr4';

const AggregateExpressionVisitor = require('./parser/AggregateExpressionVisitor.js').AggregateExpressionVisitor;

export default class DumperVisitor extends AggregateExpressionVisitor {
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

  private dumpNode(ctx: ParserRuleContext) {
    this.result += this.indentString() + ctx.constructor.name + '\n';
    ++this.indent;
    this.visitChildren(ctx);
    --this.indent;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#compilationUnit.
  public visitCompilationUnit(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  public visitLogicalAndNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseOrNode.
  public visitBitwiseOrNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseXorNode.
  public visitBitwiseXorNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#NENode.
  public visitNENode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ConditionalNode.
  public visitConditionalNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ModNode.
  public visitModNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LogicalNotNode.
  public visitLogicalNotNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#EQNode.
  public visitEQNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseAndNode.
  public visitBitwiseAndNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#GENode.
  public visitGENode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#UnsignedRightShiftNode.
  public visitUnsignedRightShiftNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#AddNode.
  public visitAddNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LTNode.
  public visitLTNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseNotNode.
  public visitBitwiseNotNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#SubtractNode.
  public visitSubtractNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#GTNode.
  public visitGTNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ValueReferenceNode.
  public visitValueReferenceNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#RegexMatchNode.
  public visitRegexMatchNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LiteralExpression.
  public visitLiteralExpression(ctx: ParserRuleContext) {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#FunctionNode.
  public visitFunctionNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#RightShiftNode.
  public visitRightShiftNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#DivNode.
  public visitDivNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LeftShiftNode.
  public visitLeftShiftNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ExpressionNode.
  public visitExpressionNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LENode.
  public visitLENode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LogicalOrNode.
  public visitLogicalOrNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#MulNode.
  public visitMulNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#UnaryNode.
  public visitUnaryNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#functionExpression.
  public visitFunctionExpression(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#valueReference.
  public visitValueReference(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LongConstNode.
  public visitLongConstNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#FloatConstNode.
  public visitFloatConstNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#StringConstNode.
  public visitStringConstNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#TrueNode.
  public visitTrueNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#FalseNode.
  public visitFalseNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#NullNode.
  public visitNullNode(ctx: ParserRuleContext) {
    this.dumpNode(ctx);
  }
}
