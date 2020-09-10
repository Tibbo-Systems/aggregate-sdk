import Command from './Command';
import BlockingChannel from '../util/BlockingChannel';
import ProtocolVersion from '../protocol/ProtocolVersion';

export default interface CommandWriter<C extends Command> {
  write(command: C, channel: BlockingChannel): void;

  setVersion(version: ProtocolVersion): void;

  setVersionAfterNextWrite(version: ProtocolVersion): void;
}
