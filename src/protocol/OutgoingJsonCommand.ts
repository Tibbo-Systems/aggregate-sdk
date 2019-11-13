import OutgoingAggreGateCommand from './OutgoingAggregateCommand';
import Log from '../Log';
import ByteBuffer from 'bytebuffer';
import AggreGateCommand from './AggreGateCommand';

export default class OutgoingJsonCommand extends OutgoingAggreGateCommand {
  private parameters: Array<String> = new Array<String>();

  addParam(param: string): OutgoingAggreGateCommand {
    if (this.completed) {
      Log.COMMANDS.error('Error, modify a complete command !');
      return this;
    }
    if (this.paramCount++ == AggreGateCommand.INDEX_ID) this.id = param;

    this.parameters.push(param);
    return this;
  }

  public complete(): void {
    if (this.completed) return;

    super.complete();

    try {
      this.data = ByteBuffer.wrap(JSON.stringify(this.parameters));
      this.parameters = new Array<String>();
    } catch (e) {
      Log.COMMANDS.warn(e);
    }
  }
}
