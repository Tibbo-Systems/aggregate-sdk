import InitialRequest from './InitialRequest';
import ActionResponse from './ActionResponse';
import ActionCommand from './ActionCommand';

import SequentialAction from './SequentialAction';

export default abstract class SingleThreadAction<I extends InitialRequest, C extends ActionCommand, R extends ActionResponse> extends SequentialAction<I, C, R> {
  /*private static readonly BINARY_SEMAPHOR_CAPACITY: number = 1;

    private actionContext: ActionContext;
    private executionThread: ActionThread;
    private readonly waitCommand: Semaphore = new Semaphore(SingleThreadAction.BINARY_SEMAPHOR_CAPACITY, true);
    private readonly waitResponse: Semaphore = new Semaphore(SingleThreadAction.BINARY_SEMAPHOR_CAPACITY, true);
    private lastCommand: ActionCommand;
    private lastResponse: R;

    private destroyActionInThreadRun:  boolean = true;

    public constructor()
    {
        super();
    }

    public readonly init(actionContext: ActionContext, initialParameters: I): void 
{
        if (this.executionThread != null)
    {
        throw new Error("Already initialized");
    }

    if (actionContext == null)
    {
        throw new Error();
    }

this.actionContext = actionContext;

try
{
    this.waitCommand.acquire(SingleThreadAction.BINARY_SEMAPHOR_CAPACITY);
    this.waitResponse.acquire(SingleThreadAction.BINARY_SEMAPHOR_CAPACITY);
}
catch (ex)
{
    throw new Error(ex);
}

this.executionThread = new ActionThread("Action / " + toString());
this.executionThread.setActionRequest(initialParameters);
}

    public toString(): string
    {
        return getActionContext().getActionDefinition().toString();
    }

protected send(actionCommand: C): R
{
    if (actionCommand == null)
    {
        throw new Error();
    }

    if (Thread.currentThread().isInterrupted())
    {
        throw new DisconnectionException(Cres.get().getString("interrupted"));
    }

    this.lastCommand = actionCommand;

    waitCommand.release();
    try
    {
        waitResponse.acquire();
    }
    catch (InterruptedException ex)
    {
        throw new DisconnectionException(Cres.get().getString("interrupted"));
    }

    return lastResponse;
}


public readonly service(actionRequest: R): C | synchronized
{
    if (executionThread == null)
    {
        throw new IllegalStateException();
    }

    if (lastCommand != null)
    {
        if (!lastCommand.isResponseValid(actionRequest))
        {
            throw new IllegalArgumentException("Action response " + actionRequest + " doesn't match last command " + lastCommand);
        }

        lastCommand = null;
    }

    let newThread: boolean = Thread.State.NEW == executionThread.getState();

    if (newThread)
    {
        executionThread.start();
    }

    try
    {
        if (Thread.currentThread() == executionThread)
        {
            throw new Error("Call to service() from the execution thread");
        }

        if (!executionThread.isAlive())
        {
            throw new Error("Execution thread has finished");
        }

        if (newThread)
        {
            this.lastResponse = null;
        }
        else
        {
            this.lastResponse = actionRequest;
        }

        if (!newThread)
        {
            waitResponse.release();
        }
        waitCommand.acquire();

        return (C) lastCommand;
    }
    catch (InterruptedException e)
    {
        Log.CONTEXT_ACTIONS.info("Action was destroyed", e);

        return null;
    }
catch (Throwable t)
    {
        executionThread.interrupt();
        throw new RuntimeException("Error servicing action command: " + t.getMessage(), t);
    }
}

protected redirect(actionDefinition: ActionDefinition, initialRequest: I): ActionResult | null
{
    let actionManager: ActionManager = this.actionContext.getActionManager();

    let currentActionDefinition: ActionDefinition = this.actionContext.getActionDefinition();

    try
    {
        actionContext.setActionDefinition(actionDefinition);

        ActionIdentifier actionId = actionManager.initAction(actionContext, initialRequest, new ActionExecutionMode(ActionExecutionMode.REDIRECT));

        return redirectById(actionId);
    }
    finally
    {
        actionContext.setActionDefinition(currentActionDefinition);
    }
}

protected redirectById(actionId: ActionIdentifier): ActionResult
{
    final ActionManager actionManager = actionContext.getActionManager();

    disableActionDestructionInThreadRun(actionId, actionManager);

    try
    {
        C cmd = (C) actionManager.service(actionId, null);

        while (cmd != null)
        {
            ActionResponse actionRequest = send(cmd);

            cmd = (C) actionManager.service(actionId, actionRequest);
        }
    }
    catch (Exception e)
    {
        processError(e);
    }

    return actionManager.destroyAction(actionId);
}

private void disableActionDestructionInThreadRun(ActionIdentifier actionId, ActionManager actionManager)
{
    final Action action = actionManager.getAction(actionId);

    if (action instanceof SingleThreadAction)
    {
        SingleThreadAction singleThreadAction = (SingleThreadAction) action;
        singleThreadAction.setDestroyActionInThreadRun(false);
    }
}

protected void processError(Throwable ex)
{
    Log.CONTEXT_ACTIONS.warn("Error during action execution", ex);
}

private void setDestroyActionInThreadRun(boolean destroyActionInThreadRun)
{
    this.destroyActionInThreadRun = destroyActionInThreadRun;
}

@Override
public synchronized final ActionResult destroy()
{
    if (executionThread != null)
    {
        executionThread.interrupt();
    }

    ActionResult actionResult = executionThread != null ? executionThread.getActionResult() : null;

    executionThread = null;
    lastCommand = null;
    lastResponse = null;
    waitCommand.release();
    waitResponse.release();

    return actionResult;
}

protected ActionContext getActionContext()
{
    return actionContext;
}

class ActionThread extends Thread
{
    private I initialRequest;
    private ActionResult actionResult;

    public ActionThread(String name)
{
    super(name);
}

public void setActionRequest(I actionRequest)
{
    if (!(actionRequest instanceof InitialRequest))
    {
        throw new IllegalArgumentException("actionRequest should be InitialRequest");
    }

    initialRequest = actionRequest;
}

public ActionResult getActionResult()
{
    return actionResult;
}

@Override
public void run()
{
    ActionDefinition def = actionContext.getActionDefinition();

    if (!def.isConcurrent())
    {
        def.getExecutionLock().lock();
    }
    try
    {
        actionResult = execute(initialRequest);
    }
    catch (Throwable ex)
    {
        processError(ex);
    }
finally
    {
        if (!def.isConcurrent())
        {
            def.getExecutionLock().unlock();
        }
        waitCommand.release();

        if (destroyActionInThreadRun)
        {
            destroyActionInThreadRun();
        }
    }
}

private void destroyActionInThreadRun()
{
    final ActionManager actionManager = actionContext.getActionManager();
    final ActionIdentifier actionID = actionManager != null ? actionManager.getActionID(SingleThreadAction.this) : null;
    if (actionID != null)
        actionManager.destroyAction(actionID);
}
}*/
}
