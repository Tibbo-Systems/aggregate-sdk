import Command from './Command';
import CommandParserListener from './CommandParserListener';
import BlockingChannel from '../util/BlockingChannel';

export default interface CommandParser<C extends Command> {
  addData(dataByte: number): void;

  readCommand(): C | null;

  reset(): void;

  setListener(listener: CommandParserListener): void;

  getChannel(): BlockingChannel;
}
