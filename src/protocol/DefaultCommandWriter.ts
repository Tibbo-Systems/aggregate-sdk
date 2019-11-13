import Command from '../communication/Command';
import CommandWriter from '../communication/CommandWriter';
import BlockingChannel from '../util/BlockingChannel';
import ProtocolVersion from './ProtocolVersion';
import Log from '../Log';
import JObject from '../util/java/JObject';

export default class DefaultCommandWriter<C extends Command> extends JObject implements CommandWriter<C> {
  public write(command: C, channel: BlockingChannel): void {
    command.complete();

    command.send(channel);
    this.log(command, ProtocolVersion.V2);
  }

  //@ts-ignore
  public setVersion(version: ProtocolVersion): void {}

  //@ts-ignore
  public setVersionAfterNextWrite(version: ProtocolVersion): void {}

  public log(command: C, protocolVersion: ProtocolVersion): void {
    if (Log.COMMANDS.isTraceEnabled()) {
      Log.COMMANDS.trace('Use ' + protocolVersion + ' protocol version to send: ' + command);
    }
  }
}
