import OutgoingAggreGateCommand from './OutgoingAggregateCommand';
import DefaultCommandWriter from './DefaultCommandWriter';
import BlockingChannel from '../util/BlockingChannel';
import ProtocolVersion from './ProtocolVersion';

export default class CompressedCommandWriter<C extends OutgoingAggreGateCommand> extends DefaultCommandWriter<C> {
  private version: ProtocolVersion = ProtocolVersion.V2;

  // private versionAfterNextWrite: ProtocolVersion = ProtocolVersion.V2;

  write(command: C, channel: BlockingChannel): void {
    command.complete();
    if (ProtocolVersion.V2 === this.version) {
      super.write(command, channel);
    } else if (this.version >= ProtocolVersion.V3) {
      throw new Error('not implemented yet');
    }
    //this.versionAfterNextWrite = this.version;
  }
}
