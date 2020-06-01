import DataTable from '../datatable/DataTable';
import AbstractReferenceResolver from './AbstractReferenceResolver';
import Reference from './Reference';
import EvaluationEnvironment from './EvaluationEnvironment';
import Context from '../context/Context';
import ContextUtils from '../context/ContextUtils';
import MessageFormat from '../util/java/MessageFormat';
import Cres from '../Cres';
import ContextManager from '../context/ContextManager';
import DefaultRequestController from '../context/DefaultRequestController';
import Evaluator from './Evaluator';
import DefaultAttributedObject from './DefaultAttributedObject';

export default class DefaultReferenceResolver extends AbstractReferenceResolver {
  // Various properties
  public static readonly DESCRIPTION = 'description';
  public static readonly ROW = 'row';

  // Context properties
  public static readonly NAME = 'name';
  public static readonly ICON = 'icon';
  public static readonly TYPE = 'type';

  // Properties of variable definition
  public static readonly READABLE = 'readable';
  public static readonly WRITABLE = 'writable';

  // Properties of table
  public static readonly RECORDS = 'records';
  public static readonly QUALITY = 'quality';
  public static readonly TIMESTAMP = 'timestamp';

  // Properties of table field
  public static readonly FORMAT = 'format';
  public static readonly HELP = 'help';
  public static readonly OPTIONS = 'options';
  public static readonly SELECTION_VALUE_DESCRIPTION = 'svdesc';

  constructor(defaultTable?: DataTable) {
    super();
    if (defaultTable) this.setDefaultTable(defaultTable);
  }

  resolveReference(ref: Reference, environment: EvaluationEnvironment): any {
    if (DefaultReferenceResolver.ROW === ref.getProperty()) {
      return this.getRow(ref, environment);
    }
    const con = this.getContext(ref);

    let table: Promise<DataTable> | DataTable | null = this.getDefaultTable();

    const field = ref.getField();
    const entity = ref.getEntity();
    if (entity != null) {
      if (con != null) {
        if (field == null) {
          if (DefaultReferenceResolver.DESCRIPTION === ref.getProperty()) {
            return this.resolveEntityDescription(ref, con);
          }
          if (ref.getEntityType() == ContextUtils.ENTITY_VARIABLE) {
            const vd = con.getVariableDefinition(entity);

            if (vd == null) {
              throw new Error(MessageFormat.format(Cres.get().getString('conVarNotAvailExt'), ref.getEntity(), con.getPath()));
            }

            if (DefaultReferenceResolver.READABLE === ref.getProperty()) {
              return vd.isReadable();
            }

            if (DefaultReferenceResolver.WRITABLE === ref.getProperty()) {
              return vd.isWritable();
            }

            if (DefaultReferenceResolver.ICON === ref.getProperty()) {
              throw Error('not implemented yet');
            }
          }
        } else {
          let rf;

          if (ref.getEntityType() == ContextUtils.ENTITY_VARIABLE) {
            const vd = con.getVariableDefinition(entity);

            if (vd == null) {
              throw new Error(MessageFormat.format(Cres.get().getString('conVarNotAvailExt'), ref.getEntity(), con.getPath()));
            }

            rf = vd.getFormat();
          } else if (ref.getEntityType() == ContextUtils.ENTITY_FUNCTION) {
            const fd = con.getFunctionDefinition(entity);

            if (fd == null) {
              throw new Error(MessageFormat.format(Cres.get().getString('conFuncNotAvailExt'), ref.getEntity(), con.getPath()));
            }

            rf = fd.getOutputFormat();
          } else {
            throw new Error('Illegal entity type: ' + ref.getEntityType());
          }

          const ff = rf?.getField(ref.getField() as string);

          if (ff != null) {
            if (DefaultReferenceResolver.FORMAT === ref.getProperty()) {
              return ff;
            }

            if (DefaultReferenceResolver.DESCRIPTION === ref.getProperty()) {
              return ff.getDescription();
            }

            if (DefaultReferenceResolver.HELP === ref.getProperty()) {
              return ff.getHelp();
            }
          }
        }
        table = this.resolveEntity(ref, con, environment);
      } else {
        throw new Error(MessageFormat.format(Cres.get().getString('exprDefConNotDefined'), entity));
      }
    } else {
      if (con != null) {
        if (ref.getProperty() != null && ref.getContext() != null) {
          if (DefaultReferenceResolver.NAME === ref.getProperty()) {
            return con.getName();
          }

          if (DefaultReferenceResolver.DESCRIPTION === ref.getProperty()) {
            return con.getDescription();
          }

          if (DefaultReferenceResolver.ICON === ref.getProperty()) {
            throw Error('not implemented yet');
          }

          if (DefaultReferenceResolver.TYPE === ref.getProperty()) {
            return con.getType();
          }
        }
        if (ref.getContext() != null) {
          return con.getPath();
        }
      }
    }

    if (table == null) {
      throw new Error(MessageFormat.format(Cres.get().getString('exprDefDataTableNotDefined'), field));
    }

    if (table instanceof DataTable) return this.handleTable(table, field, ref, environment);

    return table.then((value) => {
      this.handleTable(value, field, ref, environment);
    });
  }

  private handleTable(table: DataTable, field: string | null, ref: Reference, environment: EvaluationEnvironment): any {
    if (field == null && ref.getProperty() != null) {
      if (DefaultReferenceResolver.RECORDS === ref.getProperty()) {
        return table.getRecordCount();
      }

      if (DefaultReferenceResolver.QUALITY === ref.getProperty()) {
        return table.getQuality();
      }

      if (DefaultReferenceResolver.TIMESTAMP === ref.getProperty()) {
        return table.getTimestamp();
      }
    }
    if (field == null) {
      return this.getDefaultTableAggregate(table);
    }

    const ff = table.getFormat().getField(ref.getField() as string);

    if (ref.getProperty() != null) {
      if (DefaultReferenceResolver.FORMAT === ref.getProperty()) {
        return ff;
      }

      if (DefaultReferenceResolver.DESCRIPTION == ref.getProperty()) {
        return ff.getDescription();
      }

      if (DefaultReferenceResolver.HELP === ref.getProperty()) {
        return ff.getHelp();
      }

      if (DefaultReferenceResolver.OPTIONS === ref.getProperty()) {
        return ff.getSelectionValues();
      }
    }
    const row = this.getRow(ref, environment);

    if (table.getRecordCount() != null && table.getRecordCount() <= row) {
      throw new Error(MessageFormat.format(Cres.get().getString('exprNonExistentRow'), row, table.getRecordCount()) + ': ' + table.dataAsString());
    }

    const record = table.getRecord(row);

    const value = record.getValue(field);

    if (ref.getProperty() != null) {
      if (DefaultReferenceResolver.SELECTION_VALUE_DESCRIPTION === ref.getProperty() && ff.hasSelectionValues()) {
        const valueDesc = ff.getSelectionValues()?.get(value);
        return valueDesc == null ? value : valueDesc;
      }

      const notNullDataTable = value != null && value instanceof DataTable;

      if (notNullDataTable) {
        const tbl = value as DataTable;

        if (DefaultReferenceResolver.RECORDS === ref.getProperty()) {
          return tbl.getRecordCount();
        }
        if (DefaultReferenceResolver.QUALITY === ref.getProperty()) {
          return tbl.getQuality();
        }
        if (DefaultReferenceResolver.TIMESTAMP === ref.getProperty()) {
          return tbl.getTimestamp();
        }
      }
    }
    return new DefaultAttributedObject(value, table.getTimestamp(), table.getQuality());
  }

  protected getDefaultTableAggregate(table: DataTable): any {
    return table;
  }

  protected getRow(ref: Reference, environment: EvaluationEnvironment): number {
    const row = ref.getRow();
    if (row != null) {
      return row;
    } else {
      const r = environment?.getCause()?.getRow();
      if (r != null) {
        return r;
      } else {
        return this.getDefaultRow() ?? 0;
      }
    }
  }

  private resolveEntityDescription(ref: Reference, con: Context<any, any>): string | null {
    const entity = ref.getEntity() as string;
    if (ref.getEntityType() == ContextUtils.ENTITY_VARIABLE) {
      const vd = con.getVariableDefinition(entity);

      if (vd == null) {
        throw new Error(MessageFormat.format(Cres.get().getString('conVarNotAvailExt'), ref.getEntity(), con.getPath()));
      }

      return vd.getDescription();
    } else if (ref.getEntityType() == ContextUtils.ENTITY_FUNCTION) {
      const fd = con.getFunctionDefinition(entity);

      if (fd == null) {
        throw new Error(MessageFormat.format(Cres.get().getString('conFuncNotAvailExt'), ref.getEntity(), con.getPath()));
      }

      return fd.getDescription();
    } else {
      throw new Error('Illegal entity type: ' + ref.getEntityType());
    }
  }

  public getContexts(ref: Reference): Array<Context<any, any>> {
    const c = ref.getContext();
    if (c != null && ContextUtils.isMask(c)) {
      return ContextUtils.expandMaskToContexts(c, this.getContextManager() as ContextManager<any>, false, this.getCallerController());
    } else {
      const con = this.getContext(ref);
      return con != null ? [con] : [];
    }
  }

  public getContext(ref: Reference): Context<any, any> | null {
    let con = this.getDefaultContext();

    const c = ref.getContext();
    if (c != null) {
      const cm = this.getContextManager();
      if (con != null) {
        con = con.get(ref.getContext(), this.getCallerController());
      } else if (cm != null) {
        con = cm.get(c, this.getCallerController());
      } else {
        con = null;
      }

      if (con == null) {
        throw new Error(Cres.get().getString('conNotAvail') + ref.getContext());
      }
    }
    return con;
  }

  resolveEntity(ref: Reference, con: Context<any, any>, environment: EvaluationEnvironment): Promise<DataTable> {
    const entity = ref.getEntity() as string;
    if (ref.getEntityType() == ContextUtils.ENTITY_VARIABLE) {
      const vd = con.getVariableDefinition(entity);

      if (vd == null) {
        throw new Error(MessageFormat.format(Cres.get().getString('conVarNotAvailExt'), ref.getEntity(), con.getPath()));
      }

      return con.getVariable(entity, this.getCallerController(), new DefaultRequestController(this.getEvaluator()));
    } else if (ref.getEntityType() == ContextUtils.ENTITY_FUNCTION) {
      const fd = con.getFunctionDefinition(entity);

      if (fd == null) {
        throw new Error(MessageFormat.format(Cres.get().getString('conFuncNotAvailExt'), ref.getEntity(), con.getPath()));
      }
      const DataTableConstruction = require('../datatable/DataTableConstruction').default;
      const parameters = DataTableConstruction.constructTable(ref.getParameters(), fd.getInputFormat(), this.getEvaluator(), environment);

      return con.callFunction(entity, parameters, this.getCallerController(), this.composeRequestController(this.getEvaluator()));
    } else {
      throw new Error('Illegal entity type: ' + ref.getEntityType());
    }
  }

  protected composeRequestController(evaluator: Evaluator | null): DefaultRequestController {
    return new DefaultRequestController(evaluator);
  }
}
