import ActionIdentifier from './ActionIdentifier';
import Action from './Action';
import InitialRequest from './InitialRequest';
import ActionCommand from './ActionCommand';
import ActionResponse from './ActionResponse';
import Util from '../util/Util';

export default class ActionIdGenerator {
  public generate(action: Action<InitialRequest, ActionCommand, ActionResponse>): ActionIdentifier {
    return new ActionIdentifier(Util.generateId());
  }
}
