import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import MessageFormat from '../../../util/java/MessageFormat';
import Util from '../../../util/Util';
import EventLevel from '../../../event/EventLevel';
import DataTable from '../../../datatable/DataTable';
import DataTableConstruction from '../../../datatable/DataTableConstruction';

export default class FireEventFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_CONTEXT_RELATED, 'String context, String event, Integer level, Object parameter1, Object parameter2, ...', 'Long', Cres.get().getString('fDescFireEvent'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(3, true, parameters);

    const cm = evaluator.getDefaultResolver().getContextManager();

    const con = cm != null ? cm.get(parameters[0].toString(), evaluator.getDefaultResolver().getCallerController()) : null;

    if (con == null) {
      throw new Error(Cres.get().getString('conNotAvail') + parameters[0].toString());
    }

    try {
      const name = parameters[1].toString();

      const ed = con.getEventDefinition(name);

      if (ed == null) {
        throw new Error(MessageFormat.format(Cres.get().getString('conEvtNotAvailExt'), name, con.getPath()));
      }

      const level = Util.convertToNumber(parameters[2], true, true);

      if (level != null && !EventLevel.isValid(level)) {
        throw new Error('Invalid event level: ' + level);
      }

      const input = parameters.splice(3, parameters.length);

      const data = input.length == 1 && input[0] instanceof DataTable ? input[0] : DataTableConstruction.constructTable(input, ed.getFormat(), evaluator, environment);

      const ev = con.fireEvent(ed.getName(), data, level != null ? level : ed.getLevel(), evaluator.getDefaultResolver().getCallerController());

      return ev != null ? ev.getId() : null;
    } catch (ex) {
      throw new Error(ex.message);
    }
  }
}
