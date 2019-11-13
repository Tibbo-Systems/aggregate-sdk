import TestServer from '../tests/TestServer';
import ContextUtils from '../../src/context/ContextUtils';
import GenericActionCommand from '../../src/action/GenericActionCommand';
import Context from '../../src/context/Context';

describe('executeAction', () => {
  /*let server = new TestServer();


    beforeEach(async (done) => {
        await server.beforeEach();
        done();
    });

    afterEach(async (done) => {
        await server.afterEach();
        done();
    });*/

  it('testExecuteAction', () => {
    //TODO fix after adding Actions
    // Retrieving context to execute action from
    /*  let devicesContext = server.getRlc().getContextManager().get(ContextUtils.devicesContextPath("admin"),null);

          // Initializing "discovery" action (no initial parameters are specified)
          let actionId:ActionIdentifier = getActionIdentifier(devicesContext);

          // Initial response sent at first step should be NULL
          let actionResponse:GenericActionResponse = null;

          // Looping until we get NULL or "last" response
          while (true)
          {
              // Performing action step and getting next UI procedure to execute (i.e. emulate)
              let cmd:GenericActionCommand = getGenericActionCommand(devicesContext, actionId, actionResponse);

              if (cmd == null)
              {
                  break; // End of action
              }

              // Emulating UI procedure execution
              actionResponse = processCommand(cmd);

              if (cmd.isLast())
              {
                  break; // End of action
              }

              // Replicating request ID to the reply
              actionResponse.setRequestId(cmd.getRequestId());
          }*/
  });
});
/*
  function getGenericActionCommand( devicesContext:Context<any,any>,  actionId:ActionIdentifier,  actionResponse:GenericActionResponse):GenericActionCommand
{
    return ActionUtils.stepAction(devicesContext, actionId, actionResponse, null);
}

function   getActionIdentifier( devicesContext:Context<any,any>) :ActionIdentifier
{
    return ActionUtils.initAction(devicesContext, "discovery", new ServerActionInput(), null, new ActionExecutionMode(ActionExecutionMode.HEADLESS), null);
}
*/
