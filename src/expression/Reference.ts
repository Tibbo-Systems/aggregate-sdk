//import ExpressionUtils from './ExpressionUtils';
import StringBuilder from '../util/java/StringBuilder';
import JObject from '../util/java/JObject';
import Expression from './Expression';
import ContextUtilsConstants from '../context/ContextUtilsConstants';

export default class Reference extends JObject {
  public static readonly PARAM_ESCAPE_SINGLE: string = "'";
  public static readonly PARAM_ESCAPE_DOUBLE: string = '"';
  private static readonly PARAMS_DELIM: string = ',';
  private static readonly PARAMS_ESCAPE: string = '\\';

  public static readonly NULL_PARAM: string = 'null';

  // Format: schema/server^context:entity('param1', expression, null, ...)$field[row]#property

  public static readonly SCHEMA_FORM: string = 'form';
  public static readonly SCHEMA_TABLE: string = 'table';
  public static readonly SCHEMA_STATISTICS: string = 'statistics';
  public static readonly SCHEMA_ENVIRONMENT: string = 'env';
  public static readonly SCHEMA_PARENT: string = 'parent';
  public static readonly SCHEMA_MENU: string = 'menu';

  // Deprecated in favour of new action reference syntax: context.path:action!
  // Support should be terminated in AggreGate 6
  public static readonly SCHEMA_ACTION: string = 'action';

  public static readonly EVENT_SIGN: string = '@';
  public static readonly ACTION_SIGN: string = '!';
  public static readonly PARAMS_BEGIN: string = '(';
  public static readonly PARAMS_END: string = ')';
  public static readonly SCHEMA_END: string = '/';
  public static readonly SERVER_END: string = '^';
  public static readonly CONTEXT_END: string = ':';
  public static readonly FIELD_BEGIN: string = '$';
  public static readonly ROW_BEGIN: string = '[';
  public static readonly ROW_END: string = ']';
  public static readonly PROPERTY_BEGIN: string = '#';

  public static readonly APPEARANCE_LINK: number = 1;
  public static readonly APPEARANCE_BUTTON: number = 2;

  private image: string | null = null;

  private schema: string | null = null;
  private server: string | null = null;
  private context: string | null = null;
  private entity: string | null = null;
  private entityType: number = ContextUtilsConstants.ENTITY_VARIABLE;
  private parameters: Array<any> = new Array<any>(); // May contain Strings, Expressions and NULLs
  private field: string | null = null;
  private row: number | null = null;
  private property: string | null = null;
  private appearance: number = Reference.APPEARANCE_LINK;

  constructor(source?: string, server?: string | null, context?: string | null, entity?: string | null, entityType?: number | null, field?: string | null, ...parameters: any[]) {
    super();
    if (source) {
      this.parse(source);
    }
    if (server) {
      this.server = server;
    }
    if (context) {
      this.context = context;
    }
    if (entity) {
      this.entity = entity;
    }
    if (entityType) {
      this.entityType = entityType;
    }
    if (field) {
      this.field = field;
    }
    if (parameters) {
      this.parameters.push(parameters);
    }
  }

  protected parse(source: string) {
    source = source.trim();

    let isFunction = false;
    let isEvent = false;
    let isAction = false;

    this.image = source;

    let src: string = this.image;

    const paramsBegin: number = src.indexOf(Reference.PARAMS_BEGIN);
    const paramsEnd: number = src.indexOf(Reference.PARAMS_END);

    if (paramsBegin !== -1) {
      if (paramsEnd === -1) {
        throw new Error("No closing ')' for parameters");
      }

      const actionSignPos: number = src.lastIndexOf(Reference.ACTION_SIGN);

      if (actionSignPos === paramsEnd + 1) {
        isAction = true;

        const paramsSrc = src.substring(paramsBegin + 1, paramsEnd);

        this.parameters = Reference.getFunctionParameters(paramsSrc, true);

        this.entityType = ContextUtilsConstants.ENTITY_ACTION;

        src = src.substring(0, paramsBegin) + src.substring(actionSignPos + 1);
      } else {
        isFunction = true;

        const paramsSrc: string = src.substring(paramsBegin + 1, paramsEnd);

        this.parameters = Reference.getFunctionParameters(paramsSrc, true);

        this.entityType = ContextUtilsConstants.ENTITY_FUNCTION;

        src = src.substring(0, paramsBegin) + src.substring(paramsEnd + 1);
      }
    } else {
      const eventSignPos: number = src.lastIndexOf(Reference.EVENT_SIGN);

      if (eventSignPos !== -1) {
        isEvent = true;

        this.entityType = ContextUtilsConstants.ENTITY_EVENT;

        src = src.substring(0, eventSignPos) + src.substring(eventSignPos + 1);
      } else {
        const actionSignPos: number = src.lastIndexOf(Reference.ACTION_SIGN);

        if (actionSignPos !== -1) {
          isAction = true;

          this.entityType = ContextUtilsConstants.ENTITY_ACTION;

          src = src.substring(0, actionSignPos) + src.substring(actionSignPos + 1);
        }
      }
    }

    const schemaEnd: number = src.indexOf(Reference.SCHEMA_END);

    if (schemaEnd !== -1) {
      this.schema = src.substring(0, schemaEnd);
      src = src.substring(schemaEnd + 1);
    }

    const serverEnd = src.indexOf(Reference.SERVER_END);

    if (serverEnd !== -1) {
      this.server = src.substring(0, serverEnd);
      src = src.substring(serverEnd + 1);
    }

    const contextEnd: number = src.indexOf(Reference.CONTEXT_END);

    if (contextEnd !== -1) {
      this.context = src.substring(0, contextEnd);
      src = src.substring(contextEnd + 1);
    }

    const propertyBegin = src.indexOf(Reference.PROPERTY_BEGIN);

    if (propertyBegin !== -1) {
      this.property = src.substring(propertyBegin + 1);
      src = src.substring(0, propertyBegin);
    }

    const rowBegin: number = src.indexOf(Reference.ROW_BEGIN);
    const rowEnd: number = src.indexOf(Reference.ROW_END);

    if (rowBegin !== -1) {
      if (rowEnd === -1) {
        throw new Error("No closing ']' in row reference");
      }

      this.row = parseInt(src.substring(rowBegin + 1, rowEnd));

      src = src.substring(0, rowBegin);
    }

    const fieldBegin: number = src.indexOf(Reference.FIELD_BEGIN);

    if (fieldBegin !== -1) {
      this.entity = src.substring(0, fieldBegin);
      this.field = fieldBegin != src.length - 1 ? src.substring(fieldBegin + 1) : null;
    } else if (src.length > 0) {
      if (this.context !== null || isFunction || isEvent || isAction) {
        this.entity = src;
      } else {
        this.field = src;
      }
    }
  }

  public getServer(): string | null {
    return this.server;
  }

  public getContext(): string | null {
    return this.context;
  }

  public getEntity(): string | null {
    return this.entity;
  }

  public getEntityType(): number | null {
    return this.entityType;
  }

  public getField(): string | null {
    return this.field;
  }

  public getParameters(): Array<any> {
    return this.parameters;
  }

  public getRow(): number | null {
    return this.row;
  }

  public getSchema(): string | null {
    return this.schema;
  }

  public getProperty(): string | null {
    return this.property;
  }

  public getImage(): string {
    if (this.image != null) {
      return this.image;
    } else {
      return this.createImage();
    }
  }

  private createImage(): string {
    const sb: StringBuilder = new StringBuilder();

    if (this.schema != null) {
      sb.append(this.schema);
      sb.append(Reference.SCHEMA_END);
    }

    if (this.server != null) {
      sb.append(this.server);
      sb.append(Reference.SERVER_END);
    }

    if (this.context != null) {
      sb.append(this.context);
      sb.append(Reference.CONTEXT_END);
    }

    if (this.entity != null) {
      sb.append(this.entity);

      if (this.entityType === ContextUtilsConstants.ENTITY_FUNCTION) {
        sb.append(Reference.PARAMS_BEGIN);
        sb.append(Reference.getFunctionParametersFromArray(this.parameters));
        sb.append(Reference.PARAMS_END);
      }

      if (this.entityType === ContextUtilsConstants.ENTITY_EVENT) {
        sb.append(Reference.EVENT_SIGN);
      }

      if (this.entityType === ContextUtilsConstants.ENTITY_ACTION) {
        if (this.parameters.length > 0) {
          sb.append(Reference.PARAMS_BEGIN);
          sb.append(Reference.getFunctionParametersFromArray(this.parameters));
          sb.append(Reference.PARAMS_END);
        }

        sb.append(Reference.ACTION_SIGN);
      }

      if (this.entityType === ContextUtilsConstants.ENTITY_INSTANCE) {
        if (this.parameters.length > 0) {
          sb.append(Reference.PARAMS_BEGIN);
          sb.append(Reference.getFunctionParametersFromArray(this.parameters));
          sb.append(Reference.PARAMS_END);
        }
      }

      if (this.field != null || (this.context == null && this.entityType == ContextUtilsConstants.ENTITY_VARIABLE)) {
        sb.append(Reference.FIELD_BEGIN);
      }
    }

    if (this.field != null) {
      sb.append(this.field);
    }

    if (this.row != null) {
      sb.append(Reference.ROW_BEGIN);
      sb.append((this.row as number) + '');
      sb.append(Reference.ROW_END);
    }

    if (this.property != null) {
      sb.append(Reference.PROPERTY_BEGIN);
      sb.append(this.property);
    }

    this.image = sb.toString();

    return this.image;
  }

  public toString() {
    return this.getImage();
  }

  public setContext(context: string) {
    this.context = context;
    this.image = null;
  }

  public setEntity(entity: string) {
    this.entity = entity;
    this.image = null;
  }

  public setEntityType(entityType: number) {
    this.entityType = entityType;
    this.image = null;
  }

  public addParameter(parameter: string | Expression) {
    this.parameters.push(parameter);
    this.image = null;
  }

  public setField(field: string) {
    this.field = field;
    this.image = null;
  }

  public setProperty(property: string) {
    this.property = property;
    this.image = null;
  }

  public setSchema(schema: string) {
    this.schema = schema;
    this.image = null;
  }

  public setRow(row: number) {
    this.row = row;
    this.image = null;
  }

  public setServer(server: string) {
    this.server = server;
    this.image = null;
  }

  public clone(): Reference {
    try {
      return super.clone() as Reference;
    } catch (e) {
      throw new Error(e);
    }
  }

  public equals(obj: JObject | null): boolean {
    const isReferenceNotNull = !(obj == null || !(obj instanceof Reference));
    return isReferenceNotNull && this.getImage() === (obj as Reference).getImage();
  }

  public static getFunctionParametersFromArray(params: Array<any>): string {
    const sb: StringBuilder = new StringBuilder();

    let i = 0;

    params.forEach(param => {
      if (param == null) {
        sb.append(Reference.NULL_PARAM);
      } else {
        if (param instanceof Expression) {
          const value: string = param.toString();

          if (value.indexOf(Reference.PARAMS_DELIM) !== -1) {
            sb.append(Reference.PARAM_ESCAPE_SINGLE);
            sb.append(value);
            sb.append(Reference.PARAM_ESCAPE_SINGLE);
          } else {
            sb.append(value);
          }
        } else {
          sb.append(Reference.PARAM_ESCAPE_DOUBLE);
          sb.append(param.toString());
          sb.append(this.PARAM_ESCAPE_DOUBLE);
        }
      }
      if (i < params.length - 1) {
        sb.append(Reference.PARAMS_DELIM);
      }
      i++;
    });

    return sb.toString();
  }

  public static getFunctionParameters(paramsString: string, allowExpressions: boolean) {
    const params: Array<any> = new Array<any>();
    let insideSingleQuotedLiteral = false;
    let insideDoubleQuotedLiteral = false;
    let escaped = false;
    let buf: StringBuilder | null = new StringBuilder();
    for (let i = 0; i < paramsString.length; i++) {
      const c: string = paramsString.charAt(i);
      if (c === Reference.PARAMS_ESCAPE) {
        if (escaped) {
          escaped = false;
          if (buf) buf.append(c);
          continue;
        } else {
          escaped = true;
          continue;
        }
      } else if (insideSingleQuotedLiteral) {
        if (c == Reference.PARAM_ESCAPE_SINGLE) {
          if (!escaped) {
            insideSingleQuotedLiteral = false;
            let param = '';
            if (buf) param = buf.toString();
            if (allowExpressions) {
              params.push(new Expression(Reference.prepareParameter(param)));
            } else {
              params.push(Reference.prepareParameter(param));
            }
            buf = null;
          }
        }
      } else if (insideDoubleQuotedLiteral) {
        if (c == Reference.PARAM_ESCAPE_DOUBLE) {
          if (!escaped) {
            insideDoubleQuotedLiteral = false;
            let param = '';
            if (buf) param = buf.toString();
            params.push(Reference.prepareParameter(param));
            buf = null;
          }
        }
      } else if (c == Reference.PARAMS_DELIM) {
        if (!insideSingleQuotedLiteral && !insideDoubleQuotedLiteral) {
          if (buf != null) {
            let param = '';
            if (buf) param = buf.toString().trim();
            if (param.length > 0) {
              params.push(new Expression(Reference.prepareParameter(param)));
            }
          }

          buf = new StringBuilder();
          continue;
        }
      } else if (c == Reference.PARAM_ESCAPE_SINGLE && !insideDoubleQuotedLiteral) {
        insideSingleQuotedLiteral = true;
        buf = new StringBuilder();
        continue;
      } else if (c == Reference.PARAM_ESCAPE_DOUBLE && !insideSingleQuotedLiteral) {
        insideDoubleQuotedLiteral = true;
        buf = new StringBuilder();
        continue;
      }

      if (c != Reference.PARAMS_ESCAPE) {
        escaped = false;
      }

      if (buf != null) {
        buf.append(c);
      }
    }

    if (buf != null) {
      const param: string = buf.toString().trim();
      if (param.length > 0) {
        params.push(new Expression(Reference.prepareParameter(param)));
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

  private static prepareParameter(parameter: string): string {
    return parameter;
  }
}
