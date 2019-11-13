import DataTableUtils from '../datatable/DataTableUtils';
import StringBuilder from '../util/java/StringBuilder';
import Expression from './Expression';
import AttributedObject from "./AttributedObject";
import DefaultAttributedObject from "./DefaultAttributedObject";
import AbstractDataTable from "../datatable/AbstractDataTable";

export default class ExpressionUtils {
  public static readonly PARAM_ESCAPE_SINGLE: string = "'";
  public static readonly PARAM_ESCAPE_DOUBLE: string = '"';
  private static readonly PARAMS_DELIM: string = ',';
  private static readonly PARAMS_ESCAPE: string = '\\';

  public static readonly NULL_PARAM: string = 'null';

  public static useVisibleSeparators(formatString: string | null): boolean {
    if (formatString == null) {
      throw new Error('The given string is null');
    }

    let useVisibleSeparators: boolean = true;

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

  private static prepareParameter(parameter: string): string {
    return parameter;
  }

  public static getFunctionParameters(paramsString: string, allowExpressions: boolean) {
    const params: Array<any> = new Array<any>();
    let insideSingleQuotedLiteral: boolean = false;
    let insideDoubleQuotedLiteral: boolean = false;
    let escaped: boolean = false;
    let buf: StringBuilder | null = new StringBuilder();
    for (let i = 0; i < paramsString.length; i++) {
      const c: string = paramsString.charAt(i);
      if (c === ExpressionUtils.PARAMS_ESCAPE) {
        if (escaped) {
          escaped = false;
          if (buf) buf.append(c);
          continue;
        } else {
          escaped = true;
          continue;
        }
      } else if (insideSingleQuotedLiteral) {
        if (c == ExpressionUtils.PARAM_ESCAPE_SINGLE) {
          if (!escaped) {
            insideSingleQuotedLiteral = false;
            let param: string = '';
            if (buf) param = buf.toString();
            if (allowExpressions) {
              params.push(new Expression(ExpressionUtils.prepareParameter(param)));
            } else {
              params.push(ExpressionUtils.prepareParameter(param));
            }
            buf = null;
          }
        }
      } else if (insideDoubleQuotedLiteral) {
        if (c == ExpressionUtils.PARAM_ESCAPE_DOUBLE) {
          if (!escaped) {
            insideDoubleQuotedLiteral = false;
            let param: string = '';
            if (buf) param = buf.toString();
            params.push(ExpressionUtils.prepareParameter(param));
            buf = null;
          }
        }
      } else if (c == ExpressionUtils.PARAMS_DELIM) {
        if (!insideSingleQuotedLiteral && !insideDoubleQuotedLiteral) {
          if (buf != null) {
            let param: string = '';
            if (buf) param = buf.toString().trim();
            if (param.length > 0) {
              params.push(new Expression(ExpressionUtils.prepareParameter(param)));
            }
          }

          buf = new StringBuilder();
          continue;
        }
      } else if (c == ExpressionUtils.PARAM_ESCAPE_SINGLE && !insideDoubleQuotedLiteral) {
        insideSingleQuotedLiteral = true;
        buf = new StringBuilder();
        continue;
      } else if (c == ExpressionUtils.PARAM_ESCAPE_DOUBLE && !insideSingleQuotedLiteral) {
        insideDoubleQuotedLiteral = true;
        buf = new StringBuilder();
        continue;
      }

      if (c != ExpressionUtils.PARAMS_ESCAPE) {
        escaped = false;
      }

      if (buf != null) {
        buf.append(c);
      }
    }

    if (buf != null) {
      const param: string = buf.toString().trim();
      if (param.length > 0) {
        params.push(new Expression(ExpressionUtils.prepareParameter(param)));
      }
    }

    if (insideSingleQuotedLiteral) {
      throw new Error('Illegal function parameters: ' + params);
    }

    if (insideDoubleQuotedLiteral) {
      throw new Error('Illegal function parameters: ' + params);
    }

    return params;
  }

  public static getFunctionParametersFromArray(params: Array<any>): string {
    let sb: StringBuilder = new StringBuilder();

    let i: number = 0;

    params.forEach(param => {
      if (param == null) {
        sb.append(ExpressionUtils.NULL_PARAM);
      } else {
        if (param instanceof Expression) {
          const value: string = param.toString();

          if (value.indexOf(ExpressionUtils.PARAMS_DELIM) !== -1) {
            sb.append(ExpressionUtils.PARAM_ESCAPE_SINGLE);
            sb.append(value);
            sb.append(ExpressionUtils.PARAM_ESCAPE_SINGLE);
          } else {
            sb.append(value);
          }
        } else {
          sb.append(ExpressionUtils.PARAM_ESCAPE_DOUBLE);
          sb.append(param.toString());
          sb.append(this.PARAM_ESCAPE_DOUBLE);
        }
      }
      if (i < params.length - 1) {
        sb.append(ExpressionUtils.PARAMS_DELIM);
      }
      i++;
    });

    return sb.toString();
  }

  public static getValue(ao: AttributedObject | null) {
    return ao != null ? ao.getValue() : null;
  }

  public static toAttributed(value: any, first?: AttributedObject|null, second?: AttributedObject | null):AttributedObject {
    if (value instanceof DefaultAttributedObject || value instanceof AbstractDataTable)
    {
      return value as AttributedObject;
    }
    
    if(first !== undefined && second !== undefined)
    {
      let timestamp:Date|null = null;
      let quality:number|null = null;

      if (first != null && first.getTimestamp() != null && second != null && second.getTimestamp() != null)
      {
        timestamp = null;

        // TODO: mix quality properly
        quality = null;
      }
      else if (first != null && first.getTimestamp() != null)
      {
        timestamp = first.getTimestamp();
        quality = first.getQuality();
      }
      else if (second != null && second.getTimestamp() != null)
      {
        timestamp = second.getTimestamp();
        quality = second.getQuality();
      }

      return new DefaultAttributedObject(value, timestamp, quality);
    }
    else if (first !== undefined) {
      return new DefaultAttributedObject(value, first != null ? first.getTimestamp() : null, first != null ? first.getQuality() : null);
    }
    else
    {
      return new DefaultAttributedObject(value);
    }
  }
  
}
