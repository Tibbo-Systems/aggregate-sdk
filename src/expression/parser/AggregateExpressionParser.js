// Generated from src/expression/grammar/AggregateExpression.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');
var AggregateExpressionVisitor = require('./AggregateExpressionVisitor').AggregateExpressionVisitor;

var grammarFileName = "AggregateExpression.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u00033\u0083\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0003\u0002\u0005\u0002",
    "\u000e\n\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0005\u0003#\n\u0003\u0003\u0003\u0003",
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
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003g",
    "\n\u0003\f\u0003\u000e\u0003j\u000b\u0003\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0007\u0004p\n\u0004\f\u0004\u000e\u0004s\u000b\u0004",
    "\u0005\u0004u\n\u0004\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0005\u0006\u0081\n\u0006\u0003\u0006\u0002\u0003\u0004\u0007\u0002",
    "\u0004\u0006\b\n\u0002\u0002\u0002\u00a0\u0002\r\u0003\u0002\u0002\u0002",
    "\u0004\"\u0003\u0002\u0002\u0002\u0006k\u0003\u0002\u0002\u0002\bx\u0003",
    "\u0002\u0002\u0002\n\u0080\u0003\u0002\u0002\u0002\f\u000e\u0005\u0004",
    "\u0003\u0002\r\f\u0003\u0002\u0002\u0002\r\u000e\u0003\u0002\u0002\u0002",
    "\u000e\u000f\u0003\u0002\u0002\u0002\u000f\u0010\u0007\u0002\u0002\u0003",
    "\u0010\u0003\u0003\u0002\u0002\u0002\u0011\u0012\b\u0003\u0001\u0002",
    "\u0012\u0013\u0007\u0007\u0002\u0002\u0013\u0014\u0005\u0004\u0003\u0002",
    "\u0014\u0015\u0007\b\u0002\u0002\u0015#\u0003\u0002\u0002\u0002\u0016",
    "#\u0005\u0006\u0004\u0002\u0017\u0018\u0007\t\u0002\u0002\u0018\u0019",
    "\u0005\b\u0005\u0002\u0019\u001a\u0007\n\u0002\u0002\u001a#\u0003\u0002",
    "\u0002\u0002\u001b\u001c\u0007\u0013\u0002\u0002\u001c#\u0005\u0004",
    "\u0003\u001b\u001d\u001e\u0007)\u0002\u0002\u001e#\u0005\u0004\u0003",
    "\u001a\u001f \u0007%\u0002\u0002 #\u0005\u0004\u0003\u0019!#\u0005\n",
    "\u0006\u0002\"\u0011\u0003\u0002\u0002\u0002\"\u0016\u0003\u0002\u0002",
    "\u0002\"\u0017\u0003\u0002\u0002\u0002\"\u001b\u0003\u0002\u0002\u0002",
    "\"\u001d\u0003\u0002\u0002\u0002\"\u001f\u0003\u0002\u0002\u0002\"!",
    "\u0003\u0002\u0002\u0002#h\u0003\u0002\u0002\u0002$%\f\u0018\u0002\u0002",
    "%&\u0007\u0014\u0002\u0002&g\u0005\u0004\u0003\u0019\'(\f\u0017\u0002",
    "\u0002()\u0007\u0015\u0002\u0002)g\u0005\u0004\u0003\u0018*+\f\u0016",
    "\u0002\u0002+,\u0007\u0016\u0002\u0002,g\u0005\u0004\u0003\u0017-.\f",
    "\u0015\u0002\u0002./\u0007\u0012\u0002\u0002/g\u0005\u0004\u0003\u0016",
    "01\f\u0014\u0002\u000212\u0007\u0013\u0002\u00022g\u0005\u0004\u0003",
    "\u001534\f\u0013\u0002\u000245\u0007 \u0002\u00025g\u0005\u0004\u0003",
    "\u001467\f\u0012\u0002\u000278\u0007!\u0002\u00028g\u0005\u0004\u0003",
    "\u00139:\f\u0011\u0002\u0002:;\u0007\"\u0002\u0002;g\u0005\u0004\u0003",
    "\u0012<=\f\u0010\u0002\u0002=>\u0007\u001c\u0002\u0002>g\u0005\u0004",
    "\u0003\u0011?@\f\u000f\u0002\u0002@A\u0007\u001d\u0002\u0002Ag\u0005",
    "\u0004\u0003\u0010BC\f\u000e\u0002\u0002CD\u0007\u001e\u0002\u0002D",
    "g\u0005\u0004\u0003\u000fEF\f\r\u0002\u0002FG\u0007\u001f\u0002\u0002",
    "Gg\u0005\u0004\u0003\u000eHI\f\f\u0002\u0002IJ\u0007\u0019\u0002\u0002",
    "Jg\u0005\u0004\u0003\rKL\f\u000b\u0002\u0002LM\u0007\u001a\u0002\u0002",
    "Mg\u0005\u0004\u0003\fNO\f\n\u0002\u0002OP\u0007\u001b\u0002\u0002P",
    "g\u0005\u0004\u0003\u000bQR\f\t\u0002\u0002RS\u0007&\u0002\u0002Sg\u0005",
    "\u0004\u0003\nTU\f\b\u0002\u0002UV\u0007\'\u0002\u0002Vg\u0005\u0004",
    "\u0003\tWX\f\u0007\u0002\u0002XY\u0007(\u0002\u0002Yg\u0005\u0004\u0003",
    "\bZ[\f\u0006\u0002\u0002[\\\u0007#\u0002\u0002\\g\u0005\u0004\u0003",
    "\u0007]^\f\u0005\u0002\u0002^_\u0007$\u0002\u0002_g\u0005\u0004\u0003",
    "\u0006`a\f\u0004\u0002\u0002ab\u0007\u0017\u0002\u0002bc\u0005\u0004",
    "\u0003\u0002cd\u0007\u0018\u0002\u0002de\u0005\u0004\u0003\u0005eg\u0003",
    "\u0002\u0002\u0002f$\u0003\u0002\u0002\u0002f\'\u0003\u0002\u0002\u0002",
    "f*\u0003\u0002\u0002\u0002f-\u0003\u0002\u0002\u0002f0\u0003\u0002\u0002",
    "\u0002f3\u0003\u0002\u0002\u0002f6\u0003\u0002\u0002\u0002f9\u0003\u0002",
    "\u0002\u0002f<\u0003\u0002\u0002\u0002f?\u0003\u0002\u0002\u0002fB\u0003",
    "\u0002\u0002\u0002fE\u0003\u0002\u0002\u0002fH\u0003\u0002\u0002\u0002",
    "fK\u0003\u0002\u0002\u0002fN\u0003\u0002\u0002\u0002fQ\u0003\u0002\u0002",
    "\u0002fT\u0003\u0002\u0002\u0002fW\u0003\u0002\u0002\u0002fZ\u0003\u0002",
    "\u0002\u0002f]\u0003\u0002\u0002\u0002f`\u0003\u0002\u0002\u0002gj\u0003",
    "\u0002\u0002\u0002hf\u0003\u0002\u0002\u0002hi\u0003\u0002\u0002\u0002",
    "i\u0005\u0003\u0002\u0002\u0002jh\u0003\u0002\u0002\u0002kl\u00072\u0002",
    "\u0002lt\u0007\u0007\u0002\u0002mq\u0005\u0004\u0003\u0002np\u0005\u0004",
    "\u0003\u0002on\u0003\u0002\u0002\u0002ps\u0003\u0002\u0002\u0002qo\u0003",
    "\u0002\u0002\u0002qr\u0003\u0002\u0002\u0002ru\u0003\u0002\u0002\u0002",
    "sq\u0003\u0002\u0002\u0002tm\u0003\u0002\u0002\u0002tu\u0003\u0002\u0002",
    "\u0002uv\u0003\u0002\u0002\u0002vw\u0007\b\u0002\u0002w\u0007\u0003",
    "\u0002\u0002\u0002xy\u00072\u0002\u0002y\t\u0003\u0002\u0002\u0002z",
    "\u0081\u0007\u0003\u0002\u0002{\u0081\u0007\u0004\u0002\u0002|\u0081",
    "\u0007\u0005\u0002\u0002}\u0081\u0007*\u0002\u0002~\u0081\u0007+\u0002",
    "\u0002\u007f\u0081\u0007,\u0002\u0002\u0080z\u0003\u0002\u0002\u0002",
    "\u0080{\u0003\u0002\u0002\u0002\u0080|\u0003\u0002\u0002\u0002\u0080",
    "}\u0003\u0002\u0002\u0002\u0080~\u0003\u0002\u0002\u0002\u0080\u007f",
    "\u0003\u0002\u0002\u0002\u0081\u000b\u0003\u0002\u0002\u0002\t\r\"f",
    "hqt\u0080"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, null, null, null, "'('", "')'", "'{'", 
                     "'}'", "'['", "']'", "','", "'.'", "'@'", "'#'", "'$'", 
                     "'+'", "'-'", "'*'", "'/'", "'%'", "'?'", "':'", "'=='", 
                     "'!='", "'~='", "'<'", "'>'", "'<='", "'>='", "'>>'", 
                     "'>>>'", "'<<'", "'||'", "'&&'", "'!'", "'|'", "'^'", 
                     "'&'", "'~'", null, null, null, "'/*'", "'*/'" ];

var symbolicNames = [ null, "INTEGER_LITERAL", "FLOATING_POINT_LITERAL", 
                      "STRING_LITERAL", "UNCLOSED_STRING_LITERAL", "LBRAKET", 
                      "RBRAKET", "LBRACE", "RBRACE", "LBRACKET", "RBRACKET", 
                      "COMMA", "DOT", "AT", "HASH", "DOLLAR", "PLUS", "MINUS", 
                      "MUL", "DIV", "MOD", "QUESTION", "COLON", "EQ", "NE", 
                      "MATCH", "LT", "GT", "LTE", "GTE", "RIGHT_SHIFT", 
                      "URIGHT_SHIFT", "LEFT_SHIFT", "OR", "AND", "NOT", 
                      "BITWISE_OR", "BITWISE_XOR", "BITWISE_AND", "BITWISE_NOT", 
                      "TRUE", "FALSE", "NULL", "MLC_START", "MLC_END", "WHITESPACE", 
                      "COMMENT_MULTILINE", "COMMENT_LINE", "IDENTIFIER", 
                      "UNMATCHED" ];

var ruleNames =  [ "compilationUnit", "expression", "functionExpression", 
                   "valueReference", "literal" ];

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
AggregateExpressionParser.LBRAKET = 5;
AggregateExpressionParser.RBRAKET = 6;
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
AggregateExpressionParser.RULE_valueReference = 3;
AggregateExpressionParser.RULE_literal = 4;


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

    var localctx = new CompilationUnitContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, AggregateExpressionParser.RULE_compilationUnit);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 11;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << AggregateExpressionParser.INTEGER_LITERAL) | (1 << AggregateExpressionParser.FLOATING_POINT_LITERAL) | (1 << AggregateExpressionParser.STRING_LITERAL) | (1 << AggregateExpressionParser.LBRAKET) | (1 << AggregateExpressionParser.LBRACE) | (1 << AggregateExpressionParser.MINUS))) !== 0) || ((((_la - 35)) & ~0x1f) == 0 && ((1 << (_la - 35)) & ((1 << (AggregateExpressionParser.NOT - 35)) | (1 << (AggregateExpressionParser.BITWISE_NOT - 35)) | (1 << (AggregateExpressionParser.TRUE - 35)) | (1 << (AggregateExpressionParser.FALSE - 35)) | (1 << (AggregateExpressionParser.NULL - 35)) | (1 << (AggregateExpressionParser.IDENTIFIER - 35)))) !== 0)) {
            this.state = 10;
            this.expression(0);
        }

        this.state = 13;
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

ExpressionNodeContext.prototype.LBRAKET = function() {
    return this.getToken(AggregateExpressionParser.LBRAKET, 0);
};

ExpressionNodeContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

ExpressionNodeContext.prototype.RBRAKET = function() {
    return this.getToken(AggregateExpressionParser.RBRAKET, 0);
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
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ExpressionContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 2;
    this.enterRecursionRule(localctx, 2, AggregateExpressionParser.RULE_expression, _p);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 32;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case AggregateExpressionParser.LBRAKET:
            localctx = new ExpressionNodeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 16;
            this.match(AggregateExpressionParser.LBRAKET);
            this.state = 17;
            this.expression(0);
            this.state = 18;
            this.match(AggregateExpressionParser.RBRAKET);
            break;
        case AggregateExpressionParser.IDENTIFIER:
            localctx = new FunctionNodeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 20;
            this.functionExpression();
            break;
        case AggregateExpressionParser.LBRACE:
            localctx = new ValueReferenceNodeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 21;
            this.match(AggregateExpressionParser.LBRACE);
            this.state = 22;
            this.valueReference();
            this.state = 23;
            this.match(AggregateExpressionParser.RBRACE);
            break;
        case AggregateExpressionParser.MINUS:
            localctx = new UnaryNodeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 25;
            this.match(AggregateExpressionParser.MINUS);
            this.state = 26;
            this.expression(25);
            break;
        case AggregateExpressionParser.BITWISE_NOT:
            localctx = new BitwiseNotNodeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 27;
            this.match(AggregateExpressionParser.BITWISE_NOT);
            this.state = 28;
            this.expression(24);
            break;
        case AggregateExpressionParser.NOT:
            localctx = new LogicalNotNodeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 29;
            this.match(AggregateExpressionParser.NOT);
            this.state = 30;
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
            this.state = 31;
            this.literal();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 102;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 100;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new MulNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 34;
                    if (!( this.precpred(this._ctx, 22))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 22)");
                    }
                    this.state = 35;
                    this.match(AggregateExpressionParser.MUL);
                    this.state = 36;
                    this.expression(23);
                    break;

                case 2:
                    localctx = new DivNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 37;
                    if (!( this.precpred(this._ctx, 21))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 21)");
                    }
                    this.state = 38;
                    this.match(AggregateExpressionParser.DIV);
                    this.state = 39;
                    this.expression(22);
                    break;

                case 3:
                    localctx = new ModNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 40;
                    if (!( this.precpred(this._ctx, 20))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 20)");
                    }
                    this.state = 41;
                    this.match(AggregateExpressionParser.MOD);
                    this.state = 42;
                    this.expression(21);
                    break;

                case 4:
                    localctx = new AddNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 43;
                    if (!( this.precpred(this._ctx, 19))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 19)");
                    }
                    this.state = 44;
                    this.match(AggregateExpressionParser.PLUS);
                    this.state = 45;
                    this.expression(20);
                    break;

                case 5:
                    localctx = new SubtractNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 46;
                    if (!( this.precpred(this._ctx, 18))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 18)");
                    }
                    this.state = 47;
                    this.match(AggregateExpressionParser.MINUS);
                    this.state = 48;
                    this.expression(19);
                    break;

                case 6:
                    localctx = new RightShiftNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 49;
                    if (!( this.precpred(this._ctx, 17))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 17)");
                    }
                    this.state = 50;
                    this.match(AggregateExpressionParser.RIGHT_SHIFT);
                    this.state = 51;
                    this.expression(18);
                    break;

                case 7:
                    localctx = new UnsignedRightShiftNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 52;
                    if (!( this.precpred(this._ctx, 16))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
                    }
                    this.state = 53;
                    this.match(AggregateExpressionParser.URIGHT_SHIFT);
                    this.state = 54;
                    this.expression(17);
                    break;

                case 8:
                    localctx = new LeftShiftNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 55;
                    if (!( this.precpred(this._ctx, 15))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
                    }
                    this.state = 56;
                    this.match(AggregateExpressionParser.LEFT_SHIFT);
                    this.state = 57;
                    this.expression(16);
                    break;

                case 9:
                    localctx = new LTNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 58;
                    if (!( this.precpred(this._ctx, 14))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
                    }
                    this.state = 59;
                    this.match(AggregateExpressionParser.LT);
                    this.state = 60;
                    this.expression(15);
                    break;

                case 10:
                    localctx = new GTNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 61;
                    if (!( this.precpred(this._ctx, 13))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
                    }
                    this.state = 62;
                    this.match(AggregateExpressionParser.GT);
                    this.state = 63;
                    this.expression(14);
                    break;

                case 11:
                    localctx = new LENodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 64;
                    if (!( this.precpred(this._ctx, 12))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                    }
                    this.state = 65;
                    this.match(AggregateExpressionParser.LTE);
                    this.state = 66;
                    this.expression(13);
                    break;

                case 12:
                    localctx = new GENodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 67;
                    if (!( this.precpred(this._ctx, 11))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
                    }
                    this.state = 68;
                    this.match(AggregateExpressionParser.GTE);
                    this.state = 69;
                    this.expression(12);
                    break;

                case 13:
                    localctx = new EQNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 70;
                    if (!( this.precpred(this._ctx, 10))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                    }
                    this.state = 71;
                    this.match(AggregateExpressionParser.EQ);
                    this.state = 72;
                    this.expression(11);
                    break;

                case 14:
                    localctx = new NENodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 73;
                    if (!( this.precpred(this._ctx, 9))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
                    }
                    this.state = 74;
                    this.match(AggregateExpressionParser.NE);
                    this.state = 75;
                    this.expression(10);
                    break;

                case 15:
                    localctx = new RegexMatchNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 76;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 77;
                    this.match(AggregateExpressionParser.MATCH);
                    this.state = 78;
                    this.expression(9);
                    break;

                case 16:
                    localctx = new BitwiseOrNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 79;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 80;
                    this.match(AggregateExpressionParser.BITWISE_OR);
                    this.state = 81;
                    this.expression(8);
                    break;

                case 17:
                    localctx = new BitwiseXorNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 82;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 83;
                    this.match(AggregateExpressionParser.BITWISE_XOR);
                    this.state = 84;
                    this.expression(7);
                    break;

                case 18:
                    localctx = new BitwiseAndNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 85;
                    if (!( this.precpred(this._ctx, 5))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                    }
                    this.state = 86;
                    this.match(AggregateExpressionParser.BITWISE_AND);
                    this.state = 87;
                    this.expression(6);
                    break;

                case 19:
                    localctx = new LogicalOrNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 88;
                    if (!( this.precpred(this._ctx, 4))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                    }
                    this.state = 89;
                    this.match(AggregateExpressionParser.OR);
                    this.state = 90;
                    this.expression(5);
                    break;

                case 20:
                    localctx = new LogicalAndNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 91;
                    if (!( this.precpred(this._ctx, 3))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                    }
                    this.state = 92;
                    this.match(AggregateExpressionParser.AND);
                    this.state = 93;
                    this.expression(4);
                    break;

                case 21:
                    localctx = new ConditionalNodeContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, AggregateExpressionParser.RULE_expression);
                    this.state = 94;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 95;
                    this.match(AggregateExpressionParser.QUESTION);
                    this.state = 96;
                    this.expression(0);
                    this.state = 97;
                    this.match(AggregateExpressionParser.COLON);
                    this.state = 98;
                    this.expression(3);
                    break;

                } 
            }
            this.state = 104;
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

FunctionExpressionContext.prototype.LBRAKET = function() {
    return this.getToken(AggregateExpressionParser.LBRAKET, 0);
};

FunctionExpressionContext.prototype.RBRAKET = function() {
    return this.getToken(AggregateExpressionParser.RBRAKET, 0);
};

FunctionExpressionContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
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

    var localctx = new FunctionExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, AggregateExpressionParser.RULE_functionExpression);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 105;
        this.match(AggregateExpressionParser.IDENTIFIER);
        this.state = 106;
        this.match(AggregateExpressionParser.LBRAKET);
        this.state = 114;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << AggregateExpressionParser.INTEGER_LITERAL) | (1 << AggregateExpressionParser.FLOATING_POINT_LITERAL) | (1 << AggregateExpressionParser.STRING_LITERAL) | (1 << AggregateExpressionParser.LBRAKET) | (1 << AggregateExpressionParser.LBRACE) | (1 << AggregateExpressionParser.MINUS))) !== 0) || ((((_la - 35)) & ~0x1f) == 0 && ((1 << (_la - 35)) & ((1 << (AggregateExpressionParser.NOT - 35)) | (1 << (AggregateExpressionParser.BITWISE_NOT - 35)) | (1 << (AggregateExpressionParser.TRUE - 35)) | (1 << (AggregateExpressionParser.FALSE - 35)) | (1 << (AggregateExpressionParser.NULL - 35)) | (1 << (AggregateExpressionParser.IDENTIFIER - 35)))) !== 0)) {
            this.state = 107;
            this.expression(0);
            this.state = 111;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << AggregateExpressionParser.INTEGER_LITERAL) | (1 << AggregateExpressionParser.FLOATING_POINT_LITERAL) | (1 << AggregateExpressionParser.STRING_LITERAL) | (1 << AggregateExpressionParser.LBRAKET) | (1 << AggregateExpressionParser.LBRACE) | (1 << AggregateExpressionParser.MINUS))) !== 0) || ((((_la - 35)) & ~0x1f) == 0 && ((1 << (_la - 35)) & ((1 << (AggregateExpressionParser.NOT - 35)) | (1 << (AggregateExpressionParser.BITWISE_NOT - 35)) | (1 << (AggregateExpressionParser.TRUE - 35)) | (1 << (AggregateExpressionParser.FALSE - 35)) | (1 << (AggregateExpressionParser.NULL - 35)) | (1 << (AggregateExpressionParser.IDENTIFIER - 35)))) !== 0)) {
                this.state = 108;
                this.expression(0);
                this.state = 113;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
        }

        this.state = 116;
        this.match(AggregateExpressionParser.RBRAKET);
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

ValueReferenceContext.prototype.IDENTIFIER = function() {
    return this.getToken(AggregateExpressionParser.IDENTIFIER, 0);
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

    var localctx = new ValueReferenceContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, AggregateExpressionParser.RULE_valueReference);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 118;
        this.match(AggregateExpressionParser.IDENTIFIER);
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

    var localctx = new LiteralContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, AggregateExpressionParser.RULE_literal);
    try {
        this.state = 126;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case AggregateExpressionParser.INTEGER_LITERAL:
            localctx = new LongConstNodeContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 120;
            this.match(AggregateExpressionParser.INTEGER_LITERAL);
            break;
        case AggregateExpressionParser.FLOATING_POINT_LITERAL:
            localctx = new FloatConstNodeContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 121;
            this.match(AggregateExpressionParser.FLOATING_POINT_LITERAL);
            break;
        case AggregateExpressionParser.STRING_LITERAL:
            localctx = new StringConstNodeContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 122;
            this.match(AggregateExpressionParser.STRING_LITERAL);
            break;
        case AggregateExpressionParser.TRUE:
            localctx = new TrueNodeContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 123;
            this.match(AggregateExpressionParser.TRUE);
            break;
        case AggregateExpressionParser.FALSE:
            localctx = new FalseNodeContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 124;
            this.match(AggregateExpressionParser.FALSE);
            break;
        case AggregateExpressionParser.NULL:
            localctx = new NullNodeContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 125;
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
