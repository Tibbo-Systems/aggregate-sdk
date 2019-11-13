import SimpleCommandParser from '../communication/SimpleCommandParser';
import IncomingAggreGateCommand from './IncomingAggreGateCommand';
import ProtocolVersion from './ProtocolVersion';
import BlockingChannel from '../util/BlockingChannel';
import AggreGateCommand from './AggreGateCommand';

export default class AggreGateCommandParser extends SimpleCommandParser<IncomingAggreGateCommand> {
  //private static readonly TYPE_COMPRESSED: number = 1;

  private version = ProtocolVersion.V2;

  constructor(channel: BlockingChannel) {
    super(channel, AggreGateCommand.START_CHAR, AggreGateCommand.END_CHAR);
  }

  protected buildCommand(): IncomingAggreGateCommand | null {
    if (ProtocolVersion.V2 === this.version) return super.buildCommand();

    throw new Error('not implemented yet');
    //TODO not implemented yet
    /*IncomingAggreGateCommand commandFrom = buildCommandFrom(commandData);
        reset();
        return commandFrom;*/
  }

  public setVersion(version: ProtocolVersion): void {
    this.version = version;
  }

  protected createCommandFromBufferContent(): IncomingAggreGateCommand {
    return new IncomingAggreGateCommand(this.clearData());
  }
}
