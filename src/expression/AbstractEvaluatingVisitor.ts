import { ParserRuleContext } from 'antlr4';
import AttributedObject from './AttributedObject';
import Util from '../util/Util';
import ExpressionUtils from './ExpressionUtils';
import Evaluator from './Evaluator';
import Function from './function/Function';
import SubstringFunction from './function/string/SubstringFunction';
import Functions from './function/Functions';
import Cres from '../Cres';
import MessageFormat from '../util/java/MessageFormat';
import EvaluationEnvironment from './EvaluationEnvironment';
import CatchFunction from './function/other/CatchFunction';
import IntegerFunction from './function/type/IntegerFunction';
import FloatFunction from './function/type/FloatFunction';
import UrlEncodeFunction from './function/string/UrlEncodeFunction';
import UrlDecodeFunction from './function/string/UrlDecodeFunction';
import ContainsFunction from './function/string/ContainsFunction';
import EndsWithFunction from './function/string/EndsWithFunction';
import IndexOfFunction from './function/string/IndexOfFunction';
import SplitFunction from './function/string/SplitFunction';
import IsDigitFunction from './function/string/IsDigitFunction';
import IsLetterFunction from './function/string/IsLetterFunction';
import IsLowerCaseFunction from './function/string/IsLowerCaseFunction';
import IsUpperCaseFunction from './function/string/IsUpperCaseFunction';
import IsWhitespaceFunction from './function/string/IsWhitespaceFunction';
import LastIndexOfFunction from './function/string/LastIndexOfFunction';
import LengthFunction from './function/string/LengthFunction';
import ToLowerCaseFunction from './function/string/ToLowerCaseFunction';
import ReplaceFunction from './function/string/ReplaceFunction';
import StartsWithFunction from './function/string/StartsWithFunction';
import TrimFunction from './function/string/TrimFunction';
import ToUpperCaseFunction from './function/string/ToUpperCaseFunction';
import DataBlockFunction from './function/string/DataBlockFunction';
import EqFunction from './function/number/EqFunction';
import GeFunction from './function/number/GeFunction';
import GtFunction from './function/number/GtFunction';
import LeFunction from './function/number/LeFunction';
import LtFunction from './function/number/LtFunction';
import NeFunction from './function/number/NeFunction';
import AbsFunction from './function/number/AbsFunction';
import AsinFunction from './function/number/AsinFunction';
import AcosFunction from './function/number/AcosFunction';
import AtanFunction from './function/number/AtanFunction';
import CbrtFunction from './function/number/CbrtFunction';
import CeilFunction from './function/number/CeilFunction';
import CosFunction from './function/number/CosFunction';
import CoshFunction from './function/number/CoshFunction';
import ExpFunction from './function/number/ExpFunction';
import FloorFunction from './function/number/FloorFunction';
import LogFunction from './function/number/LogFunction';
import Log10Function from './function/number/Log10Function';
import MinFunction from './function/number/MinFunction';
import MaxFunction from './function/number/MaxFunction';
import PowFunction from './function/number/PowFunction';
import RandomFunction from './function/number/RandomFunction';
import RoundFunction from './function/number/RoundFunction';
import SignumFunction from './function/number/SignumFunction';
import SinFunction from './function/number/SinFunction';
import SinhFunction from './function/number/SinhFunction';
import SqrtFunction from './function/number/SqrtFunction';
import TanFunction from './function/number/TanFunction';
import TanhFunction from './function/number/TanhFunction';
import BooleanFunction from './function/type/BooleanFunction';
import DoubleFunction from './function/type/DoubleFunction';
import FloatConstantFunction from './function/FloatConstantFunction';
import FetchDataBlockFunction from './function/type/FetchDataBlockFunction';
import LongFunction from './function/type/LongFunction';
import StringFunction from './function/type/StringFunction';
import TimestampFunction from './function/type/TimestampFunction';
import EvaluateFunction from './function/other/EvaluateFunction';
import FormatFunction from './function/other/FormatFunction';
import GroupsFunction from './function/other/GroupsFunction';
import LdFunction from './function/other/LdFunction';
import LoginFunction from './function/other/LoginFunction';
import SleepFunction from './function/other/SleepFunction';
import StFunction from './function/other/StFunction';
import TableFromCSVFunction from './function/other/TableFromCSVFunction';
import TableFromJSONFunction from './function/other/TableFromJSONFunction';
import TraceFunction from './function/other/TraceFunction';
import UserFunction from './function/other/UserFunction';
import XPathFunction from './function/other/XPathFunction';
import DtFunction from './function/context/DtFunction';
import AvailableFunction from './function/context/AvailableFunction';
import CallFunctionFunction from './function/context/CallFunctionFunction';
import DcFunction from './function/context/DcFunction';
import DrFunction from './function/context/DrFunction';
import EventAvailableFunction from './function/context/EventAvailableFunction';
import EventFormatFunction from './function/context/EventFormatFunction';
import EventGroupFunction from './function/context/EventGroupFunction';
import FireEventFunction from './function/context/FireEventFunction';
import FullDescriptionFunction from './function/context/FullDescriptionFunction';
import FunctionAvailableFunction from './function/context/FunctionAvailableFunction';
import FunctionGroupFunction from './function/context/FunctionGroupFunction';
import FunctionInputFormatFunction from './function/context/FunctionInputFormatFunction';
import FunctionOutputFormatFunction from './function/context/FunctionOutputFormatFunction';
import GetVariableFunction from './function/context/GetVariableFunction';
import SetVariableFieldFunction from './function/context/SetVariableFieldFunction';
import SetVariableFunction from './function/context/SetVariableFunction';
import SetVariableRecordFunction from './function/context/SetVariableRecordFunction';
import VariableAvailableFunction from './function/context/VariableAvailableFunction';
import VariableFormatFunction from './function/context/VariableFormatFunction';
import VariableGroupFunction from './function/context/VariableGroupFunction';
import VariableReadableFunction from './function/context/VariableReadableFunction';
import VariableWritableFunction from './function/context/VariableWritableFunction';
import AddRecordsFunction from './function/table/AddRecordsFunction';
import AdjustRecordLimitsFunction from './function/table/AdjustRecordLimitsFunction';
import AggregateFunction from './function/table/AggregateFunction';
import CellFunction from './function/table/CellFunction';
import SubtableFunction from './function/table/SubtableFunction';
import ClearFunction from './function/table/ClearFunction';
import ConvertFunction from './function/table/ConvertFunction';
import CopyFunction from './function/table/CopyFunction';
import DecodeFunction from './function/table/DecodeFunction';
import DescribeFunction from './function/table/DescribeFunction';
import DescriptionFunction from './function/table/DescriptionFunction';
import EncodeFunction from './function/table/EncodeFunction';
import FilterFunction from './function/table/FilterFunction';
import GetFormatFunction from './function/table/GetFormatFunction';
import HasFieldFunction from './function/table/HasFieldFunction';
import JoinFunction from './function/table/JoinFunction';
import PrintFunction from './function/table/PrintFunction';
import RecordsFunction from './function/table/RecordsFunction';
import RemoveColumnsFunction from './function/table/RemoveColumnsFunction';
import RemoveRecordsFunction from './function/table/RemoveRecordsFunction';
import SelectFunction from './function/table/SelectFunction';
import SetFunction from './function/table/SetFunction';
import SetMultipleFunction from './function/table/SetMultipleFunction';
import SortFunction from './function/table/SortFunction';
import TableFunction from './function/table/TableFunction';
import UnionFunction from './function/table/UnionFunction';
import ExpressionVisitorFacade from './ExpressionVisitorFacade';
import IntersectFunction from './function/table/IntersectFunction';
import DistinctFunction from './function/table/DistinctFunction';
import DefaultAttributedObject from './DefaultAttributedObject';
import DateAddFunction from './function/date/DateAddFunction';
import DateDiffFunction from './function/date/DateDiffFunction';
import DateCreateFunction from './function/date/DateCreateFunction';
import DateFieldFunction from './function/date/DateFieldFunction';
import FormatDateFunction from './function/date/FormatDateFunction';
import ParseDateFunction from './function/date/ParseDateFunction';
import PrintPeriodFunction from './function/date/PrintPeriodFunction';
import TimeFunction from './function/date/TimeFunction';
import TimeHelper from '../util/TimeHelper';
import NewDateFunction from './function/date/NewDateFunction';
import BlueFunction from './function/color/BlueFunction';
import RedFunction from './function/color/RedFunction';
import ColorFunction from './function/color/ColorFunction';
import GreenFunction from './function/color/GreenFunction';
import BrighterFunction from './function/color/BrighterFunction';
import DarkerFunction from './function/color/DarkerFunction';
import ExpressionEditorOptionsFunction from './function/ExpressionEditorOptionsFunction';
import FormatNumberFunction from './function/number/FormatNumberFunction';
import JSBI from 'jsbi';

// eslint-disable-next-line @typescript-eslint/no-var-requires
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

    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.CONTAINS, new ContainsFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.ENDS_WITH, new EndsWithFunction());
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
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SPLIT, new SplitFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.STARTS_WITH, new StartsWithFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SUBSTRING, new SubstringFunction());
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
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.ABS, new AbsFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.ACOS, new AcosFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.ASIN, new AsinFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.ATAN, new AtanFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.CBRT, new CbrtFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.CEIL, new CeilFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.COS, new CosFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.COSH, new CoshFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.EXP, new ExpFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.FLOOR, new FloorFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.LOG, new LogFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.LOG10, new Log10Function());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.MIN, new MinFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.MAX, new MaxFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.POW, new PowFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.RANDOM, new RandomFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.ROUND, new RoundFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SIGNUM, new SignumFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SIN, new SinFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SINH, new SinhFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SQRT, new SqrtFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.TAN, new TanFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.TANH, new TanhFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.E, new FloatConstantFunction(Math.E, Cres.get().getString('fDescE')));
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.PI, new FloatConstantFunction(Math.PI, Cres.get().getString('fDescPi')));
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.FORMAT_NUMBER, new FormatNumberFunction());

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
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SUBTABLE, new SubtableFunction());

    /**
     * Date functions
     */
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DATE, new DateCreateFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DATE_ADD, new DateAddFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DATE_DIFF, new DateDiffFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DAY, new DateFieldFunction(TimeHelper.CALENDAR_DATE, Cres.get().getString('fDescDay')));
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DAY_OF_WEEK, new DateFieldFunction(TimeHelper.CALENDAR_WEEK_OF_YEAR, Cres.get().getString('fDescDayOfWeek')));
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DAY_OF_YEAR, new DateFieldFunction(TimeHelper.CALENDAR_DAY_OF_YEAR, Cres.get().getString('fDescDayOfYear')));
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.FORMAT_DATE, new FormatDateFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.HOUR, new DateFieldFunction(TimeHelper.CALENDAR_HOUR, Cres.get().getString('fDescHour')));
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.MILLISECOND, new DateFieldFunction(TimeHelper.CALENDAR_MILLISECOND, Cres.get().getString('fDescMillisecond')));
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.MINUTE, new DateFieldFunction(TimeHelper.CALENDAR_MINUTE, Cres.get().getString('fDescMinute')));
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.MONTH, new DateFieldFunction(TimeHelper.CALENDAR_MONTH, Cres.get().getString('fDescMonth')));
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.SECOND, new DateFieldFunction(TimeHelper.CALENDAR_SECOND, Cres.get().getString('fDescSecond')));
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.PARSE_DATE, new ParseDateFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.PRINT_PERIOD, new PrintPeriodFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.NOW, new NewDateFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.TIME, new TimeFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.YEAR, new DateFieldFunction(TimeHelper.CALENDAR_YEAR, Cres.get().getString('fDescYear')));
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

    /**
     * Color functions
     */
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.BLUE, new BlueFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.COLOR, new ColorFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.GREEN, new GreenFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.RED, new RedFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.BRIGHTER, new BrighterFunction());
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.DARKER, new DarkerFunction());

    /**
     * System Functions
     */
    AbstractEvaluatingVisitor.registerDefaultFunction(Functions.EXPRESSION_EDITOR_OPTIONS, new ExpressionEditorOptionsFunction());

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

  static initialize() {
    AbstractEvaluatingVisitor._static_init();
  }

  protected constructor(evaluator: Evaluator, environment: EvaluationEnvironment) {
    super();
    this.evaluator = evaluator;
    this.environment = environment;
  }

  // Visit a parse tree produced by ExpressionGrammarParser#compilationUnit.
  public visitCompilationUnit(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    if (ctx.getChildCount() === 1) return new DefaultAttributedObject(null);
    return this.visit(ctx.getChild(0));
  }

  public visitLogicalAndNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    const lao = this.visit(ctx.getChild(0));

    if (this.isPromise(lao)) {
      return lao.then((l) => {
        return this.applyLogicalAndOperator(ctx, l);
      });
    } else {
      return this.applyLogicalAndOperator(ctx, lao);
    }
  }
  // Visit a parse tree produced by ExpressionGrammarParser#LogicalOrNode.
  public visitLogicalOrNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    const lao = this.visit(ctx.getChild(0));

    if (this.isPromise(lao)) {
      return lao.then((l) => {
        return this.applyLogicalOrOperator(ctx, l);
      });
    } else {
      return this.applyLogicalOrOperator(ctx, lao);
    }
  }

  private applyLogicalAndOperator(ctx: ParserRuleContext, lao: AttributedObject): AttributedObject | Promise<AttributedObject> {
    const left = Util.convertToBoolean(ExpressionUtils.getValue(lao), true, false);

    if (!left) {
      return ExpressionUtils.toAttributed(false, lao);
    }

    const rao = this.visit(ctx.getChild(2));

    if (this.isPromise(rao)) {
      return rao.then((r) => {
        const right = Util.convertToBoolean(ExpressionUtils.getValue(r), true, false);
        return ExpressionUtils.toAttributed(left && right, lao, r);
      });
    } else {
      const right = Util.convertToBoolean(ExpressionUtils.getValue(rao), true, false);
      return ExpressionUtils.toAttributed(left && right, lao, rao);
    }
  }

  private applyLogicalOrOperator(ctx: ParserRuleContext, lao: AttributedObject): AttributedObject | Promise<AttributedObject> {
    const left = Util.convertToBoolean(ExpressionUtils.getValue(lao), true, false);

    if (left) {
      return ExpressionUtils.toAttributed(true, lao);
    }

    const rao = this.visit(ctx.getChild(2));

    if (this.isPromise(rao)) {
      return rao.then((r) => {
        const right = Util.convertToBoolean(ExpressionUtils.getValue(r), true, false);
        return ExpressionUtils.toAttributed(left || right, lao, r);
      });
    } else {
      const right = Util.convertToBoolean(ExpressionUtils.getValue(rao), true, false);
      return ExpressionUtils.toAttributed(left || right, lao, rao);
    }
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseOrNode.
  public visitBitwiseOrNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left | right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseXorNode.
  public visitBitwiseXorNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left ^ right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#NENode.
  public visitNENode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    this.visitChildren(ctx);

    const lao = this.visit(ctx.getChild(0));
    const rao = this.visit(ctx.getChild(2));

    return this.promisifyBinaryFunction(lao, rao, (l, r) => {
      return ExpressionUtils.toAttributed(!Util.equals(ExpressionUtils.getValue(l), ExpressionUtils.getValue(r)), l, r);
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ConditionalNode.
  public visitConditionalNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    const ao = this.visit(ctx.getChild(0));

    if (this.isPromise(ao)) {
      return ao.then((a) => {
        return this.applyCondition(ctx, a);
      });
    }
    return this.applyCondition(ctx, ao);
  }
  private applyCondition(ctx: ParserRuleContext, ao: AttributedObject): Promise<AttributedObject> | AttributedObject {
    const condition = Util.convertToBoolean(ExpressionUtils.getValue(ao), true, false);
    if (condition) {
      return this.visit(ctx.getChild(2));
    } else {
      return this.visit(ctx.getChild(4));
    }
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ModNode.
  public visitModNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    this.visitChildren(ctx);

    const lao = this.visit(ctx.getChild(0));
    const rao = this.visit(ctx.getChild(2));

    return this.promisifyBinaryFunction(lao, rao, (l, r) => {
      const left = Util.convertToNumber(ExpressionUtils.getValue(l), false, true);
      const right = Util.convertToNumber(ExpressionUtils.getValue(r), false, true);

      if (left == null || right == null) {
        return ExpressionUtils.toAttributed(null);
      }
      return ExpressionUtils.toAttributed(Math.trunc(left) % Math.trunc(right), l, r);
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LogicalNotNode.
  public visitLogicalNotNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    const ao = this.visit(ctx.getChild(1));

    return this.promisifyUnaryFunction(ao, (ao) => {
      const left = Util.convertToBoolean(ExpressionUtils.getValue(ao), true, false);
      return ExpressionUtils.toAttributed(!left, ao);
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#EQNode.
  public visitEQNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    const lao = this.visit(ctx.getChild(0));
    const rao = this.visit(ctx.getChild(2));

    return this.promisifyBinaryFunction(lao, rao, (l, r) => {
      return ExpressionUtils.toAttributed(Util.equals(ExpressionUtils.getValue(l), ExpressionUtils.getValue(r)), l, r);
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseAndNode.
  public visitBitwiseAndNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left & right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#GENode.
  public visitGENode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitEqualityOperators(ctx, (res) => res >= 0);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#UnsignedRightShiftNode.
  public visitUnsignedRightShiftNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left >>> right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#AddNode.
  public visitAddNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    const lao = this.visit(ctx.getChild(0));
    const rao = this.visit(ctx.getChild(2));

    return this.promisifyBinaryFunction(lao, rao, (l, r) => {
      const lo = ExpressionUtils.getValue(l);
      const ro = ExpressionUtils.getValue(r);
      if (Util.isString(lo) && Util.isString(ro)) {
        return ExpressionUtils.toAttributed(lo + ro, l, r);
      } else {
        if (Util.isString(lo) || Util.isString(ro)) {
          const s1 = lo != null ? lo.toString() : '';
          const s2 = ro != null ? ro.toString() : '';
          return ExpressionUtils.toAttributed(s1 + s2, l, r);
        } else {
          const left = Util.convertToNumber(lo, false, true);
          const right = Util.convertToNumber(ro, false, true);

          if (left == null || right == null) {
            return ExpressionUtils.toAttributed(null);
          }

          //TODO FIX NUMBER TYPES
          return ExpressionUtils.toAttributed(left + right, l, r);
        }
      }
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LTNode.
  public visitLTNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitEqualityOperators(ctx, (res) => res < 0);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#BitwiseNotNode.
  public visitBitwiseNotNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    const ao = this.visit(ctx.getChild(1));

    return this.promisifyUnaryFunction(ao, (ao) => {
      const val = Util.convertToNumber(ExpressionUtils.getValue(ao), false, true);

      if (val == null) {
        return ExpressionUtils.toAttributed(null);
      }
      // TODO FIX NUMBER TYPES
      return ExpressionUtils.toAttributed(~val, ao);
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#SubtractNode.
  public visitSubtractNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left - right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#GTNode.
  public visitGTNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitEqualityOperators(ctx, (res) => res > 0);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ValueReferenceNode.
  public abstract visitValueReferenceNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject;

  // Visit a parse tree produced by ExpressionGrammarParser#RegexMatchNode.
  public visitRegexMatchNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    const lao = this.visit(ctx.getChild(0));
    const rao = this.visit(ctx.getChild(2));

    return this.promisifyBinaryFunction(lao, rao, (l, r) => {
      const left = ExpressionUtils.getValue(l);
      const right = ExpressionUtils.getValue(r);
      if (left == null || right == null) {
        return ExpressionUtils.toAttributed(r, l, r);
      }
      return ExpressionUtils.toAttributed(left.toString().match(right.toString()), l, r);
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LiteralExpression.
  public visitLiteralExpression(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visit(ctx.getChild(0));
  }

  // Visit a parse tree produced by ExpressionGrammarParser#FunctionNode.
  public visitFunctionNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visit(ctx.getChild(0));
  }

  // Visit a parse tree produced by ExpressionGrammarParser#RightShiftNode.
  public visitRightShiftNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left >> right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#DivNode.
  public visitDivNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left / right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LeftShiftNode.
  public visitLeftShiftNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left << right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#ExpressionNode.
  public visitExpressionNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visit(ctx.getChild(1));
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LENode.
  public visitLENode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitEqualityOperators(ctx, (res) => res <= 0);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#MulNode.
  public visitMulNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitBinaryOperators(ctx, (left, right) => {
      return left * right;
    });
  }

  // Visit a parse tree produced by ExpressionGrammarParser#UnaryNode.
  public visitUnaryNode(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    const ao = this.visit(ctx.getChild(1));

    return this.promisifyUnaryFunction(ao, (ao) => {
      const val = Util.convertToNumber(ExpressionUtils.getValue(ao), false, true);

      if (val == null) {
        return ExpressionUtils.toAttributed(null);
      }
      // TODO FIX NUMBER TYPES
      return ExpressionUtils.toAttributed(-val, ao);
    });
  }

  public visitArguments(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    const parameters = new Array<Promise<AttributedObject> | AttributedObject>();
    for (let i = 0; i < ctx.getChildCount(); i++) {
      if (ctx.getChild(i) instanceof ParserRuleContext) {
        parameters.push(this.visit(ctx.getChild(i)));
      }
    }
    return ExpressionUtils.toAttributed(parameters);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#functionExpression.
  public visitFunctionExpression(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    const functionName = (this.visit(ctx.getChild(0)) as AttributedObject).getValue();
    const params = ctx.getChild(1) as ParserRuleContext;
    let countArguments = 0;

    for (let i = 0; i < params.getChildCount(); i++) {
      if (params.getChild(i) instanceof ParserRuleContext) countArguments++;
    }

    if (Functions.CATCH === functionName) {
      try {
        const attrObject = this.visit(params.getChild(1));
        if (attrObject instanceof Promise) {
          return new Promise((resolve) => {
            resolve(this.visit(params.getChild(1)));
          })
            .then((res) => ExpressionUtils.toAttributed(res))
            .catch((ex) => {
              if (countArguments > 1) {
                return this.visit(params.getChild(3));
              } else {
                return ExpressionUtils.toAttributed(ex.message != null ? ex.message : ex.toString());
              }
            });
        } else {
          return ExpressionUtils.toAttributed(attrObject);
        }
      } catch (ex) {
        if (countArguments > 1) {
          return this.visit(params.getChild(3));
        } else {
          return ExpressionUtils.toAttributed(ex.message != null ? ex.message : ex.toString());
        }
      }
    }

    const parameters = (this.visit(ctx.getChild(1)) as AttributedObject).getValue();
    let fi = AbstractEvaluatingVisitor.DEFAULT_FUNCTIONS.get(functionName);

    if (!fi) {
      fi = this.evaluator.getCustomFunction(functionName);
    }

    if (fi == null) {
      throw new Error(Cres.get().getString('exprUnknownFunction') + functionName);
    }

    let containsPromiseParameters = false;
    for (const param1 of parameters) {
      if (this.isPromise(param1)) {
        containsPromiseParameters = true;
        break;
      }
    }
    if (containsPromiseParameters) {
      // eslint-disable-next-line @typescript-eslint/ban-types
      const f = fi as Function;
      return Promise.all(parameters as Array<AttributedObject | Promise<AttributedObject>>).then((resolvedParameters) => {
        return this.executeFunction(functionName, f, resolvedParameters);
      });
    }
    return this.executeFunction(functionName, fi, parameters);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private executeFunction(functionName: string, func: Function, args: Array<AttributedObject>): Promise<AttributedObject> | AttributedObject {
    try {
      if (func.isAsync()) {
        return func.asyncExecuteAttributed(this.evaluator, this.environment, args);
      } else {
        return func.executeAttributed(this.evaluator, this.environment, args);
      }
    } catch (ex) {
      throw new Error(MessageFormat.format(Cres.get().getString('exprErrExecutingFunction'), functionName) + ex.message);
    }
  }

  // Visit a parse tree produced by ExpressionGrammarParser#valueReference.
  public visitValueReference(ctx: ParserRuleContext): Promise<AttributedObject> | AttributedObject {
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#LongConstNode.
  public visitLongConstNode(ctx: ParserRuleContext): AttributedObject {
    const term = (this.visit(ctx.getChild(0)) as AttributedObject).getValue() as string;
    let num = 0;
    if (term.startsWith('0x') || term.startsWith('0X')) {
      const temp = term.substring(2);
      num = Number.parseInt(temp, 16);
      if (num.toString(16) !== temp.toLowerCase()) {
        return ExpressionUtils.toAttributed(JSBI.BigInt(term));
      }
    } else if (term.startsWith('0b') || term.startsWith('0B')) {
      const temp = term.substring(2);
      num = Number.parseInt(temp, 2);
      let v = num.toString(2);
      for (let i = v.length; i < 8; i++) v = '0' + v;
      if (v !== temp) {
        return ExpressionUtils.toAttributed(JSBI.BigInt(term));
      }
    } else if (term.startsWith('0') && term.length > 1) {
      const temp = term.substring(1);
      num = Number.parseInt(temp, 8);
      if (num.toString(8) !== temp) {
        return ExpressionUtils.toAttributed(JSBI.BigInt(term));
      }
    } else {
      num = Number.parseInt(term);
      if (num.toString() !== term) {
        return ExpressionUtils.toAttributed(JSBI.BigInt(term));
      }
    }

    return ExpressionUtils.toAttributed(num);
  }

  // Visit a parse tree produced by ExpressionGrammarParser#FloatConstNode.
  public visitFloatConstNode(ctx: ParserRuleContext): AttributedObject {
    const term = (this.visit(ctx.getChild(0)) as AttributedObject).getValue() as string;
    return ExpressionUtils.toAttributed(parseFloat(term));
  }

  // Visit a parse tree produced by ExpressionGrammarParser#StringConstNode.
  public visitStringConstNode(ctx: ParserRuleContext): AttributedObject {
    let term = (this.visit(ctx.getChild(0)) as AttributedObject).getValue() as string;
    term = term.substring(1, term.length - 1);
    return ExpressionUtils.toAttributed(unescapeJs(term));
  }

  // Visit a parse tree produced by AggregateExpressionParser#TrueNode.
  public visitTrueNode(ctx: ParserRuleContext): AttributedObject {
    return ExpressionUtils.toAttributed(true);
  }

  // Visit a parse tree produced by AggregateExpressionParser#FalseNode.
  public visitFalseNode(ctx: ParserRuleContext): AttributedObject {
    return ExpressionUtils.toAttributed(false);
  }

  // Visit a parse tree produced by AggregateExpressionParser#NullNode.
  public visitNullNode(ctx: ParserRuleContext): AttributedObject {
    return ExpressionUtils.toAttributed(null);
  }

  public visitTerminal(ctx: ParserRuleContext): AttributedObject {
    return ExpressionUtils.toAttributed(ctx.getText());
  }

  private visitBinaryOperators(ctx: ParserRuleContext, operator: (lao: number, rao: number) => any): Promise<AttributedObject> | AttributedObject {
    const lao = this.visit(ctx.getChild(0));
    const rao = this.visit(ctx.getChild(2));

    if (this.isPromise(lao)) {
      return lao.then((l) => {
        if (this.isPromise(rao)) {
          return rao.then((r) => {
            return this.applyBinary(l, r, operator);
          });
        }
        return this.applyBinary(l, rao, operator);
      });
    } else if (this.isPromise(rao)) {
      return rao.then((r) => {
        return this.applyBinary(lao, r, operator);
      });
    } else return this.applyBinary(lao, rao, operator);
  }

  private applyBinary(lao: AttributedObject, rao: AttributedObject, operator: (lao: number, rao: number) => any): AttributedObject {
    const left = Util.convertToNumber(ExpressionUtils.getValue(lao), false, true);
    const right = Util.convertToNumber(ExpressionUtils.getValue(rao), false, true);

    if (left == null || right == null) {
      return ExpressionUtils.toAttributed(null);
    }
    //TODO FIX NUMBER TYPES
    return ExpressionUtils.toAttributed(operator(left, right), lao, rao);
  }

  private visitEqualityOperators(ctx: ParserRuleContext, comparator: (res: number) => boolean): Promise<AttributedObject> | AttributedObject {
    const lao = this.visit(ctx.getChild(0));
    const rao = this.visit(ctx.getChild(2));

    return this.promisifyBinaryFunction(lao, rao, (l, r) => {
      return ExpressionUtils.toAttributed(comparator(Util.compareTo(ExpressionUtils.getValue(l), ExpressionUtils.getValue(r))), l, r);
    });
  }

  private promisifyUnaryFunction(lao: AttributedObject | Promise<AttributedObject>, func: (ao: AttributedObject) => AttributedObject): Promise<AttributedObject> | AttributedObject {
    if (this.isPromise(lao)) {
      return lao.then((l) => {
        return func(l);
      });
    }
    return func(lao);
  }

  protected isPromise(value: AttributedObject | Promise<AttributedObject>): value is Promise<AttributedObject> {
    return value instanceof Promise;
  }

  private promisifyBinaryFunction(
    lao: AttributedObject | Promise<AttributedObject>,
    rao: AttributedObject | Promise<AttributedObject>,
    func: (l: AttributedObject, r: AttributedObject) => AttributedObject
  ): Promise<AttributedObject> | AttributedObject {
    if (this.isPromise(lao)) {
      return lao.then((l) => {
        if (this.isPromise(rao)) {
          return rao.then((r) => {
            return func(l, r);
          });
        }
        return func(l, rao);
      });
    } else if (this.isPromise(rao)) {
      return rao.then((r) => {
        return func(lao, r);
      });
    } else return func(lao, rao);
  }
}

AbstractEvaluatingVisitor.initialize();
