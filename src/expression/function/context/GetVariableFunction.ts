import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import DefaultRequestController from '../../../context/DefaultRequestController';

export default class GetVariableFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_CONTEXT_RELATED, 'String context, String variable', 'DataTable', Cres.get().getString('fDescGetVariable'));
  }

  async asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any> {
    this.checkParameters(2, false, parameters);

    const resolver = evaluator.getDefaultResolver();
    const cm = resolver.getContextManager();

    if (cm == null) {
      throw new Error(Cres.get().getString('conNotAvail') + parameters[0].toString());
    }

    const con = await cm.get(parameters[0].toString(), resolver.getCallerController());

    if (con == null) {
      throw new Error(Cres.get().getString('conNotAvail') + parameters[0].toString());
    }

    await con.init();

    try {
      return con.getVariable(parameters[1].toString(), resolver.getCallerController(), new DefaultRequestController(evaluator));
    } catch (ex) {
      throw new Error(ex);
    }
  }

  isAsync(): boolean {
    return true;
  }
}
