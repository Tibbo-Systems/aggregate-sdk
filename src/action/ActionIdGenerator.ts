import ActionIdentifier from './ActionIdentifier';
import Action from './Action';
import InitialRequest from './InitialRequest';
import ActionCommand from './ActionCommand';
import ActionResponse from './ActionResponse';
const uuid = require('uuid/v4');

export default class ActionIdGenerator {
  public constructor() {}

  public generate(action: Action<InitialRequest, ActionCommand, ActionResponse>): ActionIdentifier {
    const id: string = uuid();
    return new ActionIdentifier(id);
  }
}
