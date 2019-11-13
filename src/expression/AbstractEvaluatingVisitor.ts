import {ParserRuleContext} from "antlr4";
import AttributedObject from "./AttributedObject";
import Util from "../util/Util";
import ExpressionUtils from "./ExpressionUtils";

const AggregateExpressionVisitor = require('./parser/AggregateExpressionVisitor.js').AggregateExpressionVisitor;

export default class AbstractEvaluatingVisitor extends AggregateExpressionVisitor {

    protected top = -1;
    private readonly stack = new Array<AttributedObject | null>();

    protected set(delta: number, value: AttributedObject|null): void {
        this.top += delta;

        for (let i = this.stack.length; i <= this.top; i++) {
            this.stack.push(null);
        }

        this.stack[this.top] = value;
    }

    public getResult(): any {
        let result = this.get(0);
        this.top--;
        return result;
    }

    protected get(delta: number): AttributedObject | null {
        return this.stack.length === 0 ? null : this.stack[this.top + delta];
    }


    // Visit a parse tree produced by ExpressionGrammarParser#compilationUnit.
    public visitCompilationUnit(ctx: ParserRuleContext): AttributedObject | null {
        this.visitChildren(ctx);
        if (this.top == -1) // Empty expression
        {
            return null;
        } else {
            return this.get(0);
        }

    };

    public visitLogicalAndNode(ctx: ParserRuleContext): any {
        this.visit(ctx.getChild(0));

        const lao = this.get(0);

        const left = Util.convertToBoolean(ExpressionUtils.getValue(lao), true, false);

        if (!left)
        {
            this.set(0, ExpressionUtils.toAttributed(false, lao));
            return null;
        }

        this.visit(ctx.getChild(1));

        const rao = this.get(0);

        const right = Util.convertToBoolean(ExpressionUtils.getValue(rao), true, false);

        this.set(-1, ExpressionUtils.toAttributed(left && right, lao, rao));

        return null;
    };


// Visit a parse tree produced by ExpressionGrammarParser#BitwiseOrNode.
    public visitBitwiseOrNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#BitwiseXorNode.
    public visitBitwiseXorNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#NENode.
    public visitNENode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#ConditionalNode.
    public visitConditionalNode(ctx: ParserRuleContext): any {
        this.visit(ctx.getChild(0));

        let ao:AttributedObject|null = this.get(0);

        const condition = Util.convertToBoolean(ExpressionUtils.getValue(ao), true, false);

        if (condition)
        {
            this.visit(ctx.getChild(1));
        }
        else
        {
            this.visit(ctx.getChild(2));
        }

        this.set(-1, this.get(0));
        return null;
    };


// Visit a parse tree produced by ExpressionGrammarParser#ModNode.
    public visitModNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#LogicalNotNode.
    public visitLogicalNotNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#EQNode.
    public visitEQNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#BitwiseAndNode.
    public visitBitwiseAndNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#GENode.
    public visitGENode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#UnsignedRightShiftNode.
    public visitUnsignedRightShiftNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#AddNode.
    public visitAddNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#LTNode.
    public visitLTNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#BitwiseNotNode.
    public visitBitwiseNotNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#SubtractNode.
    public visitSubtractNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#GTNode.
    public visitGTNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#ValueReferenceNode.
    public visitValueReferenceNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#RegexMatchNode.
    public visitRegexMatchNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#LiteralExpression.
    public visitLiteralExpression(ctx: ParserRuleContext): any {
        return this.visitChildren(ctx);
    };


// Visit a parse tree produced by ExpressionGrammarParser#FunctionNode.
    public visitFunctionNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#RightShiftNode.
    public visitRightShiftNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#DivNode.
    public visitDivNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#LeftShiftNode.
    public visitLeftShiftNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#ExpressionNode.
    public visitExpressionNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#LENode.
    public visitLENode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#LogicalOrNode.
    public visitLogicalOrNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#MulNode.
    public visitMulNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#UnaryNode.
    public visitUnaryNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#functionExpression.
    public visitFunctionExpression(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#valueReference.
    public visitValueReference(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#LongConstNode.
    public visitLongConstNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#FloatConstNode.
    public visitFloatConstNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#StringConstNode.
    public visitStringConstNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#TrueNode.
    public visitTrueNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#FalseNode.
    public visitFalseNode(ctx: ParserRuleContext): any {

    };


// Visit a parse tree produced by ExpressionGrammarParser#NullNode.
    public visitNullNode(ctx: ParserRuleContext): any {

    };

}