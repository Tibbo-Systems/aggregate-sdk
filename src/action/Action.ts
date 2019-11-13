import InitialRequest from './InitialRequest';
import ActionResponse from './ActionResponse';
import ActionCommand from './ActionCommand';
import ActionContext from './ActionContext';
import ActionResult from './ActionResult';

export default abstract class Action<I extends InitialRequest, C extends ActionCommand, R extends ActionResponse> {
  abstract init(actionContext: ActionContext, initialParameters: I): void;

  abstract destroy(): ActionResult | null;

  abstract service(actionRequest: R): C | null;
}
