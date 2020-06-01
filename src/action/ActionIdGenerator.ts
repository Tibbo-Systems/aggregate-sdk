import ActionIdentifier from './ActionIdentifier';
import Action from './Action';
import InitialRequest from './InitialRequest';
import ActionCommand from './ActionCommand';
import ActionResponse from './ActionResponse';
import { v4 as uuidv4 } from 'uuid';

export default class ActionIdGenerator {
  public generate(action: Action<InitialRequest, ActionCommand, ActionResponse>): ActionIdentifier {
    const id: string = uuidv4();
    return new ActionIdentifier(id);
  }
}
