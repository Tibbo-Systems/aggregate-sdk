import Command from './Command';
import Log from '../Log';
import JObject from '../util/java/JObject';

export default class ReplyMonitor<C extends Command, R extends Command> extends JObject {
  private command: C;

  private reply: R | null = null;

  private readonly startTime: number;

  private timeoutReset = false;
  private terminated = false;

  private signalAll: any;

  constructor(command: C) {
    super();
    this.command = command;
    this.startTime = Date.now();
  }

  public setReply(reply: R | null): void {
    this.reply = reply;
    this.signalAll();
    if (Log.COMMANDS.isDebugEnabled()) Log.COMMANDS.debug('Command replied in ' + (Date.now() - this.startTime) + " ms: command '" + this.command + "', reply '" + reply + "'");
  }

  public terminate(): void {
    this.terminated = true;
    this.signalAll();
  }

  public reset(): void {
    this.timeoutReset = true;
    this.signalAll();
  }

  public async waitReply(timeout: number): Promise<boolean> {
    do {
      if (this.reply != null) {
        return true;
      }
      if (this.terminated) {
        return false;
      }
      this.timeoutReset = false;
      await new Promise((resolve) => {
        this.signalAll = resolve;
        setTimeout(() => {
          resolve();
        }, timeout);
      });
    } while (this.timeoutReset);

    return this.reply != null;
  }

  public getCommand(): C {
    return this.command;
  }

  public getReply(): R | null {
    return this.reply;
  }

  public getStartTime(): number {
    return this.startTime;
  }

  public toString(): string {
    let replyString = '';
    if (this.reply != null) replyString = this.reply.toString();
    return 'ReplyMonitor [command: ' + this.command.toString() + ', reply: ' + replyString + ']';
  }
}
