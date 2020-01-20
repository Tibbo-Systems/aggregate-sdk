// Generated from src/expression/grammar/AggregateExpression.g4 by ANTLR 4.7.2
// jshint ignore: start
const antlr4 = require('antlr4/index');
const AggregateExpressionVisitor = require('./AggregateExpressionVisitor').AggregateExpressionVisitor;

const grammarFileName = "AggregateExpression.g4";


const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u00033\u00e5\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0003\u0002\u0005\u0002$\n\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003",
    "9\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0007\u0003}\n\u0003\f\u0003\u000e\u0003\u0080\u000b\u0003",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0006\u0003\u0006\u0005\u0006\u008a\n\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003",
    "\t\u0007\t\u0095\n\t\f\t\u000e\t\u0098\u000b\t\u0003\t\u0003\t\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0006\n\u00a0\n\n\r\n\u000e\n\u00a1\u0003",
    "\n\u0005\n\u00a5\n\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0005\u000b\u00ab\n\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003\r\u0003",
    "\r\u0003\r\u0003\u000e\u0005\u000e\u00b5\n\u000e\u0003\u000e\u0005\u000e",
    "\u00b8\n\u000e\u0003\u000e\u0005\u000e\u00bb\n\u000e\u0003\u000e\u0003",
    "\u000e\u0005\u000e\u00bf\n\u000e\u0003\u000e\u0003\u000e\u0005\u000e",
    "\u00c3\n\u000e\u0003\u000e\u0005\u000e\u00c6\n\u000e\u0003\u000e\u0005",
    "\u000e\u00c9\n\u000e\u0003\u000e\u0005\u000e\u00cc\n\u000e\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0003\u000f\u0007\u000f\u00d2\n\u000f\f\u000f",
    "\u000e\u000f\u00d5\u000b\u000f\u0005\u000f\u00d7\n\u000f\u0003\u000f",
    "\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0003\u0011",
    "\u0003\u0011\u0003\u0011\u0003\u0011\u0005\u0011\u00e3\n\u0011\u0003",
    "\u0011\u0002\u0003\u0004\u0012\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012",
    "\u0014\u0016\u0018\u001a\u001c\u001e \u0002\u0004\u0003\u0002\'\'\u0005",
    "\u0002\u0003\u0003*,22\u0002\u0109\u0002#\u0003\u0002\u0002\u0002\u0004",
    "8\u0003\u0002\u0002\u0002\u0006\u0081\u0003\u0002\u0002\u0002\b\u0084",
    "\u0003\u0002\u0002\u0002\n\u0087\u0003\u0002\u0002\u0002\f\u008d\u0003",
    "\u0002\u0002\u0002\u000e\u0090\u0003\u0002\u0002\u0002\u0010\u0096\u0003",
    "\u0002\u0002\u0002\u0012\u00a4\u0003\u0002\u0002\u0002\u0014\u00aa\u0003",
    "\u0002\u0002\u0002\u0016\u00ac\u0003\u0002\u0002\u0002\u0018\u00b0\u0003",
    "\u0002\u0002\u0002\u001a\u00b4\u0003\u0002\u0002\u0002\u001c\u00cd\u0003",
    "\u0002\u0002\u0002\u001e\u00da\u0003\u0002\u0002\u0002 \u00e2\u0003",
    "\u0002\u0002\u0002\"$\u0005\u0004\u0003\u0002#\"\u0003\u0002\u0002\u0002",
    "#$\u0003\u0002\u0002\u0002$%\u0003\u0002\u0002\u0002%&\u0007\u0002\u0002",
    "\u0003&\u0003\u0003\u0002\u0002\u0002\'(\b\u0003\u0001\u0002()\u0007",
    "\u0007\u0002\u0002)*\u0005\u0004\u0003\u0002*+\u0007\b\u0002\u0002+",
    "9\u0003\u0002\u0002\u0002,9\u0005\u0006\u0004\u0002-.\u0007\t\u0002",
    "\u0002./\u0005\u001a\u000e\u0002/0\u0007\n\u0002\u000209\u0003\u0002",
    "\u0002\u000212\u0007\u0013\u0002\u000229\u0005\u0004\u0003\u001b34\u0007",
    ")\u0002\u000249\u0005\u0004\u0003\u001a56\u0007%\u0002\u000269\u0005",
    "\u0004\u0003\u001979\u0005 \u0011\u00028\'\u0003\u0002\u0002\u00028",
    ",\u0003\u0002\u0002\u00028-\u0003\u0002\u0002\u000281\u0003\u0002\u0002",
    "\u000283\u0003\u0002\u0002\u000285\u0003\u0002\u0002\u000287\u0003\u0002",
    "\u0002\u00029~\u0003\u0002\u0002\u0002:;\f\u0018\u0002\u0002;<\u0007",
    "\u0014\u0002\u0002<}\u0005\u0004\u0003\u0019=>\f\u0017\u0002\u0002>",
    "?\u0007\u0015\u0002\u0002?}\u0005\u0004\u0003\u0018@A\f\u0016\u0002",
    "\u0002AB\u0007\u0016\u0002\u0002B}\u0005\u0004\u0003\u0017CD\f\u0015",
    "\u0002\u0002DE\u0007\u0012\u0002\u0002E}\u0005\u0004\u0003\u0016FG\f",
    "\u0014\u0002\u0002GH\u0007\u0013\u0002\u0002H}\u0005\u0004\u0003\u0015",
    "IJ\f\u0013\u0002\u0002JK\u0007 \u0002\u0002K}\u0005\u0004\u0003\u0014",
    "LM\f\u0012\u0002\u0002MN\u0007!\u0002\u0002N}\u0005\u0004\u0003\u0013",
    "OP\f\u0011\u0002\u0002PQ\u0007\"\u0002\u0002Q}\u0005\u0004\u0003\u0012",
    "RS\f\u0010\u0002\u0002ST\u0007\u001c\u0002\u0002T}\u0005\u0004\u0003",
    "\u0011UV\f\u000f\u0002\u0002VW\u0007\u001d\u0002\u0002W}\u0005\u0004",
    "\u0003\u0010XY\f\u000e\u0002\u0002YZ\u0007\u001e\u0002\u0002Z}\u0005",
    "\u0004\u0003\u000f[\\\f\r\u0002\u0002\\]\u0007\u001f\u0002\u0002]}\u0005",
    "\u0004\u0003\u000e^_\f\f\u0002\u0002_`\u0007\u0019\u0002\u0002`}\u0005",
    "\u0004\u0003\rab\f\u000b\u0002\u0002bc\u0007\u001a\u0002\u0002c}\u0005",
    "\u0004\u0003\fde\f\n\u0002\u0002ef\u0007\u001b\u0002\u0002f}\u0005\u0004",
    "\u0003\u000bgh\f\t\u0002\u0002hi\u0007&\u0002\u0002i}\u0005\u0004\u0003",
    "\njk\f\b\u0002\u0002kl\u0007\'\u0002\u0002l}\u0005\u0004\u0003\tmn\f",
    "\u0007\u0002\u0002no\u0007(\u0002\u0002o}\u0005\u0004\u0003\bpq\f\u0006",
    "\u0002\u0002qr\u0007#\u0002\u0002r}\u0005\u0004\u0003\u0007st\f\u0005",
    "\u0002\u0002tu\u0007$\u0002\u0002u}\u0005\u0004\u0003\u0006vw\f\u0004",
    "\u0002\u0002wx\u0007\u0017\u0002\u0002xy\u0005\u0004\u0003\u0002yz\u0007",
    "\u0018\u0002\u0002z{\u0005\u0004\u0003\u0005{}\u0003\u0002\u0002\u0002",
    "|:\u0003\u0002\u0002\u0002|=\u0003\u0002\u0002\u0002|@\u0003\u0002\u0002",
    "\u0002|C\u0003\u0002\u0002\u0002|F\u0003\u0002\u0002\u0002|I\u0003\u0002",
    "\u0002\u0002|L\u0003\u0002\u0002\u0002|O\u0003\u0002\u0002\u0002|R\u0003",
    "\u0002\u0002\u0002|U\u0003\u0002\u0002\u0002|X\u0003\u0002\u0002\u0002",
    "|[\u0003\u0002\u0002\u0002|^\u0003\u0002\u0002\u0002|a\u0003\u0002\u0002",
    "\u0002|d\u0003\u0002\u0002\u0002|g\u0003\u0002\u0002\u0002|j\u0003\u0002",
    "\u0002\u0002|m\u0003\u0002\u0002\u0002|p\u0003\u0002\u0002\u0002|s\u0003",
    "\u0002\u0002\u0002|v\u0003\u0002\u0002\u0002}\u0080\u0003\u0002\u0002",
    "\u0002~|\u0003\u0002\u0002\u0002~\u007f\u0003\u0002\u0002\u0002\u007f",
    "\u0005\u0003\u0002\u0002\u0002\u0080~\u0003\u0002\u0002\u0002\u0081",
    "\u0082\u00072\u0002\u0002\u0082\u0083\u0005\u001c\u000f\u0002\u0083",
    "\u0007\u0003\u0002\u0002\u0002\u0084\u0085\u0005\u001e\u0010\u0002\u0085",
    "\u0086\u0005\u001c\u000f\u0002\u0086\t\u0003\u0002\u0002\u0002\u0087",
    "\u0089\u0005\u001e\u0010\u0002\u0088\u008a\u0005\u001c\u000f\u0002\u0089",
    "\u0088\u0003\u0002\u0002\u0002\u0089\u008a\u0003\u0002\u0002\u0002\u008a",
    "\u008b\u0003\u0002\u0002\u0002\u008b\u008c\u0007%\u0002\u0002\u008c",
    "\u000b\u0003\u0002\u0002\u0002\u008d\u008e\u0005\u001e\u0010\u0002\u008e",
    "\u008f\u0007\u000f\u0002\u0002\u008f\r\u0003\u0002\u0002\u0002\u0090",
    "\u0091\u00072\u0002\u0002\u0091\u0092\u0007\u0015\u0002\u0002\u0092",
    "\u000f\u0003\u0002\u0002\u0002\u0093\u0095\n\u0002\u0002\u0002\u0094",
    "\u0093\u0003\u0002\u0002\u0002\u0095\u0098\u0003\u0002\u0002\u0002\u0096",
    "\u0094\u0003\u0002\u0002\u0002\u0096\u0097\u0003\u0002\u0002\u0002\u0097",
    "\u0099\u0003\u0002\u0002\u0002\u0098\u0096\u0003\u0002\u0002\u0002\u0099",
    "\u009a\u0007\'\u0002\u0002\u009a\u0011\u0003\u0002\u0002\u0002\u009b",
    "\u00a0\u0005\u001e\u0010\u0002\u009c\u00a0\u0007\u0004\u0002\u0002\u009d",
    "\u00a0\u0007\u0014\u0002\u0002\u009e\u00a0\u0007\u000e\u0002\u0002\u009f",
    "\u009b\u0003\u0002\u0002\u0002\u009f\u009c\u0003\u0002\u0002\u0002\u009f",
    "\u009d\u0003\u0002\u0002\u0002\u009f\u009e\u0003\u0002\u0002\u0002\u00a0",
    "\u00a1\u0003\u0002\u0002\u0002\u00a1\u009f\u0003\u0002\u0002\u0002\u00a1",
    "\u00a2\u0003\u0002\u0002\u0002\u00a2\u00a5\u0003\u0002\u0002\u0002\u00a3",
    "\u00a5\u0007\u000e\u0002\u0002\u00a4\u009f\u0003\u0002\u0002\u0002\u00a4",
    "\u00a3\u0003\u0002\u0002\u0002\u00a5\u0013\u0003\u0002\u0002\u0002\u00a6",
    "\u00ab\u0005\u001e\u0010\u0002\u00a7\u00ab\u0005\b\u0005\u0002\u00a8",
    "\u00ab\u0005\n\u0006\u0002\u00a9\u00ab\u0005\f\u0007\u0002\u00aa\u00a6",
    "\u0003\u0002\u0002\u0002\u00aa\u00a7\u0003\u0002\u0002\u0002\u00aa\u00a8",
    "\u0003\u0002\u0002\u0002\u00aa\u00a9\u0003\u0002\u0002\u0002\u00ab\u0015",
    "\u0003\u0002\u0002\u0002\u00ac\u00ad\u0007\u000b\u0002\u0002\u00ad\u00ae",
    "\u0007\u0003\u0002\u0002\u00ae\u00af\u0007\f\u0002\u0002\u00af\u0017",
    "\u0003\u0002\u0002\u0002\u00b0\u00b1\u0007\u0010\u0002\u0002\u00b1\u00b2",
    "\u0005\u001e\u0010\u0002\u00b2\u0019\u0003\u0002\u0002\u0002\u00b3\u00b5",
    "\u0005\u000e\b\u0002\u00b4\u00b3\u0003\u0002\u0002\u0002\u00b4\u00b5",
    "\u0003\u0002\u0002\u0002\u00b5\u00b7\u0003\u0002\u0002\u0002\u00b6\u00b8",
    "\u0005\u0010\t\u0002\u00b7\u00b6\u0003\u0002\u0002\u0002\u00b7\u00b8",
    "\u0003\u0002\u0002\u0002\u00b8\u00c5\u0003\u0002\u0002\u0002\u00b9\u00bb",
    "\u0005\u0012\n\u0002\u00ba\u00b9\u0003\u0002\u0002\u0002\u00ba\u00bb",
    "\u0003\u0002\u0002\u0002\u00bb\u00bc\u0003\u0002\u0002\u0002\u00bc\u00be",
    "\u0007\u0018\u0002\u0002\u00bd\u00bf\u0005\u0014\u000b\u0002\u00be\u00bd",
    "\u0003\u0002\u0002\u0002\u00be\u00bf\u0003\u0002\u0002\u0002\u00bf\u00c2",
    "\u0003\u0002\u0002\u0002\u00c0\u00c1\u0007\u0011\u0002\u0002\u00c1\u00c3",
    "\u0005\u001e\u0010\u0002\u00c2\u00c0\u0003\u0002\u0002\u0002\u00c2\u00c3",
    "\u0003\u0002\u0002\u0002\u00c3\u00c6\u0003\u0002\u0002\u0002\u00c4\u00c6",
    "\u0005\u001e\u0010\u0002\u00c5\u00ba\u0003\u0002\u0002\u0002\u00c5\u00c4",
    "\u0003\u0002\u0002\u0002\u00c6\u00c8\u0003\u0002\u0002\u0002\u00c7\u00c9",
    "\u0005\u0016\f\u0002\u00c8\u00c7\u0003\u0002\u0002\u0002\u00c8\u00c9",
    "\u0003\u0002\u0002\u0002\u00c9\u00cb\u0003\u0002\u0002\u0002\u00ca\u00cc",
    "\u0005\u0018\r\u0002\u00cb\u00ca\u0003\u0002\u0002\u0002\u00cb\u00cc",
    "\u0003\u0002\u0002\u0002\u00cc\u001b\u0003\u0002\u0002\u0002\u00cd\u00d6",
    "\u0007\u0007\u0002\u0002\u00ce\u00d3\u0005\u0004\u0003\u0002\u00cf\u00d0",
    "\u0007\r\u0002\u0002\u00d0\u00d2\u0005\u0004\u0003\u0002\u00d1\u00cf",
    "\u0003\u0002\u0002\u0002\u00d2\u00d5\u0003\u0002\u0002\u0002\u00d3\u00d1",
    "\u0003\u0002\u0002\u0002\u00d3\u00d4\u0003\u0002\u0002\u0002\u00d4\u00d7",
    "\u0003\u0002\u0002\u0002\u00d5\u00d3\u0003\u0002\u0002\u0002\u00d6\u00ce",
    "\u0003\u0002\u0002\u0002\u00d6\u00d7\u0003\u0002\u0002\u0002\u00d7\u00d8",
    "\u0003\u0002\u0002\u0002\u00d8\u00d9\u0007\b\u0002\u0002\u00d9\u001d",
    "\u0003\u0002\u0002\u0002\u00da\u00db\t\u0003\u0002\u0002\u00db\u001f",
    "\u0003\u0002\u0002\u0002\u00dc\u00e3\u0007\u0003\u0002\u0002\u00dd\u00e3",
    "\u0007\u0004\u0002\u0002\u00de\u00e3\u0007\u0005\u0002\u0002\u00df\u00e3",
    "\u0007*\u0002\u0002\u00e0\u00e3\u0007+\u0002\u0002\u00e1\u00e3\u0007",
    ",\u0002\u0002\u00e2\u00dc\u0003\u0002\u0002\u0002\u00e2\u00dd\u0003",
    "\u0002\u0002\u0002\u00e2\u00de\u0003\u0002\u0002\u0002\u00e2\u00df\u0003",
    "\u0002\u0002\u0002\u00e2\u00e0\u0003\u0002\u0002\u0002\u00e2\u00e1\u0003",
    "\u0002\u0002\u0002\u00e3!\u0003\u0002\u0002\u0002\u0017#8|~\u0089\u0096",
    "\u009f\u00a1\u00a4\u00aa\u00b4\u00b7\u00ba\u00be\u00c2\u00c5\u00c8\u00cb",
    "\u00d3\u00d6\u00e2"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

const sharedContextCache = new antlr4.PredictionContextCache();

const literalNames = [ null, null, null, null, null, "'('", "')'", "'{'", 
                     "'}'", "'['", "']'", "','", "'.'", "'@'", "'#'", "'$'", 
                     "'+'", "'-'", "'*'", "'/'", "'%'", "'?'", "':'", "'=='", 
                     "'!='", "'~='", "'<'", "'>'", "'<='", "'>='", "'>>'", 
                     "'>>>'", "'<<'", "'||'", "'&&'", "'!'", "'|'", "'^'", 
                     "'&'", "'~'", null, null, null, "'/*'", "'*/'" ];

const symbolicNames = [ null, "INTEGER_LITERAL", "FLOATING_POINT_LITERAL", 
                      "STRING_LITERAL", "UNCLOSED_STRING_LITERAL", "LPAREN", 
                      "RPAREN", "LBRACE", "RBRACE", "LBRACKET", "RBRACKET", 
                      "COMMA", "DOT", "AT", "HASH", "DOLLAR", "PLUS", "MINUS", 
                      "MUL", "DIV", "MOD", "QUESTION", "COLON", "EQ", "NE", 
                      "MATCH", "LT", "GT", "LTE", "GTE", "RIGHT_SHIFT", 
                      "URIGHT_SHIFT", "LEFT_SHIFT", "OR", "AND", "NOT", 
                      "BITWISE_OR", "BITWISE_XOR", "BITWISE_AND", "BITWISE_NOT", 
                      "TRUE", "FALSE", "NULL", "MLC_START", "MLC_END", "WHITESPACE", 
                      "COMMENT_MULTILINE", "COMMENT_LINE", "IDENTIFIER", 
                      "UNMATCHED" ];

const ruleNames =  [ "compilationUnit", "expression", "functionExpression", 
                   "functionReferenceExpression", "actionReferenceExpression", 
                   "eventReferenceExpression", "referenceSchema", "referenceServer", 
                   "referenceContextMask", "referenceEntity", "referenceRow", 
                   "referenceProperty", "valueReference", "arguments", "agIdentifier", 
                   "literal" ];

function AggregateExpressionParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

AggregateExpressionParser.prototype = Object.create(antlr4.Parser.prototype);
AggregateExpressionParser.prototype.constructor = AggregateExpressionParser;

Object.defineProperty(AggregateExpressionParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

AggregateExpressionParser.EOF = antlr4.Token.EOF;
AggregateExpressionParser.INTEGER_LITERAL = 1;
AggregateExpressionParser.FLOATING_POINT_LITERAL = 2;
AggregateExpressionParser.STRING_LITERAL = 3;
AggregateExpressionParser.UNCLOSED_STRING_LITERAL = 4;
AggregateExpressionParser.LPAREN = 5;
AggregateExpressionParser.RPAREN = 6;
AggregateExpressionParser.LBRACE = 7;
AggregateExpressionParser.RBRACE = 8;
AggregateExpressionParser.LBRACKET = 9;
AggregateExpressionParser.RBRACKET = 10;
AggregateExpressionParser.COMMA = 11;
AggregateExpressionParser.DOT = 12;
AggregateExpressionParser.AT = 13;
AggregateExpressionParser.HASH = 14;
AggregateExpressionParser.DOLLAR = 15;
AggregateExpressionParser.PLUS = 16;
AggregateExpressionParser.MINUS = 17;
AggregateExpressionParser.MUL = 18;
AggregateExpressionParser.DIV = 19;
AggregateExpressionParser.MOD = 20;
AggregateExpressionParser.QUESTION = 21;
AggregateExpressionParser.COLON = 22;
AggregateExpressionParser.EQ = 23;
AggregateExpressionParser.NE = 24;
AggregateExpressionParser.MATCH = 25;
AggregateExpressionParser.LT = 26;
AggregateExpressionParser.GT = 27;
AggregateExpressionParser.LTE = 28;
AggregateExpressionParser.GTE = 29;
AggregateExpressionParser.RIGHT_SHIFT = 30;
AggregateExpressionParser.URIGHT_SHIFT = 31;
AggregateExpressionParser.LEFT_SHIFT = 32;
AggregateExpressionParser.OR = 33;
AggregateExpressionParser.AND = 34;
AggregateExpressionParser.NOT = 35;
AggregateExpressionParser.BITWISE_OR = 36;
AggregateExpressionParser.BITWISE_XOR = 37;
AggregateExpressionParser.BITWISE_AND = 38;
AggregateExpressionParser.BITWISE_NOT = 39;
AggregateExpressionParser.TRUE = 40;
AggregateExpressionParser.FALSE = 41;
AggregateExpressionParser.NULL = 42;
AggregateExpressionParser.MLC_START = 43;
AggregateExpressionParser.MLC_END = 44;
AggregateExpressionParser.WHITESPACE = 45;
AggregateExpressionParser.COMMENT_MULTILINE = 46;
AggregateExpressionParser.COMMENT_LINE = 47;
AggregateExpressionParser.IDENTIFIER = 48;
AggregateExpressionParser.UNMATCHED = 49;

AggregateExpressionParser.RULE_compilationUnit = 0;
AggregateExpressionParser.RULE_expression = 1;
AggregateExpressionParser.RULE_functionExpression = 2;
AggregateExpressionParser.RULE_functionReferenceExpression = 3;
AggregateExpressionParser.RULE_actionReferenceExpression = 4;
AggregateExpressionParser.RULE_eventReferenceExpression = 5;
AggregateExpressionParser.RULE_referenceSchema = 6;
AggregateExpressionParser.RULE_referenceServer = 7;
AggregateExpressionParser.RULE_referenceContextMask = 8;
AggregateExpressionParser.RULE_referenceEntity = 9;
AggregateExpressionParser.RULE_referenceRow = 10;
AggregateExpressionParser.RULE_referenceProperty = 11;
AggregateExpressionParser.RULE_valueReference = 12;
AggregateExpressionParser.RULE_arguments = 13;
AggregateExpressionParser.RULE_agIdentifier = 14;
AggregateExpressionParser.RULE_literal = 15;


function CompilationUnitContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_compilationUnit;
    return this;
}

CompilationUnitContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
CompilationUnitContext.prototype.constructor = CompilationUnitContext;

CompilationUnitContext.prototype.EOF = function() {
    return this.getToken(AggregateExpressionParser.EOF, 0);
};

CompilationUnitContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

CompilationUnitContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitCompilationUnit(this);
    } else {
        return visitor.visitChildren(this);
    }
};




AggregateExpressionParser.CompilationUnitContext = CompilationUnitContext;

AggregateExpressionParser.prototype.compilationUnit = function() {

    const localctx = new CompilationUnitContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, AggregateExpressionParser.RULE_compilationUnit);
    let _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 33;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << AggregateExpressionParser.INTEGER_LITERAL) | (1 << AggregateExpressionParser.FLOATING_POINT_LITERAL) | (1 << AggregateExpressionParser.STRING_LITERAL) | (1 << AggregateExpressionParser.LPAREN) | (1 << AggregateExpressionParser.LBRACE) | (1 << AggregateExpressionParser.MINUS))) !== 0) || ((((_la - 35)) & ~0x1f) == 0 && ((1 << (_la - 35)) & ((1 << (AggregateExpressionParser.NOT - 35)) | (1 << (AggregateExpressionParser.BITWISE_NOT - 35)) | (1 << (AggregateExpressionParser.TRUE - 35)) | (1 << (AggregateExpressionParser.FALSE - 35)) | (1 << (AggregateExpressionParser.NULL - 35)) | (1 << (AggregateExpressionParser.IDENTIFIER - 35)))) !== 0)) {
            this.state = 32;
            this.expression(0);
        }

        this.state = 35;
        this.match(AggregateExpressionParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_expression;
    return this;
}

ExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionContext.prototype.constructor = ExpressionContext;


 
ExpressionContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function LogicalAndNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LogicalAndNodeContext.prototype = Object.create(ExpressionContext.prototype);
LogicalAndNodeContext.prototype.constructor = LogicalAndNodeContext;

AggregateExpressionParser.LogicalAndNodeContext = LogicalAndNodeContext;

LogicalAndNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

LogicalAndNodeContext.prototype.AND = function() {
    return this.getToken(AggregateExpressionParser.AND, 0);
};
LogicalAndNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitLogicalAndNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function BitwiseOrNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BitwiseOrNodeContext.prototype = Object.create(ExpressionContext.prototype);
BitwiseOrNodeContext.prototype.constructor = BitwiseOrNodeContext;

AggregateExpressionParser.BitwiseOrNodeContext = BitwiseOrNodeContext;

BitwiseOrNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

BitwiseOrNodeContext.prototype.BITWISE_OR = function() {
    return this.getToken(AggregateExpressionParser.BITWISE_OR, 0);
};
BitwiseOrNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitBitwiseOrNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function BitwiseXorNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BitwiseXorNodeContext.prototype = Object.create(ExpressionContext.prototype);
BitwiseXorNodeContext.prototype.constructor = BitwiseXorNodeContext;

AggregateExpressionParser.BitwiseXorNodeContext = BitwiseXorNodeContext;

BitwiseXorNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

BitwiseXorNodeContext.prototype.BITWISE_XOR = function() {
    return this.getToken(AggregateExpressionParser.BITWISE_XOR, 0);
};
BitwiseXorNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitBitwiseXorNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function NENodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

NENodeContext.prototype = Object.create(ExpressionContext.prototype);
NENodeContext.prototype.constructor = NENodeContext;

AggregateExpressionParser.NENodeContext = NENodeContext;

NENodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

NENodeContext.prototype.NE = function() {
    return this.getToken(AggregateExpressionParser.NE, 0);
};
NENodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitNENode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ConditionalNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ConditionalNodeContext.prototype = Object.create(ExpressionContext.prototype);
ConditionalNodeContext.prototype.constructor = ConditionalNodeContext;

AggregateExpressionParser.ConditionalNodeContext = ConditionalNodeContext;

ConditionalNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

ConditionalNodeContext.prototype.QUESTION = function() {
    return this.getToken(AggregateExpressionParser.QUESTION, 0);
};

ConditionalNodeContext.prototype.COLON = function() {
    return this.getToken(AggregateExpressionParser.COLON, 0);
};
ConditionalNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitConditionalNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ModNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ModNodeContext.prototype = Object.create(ExpressionContext.prototype);
ModNodeContext.prototype.constructor = ModNodeContext;

AggregateExpressionParser.ModNodeContext = ModNodeContext;

ModNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

ModNodeContext.prototype.MOD = function() {
    return this.getToken(AggregateExpressionParser.MOD, 0);
};
ModNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitModNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function LogicalNotNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LogicalNotNodeContext.prototype = Object.create(ExpressionContext.prototype);
LogicalNotNodeContext.prototype.constructor = LogicalNotNodeContext;

AggregateExpressionParser.LogicalNotNodeContext = LogicalNotNodeContext;

LogicalNotNodeContext.prototype.NOT = function() {
    return this.getToken(AggregateExpressionParser.NOT, 0);
};

LogicalNotNodeContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};
LogicalNotNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitLogicalNotNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function EQNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

EQNodeContext.prototype = Object.create(ExpressionContext.prototype);
EQNodeContext.prototype.constructor = EQNodeContext;

AggregateExpressionParser.EQNodeContext = EQNodeContext;

EQNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

EQNodeContext.prototype.EQ = function() {
    return this.getToken(AggregateExpressionParser.EQ, 0);
};
EQNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitEQNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function BitwiseAndNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BitwiseAndNodeContext.prototype = Object.create(ExpressionContext.prototype);
BitwiseAndNodeContext.prototype.constructor = BitwiseAndNodeContext;

AggregateExpressionParser.BitwiseAndNodeContext = BitwiseAndNodeContext;

BitwiseAndNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

BitwiseAndNodeContext.prototype.BITWISE_AND = function() {
    return this.getToken(AggregateExpressionParser.BITWISE_AND, 0);
};
BitwiseAndNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitBitwiseAndNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function GENodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

GENodeContext.prototype = Object.create(ExpressionContext.prototype);
GENodeContext.prototype.constructor = GENodeContext;

AggregateExpressionParser.GENodeContext = GENodeContext;

GENodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

GENodeContext.prototype.GTE = function() {
    return this.getToken(AggregateExpressionParser.GTE, 0);
};
GENodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitGENode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function UnsignedRightShiftNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

UnsignedRightShiftNodeContext.prototype = Object.create(ExpressionContext.prototype);
UnsignedRightShiftNodeContext.prototype.constructor = UnsignedRightShiftNodeContext;

AggregateExpressionParser.UnsignedRightShiftNodeContext = UnsignedRightShiftNodeContext;

UnsignedRightShiftNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

UnsignedRightShiftNodeContext.prototype.URIGHT_SHIFT = function() {
    return this.getToken(AggregateExpressionParser.URIGHT_SHIFT, 0);
};
UnsignedRightShiftNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitUnsignedRightShiftNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function AddNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AddNodeContext.prototype = Object.create(ExpressionContext.prototype);
AddNodeContext.prototype.constructor = AddNodeContext;

AggregateExpressionParser.AddNodeContext = AddNodeContext;

AddNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

AddNodeContext.prototype.PLUS = function() {
    return this.getToken(AggregateExpressionParser.PLUS, 0);
};
AddNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitAddNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function LTNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LTNodeContext.prototype = Object.create(ExpressionContext.prototype);
LTNodeContext.prototype.constructor = LTNodeContext;

AggregateExpressionParser.LTNodeContext = LTNodeContext;

LTNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

LTNodeContext.prototype.LT = function() {
    return this.getToken(AggregateExpressionParser.LT, 0);
};
LTNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitLTNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function BitwiseNotNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BitwiseNotNodeContext.prototype = Object.create(ExpressionContext.prototype);
BitwiseNotNodeContext.prototype.constructor = BitwiseNotNodeContext;

AggregateExpressionParser.BitwiseNotNodeContext = BitwiseNotNodeContext;

BitwiseNotNodeContext.prototype.BITWISE_NOT = function() {
    return this.getToken(AggregateExpressionParser.BITWISE_NOT, 0);
};

BitwiseNotNodeContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};
BitwiseNotNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitBitwiseNotNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SubtractNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SubtractNodeContext.prototype = Object.create(ExpressionContext.prototype);
SubtractNodeContext.prototype.constructor = SubtractNodeContext;

AggregateExpressionParser.SubtractNodeContext = SubtractNodeContext;

SubtractNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

SubtractNodeContext.prototype.MINUS = function() {
    return this.getToken(AggregateExpressionParser.MINUS, 0);
};
SubtractNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitSubtractNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function GTNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

GTNodeContext.prototype = Object.create(ExpressionContext.prototype);
GTNodeContext.prototype.constructor = GTNodeContext;

AggregateExpressionParser.GTNodeContext = GTNodeContext;

GTNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

GTNodeContext.prototype.GT = function() {
    return this.getToken(AggregateExpressionParser.GT, 0);
};
GTNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitGTNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ValueReferenceNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ValueReferenceNodeContext.prototype = Object.create(ExpressionContext.prototype);
ValueReferenceNodeContext.prototype.constructor = ValueReferenceNodeContext;

AggregateExpressionParser.ValueReferenceNodeContext = ValueReferenceNodeContext;

ValueReferenceNodeContext.prototype.LBRACE = function() {
    return this.getToken(AggregateExpressionParser.LBRACE, 0);
};

ValueReferenceNodeContext.prototype.valueReference = function() {
    return this.getTypedRuleContext(ValueReferenceContext,0);
};

ValueReferenceNodeContext.prototype.RBRACE = function() {
    return this.getToken(AggregateExpressionParser.RBRACE, 0);
};
ValueReferenceNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitValueReferenceNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function RegexMatchNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

RegexMatchNodeContext.prototype = Object.create(ExpressionContext.prototype);
RegexMatchNodeContext.prototype.constructor = RegexMatchNodeContext;

AggregateExpressionParser.RegexMatchNodeContext = RegexMatchNodeContext;

RegexMatchNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

RegexMatchNodeContext.prototype.MATCH = function() {
    return this.getToken(AggregateExpressionParser.MATCH, 0);
};
RegexMatchNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitRegexMatchNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function LiteralExpressionContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LiteralExpressionContext.prototype = Object.create(ExpressionContext.prototype);
LiteralExpressionContext.prototype.constructor = LiteralExpressionContext;

AggregateExpressionParser.LiteralExpressionContext = LiteralExpressionContext;

LiteralExpressionContext.prototype.literal = function() {
    return this.getTypedRuleContext(LiteralContext,0);
};
LiteralExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitLiteralExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FunctionNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FunctionNodeContext.prototype = Object.create(ExpressionContext.prototype);
FunctionNodeContext.prototype.constructor = FunctionNodeContext;

AggregateExpressionParser.FunctionNodeContext = FunctionNodeContext;

FunctionNodeContext.prototype.functionExpression = function() {
    return this.getTypedRuleContext(FunctionExpressionContext,0);
};
FunctionNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitFunctionNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function RightShiftNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

RightShiftNodeContext.prototype = Object.create(ExpressionContext.prototype);
RightShiftNodeContext.prototype.constructor = RightShiftNodeContext;

AggregateExpressionParser.RightShiftNodeContext = RightShiftNodeContext;

RightShiftNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

RightShiftNodeContext.prototype.RIGHT_SHIFT = function() {
    return this.getToken(AggregateExpressionParser.RIGHT_SHIFT, 0);
};
RightShiftNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitRightShiftNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function DivNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

DivNodeContext.prototype = Object.create(ExpressionContext.prototype);
DivNodeContext.prototype.constructor = DivNodeContext;

AggregateExpressionParser.DivNodeContext = DivNodeContext;

DivNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

DivNodeContext.prototype.DIV = function() {
    return this.getToken(AggregateExpressionParser.DIV, 0);
};
DivNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitDivNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function LeftShiftNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LeftShiftNodeContext.prototype = Object.create(ExpressionContext.prototype);
LeftShiftNodeContext.prototype.constructor = LeftShiftNodeContext;

AggregateExpressionParser.LeftShiftNodeContext = LeftShiftNodeContext;

LeftShiftNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

LeftShiftNodeContext.prototype.LEFT_SHIFT = function() {
    return this.getToken(AggregateExpressionParser.LEFT_SHIFT, 0);
};
LeftShiftNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitLeftShiftNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExpressionNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExpressionNodeContext.prototype = Object.create(ExpressionContext.prototype);
ExpressionNodeContext.prototype.constructor = ExpressionNodeContext;

AggregateExpressionParser.ExpressionNodeContext = ExpressionNodeContext;

ExpressionNodeContext.prototype.LPAREN = function() {
    return this.getToken(AggregateExpressionParser.LPAREN, 0);
};

ExpressionNodeContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

ExpressionNodeContext.prototype.RPAREN = function() {
    return this.getToken(AggregateExpressionParser.RPAREN, 0);
};
ExpressionNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitExpressionNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function LENodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LENodeContext.prototype = Object.create(ExpressionContext.prototype);
LENodeContext.prototype.constructor = LENodeContext;

AggregateExpressionParser.LENodeContext = LENodeContext;

LENodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

LENodeContext.prototype.LTE = function() {
    return this.getToken(AggregateExpressionParser.LTE, 0);
};
LENodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitLENode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function LogicalOrNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LogicalOrNodeContext.prototype = Object.create(ExpressionContext.prototype);
LogicalOrNodeContext.prototype.constructor = LogicalOrNodeContext;

AggregateExpressionParser.LogicalOrNodeContext = LogicalOrNodeContext;

LogicalOrNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

LogicalOrNodeContext.prototype.OR = function() {
    return this.getToken(AggregateExpressionParser.OR, 0);
};
LogicalOrNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitLogicalOrNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function MulNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

MulNodeContext.prototype = Object.create(ExpressionContext.prototype);
MulNodeContext.prototype.constructor = MulNodeContext;

AggregateExpressionParser.MulNodeContext = MulNodeContext;

MulNodeContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

MulNodeContext.prototype.MUL = function() {
    return this.getToken(AggregateExpressionParser.MUL, 0);
};
MulNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitMulNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function UnaryNodeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

UnaryNodeContext.prototype = Object.create(ExpressionContext.prototype);
UnaryNodeContext.prototype.constructor = UnaryNodeContext;

AggregateExpressionParser.UnaryNodeContext = UnaryNodeContext;

UnaryNodeContext.prototype.MINUS = function() {
    return this.getToken(AggregateExpressionParser.MINUS, 0);
};

UnaryNodeContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};
UnaryNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitUnaryNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};



AggregateExpressionParser.prototype.expression = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    const _parentctx = this._ctx;
    const _parentState = this.state;
    let localctx = new ExpressionContext(this, this._ctx, _parentState);
    let _prevctx = localctx;
    const _startState = 2;
    this.enterRecursionRule(localctx, 2, AggregateExpressionParser.RULE_expression, _p);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 54;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case AggregateExpressionParser.LPAREN:
            localctx = new ExpressionNodeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 38;
            this.match(AggregateExpressionParser.LPAREN);
            this.state = 39;
            this.expression(0);
            this.state = 40;
            this.match(AggregateExpressionParser.RPAREN);
            break;
        case AggregateExpressionParser.IDENTIFIER:
            localctx = new FunctionNodeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 42;
            this.functionExpression();
            break;
        case AggregateExpressionParser.LBRACE:
            localctx = new ValueReferenceNodeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 43;
            this.match(AggregateExpressionParser.LBRACE);
            this.state = 44;
            this.valueReference();
            this.state = 45;
            this.match(AggregateExpressionParser.RBRACE);
            break;
        case AggregateExpressionParser.MINUS:
            localctx = new UnaryNodeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 47;
            this.match(AggregateExpressionParser.MINUS);
            this.state = 48;
            this.expression(25);
            break;
        case AggregateExpressionParser.BITWISE_NOT:
            localctx = new BitwiseNotNodeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 49;
            this.match(AggregateExpressionParser.BITWISE_NOT);
            this.state = 50;
            this.expression(24);
            break;
        case AggregateExpressionParser.NOT:
            localctx = new LogicalNotNodeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 51;
            this.match(AggregateExpressionParser.NOT);
            this.state = 52;
            this.expression(23);
            break;
        case AggregateExpressionParser.INTEGER_LITERAL:
        case AggregateExpressionParser.FLOATING_POINT_LITERAL:
        case AggregateExpressionParser.STRING_LITERAL:
        case AggregateExpressionParser.TRUE:
        case AggregateExpressionParser.FALSE:
        case AggregateExpressionParser.NULL:
            localctx = new LiteralExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 53;
            this.literal();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 124;
        this._errHandler.sync(this);
        let _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 122;
                this._errHandler.sync(this);
                const la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new MulNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 56;
                    if (!( this.precpred(this._ctx, 22))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 22)");
                    }
                    this.state = 57;
                    this.match(AggregateExpressionParser.MUL);
                    this.state = 58;
                    this.expression(23);
                    break;

                case 2:
                    localctx = new DivNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 59;
                    if (!( this.precpred(this._ctx, 21))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 21)");
                    }
                    this.state = 60;
                    this.match(AggregateExpressionParser.DIV);
                    this.state = 61;
                    this.expression(22);
                    break;

                case 3:
                    localctx = new ModNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 62;
                    if (!( this.precpred(this._ctx, 20))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 20)");
                    }
                    this.state = 63;
                    this.match(AggregateExpressionParser.MOD);
                    this.state = 64;
                    this.expression(21);
                    break;

                case 4:
                    localctx = new AddNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 65;
                    if (!( this.precpred(this._ctx, 19))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 19)");
                    }
                    this.state = 66;
                    this.match(AggregateExpressionParser.PLUS);
                    this.state = 67;
                    this.expression(20);
                    break;

                case 5:
                    localctx = new SubtractNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 68;
                    if (!( this.precpred(this._ctx, 18))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 18)");
                    }
                    this.state = 69;
                    this.match(AggregateExpressionParser.MINUS);
                    this.state = 70;
                    this.expression(19);
                    break;

                case 6:
                    localctx = new RightShiftNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 71;
                    if (!( this.precpred(this._ctx, 17))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 17)");
                    }
                    this.state = 72;
                    this.match(AggregateExpressionParser.RIGHT_SHIFT);
                    this.state = 73;
                    this.expression(18);
                    break;

                case 7:
                    localctx = new UnsignedRightShiftNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 74;
                    if (!( this.precpred(this._ctx, 16))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
                    }
                    this.state = 75;
                    this.match(AggregateExpressionParser.URIGHT_SHIFT);
                    this.state = 76;
                    this.expression(17);
                    break;

                case 8:
                    localctx = new LeftShiftNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 77;
                    if (!( this.precpred(this._ctx, 15))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
                    }
                    this.state = 78;
                    this.match(AggregateExpressionParser.LEFT_SHIFT);
                    this.state = 79;
                    this.expression(16);
                    break;

                case 9:
                    localctx = new LTNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 80;
                    if (!( this.precpred(this._ctx, 14))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
                    }
                    this.state = 81;
                    this.match(AggregateExpressionParser.LT);
                    this.state = 82;
                    this.expression(15);
                    break;

                case 10:
                    localctx = new GTNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 83;
                    if (!( this.precpred(this._ctx, 13))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
                    }
                    this.state = 84;
                    this.match(AggregateExpressionParser.GT);
                    this.state = 85;
                    this.expression(14);
                    break;

                case 11:
                    localctx = new LENodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 86;
                    if (!( this.precpred(this._ctx, 12))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                    }
                    this.state = 87;
                    this.match(AggregateExpressionParser.LTE);
                    this.state = 88;
                    this.expression(13);
                    break;

                case 12:
                    localctx = new GENodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 89;
                    if (!( this.precpred(this._ctx, 11))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
                    }
                    this.state = 90;
                    this.match(AggregateExpressionParser.GTE);
                    this.state = 91;
                    this.expression(12);
                    break;

                case 13:
                    localctx = new EQNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 92;
                    if (!( this.precpred(this._ctx, 10))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                    }
                    this.state = 93;
                    this.match(AggregateExpressionParser.EQ);
                    this.state = 94;
                    this.expression(11);
                    break;

                case 14:
                    localctx = new NENodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 95;
                    if (!( this.precpred(this._ctx, 9))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
                    }
                    this.state = 96;
                    this.match(AggregateExpressionParser.NE);
                    this.state = 97;
                    this.expression(10);
                    break;

                case 15:
                    localctx = new RegexMatchNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 98;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 99;
                    this.match(AggregateExpressionParser.MATCH);
                    this.state = 100;
                    this.expression(9);
                    break;

                case 16:
                    localctx = new BitwiseOrNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 101;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 102;
                    this.match(AggregateExpressionParser.BITWISE_OR);
                    this.state = 103;
                    this.expression(8);
                    break;

                case 17:
                    localctx = new BitwiseXorNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 104;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 105;
                    this.match(AggregateExpressionParser.BITWISE_XOR);
                    this.state = 106;
                    this.expression(7);
                    break;

                case 18:
                    localctx = new BitwiseAndNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 107;
                    if (!( this.precpred(this._ctx, 5))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                    }
                    this.state = 108;
                    this.match(AggregateExpressionParser.BITWISE_AND);
                    this.state = 109;
                    this.expression(6);
                    break;

                case 19:
                    localctx = new LogicalOrNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 110;
                    if (!( this.precpred(this._ctx, 4))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                    }
                    this.state = 111;
                    this.match(AggregateExpressionParser.OR);
                    this.state = 112;
                    this.expression(5);
                    break;

                case 20:
                    localctx = new LogicalAndNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 113;
                    if (!( this.precpred(this._ctx, 3))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                    }
                    this.state = 114;
                    this.match(AggregateExpressionParser.AND);
                    this.state = 115;
                    this.expression(4);
                    break;

                case 21:
                    localctx = new ConditionalNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 116;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 117;
                    this.match(AggregateExpressionParser.QUESTION);
                    this.state = 118;
                    this.expression(0);
                    this.state = 119;
                    this.match(AggregateExpressionParser.COLON);
                    this.state = 120;
                    this.expression(3);
                    break;

                } 
            }
            this.state = 126;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


function FunctionExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_functionExpression;
    return this;
}

FunctionExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FunctionExpressionContext.prototype.constructor = FunctionExpressionContext;

FunctionExpressionContext.prototype.IDENTIFIER = function() {
    return this.getToken(AggregateExpressionParser.IDENTIFIER, 0);
};

FunctionExpressionContext.prototype.arguments = function() {
    return this.getTypedRuleContext(ArgumentsContext,0);
};

FunctionExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitFunctionExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};




AggregateExpressionParser.FunctionExpressionContext = FunctionExpressionContext;

AggregateExpressionParser.prototype.functionExpression = function() {

    const localctx = new FunctionExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, AggregateExpressionParser.RULE_functionExpression);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 127;
        this.match(AggregateExpressionParser.IDENTIFIER);
        this.state = 128;
        this.arguments();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function FunctionReferenceExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_functionReferenceExpression;
    return this;
}

FunctionReferenceExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FunctionReferenceExpressionContext.prototype.constructor = FunctionReferenceExpressionContext;

FunctionReferenceExpressionContext.prototype.agIdentifier = function() {
    return this.getTypedRuleContext(AgIdentifierContext,0);
};

FunctionReferenceExpressionContext.prototype.arguments = function() {
    return this.getTypedRuleContext(ArgumentsContext,0);
};

FunctionReferenceExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitFunctionReferenceExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};




AggregateExpressionParser.FunctionReferenceExpressionContext = FunctionReferenceExpressionContext;

AggregateExpressionParser.prototype.functionReferenceExpression = function() {

    const localctx = new FunctionReferenceExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, AggregateExpressionParser.RULE_functionReferenceExpression);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 130;
        this.agIdentifier();
        this.state = 131;
        this.arguments();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ActionReferenceExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_actionReferenceExpression;
    return this;
}

ActionReferenceExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ActionReferenceExpressionContext.prototype.constructor = ActionReferenceExpressionContext;

ActionReferenceExpressionContext.prototype.agIdentifier = function() {
    return this.getTypedRuleContext(AgIdentifierContext,0);
};

ActionReferenceExpressionContext.prototype.NOT = function() {
    return this.getToken(AggregateExpressionParser.NOT, 0);
};

ActionReferenceExpressionContext.prototype.arguments = function() {
    return this.getTypedRuleContext(ArgumentsContext,0);
};

ActionReferenceExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitActionReferenceExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};




AggregateExpressionParser.ActionReferenceExpressionContext = ActionReferenceExpressionContext;

AggregateExpressionParser.prototype.actionReferenceExpression = function() {

    const localctx = new ActionReferenceExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, AggregateExpressionParser.RULE_actionReferenceExpression);
    let _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 133;
        this.agIdentifier();
        this.state = 135;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===AggregateExpressionParser.LPAREN) {
            this.state = 134;
            this.arguments();
        }

        this.state = 137;
        this.match(AggregateExpressionParser.NOT);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function EventReferenceExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_eventReferenceExpression;
    return this;
}

EventReferenceExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EventReferenceExpressionContext.prototype.constructor = EventReferenceExpressionContext;

EventReferenceExpressionContext.prototype.agIdentifier = function() {
    return this.getTypedRuleContext(AgIdentifierContext,0);
};

EventReferenceExpressionContext.prototype.AT = function() {
    return this.getToken(AggregateExpressionParser.AT, 0);
};

EventReferenceExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitEventReferenceExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};




AggregateExpressionParser.EventReferenceExpressionContext = EventReferenceExpressionContext;

AggregateExpressionParser.prototype.eventReferenceExpression = function() {

    const localctx = new EventReferenceExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, AggregateExpressionParser.RULE_eventReferenceExpression);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 139;
        this.agIdentifier();
        this.state = 140;
        this.match(AggregateExpressionParser.AT);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ReferenceSchemaContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_referenceSchema;
    return this;
}

ReferenceSchemaContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ReferenceSchemaContext.prototype.constructor = ReferenceSchemaContext;

ReferenceSchemaContext.prototype.IDENTIFIER = function() {
    return this.getToken(AggregateExpressionParser.IDENTIFIER, 0);
};

ReferenceSchemaContext.prototype.DIV = function() {
    return this.getToken(AggregateExpressionParser.DIV, 0);
};

ReferenceSchemaContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitReferenceSchema(this);
    } else {
        return visitor.visitChildren(this);
    }
};




AggregateExpressionParser.ReferenceSchemaContext = ReferenceSchemaContext;

AggregateExpressionParser.prototype.referenceSchema = function() {

    const localctx = new ReferenceSchemaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, AggregateExpressionParser.RULE_referenceSchema);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 142;
        this.match(AggregateExpressionParser.IDENTIFIER);
        this.state = 143;
        this.match(AggregateExpressionParser.DIV);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ReferenceServerContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_referenceServer;
    return this;
}

ReferenceServerContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ReferenceServerContext.prototype.constructor = ReferenceServerContext;

ReferenceServerContext.prototype.BITWISE_XOR = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(AggregateExpressionParser.BITWISE_XOR);
    } else {
        return this.getToken(AggregateExpressionParser.BITWISE_XOR, i);
    }
};


ReferenceServerContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitReferenceServer(this);
    } else {
        return visitor.visitChildren(this);
    }
};




AggregateExpressionParser.ReferenceServerContext = ReferenceServerContext;

AggregateExpressionParser.prototype.referenceServer = function() {

    const localctx = new ReferenceServerContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, AggregateExpressionParser.RULE_referenceServer);
    let _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 148;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << AggregateExpressionParser.INTEGER_LITERAL) | (1 << AggregateExpressionParser.FLOATING_POINT_LITERAL) | (1 << AggregateExpressionParser.STRING_LITERAL) | (1 << AggregateExpressionParser.UNCLOSED_STRING_LITERAL) | (1 << AggregateExpressionParser.LPAREN) | (1 << AggregateExpressionParser.RPAREN) | (1 << AggregateExpressionParser.LBRACE) | (1 << AggregateExpressionParser.RBRACE) | (1 << AggregateExpressionParser.LBRACKET) | (1 << AggregateExpressionParser.RBRACKET) | (1 << AggregateExpressionParser.COMMA) | (1 << AggregateExpressionParser.DOT) | (1 << AggregateExpressionParser.AT) | (1 << AggregateExpressionParser.HASH) | (1 << AggregateExpressionParser.DOLLAR) | (1 << AggregateExpressionParser.PLUS) | (1 << AggregateExpressionParser.MINUS) | (1 << AggregateExpressionParser.MUL) | (1 << AggregateExpressionParser.DIV) | (1 << AggregateExpressionParser.MOD) | (1 << AggregateExpressionParser.QUESTION) | (1 << AggregateExpressionParser.COLON) | (1 << AggregateExpressionParser.EQ) | (1 << AggregateExpressionParser.NE) | (1 << AggregateExpressionParser.MATCH) | (1 << AggregateExpressionParser.LT) | (1 << AggregateExpressionParser.GT) | (1 << AggregateExpressionParser.LTE) | (1 << AggregateExpressionParser.GTE) | (1 << AggregateExpressionParser.RIGHT_SHIFT) | (1 << AggregateExpressionParser.URIGHT_SHIFT))) !== 0) || ((((_la - 32)) & ~0x1f) == 0 && ((1 << (_la - 32)) & ((1 << (AggregateExpressionParser.LEFT_SHIFT - 32)) | (1 << (AggregateExpressionParser.OR - 32)) | (1 << (AggregateExpressionParser.AND - 32)) | (1 << (AggregateExpressionParser.NOT - 32)) | (1 << (AggregateExpressionParser.BITWISE_OR - 32)) | (1 << (AggregateExpressionParser.BITWISE_AND - 32)) | (1 << (AggregateExpressionParser.BITWISE_NOT - 32)) | (1 << (AggregateExpressionParser.TRUE - 32)) | (1 << (AggregateExpressionParser.FALSE - 32)) | (1 << (AggregateExpressionParser.NULL - 32)) | (1 << (AggregateExpressionParser.MLC_START - 32)) | (1 << (AggregateExpressionParser.MLC_END - 32)) | (1 << (AggregateExpressionParser.WHITESPACE - 32)) | (1 << (AggregateExpressionParser.COMMENT_MULTILINE - 32)) | (1 << (AggregateExpressionParser.COMMENT_LINE - 32)) | (1 << (AggregateExpressionParser.IDENTIFIER - 32)) | (1 << (AggregateExpressionParser.UNMATCHED - 32)))) !== 0)) {
            this.state = 145;
            _la = this._input.LA(1);
            if(_la<=0 || _la===AggregateExpressionParser.BITWISE_XOR) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 150;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 151;
        this.match(AggregateExpressionParser.BITWISE_XOR);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ReferenceContextMaskContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_referenceContextMask;
    return this;
}

ReferenceContextMaskContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ReferenceContextMaskContext.prototype.constructor = ReferenceContextMaskContext;

ReferenceContextMaskContext.prototype.agIdentifier = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(AgIdentifierContext);
    } else {
        return this.getTypedRuleContext(AgIdentifierContext,i);
    }
};

ReferenceContextMaskContext.prototype.FLOATING_POINT_LITERAL = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(AggregateExpressionParser.FLOATING_POINT_LITERAL);
    } else {
        return this.getToken(AggregateExpressionParser.FLOATING_POINT_LITERAL, i);
    }
};


ReferenceContextMaskContext.prototype.MUL = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(AggregateExpressionParser.MUL);
    } else {
        return this.getToken(AggregateExpressionParser.MUL, i);
    }
};


ReferenceContextMaskContext.prototype.DOT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(AggregateExpressionParser.DOT);
    } else {
        return this.getToken(AggregateExpressionParser.DOT, i);
    }
};


ReferenceContextMaskContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitReferenceContextMask(this);
    } else {
        return visitor.visitChildren(this);
    }
};




AggregateExpressionParser.ReferenceContextMaskContext = ReferenceContextMaskContext;

AggregateExpressionParser.prototype.referenceContextMask = function() {

    const localctx = new ReferenceContextMaskContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, AggregateExpressionParser.RULE_referenceContextMask);
    let _la = 0; // Token type
    try {
        this.state = 162;
        this._errHandler.sync(this);
        const la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 157; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 157;
                this._errHandler.sync(this);
                switch(this._input.LA(1)) {
                case AggregateExpressionParser.INTEGER_LITERAL:
                case AggregateExpressionParser.TRUE:
                case AggregateExpressionParser.FALSE:
                case AggregateExpressionParser.NULL:
                case AggregateExpressionParser.IDENTIFIER:
                    this.state = 153;
                    this.agIdentifier();
                    break;
                case AggregateExpressionParser.FLOATING_POINT_LITERAL:
                    this.state = 154;
                    this.match(AggregateExpressionParser.FLOATING_POINT_LITERAL);
                    break;
                case AggregateExpressionParser.MUL:
                    this.state = 155;
                    this.match(AggregateExpressionParser.MUL);
                    break;
                case AggregateExpressionParser.DOT:
                    this.state = 156;
                    this.match(AggregateExpressionParser.DOT);
                    break;
                default:
                    throw new antlr4.error.NoViableAltException(this);
                }
                this.state = 159; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << AggregateExpressionParser.INTEGER_LITERAL) | (1 << AggregateExpressionParser.FLOATING_POINT_LITERAL) | (1 << AggregateExpressionParser.DOT) | (1 << AggregateExpressionParser.MUL))) !== 0) || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & ((1 << (AggregateExpressionParser.TRUE - 40)) | (1 << (AggregateExpressionParser.FALSE - 40)) | (1 << (AggregateExpressionParser.NULL - 40)) | (1 << (AggregateExpressionParser.IDENTIFIER - 40)))) !== 0));
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 161;
            this.match(AggregateExpressionParser.DOT);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ReferenceEntityContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_referenceEntity;
    return this;
}

ReferenceEntityContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ReferenceEntityContext.prototype.constructor = ReferenceEntityContext;

ReferenceEntityContext.prototype.agIdentifier = function() {
    return this.getTypedRuleContext(AgIdentifierContext,0);
};

ReferenceEntityContext.prototype.functionReferenceExpression = function() {
    return this.getTypedRuleContext(FunctionReferenceExpressionContext,0);
};

ReferenceEntityContext.prototype.actionReferenceExpression = function() {
    return this.getTypedRuleContext(ActionReferenceExpressionContext,0);
};

ReferenceEntityContext.prototype.eventReferenceExpression = function() {
    return this.getTypedRuleContext(EventReferenceExpressionContext,0);
};

ReferenceEntityContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitReferenceEntity(this);
    } else {
        return visitor.visitChildren(this);
    }
};




AggregateExpressionParser.ReferenceEntityContext = ReferenceEntityContext;

AggregateExpressionParser.prototype.referenceEntity = function() {

    const localctx = new ReferenceEntityContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, AggregateExpressionParser.RULE_referenceEntity);
    try {
        this.state = 168;
        this._errHandler.sync(this);
        const la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 164;
            this.agIdentifier();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 165;
            this.functionReferenceExpression();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 166;
            this.actionReferenceExpression();
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 167;
            this.eventReferenceExpression();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ReferenceRowContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_referenceRow;
    return this;
}

ReferenceRowContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ReferenceRowContext.prototype.constructor = ReferenceRowContext;

ReferenceRowContext.prototype.LBRACKET = function() {
    return this.getToken(AggregateExpressionParser.LBRACKET, 0);
};

ReferenceRowContext.prototype.INTEGER_LITERAL = function() {
    return this.getToken(AggregateExpressionParser.INTEGER_LITERAL, 0);
};

ReferenceRowContext.prototype.RBRACKET = function() {
    return this.getToken(AggregateExpressionParser.RBRACKET, 0);
};

ReferenceRowContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitReferenceRow(this);
    } else {
        return visitor.visitChildren(this);
    }
};




AggregateExpressionParser.ReferenceRowContext = ReferenceRowContext;

AggregateExpressionParser.prototype.referenceRow = function() {

    const localctx = new ReferenceRowContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, AggregateExpressionParser.RULE_referenceRow);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 170;
        this.match(AggregateExpressionParser.LBRACKET);
        this.state = 171;
        this.match(AggregateExpressionParser.INTEGER_LITERAL);
        this.state = 172;
        this.match(AggregateExpressionParser.RBRACKET);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ReferencePropertyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_referenceProperty;
    return this;
}

ReferencePropertyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ReferencePropertyContext.prototype.constructor = ReferencePropertyContext;

ReferencePropertyContext.prototype.HASH = function() {
    return this.getToken(AggregateExpressionParser.HASH, 0);
};

ReferencePropertyContext.prototype.agIdentifier = function() {
    return this.getTypedRuleContext(AgIdentifierContext,0);
};

ReferencePropertyContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitReferenceProperty(this);
    } else {
        return visitor.visitChildren(this);
    }
};




AggregateExpressionParser.ReferencePropertyContext = ReferencePropertyContext;

AggregateExpressionParser.prototype.referenceProperty = function() {

    const localctx = new ReferencePropertyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, AggregateExpressionParser.RULE_referenceProperty);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 174;
        this.match(AggregateExpressionParser.HASH);
        this.state = 175;
        this.agIdentifier();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ValueReferenceContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_valueReference;
    return this;
}

ValueReferenceContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ValueReferenceContext.prototype.constructor = ValueReferenceContext;

ValueReferenceContext.prototype.COLON = function() {
    return this.getToken(AggregateExpressionParser.COLON, 0);
};

ValueReferenceContext.prototype.agIdentifier = function() {
    return this.getTypedRuleContext(AgIdentifierContext,0);
};

ValueReferenceContext.prototype.referenceSchema = function() {
    return this.getTypedRuleContext(ReferenceSchemaContext,0);
};

ValueReferenceContext.prototype.referenceServer = function() {
    return this.getTypedRuleContext(ReferenceServerContext,0);
};

ValueReferenceContext.prototype.referenceRow = function() {
    return this.getTypedRuleContext(ReferenceRowContext,0);
};

ValueReferenceContext.prototype.referenceProperty = function() {
    return this.getTypedRuleContext(ReferencePropertyContext,0);
};

ValueReferenceContext.prototype.referenceContextMask = function() {
    return this.getTypedRuleContext(ReferenceContextMaskContext,0);
};

ValueReferenceContext.prototype.referenceEntity = function() {
    return this.getTypedRuleContext(ReferenceEntityContext,0);
};

ValueReferenceContext.prototype.DOLLAR = function() {
    return this.getToken(AggregateExpressionParser.DOLLAR, 0);
};

ValueReferenceContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitValueReference(this);
    } else {
        return visitor.visitChildren(this);
    }
};




AggregateExpressionParser.ValueReferenceContext = ValueReferenceContext;

AggregateExpressionParser.prototype.valueReference = function() {

    const localctx = new ValueReferenceContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, AggregateExpressionParser.RULE_valueReference);
    let _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 178;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
        if(la_===1) {
            this.state = 177;
            this.referenceSchema();

        }
        this.state = 181;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
        if(la_===1) {
            this.state = 180;
            this.referenceServer();

        }
        this.state = 195;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,15,this._ctx);
        switch(la_) {
        case 1:
            this.state = 184;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << AggregateExpressionParser.INTEGER_LITERAL) | (1 << AggregateExpressionParser.FLOATING_POINT_LITERAL) | (1 << AggregateExpressionParser.DOT) | (1 << AggregateExpressionParser.MUL))) !== 0) || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & ((1 << (AggregateExpressionParser.TRUE - 40)) | (1 << (AggregateExpressionParser.FALSE - 40)) | (1 << (AggregateExpressionParser.NULL - 40)) | (1 << (AggregateExpressionParser.IDENTIFIER - 40)))) !== 0)) {
                this.state = 183;
                this.referenceContextMask();
            }

            this.state = 186;
            this.match(AggregateExpressionParser.COLON);
            this.state = 188;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===AggregateExpressionParser.INTEGER_LITERAL || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & ((1 << (AggregateExpressionParser.TRUE - 40)) | (1 << (AggregateExpressionParser.FALSE - 40)) | (1 << (AggregateExpressionParser.NULL - 40)) | (1 << (AggregateExpressionParser.IDENTIFIER - 40)))) !== 0)) {
                this.state = 187;
                this.referenceEntity();
            }

            this.state = 192;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===AggregateExpressionParser.DOLLAR) {
                this.state = 190;
                this.match(AggregateExpressionParser.DOLLAR);
                this.state = 191;
                this.agIdentifier();
            }

            break;

        case 2:
            this.state = 194;
            this.agIdentifier();
            break;

        }
        this.state = 198;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===AggregateExpressionParser.LBRACKET) {
            this.state = 197;
            this.referenceRow();
        }

        this.state = 201;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===AggregateExpressionParser.HASH) {
            this.state = 200;
            this.referenceProperty();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ArgumentsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_arguments;
    return this;
}

ArgumentsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ArgumentsContext.prototype.constructor = ArgumentsContext;

ArgumentsContext.prototype.LPAREN = function() {
    return this.getToken(AggregateExpressionParser.LPAREN, 0);
};

ArgumentsContext.prototype.RPAREN = function() {
    return this.getToken(AggregateExpressionParser.RPAREN, 0);
};

ArgumentsContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

ArgumentsContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(AggregateExpressionParser.COMMA);
    } else {
        return this.getToken(AggregateExpressionParser.COMMA, i);
    }
};


ArgumentsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitArguments(this);
    } else {
        return visitor.visitChildren(this);
    }
};




AggregateExpressionParser.ArgumentsContext = ArgumentsContext;

AggregateExpressionParser.prototype.arguments = function() {

    const localctx = new ArgumentsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, AggregateExpressionParser.RULE_arguments);
    let _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 203;
        this.match(AggregateExpressionParser.LPAREN);
        this.state = 212;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << AggregateExpressionParser.INTEGER_LITERAL) | (1 << AggregateExpressionParser.FLOATING_POINT_LITERAL) | (1 << AggregateExpressionParser.STRING_LITERAL) | (1 << AggregateExpressionParser.LPAREN) | (1 << AggregateExpressionParser.LBRACE) | (1 << AggregateExpressionParser.MINUS))) !== 0) || ((((_la - 35)) & ~0x1f) == 0 && ((1 << (_la - 35)) & ((1 << (AggregateExpressionParser.NOT - 35)) | (1 << (AggregateExpressionParser.BITWISE_NOT - 35)) | (1 << (AggregateExpressionParser.TRUE - 35)) | (1 << (AggregateExpressionParser.FALSE - 35)) | (1 << (AggregateExpressionParser.NULL - 35)) | (1 << (AggregateExpressionParser.IDENTIFIER - 35)))) !== 0)) {
            this.state = 204;
            this.expression(0);
            this.state = 209;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===AggregateExpressionParser.COMMA) {
                this.state = 205;
                this.match(AggregateExpressionParser.COMMA);
                this.state = 206;
                this.expression(0);
                this.state = 211;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
        }

        this.state = 214;
        this.match(AggregateExpressionParser.RPAREN);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function AgIdentifierContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_agIdentifier;
    return this;
}

AgIdentifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AgIdentifierContext.prototype.constructor = AgIdentifierContext;

AgIdentifierContext.prototype.IDENTIFIER = function() {
    return this.getToken(AggregateExpressionParser.IDENTIFIER, 0);
};

AgIdentifierContext.prototype.INTEGER_LITERAL = function() {
    return this.getToken(AggregateExpressionParser.INTEGER_LITERAL, 0);
};

AgIdentifierContext.prototype.TRUE = function() {
    return this.getToken(AggregateExpressionParser.TRUE, 0);
};

AgIdentifierContext.prototype.FALSE = function() {
    return this.getToken(AggregateExpressionParser.FALSE, 0);
};

AgIdentifierContext.prototype.NULL = function() {
    return this.getToken(AggregateExpressionParser.NULL, 0);
};

AgIdentifierContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitAgIdentifier(this);
    } else {
        return visitor.visitChildren(this);
    }
};




AggregateExpressionParser.AgIdentifierContext = AgIdentifierContext;

AggregateExpressionParser.prototype.agIdentifier = function() {

    const localctx = new AgIdentifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, AggregateExpressionParser.RULE_agIdentifier);
    let _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 216;
        _la = this._input.LA(1);
        if(!(_la===AggregateExpressionParser.INTEGER_LITERAL || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & ((1 << (AggregateExpressionParser.TRUE - 40)) | (1 << (AggregateExpressionParser.FALSE - 40)) | (1 << (AggregateExpressionParser.NULL - 40)) | (1 << (AggregateExpressionParser.IDENTIFIER - 40)))) !== 0))) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function LiteralContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = AggregateExpressionParser.RULE_literal;
    return this;
}

LiteralContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LiteralContext.prototype.constructor = LiteralContext;


 
LiteralContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function StringConstNodeContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

StringConstNodeContext.prototype = Object.create(LiteralContext.prototype);
StringConstNodeContext.prototype.constructor = StringConstNodeContext;

AggregateExpressionParser.StringConstNodeContext = StringConstNodeContext;

StringConstNodeContext.prototype.STRING_LITERAL = function() {
    return this.getToken(AggregateExpressionParser.STRING_LITERAL, 0);
};
StringConstNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitStringConstNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function TrueNodeContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

TrueNodeContext.prototype = Object.create(LiteralContext.prototype);
TrueNodeContext.prototype.constructor = TrueNodeContext;

AggregateExpressionParser.TrueNodeContext = TrueNodeContext;

TrueNodeContext.prototype.TRUE = function() {
    return this.getToken(AggregateExpressionParser.TRUE, 0);
};
TrueNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitTrueNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function LongConstNodeContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LongConstNodeContext.prototype = Object.create(LiteralContext.prototype);
LongConstNodeContext.prototype.constructor = LongConstNodeContext;

AggregateExpressionParser.LongConstNodeContext = LongConstNodeContext;

LongConstNodeContext.prototype.INTEGER_LITERAL = function() {
    return this.getToken(AggregateExpressionParser.INTEGER_LITERAL, 0);
};
LongConstNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitLongConstNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FloatConstNodeContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FloatConstNodeContext.prototype = Object.create(LiteralContext.prototype);
FloatConstNodeContext.prototype.constructor = FloatConstNodeContext;

AggregateExpressionParser.FloatConstNodeContext = FloatConstNodeContext;

FloatConstNodeContext.prototype.FLOATING_POINT_LITERAL = function() {
    return this.getToken(AggregateExpressionParser.FLOATING_POINT_LITERAL, 0);
};
FloatConstNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitFloatConstNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FalseNodeContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FalseNodeContext.prototype = Object.create(LiteralContext.prototype);
FalseNodeContext.prototype.constructor = FalseNodeContext;

AggregateExpressionParser.FalseNodeContext = FalseNodeContext;

FalseNodeContext.prototype.FALSE = function() {
    return this.getToken(AggregateExpressionParser.FALSE, 0);
};
FalseNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitFalseNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function NullNodeContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

NullNodeContext.prototype = Object.create(LiteralContext.prototype);
NullNodeContext.prototype.constructor = NullNodeContext;

AggregateExpressionParser.NullNodeContext = NullNodeContext;

NullNodeContext.prototype.NULL = function() {
    return this.getToken(AggregateExpressionParser.NULL, 0);
};
NullNodeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof AggregateExpressionVisitor ) {
        return visitor.visitNullNode(this);
    } else {
        return visitor.visitChildren(this);
    }
};



AggregateExpressionParser.LiteralContext = LiteralContext;

AggregateExpressionParser.prototype.literal = function() {

    let localctx = new LiteralContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, AggregateExpressionParser.RULE_literal);
    try {
        this.state = 224;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case AggregateExpressionParser.INTEGER_LITERAL:
            localctx = new LongConstNodeContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 218;
            this.match(AggregateExpressionParser.INTEGER_LITERAL);
            break;
        case AggregateExpressionParser.FLOATING_POINT_LITERAL:
            localctx = new FloatConstNodeContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 219;
            this.match(AggregateExpressionParser.FLOATING_POINT_LITERAL);
            break;
        case AggregateExpressionParser.STRING_LITERAL:
            localctx = new StringConstNodeContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 220;
            this.match(AggregateExpressionParser.STRING_LITERAL);
            break;
        case AggregateExpressionParser.TRUE:
            localctx = new TrueNodeContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 221;
            this.match(AggregateExpressionParser.TRUE);
            break;
        case AggregateExpressionParser.FALSE:
            localctx = new FalseNodeContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 222;
            this.match(AggregateExpressionParser.FALSE);
            break;
        case AggregateExpressionParser.NULL:
            localctx = new NullNodeContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 223;
            this.match(AggregateExpressionParser.NULL);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


AggregateExpressionParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 1:
			return this.expression_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

AggregateExpressionParser.prototype.expression_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 22);
		case 1:
			return this.precpred(this._ctx, 21);
		case 2:
			return this.precpred(this._ctx, 20);
		case 3:
			return this.precpred(this._ctx, 19);
		case 4:
			return this.precpred(this._ctx, 18);
		case 5:
			return this.precpred(this._ctx, 17);
		case 6:
			return this.precpred(this._ctx, 16);
		case 7:
			return this.precpred(this._ctx, 15);
		case 8:
			return this.precpred(this._ctx, 14);
		case 9:
			return this.precpred(this._ctx, 13);
		case 10:
			return this.precpred(this._ctx, 12);
		case 11:
			return this.precpred(this._ctx, 11);
		case 12:
			return this.precpred(this._ctx, 10);
		case 13:
			return this.precpred(this._ctx, 9);
		case 14:
			return this.precpred(this._ctx, 8);
		case 15:
			return this.precpred(this._ctx, 7);
		case 16:
			return this.precpred(this._ctx, 6);
		case 17:
			return this.precpred(this._ctx, 5);
		case 18:
			return this.precpred(this._ctx, 4);
		case 19:
			return this.precpred(this._ctx, 3);
		case 20:
			return this.precpred(this._ctx, 2);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.AggregateExpressionParser = AggregateExpressionParser;
