import Command from './Command';
import BufferedCommandParser from './BufferedCommandParser';
import BlockingChannel from '../util/BlockingChannel';

export default abstract class SimpleCommandParser<C extends Command> extends BufferedCommandParser<C> {
  private startChar: number;
  private endChar: number;
  private endChar2: number | null = null;
  private needBoth: boolean = false;

  private started: boolean;
  private waitingEndChar2: boolean;
  private full: boolean;

  constructor(channel: BlockingChannel, startChar: number, endChar: number) {
    super(channel);
    this.startChar = startChar;
    this.endChar = endChar;
    this.started = this.startChar == null;
    this.waitingEndChar2 = false;
    this.full = false;

    this.clearCommand();
  }

  protected abstract createCommandFromBufferContent(): C;

  public clearCommand(): void {
    this.started = this.startChar == null;
    this.waitingEndChar2 = false;
    this.full = false;
    this.reset();
  }

  protected buildCommand(): C | null {
    if (this.isFull()) {
      const command = this.createCommandFromBufferContent();

      this.clearCommand();

      return command;
    } else {
      return null;
    }
  }

  protected commandEnded(cur: number): boolean {
    if (this.startChar != null && cur == this.startChar) {
      this.started = true;
      this.reset();
    } else {
      if (this.started) {
        if (this.waitingEndChar2) {
          if (cur == this.endChar2) {
            this.full = true;
            return true;
          }
        } else {
          if (cur == this.endChar || (this.endChar2 != null && !this.needBoth && cur == this.endChar2)) {
            if (this.endChar2 != null && this.needBoth) {
              this.waitingEndChar2 = true;
              this.full = false;
              return false;
            } else {
              this.full = true;
              return true;
            }
          } else {
            this.addData(cur);
          }
        }
      }
    }

    return false;
  }

  public isFull(): boolean {
    return this.full;
  }
}
