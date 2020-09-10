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
import UrlEncodeFunction from './functions/string/UrlEncodeFunction';
import UrlDecodeFunction from './functions/string/UrlDecodeFunction';
import ContainsFunction from './functions/string/ContainsFunction';
import EndWithFunction from './functions/string/EndWithFunction';
import IndexOfFunction from './functions/string/IndexOfFunction';
import IsDigitFunction from './functions/string/IsDigitFunction';
import IsLetterFunction from './functions/string/IsLetterFunction';
import IsLowerCaseFunction from './functions/string/IsLowerCaseFunction';
import IsUpperCaseFunction from './functions/string/IsUpperCaseFunction';
import IsWhitespaceFunction from './functions/string/IsWhitespaceFunction';
import LastIndexOfFunction from './functions/string/LastIndexOfFunction';
import LengthFunction from './functions/string/LengthFunction';
import ToLowerCaseFunction from './functions/string/ToLowerCaseFunction';
import ReplaceFunction from './functions/string/ReplaceFunction';
import StartsWithFunction from './functions/string/StartsWithFunction';
import TrimFunction from './functions/string/TrimFunction';
import ToUpperCaseFunction from './functions/string/ToUpperCaseFunction';
import DataBlockFunction from './functions/string/DataBlockFunction';
import EqFunction from './functions/number/EqFunction';
import GeFunction from './functions/number/GeFunction';
import GtFunction from './functions/number/GtFunction';
import LeFunction from './functions/number/LeFunction';
import LtFunction from './functions/number/LtFunction';
import NeFunction from './functions/number/NeFunction';
import BooleanFunction from './functions/type/BooleanFunction';
import DoubleFunction from './functions/type/DoubleFunction';
import FetchDataBlockFunction from './functions/type/FetchDataBlockFunction';
import LongFunction from './functions/type/LongFunction';
import StringFunction from './functions/type/StringFunction';
import TimestampFunction from './functions/type/TimestampFunction';
import EvaluateFunction from './functions/other/EvaluateFunction';
import FormatFunction from './functions/other/FormatFunction';
import GroupsFunction from './functions/other/GroupsFunction';
import LdFunction from './functions/other/LdFunction';
import LoginFunction from './functions/other/LoginFunction';
import SleepFunction from './functions/other/SleepFunction';
import StFunction from './functions/other/StFunction';
import TableFromCSVFunction from './functions/other/TableFromCSVFunction';
import TableFromJSONFunction from './functions/other/TableFromJSONFunction';
import TraceFunction from './functions/other/TraceFunction';
import UserFunction from './functions/other/UserFunction';
import XPathFunction from './functions/other/XPathFunction';
import DtFunction from './functions/context/DtFunction';
import AvailableFunction from './functions/context/AvailableFunction';
import CallFunctionFunction from './functions/context/CallFunctionFunction';
import DcFunction from './functions/context/DcFunction';
import DrFunction from './functions/context/DrFunction';
import EventAvailableFunction from './functions/context/EventAvailableFunction';
import EventFormatFunction from './functions/context/EventFormatFunction';
import EventGroupFunction from './functions/context/EventGroupFunction';
import FireEventFunction from './functions/context/FireEventFunction';
import FullDescriptionFunction from './functions/context/FullDescriptionFunction';
import FunctionAvailableFunction from './functions/context/FunctionAvailableFunction';
import FunctionGroupFunction from './functions/context/FunctionGroupFunction';
import FunctionInputFormatFunction from './functions/context/FunctionInputFormatFunction';
import FunctionOutputFormatFunction from './functions/context/FunctionOutputFormatFunction';
import GetVariableFunction from './functions/context/GetVariableFunction';
import SetVariableFieldFunction from './functions/context/SetVariableFieldFunction';
import SetVariableFunction from './functions/context/SetVariableFunction';
import SetVariableRecordFunction from './functions/context/SetVariableRecordFunction';
import VariableAvailableFunction from './functions/context/VariableAvailableFunction';
import VariableFormatFunction from './functions/context/VariableFormatFunction';
import VariableGroupFunction from './functions/context/VariableGroupFunction';
import VariableReadableFunction from './functions/context/VariableReadableFunction';
import VariableWritableFunction from './functions/context/VariableWritableFunction';
import AddRecordsFunction from './functions/table/AddRecordsFunction';
import AdjustRecordLimitsFunction from './functions/table/AdjustRecordLimitsFunction';
import AggregateFunction from './functions/table/AggregateFunction';
import CellFunction from './functions/table/CellFunction';
import ClearFunction from './functions/table/ClearFunction';
import ConvertFunction from './functions/table/ConvertFunction';
import CopyFunction from './functions/table/CopyFunction';
import DecodeFunction from './functions/table/DecodeFunction';
import DescribeFunction from './functions/table/DescribeFunction';
import DescriptionFunction from './functions/table/DescriptionFunction';
import EncodeFunction from './functions/table/EncodeFunction';
import FilterFunction from './functions/table/FilterFunction';
import GetFormatFunction from './functions/table/GetFormatFunction';
import HasFieldFunction from './functions/table/HasFieldFunction';
import JoinFunction from './functions/table/JoinFunction';
import PrintFunction from './functions/table/PrintFunction';
import RecordsFunction from './functions/table/RecordsFunction';
import RemoveColumnsFunction from './functions/table/RemoveColumnsFunction';
import RemoveRecordsFunction from './functions/table/RemoveRecordsFunction';
import SelectFunction from './functions/table/SelectFunction';
import SetFunction from './functions/table/SetFunction';
import SetMultipleFunction from './functions/table/SetMultipleFunction';
import SortFunction from './functions/table/SortFunction';
import TableFunction from './functions/table/TableFunction';
import UnionFunction from './functions/table/UnionFunction';
import ExpressionVisitorFacade from './ExpressionVisitorFacade';
import IntersectFunction from './functions/table/IntersectFunction';
import DistinctFunction from './functions/table/DistinctFunction';

const AggregateExpressionVisitor = require('./parser/AggregateExpressionVisitor.js').AggregateExpressionVisitor;

const unescapeJs = require('unescape-js');

export default abstract class AbstractEvaluatingVisitor extends ExpressionVisitorFacade {
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static DEFAULT_FUNCTIONS = new Map<string, Function>();

  private static __static_init = false;

  public static _static_init() {
    if (AbstractEvaluatingVisitor.__static_init) return;

    /**
     * Type functions
     */
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.INTEGER, new IntegerFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.FLOAT, new FloatFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.BOOLEAN, new BooleanFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DOUBLE, new DoubleFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.FETCH_DATA_BLOCK, new FetchDataBlockFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.LONG, new LongFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.STRING, new StringFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.TIMESTAMP, new TimestampFunction());

    /**
     * Context functions
     */
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DT, new DtFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.AVAILABLE, new AvailableFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.CALL_FUNCTION, new CallFunctionFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DC, new DcFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DR, new DrFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.EVENT_AVAILABLE, new EventAvailableFunction(Functions.GROUP_CONTEXT_RELATED));
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.EVENT_FORMAT, new EventFormatFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.EVENT_GROUP, new EventGroupFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.FIRE_EVENT, new FireEventFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.FULL_DESCRIPTION, new FullDescriptionFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.FUNCTION_AVAILABLE, new FunctionAvailableFunction(Functions.GROUP_CONTEXT_RELATED));
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.FUNCTION_GROUP, new FunctionGroupFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.FUNCTION_INPUT_FORMAT, new FunctionInputFormatFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.FUNCTION_OUTPUT_FORMAT, new FunctionOutputFormatFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.GET_VARIABLE, new GetVariableFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SET_VARIABLE_FIELD, new SetVariableFieldFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SET_VARIABLE, new SetVariableFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SET_VARIABLE_RECORD, new SetVariableRecordFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.VARIABLE_AVAILABLE, new VariableAvailableFunction(Functions.GROUP_CONTEXT_RELATED));
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.VARIABLE_FORMAT, new VariableFormatFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.VARIABLE_GROUP, new VariableGroupFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.VARIABLE_READABLE, new VariableReadableFunction(Functions.GROUP_CONTEXT_RELATED));
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.VARIABLE_WRITABLE, new VariableWritableFunction(Functions.GROUP_CONTEXT_RELATED));

    /**
     * String functions
     */
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SUBSTRING, new SubstringFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.CONTAINS, new ContainsFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.ENDS_WITH, new EndWithFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.INDEX, new IndexOfFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.IS_DIGIT, new IsDigitFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.IS_LETTER, new IsLetterFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.IS_LOWER_CASE, new IsLowerCaseFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.IS_UPPER_CASE, new IsUpperCaseFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.IS_WHITESPACE, new IsWhitespaceFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.LAST_INDEX, new LastIndexOfFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.LENGTH, new LengthFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.LOWER, new ToLowerCaseFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.REPLACE, new ReplaceFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.STARTS_WITH, new StartsWithFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.TRIM, new TrimFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.UPPER, new ToUpperCaseFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.URL_ENCODE, new UrlEncodeFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.URL_DECODE, new UrlDecodeFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DATA_BLOCK, new DataBlockFunction());

    /**
     * Number functions
     */
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.EQ, new EqFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.GE, new GeFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.GT, new GtFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.LE, new LeFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.LT, new LtFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.NE, new NeFunction());

    /**
     * Table functions
     */
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.ADD_COLUMNS, new AddRecordsFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.ADD_RECORDS, new AddRecordsFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.ADJUST_RECORD_LIMITS, new AdjustRecordLimitsFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.AGGREGATE, new AggregateFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.CELL, new CellFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.CLEAR, new ClearFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.CONVERT, new ConvertFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.COPY, new CopyFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DECODE, new DecodeFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DESCRIBE, new DescribeFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DESCRIPTION, new DescriptionFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.ENCODE, new EncodeFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.FILTER, new FilterFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.GET_FORMAT, new GetFormatFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.HAS_FIELD, new HasFieldFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.JOIN, new JoinFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.PRINT, new PrintFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.RECORDS, new RecordsFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.REMOVE_COLUMNS, new RemoveColumnsFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.REMOVE_RECORDS, new RemoveRecordsFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SELECT, new SelectFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SET, new SetFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SET_MULTIPLE, new SetMultipleFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SORT, new SortFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.TABLE, new TableFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.UNION, new UnionFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DISTINCT, new DistinctFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.INTERSECT, new IntersectFunction());

    /**
     * Other functions
     */
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.CATCH, new CatchFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.EVALUATE, new EvaluateFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.FORMAT, new FormatFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.GROUPS, new GroupsFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.LD, new LdFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.LOGIN, new LoginFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SLEEP, new SleepFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.ST, new StFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.TABLE_FROM_CSV, new TableFromCSVFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.TABLE_FROM_JSON, new TableFromJSONFunction(Functions.GROUP_OTHER));
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.TRACE, new TraceFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.USER, new UserFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.XPATH, new XPathFunction());

    AbstractEvaluatingVisitor.__static_init = true;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private static registerDefaultFunction(name: string, impl: Function): void {
    if (AbstractEvaluatingVisitor.DEFAULT_FUNCTIONS.has(name)) {
      throw new Error('Function already registered:' + name);
    }

    AbstractEvaluatingVisitor.DEFAULT_FUNCTIONS.set(name, impl);
  }

  protected readonly evaluator: Evaluator;
  protected readonly environment: EvaluationEnvironment;

  constructor(evaluator: Evaluator, environment: EvaluationEnvironment) {
    super();
    AbstractEvaluatingVisitor._static_init();
    this.evaluator = evaluator;
    this.environment = environment;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#compilationUnit.
  public visitCompilationUnit(ctx: ParserRuleContext): AttributedObject | null {
    if (ctx.getChildCount() === 1) return null;
    return this.visit(ctx.getChild(0));
  }

  public visitLogicalAndNode(ctx: ParserRuleContext): AttributedObject {
    const lao = this.visit(ctx.getChild(0));

    const left = Util.convertToBoolean(ExpressionUtils.getValue(lao), true, false);

    if (!left) {
      return ExpressionUtils.toAttributed(false, lao);
    }

    const rao = this.visit(ctx.getChild(2));

    const right = Util.convertToBoolean(ExpressionUtils.getValue(rao), true, false);

    return ExpressionUtils.toAttributed(left && right, lao, rao);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseOrNode.
  public visitBitwiseOrNode(ctx: ParserRuleContext): AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left | right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseXorNode.
  public visitBitwiseXorNode(ctx: ParserRuleContext): AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left ^ right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#NENode.
  public visitNENode(ctx: ParserRuleContext): AttributedObject {
    this.visitChildren(ctx);

    const lao = this.visit(ctx.getChild(0));
    const rao = this.visit(ctx.getChild(2));
    return ExpressionUtils.toAttributed(!Util.equals(ExpressionUtils.getValue(lao), ExpressionUtils.getValue(rao)), lao, rao);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ConditionalNode.
  public visitConditionalNode(ctx: ParserRuleContext): AttributedObject {
    const ao = this.visit(ctx.getChild(0));

    const condition = Util.convertToBoolean(ExpressionUtils.getValue(ao), true, false);

    if (condition) {
      return this.visit(ctx.getChild(2));
    } else {
      return this.visit(ctx.getChild(4));
    }
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ModNode.
  public visitModNode(ctx: ParserRuleContext): AttributedObject {
    this.visitChildren(ctx);

    const lao = this.visit(ctx.getChild(0));
    const rao = this.visit(ctx.getChild(2));

    const left = Util.convertToNumber(ExpressionUtils.getValue(lao), false, true);
    const right = Util.convertToNumber(ExpressionUtils.getValue(rao), false, true);

    if (left == null || right == null) {
      return ExpressionUtils.toAttributed(null);
    }

    return ExpressionUtils.toAttributed(Math.trunc(left) % Math.trunc(right), lao, rao);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LogicalNotNode.
  public visitLogicalNotNode(ctx: ParserRuleContext): AttributedObject {
    const lao = this.visit(ctx.getChild(1));
    const left = Util.convertToBoolean(ExpressionUtils.getValue(lao), true, false);

    return ExpressionUtils.toAttributed(!left, lao);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#EQNode.
  public visitEQNode(ctx: ParserRuleContext): AttributedObject {
    const lao = this.visit(ctx.getChild(0));
    const rao = this.visit(ctx.getChild(2));
    return ExpressionUtils.toAttributed(Util.equals(ExpressionUtils.getValue(lao), ExpressionUtils.getValue(rao)), lao, rao);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseAndNode.
  public visitBitwiseAndNode(ctx: ParserRuleContext): AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left & right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#GENode.
  public visitGENode(ctx: ParserRuleContext): AttributedObject {
    return this.visitEqualityOperators(ctx, (res) => res >= 0);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#UnsignedRightShiftNode.
  public visitUnsignedRightShiftNode(ctx: ParserRuleContext): AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left >>> right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#AddNode.
  public visitAddNode(ctx: ParserRuleContext): AttributedObject {
    const lao = this.visit(ctx.getChild(0));
    const rao = this.visit(ctx.getChild(2));

    const lo = ExpressionUtils.getValue(lao);
    const ro = ExpressionUtils.getValue(rao);
    if (Util.isString(lo) && Util.isString(ro)) {
      return ExpressionUtils.toAttributed(lo + ro, lao, rao);
    } else {
      if (Util.isString(lo) || Util.isString(ro)) {
        const s1 = lo != null ? lo.toString() : '';
        const s2 = ro != null ? ro.toString() : '';
        return ExpressionUtils.toAttributed(s1 + s2, lao, rao);
      } else {
        const left = Util.convertToNumber(lo, false, true);
        const right = Util.convertToNumber(ro, false, true);

        if (left == null || right == null) {
          return ExpressionUtils.toAttributed(null);
        }

        //TODO FIX NUMBER TYPES
        return ExpressionUtils.toAttributed(left + right, lao, rao);
      }
    }
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LTNode.
  public visitLTNode(ctx: ParserRuleContext): AttributedObject {
    return this.visitEqualityOperators(ctx, (res) => res < 0);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseNotNode.
  public visitBitwiseNotNode(ctx: ParserRuleContext): AttributedObject {
    const ao = this.visit(ctx.getChild(1));

    const val = Util.convertToNumber(ExpressionUtils.getValue(ao), false, true);

    if (val == null) {
      return ExpressionUtils.toAttributed(null);
    }
    // TODO FIX NUMBER TYPES
    return ExpressionUtils.toAttributed(~val, ao);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#SubtractNode.
  public visitSubtractNode(ctx: ParserRuleContext): AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left - right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#GTNode.
  public visitGTNode(ctx: ParserRuleContext): AttributedObject {
    return this.visitEqualityOperators(ctx, (res) => res > 0);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ValueReferenceNode.
  public abstract visitValueReferenceNode(ctx: ParserRuleContext): AttributedObject;

  // Visit a parse tree produced by ExpressionGrammarParser#RegexMatchNode.
  public visitRegexMatchNode(ctx: ParserRuleContext): AttributedObject {
    const lao = this.visit(ctx.getChild(0));
    const rao = this.visit(ctx.getChild(2));

    const left = ExpressionUtils.getValue(lao);
    const right = ExpressionUtils.getValue(rao);
    if (left == null || right == null) {
      return ExpressionUtils.toAttributed(rao, lao, rao);
    }
    return ExpressionUtils.toAttributed(left.toString().match(right.toString()), lao, rao);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LiteralExpression.
  public visitLiteralExpression(ctx: ParserRuleContext): AttributedObject {
    return this.visit(ctx.getChild(0));
  }

  // Visit a parse tree produced by ExpressionGrammarParser#FunctionNode.
  public visitFunctionNode(ctx: ParserRuleContext): AttributedObject {
    return this.visit(ctx.getChild(0));
  }

  // Visit a parse tree produced by ExpressionGrammarParser#RightShiftNode.
  public visitRightShiftNode(ctx: ParserRuleContext): AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left >> right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#DivNode.
  public visitDivNode(ctx: ParserRuleContext): AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left / right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LeftShiftNode.
  public visitLeftShiftNode(ctx: ParserRuleContext): AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left << right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ExpressionNode.
  public visitExpressionNode(ctx: ParserRuleContext): AttributedObject {
    return this.visit(ctx.getChild(1));
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LENode.
  public visitLENode(ctx: ParserRuleContext): AttributedObject {
    return this.visitEqualityOperators(ctx, (res) => res <= 0);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LogicalOrNode.
  public visitLogicalOrNode(ctx: ParserRuleContext): AttributedObject {
    const lao = this.visit(ctx.getChild(0));

    const left = Util.convertToBoolean(ExpressionUtils.getValue(lao), true, false);

    if (left) {
      return ExpressionUtils.toAttributed(true, lao);
    }

    const rao = this.visit(ctx.getChild(2));

    const right = Util.convertToBoolean(ExpressionUtils.getValue(rao), true, false);

    return ExpressionUtils.toAttributed(left || right, lao, rao);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#MulNode.
  public visitMulNode(ctx: ParserRuleContext): AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left * right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#UnaryNode.
  public visitUnaryNode(ctx: ParserRuleContext): AttributedObject {
    const ao = this.visit(ctx.getChild(1));
    const val = Util.convertToNumber(ExpressionUtils.getValue(ao), false, true);

    if (val == null) {
      return ExpressionUtils.toAttributed(null);
    }
    // TODO FIX NUMBER TYPES
    return ExpressionUtils.toAttributed(-val, ao);
  }

  public visitArguments(ctx: ParserRuleContext): Array<AttributedObject> {
    const parameters = new Array<AttributedObject>();
    for (let i = 0; i < ctx.getChildCount(); i++) {
      if (ctx.getChild(i) instanceof ParserRuleContext) parameters.push(this.visit(ctx.getChild(i)));
    }
    return parameters;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#functionExpression.
  public visitFunctionExpression(ctx: ParserRuleContext): AttributedObject {
    const functionName = this.visit(ctx.getChild(0));

    const params = ctx.getChild(1) as ParserRuleContext;

    let countArguments = 0;

    for (let i = 0; i < params.getChildCount(); i++) {
      if (params.getChild(i) instanceof ParserRuleContext) countArguments++;
    }

    if (Functions.CATCH === functionName) {
      try {
        this.visit(params.getChild(1));
        return ExpressionUtils.toAttributed(null);
      } catch (ex) {
        if (countArguments > 1) {
          return this.visit(params.getChild(3));
        } else {
          return ExpressionUtils.toAttributed(ex.message != null ? ex.message : ex.toString());
        }
      }
    }

    const parameters = this.visit(ctx.getChild(1));

    let fi = AbstractEvaluatingVisitor.DEFAULT_FUNCTIONS.get(functionName);

    if (!fi) {
      fi = this.evaluator.getCustomFunction(functionName);
    }

    if (fi == null) {
      throw new Error(Cres.get().getString('exprUnknownFunction') + functionName);
    }
    try {
      return fi.executeAttributed(this.evaluator, this.environment, parameters);
    } catch (ex) {
      throw new Error(MessageFormat.format(Cres.get().getString('exprErrExecutingFunction'), functionName) + ex.message);
    }
  }

  // Visit a parse tree produced by ExpressionGrammarParser#valueReference.
  public visitValueReference(ctx: ParserRuleContext): AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LongConstNode.
  public visitLongConstNode(ctx: ParserRuleContext): AttributedObject {
    const term = this.visit(ctx.getChild(0));
    let num = 0;
    if (term.startsWith('0x') || term.startsWith('0X')) num = Number.parseInt(term.substring(2), 16);
    else if (term.startsWith('0b') || term.startsWith('0B')) num = Number.parseInt(term.substring(2), 2);
    else if (term.startsWith('0')) num = Number.parseInt(term.substring(1), 8);
    else num = Number.parseInt(term);
    return ExpressionUtils.toAttributed(num);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#FloatConstNode.
  public visitFloatConstNode(ctx: ParserRuleContext): AttributedObject {
    const term = this.visit(ctx.getChild(0));
    return ExpressionUtils.toAttributed(Number.parseFloat(term));
  }

  // Visit a parse tree produced by ExpressionGrammarParser#StringConstNode.
  public visitStringConstNode(ctx: ParserRuleContext): AttributedObject {
    let term = this.visit(ctx.getChild(0));
    term = term.substring(1, term.length - 1);
    return ExpressionUtils.toAttributed(unescapeJs(term));
  }

  // Visit a parse tree produced by ExpressionGrammarParser#TrueNode.
  public visitTrueNode(ctx: ParserRuleContext): AttributedObject {
    return ExpressionUtils.toAttributed(true);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#FalseNode.
  public visitFalseNode(ctx: ParserRuleContext): AttributedObject {
    return ExpressionUtils.toAttributed(false);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#NullNode.
  public visitNullNode(ctx: ParserRuleContext): AttributedObject {
    return ExpressionUtils.toAttributed(null);
  }

  public visitTerminal(ctx: ParserRuleContext): string {
    return ctx.getText();
  }

  private visitBinaryOperators(ctx: ParserRuleContext, operator: (lao: number, rao: number) => any): AttributedObject {
    const lao = this.visit(ctx.getChild(0));
    const rao = this.visit(ctx.getChild(2));
    const left = Util.convertToNumber(ExpressionUtils.getValue(lao), false, true);
    const right = Util.convertToNumber(ExpressionUtils.getValue(rao), false, true);

    if (left == null || right == null) {
      return ExpressionUtils.toAttributed(null);
    }
    //TODO FIX NUMBER TYPES
    return ExpressionUtils.toAttributed(operator(left, right), lao, rao);
  }

  private visitEqualityOperators(ctx: ParserRuleContext, comparator: (res: number) => boolean): AttributedObject {
    const lao = this.visit(ctx.getChild(0));
    const rao = this.visit(ctx.getChild(2));
    return ExpressionUtils.toAttributed(comparator(Util.compareTo(ExpressionUtils.getValue(lao), ExpressionUtils.getValue(rao))), lao, rao);
  }
}
