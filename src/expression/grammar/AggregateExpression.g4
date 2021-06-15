grammar AggregateExpression;

compilationUnit
    : expression? EOF
    ;

expression:
     LPAREN expression RPAREN                                  # ExpressionNode
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
    IDENTIFIER arguments
    ;

functionReferenceExpression:
    agIdentifier arguments
    ;

actionReferenceExpression:
    agIdentifier arguments? NOT
    ;

eventReferenceExpression:
    agIdentifier AT
    ;

referenceSchema:
    IDENTIFIER DIV
    ;

referenceServer:
    ~BITWISE_XOR* BITWISE_XOR
    ;

referenceContextMask:
    (agIdentifier | FLOATING_POINT_LITERAL | MUL | DOT)+
    | DOT
    ;

referenceEntity:
    agIdentifier
    | functionReferenceExpression
    | actionReferenceExpression
    | eventReferenceExpression
    ;

referenceRow:
    LBRACKET INTEGER_LITERAL RBRACKET
    ;

referenceProperty:
    HASH agIdentifier
    ;

valueReference:
    (referenceSchema? referenceServer? ((referenceContextMask? COLON)? referenceEntity? (DOLLAR agIdentifier)? | agIdentifier) referenceRow? referenceProperty?
    | referenceProperty)?
    ;

arguments:
    LPAREN (expression ( COMMA expression )* )? RPAREN
    ;

agIdentifier:
    IDENTIFIER;

literal
    : INTEGER_LITERAL                                              #LongConstNode
    | FLOATING_POINT_LITERAL                                       #FloatConstNode
    | STRING_LITERAL                                               #StringConstNode
    | TRUE                                                         #TrueNode
    | FALSE                                                        #FalseNode
    | NULL                                                         #NullNode
    ;



INTEGER_LITERAL:    DECIMAL_LITERAL | HEX_LITERAL | OCTAL_LITERAL | BINARY_LITERAL ;

FLOATING_POINT_LITERAL: (DIGIT+ '.' DIGIT* | '.' DIGIT+) EXPONENT? [fFdD]?
                 |       DIGIT+ (EXPONENT [fFdD]? | [fFdD])
                 ;

STRING_LITERAL:     '"' (~["\\\r\n\t\f\b] | ESCAPE_SEQUENCE)* '"' | '\'' (~['\\\r\n\t\f\b] | ESCAPE_SEQUENCE)* '\'' ;
UNCLOSED_STRING_LITERAL: '"' (~["\\\r\n\t\f\b] | ESCAPE_SEQUENCE)* | '\'' (~['\\\r\n\t\f\b] | ESCAPE_SEQUENCE)* ;

// Separators

LPAREN:             '(' ;
RPAREN:             ')' ;
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

IDENTIFIER:         LETTER LETTER_OR_DIGIT* ;

UNMATCHED        : .  -> channel(HIDDEN) ;

// Fragment rules

fragment DIGIT : [0-9] ;
fragment HEX_DIGIT : [0-9a-fA-F] ;
fragment LETTER : [_a-zA-Z] ;
fragment LETTER_OR_DIGIT : LETTER | DIGIT ;
fragment ESCAPE_SEQUENCE: '\\' [btnfr"'\\] | '\\' 'u' HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT ;

fragment DECIMAL_LITERAL:    '0' | [1-9] DIGIT* ;
fragment HEX_LITERAL:        '0' [xX] HEX_DIGIT+ ;
fragment OCTAL_LITERAL:      '0' [0-7]+ ;
fragment BINARY_LITERAL:     '0' [bB] [01]+ ;

fragment EXPONENT : [eE] [+-]? DIGIT+ ;