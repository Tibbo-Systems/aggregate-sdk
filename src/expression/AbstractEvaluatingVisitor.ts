import { ParserRuleContext } from 'antlr4';
import AttributedObject from './AttributedObject';
import Util from '../util/Util';
import ExpressionUtils from './ExpressionUtils';
import Evaluator from './Evaluator';
import Function from './functions/Function';
import SubstringFunction from './functions/string/SubstringFunction';
import Functions from './functions/Functions';
import Cres from '../Cres';
import MessageFormat from '../util/java/MessageFormat';
import EvaluationEnvironment from './EvaluationEnvironment';
import CatchFunction from './functions/other/CatchFunction';
import IntegerFunction from './functions/type/IntegerFunction';
import FloatFunction from './functions/type/FloatFunction';

const AggregateExpressionVisitor = require('./parser/AggregateExpressionVisitor.js').AggregateExpressionVisitor;

export default class AbstractEvaluatingVisitor extends AggregateExpressionVisitor {
  public static DEFAULT_FUNCTIONS = new Map<string, Function>();

  private static __static_init = false;

  public static _static_init() {
    if (AbstractEvaluatingVisitor.__static_init) return;

    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SUBSTRING, new SubstringFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.CATCH, new CatchFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.INTEGER, new IntegerFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.FLOAT, new FloatFunction());

    AbstractEvaluatingVisitor.__static_init = true;
  }

  private static registerDefaultFunction(name: string, impl: Function): void {
    if (AbstractEvaluatingVisitor.DEFAULT_FUNCTIONS.has(name)) {
      throw new Error('Function already registered:' + name);
    }

    AbstractEvaluatingVisitor.DEFAULT_FUNCTIONS.set(name, impl);
  }

  protected top = -1;
  private readonly stack = new Array<AttributedObject | null>();
  private evaluator: Evaluator;
  private environment: EvaluationEnvironment;

  constructor(evaluator: Evaluator, environment: EvaluationEnvironment) {
    super();
    AbstractEvaluatingVisitor._static_init();
    this.evaluator = evaluator;
    this.environment = environment;
  }

  protected set(delta: number, value: AttributedObject | null): void {
    this.top += delta;

    for (let i = this.stack.length; i <= this.top; i++) {
      this.stack.push(null);
    }

    this.stack[this.top] = value;
  }

  public getResult(): any {
    const result = this.get(0);
    this.top--;
    return result;
  }

  protected get(delta: number): AttributedObject | null {
    return this.stack.length === 0 ? null : this.stack[this.top + delta];
  }

  // Visit a parse tree produced by ExpressionGrammarParser#compilationUnit.
  public visitCompilationUnit(ctx: ParserRuleContext): AttributedObject | null {
    this.visitChildren(ctx);
    if (this.top == -1) {
      // Empty expression
      return null;
    } else {
      return this.get(0);
    }
  }

  public visitLogicalAndNode(ctx: ParserRuleContext): any {
    this.visit(ctx.getChild(0));

    const lao = this.get(0);

    const left = Util.convertToBoolean(ExpressionUtils.getValue(lao), true, false);

    if (!left) {
      this.set(0, ExpressionUtils.toAttributed(false, lao));
      return null;
    }

    this.visit(ctx.getChild(2));

    const rao = this.get(0);

    const right = Util.convertToBoolean(ExpressionUtils.getValue(rao), true, false);

    this.set(-1, ExpressionUtils.toAttributed(left && right, lao, rao));

    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseOrNode.
  public visitBitwiseOrNode(ctx: ParserRuleContext): any {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left | right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseXorNode.
  public visitBitwiseXorNode(ctx: ParserRuleContext): any {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left ^ right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#NENode.
  public visitNENode(ctx: ParserRuleContext): any {
    this.visitChildren(ctx);

    const lao = this.get(-1);
    const rao = this.get(0);
    this.set(-1, ExpressionUtils.toAttributed(!Util.equals(ExpressionUtils.getValue(lao), ExpressionUtils.getValue(rao)), lao, rao));
    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ConditionalNode.
  public visitConditionalNode(ctx: ParserRuleContext): any {
    this.visit(ctx.getChild(0));

    const ao: AttributedObject | null = this.get(0);

    const condition = Util.convertToBoolean(ExpressionUtils.getValue(ao), true, false);

    if (condition) {
      this.visit(ctx.getChild(2));
    } else {
      this.visit(ctx.getChild(4));
    }

    this.set(-1, this.get(0));
    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ModNode.
  public visitModNode(ctx: ParserRuleContext): any {
    this.visitChildren(ctx);

    const lao = this.get(-1);
    const rao = this.get(0);

    const left = Util.convertToNumber(ExpressionUtils.getValue(lao), false, true);
    const right = Util.convertToNumber(ExpressionUtils.getValue(rao), false, true);

    if (left == null || right == null) {
      this.set(-1, null);
      return null;
    }

    this.set(-1, ExpressionUtils.toAttributed(Math.trunc(left) % Math.trunc(right), lao, rao));
    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LogicalNotNode.
  public visitLogicalNotNode(ctx: ParserRuleContext): any {
    this.visitChildren(ctx);
    const lao = this.get(0);
    const left = Util.convertToBoolean(ExpressionUtils.getValue(lao), true, false);

    this.set(0, ExpressionUtils.toAttributed(!left, lao));
    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#EQNode.
  public visitEQNode(ctx: ParserRuleContext): any {
    this.visitChildren(ctx);
    const lao = this.get(-1);
    const rao = this.get(0);
    this.set(-1, ExpressionUtils.toAttributed(Util.equals(ExpressionUtils.getValue(lao), ExpressionUtils.getValue(rao)), lao, rao));
    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseAndNode.
  public visitBitwiseAndNode(ctx: ParserRuleContext): any {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left & right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#GENode.
  public visitGENode(ctx: ParserRuleContext): any {
    return this.visitEqualityOperators(ctx, res => res >= 0);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#UnsignedRightShiftNode.
  public visitUnsignedRightShiftNode(ctx: ParserRuleContext): any {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left >>> right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#AddNode.
  public visitAddNode(ctx: ParserRuleContext): any {
    this.visitChildren(ctx);

    const lao = this.get(-1);
    const rao = this.get(0);

    const lo = ExpressionUtils.getValue(lao);
    const ro = ExpressionUtils.getValue(rao);
    if (Util.isString(lo) && Util.isString(ro)) {
      this.set(-1, ExpressionUtils.toAttributed(lo + ro, lao, rao));
    } else {
      if (Util.isString(lo) || Util.isString(ro)) {
        const s1 = lo != null ? lo.toString() : '';
        const s2 = ro != null ? ro.toString() : '';
        this.set(-1, ExpressionUtils.toAttributed(s1 + s2, lao, rao));
      } else {
        const left = Util.convertToNumber(lo, false, true);
        const right = Util.convertToNumber(ro, false, true);

        if (left == null || right == null) {
          this.set(-1, ExpressionUtils.toAttributed(null));
          return null;
        }

        //TODO FIX NUMBER TYPES
        this.set(-1, ExpressionUtils.toAttributed(left + right, lao, rao));
      }
    }
    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LTNode.
  public visitLTNode(ctx: ParserRuleContext): any {
    return this.visitEqualityOperators(ctx, res => res < 0);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseNotNode.
  public visitBitwiseNotNode(ctx: ParserRuleContext): any {
    this.visitChildren(ctx);
    const ao = this.get(0);
    const val = Util.convertToNumber(ExpressionUtils.getValue(ao), false, true);

    if (val == null) {
      this.set(0, ExpressionUtils.toAttributed(null));
      return null;
    }
    // TODO FIX NUMBER TYPES
    this.set(0, ExpressionUtils.toAttributed(~val, ao));
    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#SubtractNode.
  public visitSubtractNode(ctx: ParserRuleContext): any {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left - right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#GTNode.
  public visitGTNode(ctx: ParserRuleContext): any {
    return this.visitEqualityOperators(ctx, res => res > 0);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ValueReferenceNode.
  public visitValueReferenceNode(ctx: ParserRuleContext): any {}

  // Visit a parse tree produced by ExpressionGrammarParser#RegexMatchNode.
  public visitRegexMatchNode(ctx: ParserRuleContext): any {
    this.visitChildren(ctx);

    const lao = this.get(-1);
    const rao = this.get(0);

    const left = ExpressionUtils.getValue(lao);
    const right = ExpressionUtils.getValue(rao);
    if (left == null || right == null) {
      return ExpressionUtils.toAttributed(false, lao, rao);
    }
    this.set(-1, ExpressionUtils.toAttributed(left.toString().match(right.toString()), lao, rao));
    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LiteralExpression.
  public visitLiteralExpression(ctx: ParserRuleContext): any {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#FunctionNode.
  public visitFunctionNode(ctx: ParserRuleContext): any {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#RightShiftNode.
  public visitRightShiftNode(ctx: ParserRuleContext): any {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left >> right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#DivNode.
  public visitDivNode(ctx: ParserRuleContext): any {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left / right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LeftShiftNode.
  public visitLeftShiftNode(ctx: ParserRuleContext): any {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left << right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ExpressionNode.
  public visitExpressionNode(ctx: ParserRuleContext): any {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LENode.
  public visitLENode(ctx: ParserRuleContext): any {
    return this.visitEqualityOperators(ctx, res => res <= 0);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LogicalOrNode.
  public visitLogicalOrNode(ctx: ParserRuleContext): any {
    this.visit(ctx.getChild(0));

    const lao = this.get(0);

    const left = Util.convertToBoolean(ExpressionUtils.getValue(lao), true, false);

    if (left) {
      this.set(0, ExpressionUtils.toAttributed(true, lao));
      return null;
    }

    this.visit(ctx.getChild(2));

    const rao = this.get(0);

    const right = Util.convertToBoolean(ExpressionUtils.getValue(rao), true, false);

    this.set(-1, ExpressionUtils.toAttributed(left || right, lao, rao));

    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#MulNode.
  public visitMulNode(ctx: ParserRuleContext): any {
    this.visitBinaryOperators(ctx, (left, right) => {
      return left * right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#UnaryNode.
  public visitUnaryNode(ctx: ParserRuleContext): any {
    this.visitChildren(ctx);
    const ao = this.get(0);
    const val = Util.convertToNumber(ExpressionUtils.getValue(ao), false, true);

    if (val == null) {
      this.set(0, ExpressionUtils.toAttributed(null));
      return null;
    }
    // TODO FIX NUMBER TYPES
    this.set(0, ExpressionUtils.toAttributed(-val, ao));
  }

  // Visit a parse tree produced by ExpressionGrammarParser#functionExpression.
  public visitFunctionExpression(ctx: ParserRuleContext): any {
    const functionName = this.visit(ctx.getChild(0));

    const params = ctx.getChild(1) as ParserRuleContext;

    let countArguments = 0;

    for (let i = 0; i < params.getChildCount(); i++) {
      if (params.getChild(i) instanceof ParserRuleContext) countArguments++;
    }

    if (Functions.CATCH === functionName) {
      const lastTop = this.top;
      try {
        this.visit(params.getChild(1));
        return null;
      } catch (ex) {
        if (countArguments > 1) {
          this.top = lastTop;
          this.visit(params.getChild(3));
          return null;
        } else {
          this.top = lastTop + 1;
          this.set(0, ExpressionUtils.toAttributed(ex.message != null ? ex.message : ex.toString()));
          return null;
        }
      }
    }

    this.visit(ctx.getChild(1));

    const parameters = new Array<AttributedObject>();

    for (let i = 0; i < countArguments; i++) {
      parameters.push(this.get(i - countArguments + 1) as AttributedObject);
    }

    let fi = AbstractEvaluatingVisitor.DEFAULT_FUNCTIONS.get(functionName);

    if (!fi) {
      fi = this.evaluator.getCustomFunction(functionName);
    }

    if (fi == null) {
      throw new Error(Cres.get().getString('exprUnknownFunction') + functionName);
    }
    try {
      const result = fi.executeAttributed(this.evaluator, this.environment, parameters);
      this.set(1 - parameters.length, result);
    } catch (ex) {
      throw new Error(MessageFormat.format(Cres.get().getString('exprErrExecutingFunction'), functionName) + ex.message);
    }

    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#valueReference.
  public visitValueReference(ctx: ParserRuleContext): any {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LongConstNode.
  public visitLongConstNode(ctx: ParserRuleContext): any {
    const term = this.visit(ctx.getChild(0));
    this.set(1, ExpressionUtils.toAttributed(Number.parseInt(term)));
    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#FloatConstNode.
  public visitFloatConstNode(ctx: ParserRuleContext): any {
    const term = this.visit(ctx.getChild(0));
    this.set(1, ExpressionUtils.toAttributed(Number.parseFloat(term)));
    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#StringConstNode.
  public visitStringConstNode(ctx: ParserRuleContext): any {
    const term = this.visit(ctx.getChild(0));
    this.set(1, ExpressionUtils.toAttributed(term.substring(1, term.length - 1).replace(/\\"/g, '"')));
    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#TrueNode.
  public visitTrueNode(ctx: ParserRuleContext): any {
    this.set(1, ExpressionUtils.toAttributed(true));
    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#FalseNode.
  public visitFalseNode(ctx: ParserRuleContext): any {
    this.set(1, ExpressionUtils.toAttributed(false));
    return null;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#NullNode.
  public visitNullNode(ctx: ParserRuleContext): any {
    this.set(1, ExpressionUtils.toAttributed(null));
    return null;
  }

  public visitTerminal(ctx: ParserRuleContext): any {
    return ctx.getText();
  }

  private visitBinaryOperators(ctx: ParserRuleContext, operator: (lao: number, rao: number) => any): null {
    this.visitChildren(ctx);

    const lao = this.get(-1);
    const rao = this.get(0);

    const left = Util.convertToNumber(ExpressionUtils.getValue(lao), false, true);
    const right = Util.convertToNumber(ExpressionUtils.getValue(rao), false, true);

    if (left == null || right == null) {
      this.set(-1, ExpressionUtils.toAttributed(null));
      return null;
    }
    //TODO FIX NUMBER TYPES
    this.set(-1, ExpressionUtils.toAttributed(operator(left, right), lao, rao));
    return null;
  }

  private visitEqualityOperators(ctx: ParserRuleContext, comparator: (res: number) => boolean): null {
    this.visitChildren(ctx);
    const lao = this.get(-1);
    const rao = this.get(0);
    this.set(-1, ExpressionUtils.toAttributed(comparator(Util.compareTo(ExpressionUtils.getValue(lao), ExpressionUtils.getValue(rao))), lao, rao));
    return null;
  }
}
