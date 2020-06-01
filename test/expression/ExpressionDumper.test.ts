/* eslint-disable @typescript-eslint/no-var-requires */
import DumperVisitor from '../../src/expression/DumperVisitor';
describe('ExpressionVisitor', () => {
  it('testVisitor', () => {
    const antlr4 = require('antlr4');
    const AggregateExpressionLexer = require('../../src/expression/parser/AggregateExpressionLexer.js');
    const AggregateExpressionParser = require('../../src/expression/parser/AggregateExpressionParser.js');

    const input = '1+1 == 5 && 2+2 == 4?  "xxx" :"yyy"';

    const chars = new antlr4.InputStream(input);
    const lexer = new AggregateExpressionLexer.AggregateExpressionLexer(chars);

    lexer.strictMode = false;

    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new AggregateExpressionParser.AggregateExpressionParser(tokens);
    const tree = parser.compilationUnit();
    const visitor = new DumperVisitor();
    visitor.visitCompilationUnit(tree);
    console.log(visitor.getResult());
    console.log(tree.toStringTree(parser.ruleNames));
  });
});
