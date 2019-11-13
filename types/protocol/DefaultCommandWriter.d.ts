import Command from '../communication/Command';
import CommandWriter from '../communication/CommandWriter';
import BlockingChannel from '../util/BlockingChannel';
import ProtocolVersion from './ProtocolVersion';
import JObject from '../util/java/JObject';
export default class DefaultCommandWriter<C extends Command> extends JObject implements CommandWriter<C> {
    write(command: C, channel: BlockingChannel): void;
    setVersion(version: ProtocolVersion): void;
    setVersionAfterNextWrite(version: ProtocolVersion): void;
    log(command: C, protocolVersion: ProtocolVersion): void;
}
