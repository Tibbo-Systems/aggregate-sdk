/* eslint-disable @typescript-eslint/no-var-requires */
import DataTableUtils from '../datatable/DataTableUtils';
import AttributedObject from './AttributedObject';
import DefaultAttributedObject from './DefaultAttributedObject';

import Expression from './Expression';
import Cres from '../Cres';
import { CommonTokenStream, InputStream, Recognizer, Token } from 'antlr4';

import AggregateExpressionLexer from './parser/AggregateExpressionLexer';
import AggregateExpressionParser from './parser/AggregateExpressionParser';
import Reference from './Reference';
import ReferencesFinderVisitor from './util/ReferencesFinderVisitor';
import DumpingVisitor from './util/DumpingVisitor';
const antlr4 = require('antlr4');

class ExpressionErrorListener extends antlr4.error.ErrorListener {
  syntaxError(recognizer: Recognizer, offendingSymbol: Token, line: number, column: number, msg: string, e: any): void {
    throw new Error('Error on line: ' + line + ' column: ' + column + ' message: ' + msg);
  }
}

export default class ExpressionUtils {
  public static useVisibleSeparators(formatString: string | null): boolean {
    if (formatString == null) {
      throw new Error('The given string is null');
    }

    let useVisibleSeparators = true;

    for (let i = 0; i < formatString.length; i++) {
      const c: string = formatString.charAt(i);

      if (c == DataTableUtils.ELEMENT_START) {
        useVisibleSeparators = false;
        break;
      }

      if (c == DataTableUtils.ELEMENT_VISIBLE_START) {
        useVisibleSeparators = true;
        break;
      }
    }

    return useVisibleSeparators;
  }

  public static getValue(ao: AttributedObject | null) {
    return ao != null ? ao.getValue() : null;
  }

  public static toAttributed(value: any, first?: AttributedObject | null, second?: AttributedObject | null): AttributedObject {
    if (value instanceof AttributedObject) {
      return value as AttributedObject;
    }

    if (first !== undefined && second !== undefined) {
      let timestamp: Date | null = null;
      let quality: number | null = null;

      if (first != null && first.getTimestamp() != null && second != null && second.getTimestamp() != null) {
        timestamp = null;

        // TODO: mix quality properly
        quality = null;
      } else if (first != null && first.getTimestamp() != null) {
        timestamp = first.getTimestamp();
        quality = first.getQuality();
      } else if (second != null && second.getTimestamp() != null) {
        timestamp = second.getTimestamp();
        quality = second.getQuality();
      }

      return new DefaultAttributedObject(value, timestamp, quality);
    } else if (first !== undefined) {
      return new DefaultAttributedObject(value, first != null ? first.getTimestamp() : null, first != null ? first.getQuality() : null);
    } else {
      return new DefaultAttributedObject(value);
    }
  }

  public static validateSyntax(expression: Expression, showExpressionInErrorText: boolean) {
    ExpressionUtils.parse(expression, showExpressionInErrorText);
  }

  public static dump(expression: string) {
    const rootNode = ExpressionUtils.parse(new Expression(expression), true);
    const visitor = new DumpingVisitor();
    visitor.visitCompilationUnit(rootNode);
  }

  public static parse(expression: Expression, showExpressionInErrorText: boolean): any {
    try {
      const chars = new InputStream(expression.getText());
      const lexer = new AggregateExpressionLexer(chars);
      const tokens = new CommonTokenStream(lexer);
      const parser = new AggregateExpressionParser(tokens);
      //TODO SMELL CODE
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      parser.addErrorListener(new ExpressionErrorListener());
      return parser.compilationUnit();
    } catch (e) {
      throw new Error(Cres.get().getString('exprParseErr') + (showExpressionInErrorText ? " '" + expression + "': " : ': ') + e.message);
    }
  }

  public static deduplicateExpressionsReferences(expressions: Array<string>): Set<Reference> {
    const depdupeIdentifiers = new Set<Reference>();
    for (const expressionText of expressions) {
      if (expressionText == null) continue;
      const expression = new Expression(expressionText);
      const references = ExpressionUtils.findReferences(expression);
      for (const ref of references) depdupeIdentifiers.add(ref);
    }
    return depdupeIdentifiers;
  }

  public static findReferences(expression: Expression): Array<Reference> {
    const rootNode = ExpressionUtils.parse(expression, true);
    const visitor = new ReferencesFinderVisitor();
    visitor.visitCompilationUnit(rootNode);
    return visitor.getReferences();
  }

  public static generateBindingId() {
    return Math.round(Math.random() * Number.MAX_VALUE);
  }

  public static copyAttributes(source: AttributedObject, destination: AttributedObject): void {
    destination.setTimestamp(source.getTimestamp());
    destination.setQuality(source.getQuality());
  }
}
