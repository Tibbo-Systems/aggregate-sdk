import ActionResult from './ActionResult';
import InitialRequest from './InitialRequest';
import ActionCommand from './ActionCommand';
import ActionResponse from './ActionResponse';
import Action from './Action';
import ActionContext from './ActionContext';
export default abstract class SequentialAction<I extends InitialRequest, C extends ActionCommand, R extends ActionResponse> implements Action<I, C, R> {
    /**
     * Override this method to provide action functionality.
     */
    protected abstract execute(parameters: I): ActionResult;
    /**
     * Action Implementations should override this method to provide command sending functionality to client.
     *
     * @exception DisconnectedException
     *              If container had disconnected this action from a client by the client's request or any other reason
     * @exception java.lang.IllegalStateException
     *              If the method is called not in actionRequest processing phase
     * @exception java.lang.NullPointerException
     *              If actionCommand is null
     */
    protected abstract send(actionCommand: C): R;
    /**
     * Action Implementations should override this method to convert request-response style processing to a continuous instruction flow in execute method.
     *
     * @exception java.lang.IllegalArgumentException
     *              if actionRequest doesn't match previous actionCommand or first actionRequest received isn't instance of ActionInitParameters
     */
    abstract service(actionRequest: R): C;
    abstract destroy(): ActionResult;
    abstract init(actionContext: ActionContext, initialParameters: I): void;
}
