// Generated from src/expression/grammar/AggregateExpression.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by AggregateExpressionParser.

function AggregateExpressionVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

AggregateExpressionVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
AggregateExpressionVisitor.prototype.constructor = AggregateExpressionVisitor;

// Visit a parse tree produced by AggregateExpressionParser#compilationUnit.
AggregateExpressionVisitor.prototype.visitCompilationUnit = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#LogicalAndNode.
AggregateExpressionVisitor.prototype.visitLogicalAndNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#BitwiseOrNode.
AggregateExpressionVisitor.prototype.visitBitwiseOrNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#BitwiseXorNode.
AggregateExpressionVisitor.prototype.visitBitwiseXorNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#NENode.
AggregateExpressionVisitor.prototype.visitNENode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#ConditionalNode.
AggregateExpressionVisitor.prototype.visitConditionalNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#ModNode.
AggregateExpressionVisitor.prototype.visitModNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#LogicalNotNode.
AggregateExpressionVisitor.prototype.visitLogicalNotNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#EQNode.
AggregateExpressionVisitor.prototype.visitEQNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#BitwiseAndNode.
AggregateExpressionVisitor.prototype.visitBitwiseAndNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#GENode.
AggregateExpressionVisitor.prototype.visitGENode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#UnsignedRightShiftNode.
AggregateExpressionVisitor.prototype.visitUnsignedRightShiftNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#AddNode.
AggregateExpressionVisitor.prototype.visitAddNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#LTNode.
AggregateExpressionVisitor.prototype.visitLTNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#BitwiseNotNode.
AggregateExpressionVisitor.prototype.visitBitwiseNotNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#SubtractNode.
AggregateExpressionVisitor.prototype.visitSubtractNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#GTNode.
AggregateExpressionVisitor.prototype.visitGTNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#ValueReferenceNode.
AggregateExpressionVisitor.prototype.visitValueReferenceNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#RegexMatchNode.
AggregateExpressionVisitor.prototype.visitRegexMatchNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#LiteralExpression.
AggregateExpressionVisitor.prototype.visitLiteralExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#FunctionNode.
AggregateExpressionVisitor.prototype.visitFunctionNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#RightShiftNode.
AggregateExpressionVisitor.prototype.visitRightShiftNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#DivNode.
AggregateExpressionVisitor.prototype.visitDivNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#LeftShiftNode.
AggregateExpressionVisitor.prototype.visitLeftShiftNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#ExpressionNode.
AggregateExpressionVisitor.prototype.visitExpressionNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#LENode.
AggregateExpressionVisitor.prototype.visitLENode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#LogicalOrNode.
AggregateExpressionVisitor.prototype.visitLogicalOrNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#MulNode.
AggregateExpressionVisitor.prototype.visitMulNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#UnaryNode.
AggregateExpressionVisitor.prototype.visitUnaryNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#functionExpression.
AggregateExpressionVisitor.prototype.visitFunctionExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#functionReferenceExpression.
AggregateExpressionVisitor.prototype.visitFunctionReferenceExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#actionReferenceExpression.
AggregateExpressionVisitor.prototype.visitActionReferenceExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#eventReferenceExpression.
AggregateExpressionVisitor.prototype.visitEventReferenceExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#referenceSchema.
AggregateExpressionVisitor.prototype.visitReferenceSchema = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#referenceServer.
AggregateExpressionVisitor.prototype.visitReferenceServer = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#referenceContextMask.
AggregateExpressionVisitor.prototype.visitReferenceContextMask = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#referenceEntity.
AggregateExpressionVisitor.prototype.visitReferenceEntity = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#referenceRow.
AggregateExpressionVisitor.prototype.visitReferenceRow = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#referenceProperty.
AggregateExpressionVisitor.prototype.visitReferenceProperty = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#valueReference.
AggregateExpressionVisitor.prototype.visitValueReference = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#arguments.
AggregateExpressionVisitor.prototype.visitArguments = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#agIdentifier.
AggregateExpressionVisitor.prototype.visitAgIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#LongConstNode.
AggregateExpressionVisitor.prototype.visitLongConstNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#FloatConstNode.
AggregateExpressionVisitor.prototype.visitFloatConstNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#StringConstNode.
AggregateExpressionVisitor.prototype.visitStringConstNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#TrueNode.
AggregateExpressionVisitor.prototype.visitTrueNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#FalseNode.
AggregateExpressionVisitor.prototype.visitFalseNode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by AggregateExpressionParser#NullNode.
AggregateExpressionVisitor.prototype.visitNullNode = function(ctx) {
  return this.visitChildren(ctx);
};



exports.AggregateExpressionVisitor = AggregateExpressionVisitor;