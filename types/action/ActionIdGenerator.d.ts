import ActionIdentifier from './ActionIdentifier';
import Action from './Action';
import InitialRequest from './InitialRequest';
import ActionCommand from './ActionCommand';
import ActionResponse from './ActionResponse';
export default class ActionIdGenerator {
    constructor();
    generate(action: Action<InitialRequest, ActionCommand, ActionResponse>): ActionIdentifier;
}
