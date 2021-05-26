import DumpingVisitor from '../../src/expression/util/DumpingVisitor';
import AggregateExpressionParser from '../../src/expression/parser/AggregateExpressionParser';
import AggregateExpressionLexer from '../../src/expression/parser/AggregateExpressionLexer';
import { CommonTokenStream, InputStream } from 'antlr4';
describe('ExpressionVisitor', () => {
  it('testVisitor', () => {
    const input = '1+1 == 5 && 2+2 == 4?  "xxx" :"yyy"';

    const chars = new InputStream(input);
    const lexer = new AggregateExpressionLexer(chars);

    const tokens = new CommonTokenStream(lexer);
    const parser = new AggregateExpressionParser(tokens);
    const tree = parser.compilationUnit();
    const visitor = new DumpingVisitor();
    visitor.visitCompilationUnit(tree);
    console.log(visitor.getResult());
    console.log(tree.toStringTree(parser.ruleNames, null));
  });
});
