import InitialRequest from './InitialRequest';
import ActionResponse from './ActionResponse';
import ActionCommand from './ActionCommand';
import SequentialAction from './SequentialAction';
export default abstract class SingleThreadAction<I extends InitialRequest, C extends ActionCommand, R extends ActionResponse> extends SequentialAction<I, C, R> {
}
