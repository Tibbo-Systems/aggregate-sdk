import GenericActionResponse from './GenericActionResponse';
import ServerContext from '../server/ServerContext';
import ServerActionInput from './ServerActionInput';
import SingleThreadAction from './SingleThreadAction';
import ActionDefinition from './ActionDefinition';
import DataTable from '../datatable/DataTable';
import GenericActionCommand from './GenericActionCommand';
import ServerActionContext from './ServerActionContext';
import CallerController from '../context/CallerController';
import ServerActionCommandProcessor from './ServerActionCommandProcessor';
import Context from '../context/Context';
import ActionResult from './ActionResult';
export default abstract class ServerAction extends SingleThreadAction<ServerActionInput, GenericActionCommand, GenericActionResponse> {
    private readonly processor;
    send(actionCommand: GenericActionCommand): GenericActionResponse;
    getProcessor(): ServerActionCommandProcessor;
    protected getActionContext(): ServerActionContext;
    protected getActionDefinition(): ActionDefinition | null;
    getDefiningContext(): ServerContext;
    getCallerController(): CallerController;
    redirect(ctx: ServerContext, defOrAction: ActionDefinition | string, input: ServerActionInput): ActionResult | null;
    call(devicesContext: ServerContext, def: ActionDefinition, serverActionInput: ServerActionInput): ActionResult | null;
    redirectToGroupedAction(ctx: ServerContext, contexts: Array<Context<any, any>>, action: string, caller: CallerController, executionParameters: DataTable): void;
    protected processError(ex: Error): void;
}
