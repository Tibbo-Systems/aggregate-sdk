grammar AggregateExpression;


compilationUnit
    : expression? EOF
    ;

expression:
     LBRAKET expression RBRAKET                                  # ExpressionNode
    | functionExpression                                         # FunctionNode
    | LBRACE valueReference RBRACE                               # ValueReferenceNode
    | MINUS expression                                           # UnaryNode
    | BITWISE_NOT expression                                     # BitwiseNotNode
    | NOT expression                                             # LogicalNotNode
    | expression MUL  expression                                 # MulNode
    | expression DIV  expression                                 # DivNode
    | expression MOD expression                                  # ModNode
    | expression PLUS  expression                                # AddNode
    | expression MINUS expression                                # SubtractNode
    | expression RIGHT_SHIFT  expression                         # RightShiftNode
    | expression URIGHT_SHIFT expression                         # UnsignedRightShiftNode
    | expression LEFT_SHIFT expression                           # LeftShiftNode
    | expression LT expression                                   # LTNode
    | expression GT expression                                   # GTNode
    | expression LTE expression                                  # LENode
    | expression GTE expression                                  # GENode
    | expression EQ expression                                   # EQNode
    | expression NE expression                                   # NENode
    | expression MATCH expression                                # RegexMatchNode
    | expression BITWISE_OR expression                           # BitwiseOrNode
    | expression BITWISE_XOR expression                          # BitwiseXorNode
    | expression BITWISE_AND expression                          # BitwiseAndNode
    | expression OR expression                                   # LogicalOrNode
    | expression AND expression                                  # LogicalAndNode
    | expression QUESTION expression COLON expression            # ConditionalNode
    | literal                                                    # LiteralExpression
    ;


functionExpression:
    IDENTIFIER LBRAKET (expression ( <COMMA> expression )*)? RBRAKET
    ;


valueReference
    :IDENTIFIER
    ;

literal
    : INTEGER_LITERAL                                              #LongConstNode
    | FLOATING_POINT_LITERAL                                       #FloatConstNode
    | STRING_LITERAL                                               #StringConstNode
    | TRUE                                                         #TrueNode
    | FALSE                                                        #FalseNode
    | NULL                                                         #NullNode
    ;



INTEGER_LITERAL:    DECIMAL_LITERAL | HEX_LITERAL | OCTAL_LITERAL | BINARY_LITERAL ;


FLOATING_POINT_LITERAL: (Digit+ '.' Digit* | '.' Digit+) Exponent? [fFdD]?
                 |       Digit+ (Exponent [fFdD]? | [fFdD])
                 ;

STRING_LITERAL:     '"' (~["\\\r\n\t\f\b] | EscapeSequence)* '"' | '\'' (~['\\\r\n\t\f\b] | EscapeSequence)* '\'' ;
UNCLOSED_STRING_LITERAL: '"' (~["\\\r\n\t\f\b] | EscapeSequence)* | '\'' (~['\\\r\n\t\f\b] | EscapeSequence)* ;

// Separators

LBRAKET:             '(' ;
RBRAKET:             ')' ;
LBRACE:             '{' ;
RBRACE:             '}' ;
LBRACKET:           '[' ;
RBRACKET:           ']' ;
COMMA:              ',' ;
DOT:                '.' ;

AT:                 '@' ;
HASH:               '#' ;
DOLLAR:             '$' ;

// Operators

PLUS:               '+' ;
MINUS:              '-' ;
MUL:                '*' ;
DIV:                '/' ;
MOD:                '%' ;
QUESTION:           '?' ;
COLON:              ':' ;
EQ:                 '==' ;
NE:                 '!=' ;
MATCH:              '~=' ;
LT:                 '<' ;
GT:                 '>' ;
LTE:                '<=' ;
GTE:                '>=' ;
RIGHT_SHIFT:        '>>' ;
URIGHT_SHIFT:       '>>>' ;
LEFT_SHIFT:         '<<' ;

OR:                 '||' ;
AND:                '&&' ;
NOT:                '!' ;
BITWISE_OR:         '|' ;
BITWISE_XOR:        '^' ;
BITWISE_AND:        '&' ;
BITWISE_NOT:        '~' ;
TRUE:               'true' | 'TRUE' ;
FALSE:              'false' | 'FALSE' ;
NULL:               'null' | 'NULL' ;

// Whitespace and comments

MLC_START:          '/*' ;
MLC_END:            '*/' ;

WHITESPACE:         [ \t\r\n\u000C]+      -> channel(HIDDEN) ;
COMMENT_MULTILINE:  MLC_START .*? MLC_END -> channel(HIDDEN) ;
COMMENT_LINE:       '//' ~[\r\n]*         -> channel(HIDDEN) ;

// Identifiers

IDENTIFIER:         Letter LetterOrDigit* ;

UNMATCHED        : .  -> channel(HIDDEN);

// Fragment rules

fragment Digit : [0-9] ;
fragment HexDigit : [0-9a-fA-F] ;
fragment Letter : [_a-zA-Z] ;
fragment LetterOrDigit : Letter | Digit ;
fragment EscapeSequence: '\\' [btnfr"'\\] | '\\' 'u' HexDigit HexDigit HexDigit HexDigit ;

fragment DECIMAL_LITERAL:    '0' | [1-9] Digit* ;
fragment HEX_LITERAL:        '0' [xX] HexDigit+ ;
fragment OCTAL_LITERAL:      '0' [0-7]+ ;
fragment BINARY_LITERAL:     '0' [bB] [01]+ ;

fragment Exponent : [eE] [+-]? Digit+ ;