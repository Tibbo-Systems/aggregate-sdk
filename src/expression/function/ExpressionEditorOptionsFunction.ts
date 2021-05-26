import AbstractFunction from './AbstractFunction';
import Functions from './Functions';
import Evaluator from '../Evaluator';
import EvaluationEnvironment from '../EvaluationEnvironment';
import ContextUtils from '../../context/ContextUtils';
import DataTable from '../../datatable/DataTable';
import FieldConstants from '../../datatable/field/FieldConstants';
import Contexts from '../../context/Contexts';
import UtilitiesContextConstants from '../../server/UtilitiesContextConstants';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import Context from '../../context/Context';

export default class ExpressionEditorOptionsFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_SYSTEM, '', 'String');
  }

  isAsync(): boolean {
    return true;
  }

  async asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<string> {
    this.checkParameters(1, true, parameters);

    const caller = evaluator.getDefaultResolver().getCallerController();
    const contextManager = evaluator.getDefaultResolver().getContextManager();

    const defaultContextMask = parameters[0] != null ? parameters[0].toString() : null;
    let contexts = new Array<Context<any, any>>();
    let defaultContext: Context<any, any> | null = null;
    if (defaultContextMask != null && contextManager != null) {
      contexts = await ContextUtils.expandMaskToContexts(defaultContextMask, contextManager, false, caller);
    }
    if (contexts.length == 1) {
      defaultContext = contexts[0];
    }
    const references = new Map<string, string>();
    const entity = parameters.length >= 3 && parameters[1] != null ? parameters[1].toString() : null;
    const entityType = parameters.length >= 3 && parameters[2] != null ? Number(parameters[2].toString()) : null;
    let defaultTable: DataTable | null = null;
    let additionalReferences = null;
    if (parameters.length >= 4 && parameters[3] != null && parameters[3] instanceof DataTable) {
      additionalReferences = parameters[3];
    }
    if (additionalReferences != null) {
      for (const rec of additionalReferences) {
        references.set(rec.getString(FieldConstants.FIELD_ADDITIONAL_REFERENCES_REFERENCE), rec.getString(FieldConstants.FIELD_ADDITIONAL_REFERENCES_DESCRIPTION));
      }
    }
    try {
      if (entity != null && entityType != null && contextManager != null) {
        const utilitiesContext = await contextManager.get(Contexts.CTX_UTILITIES, caller);
        if (utilitiesContext !== null) {
          await utilitiesContext.init();
        }
        const parameters = new Array<string | null>();
        parameters.push(defaultContextMask);
        parameters.push(entity);
        switch (entityType) {
          case ContextUtils.ENTITY_VARIABLE:
            for (const cur of contexts) {
              if (cur.getVariableDefinition(entity, caller) != null) {
                defaultContext = cur;
                defaultTable = await defaultContext.getVariable(entity, caller);
              }
            }
            if (defaultContext != null && utilitiesContext != null) {
              const refs = await utilitiesContext.callFunction(UtilitiesContextConstants.F_VARIABLE_FIELDS, parameters, caller);
              for (const rec of refs) {
                references.set(rec.getString(FieldConstants.FIELD_ADDITIONAL_REFERENCES_REFERENCE), rec.getString(FieldConstants.FIELD_ADDITIONAL_REFERENCES_DESCRIPTION));
              }
            }

            break;
          case ContextUtils.ENTITY_FUNCTION:
            for (const cur of contexts) {
              if (cur.getFunctionDefinition(entity, caller) !== null) {
                defaultContext = cur;
                const fd = defaultContext.getFunctionDefinition(entity);
                if (fd !== null) defaultTable = new SimpleDataTable(fd.getInputFormat(), true);
              }
            }
            break;
          case ContextUtils.ENTITY_EVENT:
            for (const cur of contexts) {
              if (cur.getEventDefinition(entity, caller) !== null) {
                defaultContext = cur;
                const ed = defaultContext.getEventDefinition(entity);
                if (ed !== null) defaultTable = new SimpleDataTable(ed.getFormat(), true);
              }
            }
            if (defaultContextMask != null && utilitiesContext != null) {
              const refs = await utilitiesContext.callFunction(UtilitiesContextConstants.F_EVENT_FIELDS, parameters, caller);
              for (const rec of refs) {
                references.set(rec.getString(FieldConstants.FIELD_ADDITIONAL_REFERENCES_REFERENCE), rec.getString(FieldConstants.FIELD_ADDITIONAL_REFERENCES_DESCRIPTION));
              }
            }
            break;

          default:
            throw new Error('Unknown entity type: ' + entityType);
        }
      }
    } catch (e) {
      throw new Error(e);
    }

    const StringFieldFormat = require('../../datatable/field/StringFieldFormat').default;

    return StringFieldFormat.encodeExpressionEditorOptions(defaultContext !== null ? defaultContext.getName() : null, defaultTable, references);
  }
}
