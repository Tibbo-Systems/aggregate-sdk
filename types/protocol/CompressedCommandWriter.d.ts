import OutgoingAggreGateCommand from './OutgoingAggregateCommand';
import DefaultCommandWriter from './DefaultCommandWriter';
import BlockingChannel from '../util/BlockingChannel';
export default class CompressedCommandWriter<C extends OutgoingAggreGateCommand> extends DefaultCommandWriter<C> {
    private version;
    write(command: C, channel: BlockingChannel): void;
}
