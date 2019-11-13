import SimpleCommandParser from '../communication/SimpleCommandParser';
import IncomingAggreGateCommand from './IncomingAggreGateCommand';
import ProtocolVersion from './ProtocolVersion';
import BlockingChannel from '../util/BlockingChannel';
export default class AggreGateCommandParser extends SimpleCommandParser<IncomingAggreGateCommand> {
    private version;
    constructor(channel: BlockingChannel);
    protected buildCommand(): IncomingAggreGateCommand | null;
    setVersion(version: ProtocolVersion): void;
    protected createCommandFromBufferContent(): IncomingAggreGateCommand;
}
