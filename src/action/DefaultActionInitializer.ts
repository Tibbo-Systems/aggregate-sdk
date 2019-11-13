import ActionInitializer from './ActionInitializer';
import DataTable from '../datatable/DataTable';
import ActionExecutionMode from './ActionExecutionMode';
import CallerController from '../context/CallerController';
import ActionIdentifier from './ActionIdentifier';
import Context from '../context/Context';
import ServerActionInput from './ServerActionInput';
import FunctionDefinition from '../context/FunctionDefinition';
import ServerContextConstants from '../server/ServerContextConstants';
import DataRecord from '../datatable/DataRecord';
import Cres from '../Cres';
import ErrorCollector from '../util/ErrorCollector';

export default class DefaultActionInitializer implements ActionInitializer {
  public async initAction(
    context: Context<any, any>,
    actionName: string,
    initialParametrs: ServerActionInput,
    inputData: DataTable,
    environment: Map<string, any>,
    mode: ActionExecutionMode,
    callerController: CallerController,
    collector: ErrorCollector
  ): Promise<ActionIdentifier> {
    const def: FunctionDefinition | null = context.getFunctionDefinition(ServerContextConstants.F_INIT_ACTION, null);
    const FIELD_COUNT = 3;

    if (def == null) {
      throw new Error(
        Cres.get().getString('conActNotAvail') +
          ServerContextConstants.F_INIT_ACTION +
          ' (' +
          context.toDetailedString() +
          ')'
      );
    }
    const defInput = def.getInputFormat();
    const rec: DataRecord = new DataRecord(defInput);
    rec.addValue(actionName);
    rec.addValue(initialParametrs.getData());
    rec.addValue(inputData);
    if (defInput && defInput.getFieldCount() > FIELD_COUNT) {
      rec.addValue(mode.getCode());
    }

    const res: DataTable = await context.callFunction(
      ServerContextConstants.F_INIT_ACTION,
      rec.wrap(),
      callerController,
      null
    );

    return new ActionIdentifier(res.rec().getString(ServerContextConstants.FOF_INIT_ACTION_ACTION_ID));
  }
}
