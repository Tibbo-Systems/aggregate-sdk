import { ParserRuleContext } from 'antlr4';
import AttributedObject from './AttributedObject';
import AggregateExpressionVisitor from './parser/AggregateExpressionVisitor';

export default class ExpressionVisitorFacade extends AggregateExpressionVisitor {
  public visitChildren(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    //TODO SMELL CODE
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return super.visitChildren(ctx);
  }

  public visit(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    //TODO SMELL CODE
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return super.visit(ctx);
  }

  public visitCompilationUnit(ctx: ParserRuleContext): Promise<AttributedObject | null> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#LogicalAndNode.
  public visitLogicalAndNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#BitwiseOrNode.
  public visitBitwiseOrNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#BitwiseXorNode.
  public visitBitwiseXorNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#NENode.
  public visitNENode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#ConditionalNode.
  public visitConditionalNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#ModNode.
  public visitModNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#LogicalNotNode.
  public visitLogicalNotNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#EQNode.
  public visitEQNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#BitwiseAndNode.
  public visitBitwiseAndNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#GENode.
  public visitGENode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#UnsignedRightShiftNode.
  public visitUnsignedRightShiftNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#AddNode.
  public visitAddNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#LTNode.
  public visitLTNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#BitwiseNotNode.
  public visitBitwiseNotNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#SubtractNode.
  public visitSubtractNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#GTNode.
  public visitGTNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#ValueReferenceNode.
  public visitValueReferenceNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#RegexMatchNode.
  public visitRegexMatchNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#LiteralExpression.
  public visitLiteralExpression(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#FunctionNode.
  public visitFunctionNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#RightShiftNode.
  public visitRightShiftNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#DivNode.
  public visitDivNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#LeftShiftNode.
  public visitLeftShiftNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#ExpressionNode.
  public visitExpressionNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#LENode.
  public visitLENode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#LogicalOrNode.
  public visitLogicalOrNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#MulNode.
  public visitMulNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#UnaryNode.
  public visitUnaryNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#functionExpression.
  public visitFunctionExpression(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#functionReferenceExpression.
  public visitFunctionReferenceExpression(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#actionReferenceExpression.
  public visitActionReferenceExpression(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#eventReferenceExpression.
  public visitEventReferenceExpression(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#referenceSchema.
  public visitReferenceSchema(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#referenceServer.
  public visitReferenceServer(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#referenceContextMask.
  public visitReferenceContextMask(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#referenceEntity.
  public visitReferenceEntity(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#referenceRow.
  public visitReferenceRow(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#referenceProperty.
  public visitReferenceProperty(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#valueReference.
  public visitValueReference(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#arguments.
  public visitArguments(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#agIdentifier.
  public visitAgIdentifier(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by AggregateExpressionParser#LongConstNode.
  public visitLongConstNode(ctx: ParserRuleContext): AttributedObject {
    return new AttributedObject();
  }

  // Visit a parse tree produced by AggregateExpressionParser#FloatConstNode.
  public visitFloatConstNode(ctx: ParserRuleContext): AttributedObject {
    return new AttributedObject();
  }

  // Visit a parse tree produced by AggregateExpressionParser#StringConstNode.
  public visitStringConstNode(ctx: ParserRuleContext): AttributedObject {
    return new AttributedObject();
  }

  // Visit a parse tree produced by AggregateExpressionParser#TrueNode.
  public visitTrueNode(ctx: ParserRuleContext): AttributedObject {
    return new AttributedObject();
  }

  // Visit a parse tree produced by AggregateExpressionParser#FalseNode.
  public visitFalseNode(ctx: ParserRuleContext): AttributedObject {
    return new AttributedObject();
  }

  // Visit a parse tree produced by AggregateExpressionParser#NullNode.
  public visitNullNode(ctx: ParserRuleContext): AttributedObject {
    return new AttributedObject();
  }
}
