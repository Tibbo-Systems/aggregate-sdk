import Command from '../communication/Command';
import RemoteConnector from '../util/RemoteConnector';
import ReplyMonitor from '../communication/ReplyMonitor';
import IncomingAggreGateCommand from './IncomingAggreGateCommand';
import OutgoingAggreGateCommand from './OutgoingAggregateCommand';
import CommandProcessorStatistics from '../communication/CommandProcessorStatistics';
import AggreGateDevice from './AggreGateDevice';

export default interface AggreGateDeviceController<I extends Command, O extends Command> extends RemoteConnector {
  getDevice(): AggreGateDevice | null;

  connect(): void;

  disconnect(): void;

  login(): void;

  start(): void;

  isActive(): boolean;

  getStatistics(): CommandProcessorStatistics | null;

  sendCommand(cmd: O): Promise<I | null>;

  getActiveCommands(): Array<ReplyMonitor<OutgoingAggreGateCommand, IncomingAggreGateCommand>>;
}
