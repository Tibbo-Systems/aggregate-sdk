import Command from './Command';
import AbstractDeviceController from './AbstractDeviceController';
import ReplyMonitor from './ReplyMonitor';
import CommandProcessorStatistics from './CommandProcessorStatistics';
import Log from '../Log';
import Cres from '../Cres';
import MessageFormat from '../util/java/MessageFormat';
import TimeHelper from '../util/TimeHelper';
import LevelAdapter from '../util/logger/LevelAdapter';

export default class AsyncCommandProcessor<I extends Command, O extends Command, C extends AbstractDeviceController<I, O>> {
  private static readonly PENDING_COMMAND_TIMEOUT: number = TimeHelper.DAY_IN_MS;

  private readonly controller: C;

  private isAliveProcessor = true;

  private sentCommandsQueue: Array<ReplyMonitor<O, I>> = [];

  private readonly statistics: CommandProcessorStatistics = new CommandProcessorStatistics();

  constructor(controller: C) {
    this.controller = controller;
  }

  public async sendSyncCommand(cmd: O): Promise<I | null> {
    const mon: ReplyMonitor<O, I> = this.sendCommand(cmd);

    if (cmd.isAsync()) {
      return null;
    }
    const reply: I | null = await this.waitReplyMonitor(mon);

    this.statistics.updateOnSyncCommand(mon);

    return reply;
  }

  public sendUnrepliedCommand(cmd: O): void {
    this.sendCommandImplementation(cmd);
    if (this.controller.getLogger() != null && this.controller.getLogger().isDebugEnabled()) {
      this.controller.getLogger().debug('Sent command: ' + cmd.toString());
    }
  }

  public resetSentCommandTimeouts(): void {
    this.sentCommandsQueue.forEach((e) => e.reset());
  }

  private sendCommandImplementation(cmd: O): void {
    this.controller.send(cmd);
  }

  public sendCommand(cmd: O): ReplyMonitor<O, I> {
    const mon = new ReplyMonitor<O, I>(cmd);

    this.addSentCommand(mon);
    this.sendUnrepliedCommand(cmd);
    return mon;

    /*
        TODO check concurrency
        if (!this.isAlive()) {
             for (let cur of this.sentCommandsQueue) {
                 cur.setReply(null);
             }
             throw new Error(Cres.get().getString("disconnected"));
         }*/
  }

  private async waitReplyMonitor(mon: ReplyMonitor<O, I>): Promise<I | null> {
    if (mon.getReply() === null) {
      const time = mon.getCommand().getTimeout();
      const timeout: number = time != null ? time : this.controller.getCommandTimeout();
      await mon.waitReply(timeout);
    }

    this.sentCommandsQueue = this.sentCommandsQueue.filter((e) => e !== mon);

    if (mon.getReply() != null) {
      return mon.getReply();
    } else if (this.controller.isConnected()) {
      if (Log.COMMANDS.isDebugEnabled()) throw new Error(MessageFormat.format(Cres.get().getString('cmdTimeout'), mon.getCommand().toString()));
      else throw new Error(MessageFormat.format(Cres.get().getString('cmdTimeout'), mon.getCommand().getId()));
    } else return null;
  }

  private addSentCommand(mon: ReplyMonitor<O, I>): void {
    this.sentCommandsQueue.push(mon);
  }

  public run(): void {
    try {
      const command = this.controller.getCommandParser().readCommand();
      if (command != null) {
        const cmd = command as Command;
        if (this.controller.getLogger() != null && this.controller.getLogger().isDebugEnabled()) {
          this.controller.getLogger().debug('Received command: ' + cmd.toString());
        }

        if (cmd.isAsync()) {
          this.controller.processAsyncCommand(cmd);
          this.statistics.updateOnAsyncCommand(cmd);
        } else {
          let found = false;
          const thisTime = Date.now();
          this.sentCommandsQueue.filter((cur) => {
            if (cur.getCommand().getId() === cmd.getId()) {
              cur.setReply(command);
              found = true;
              return true;
            }
            if (thisTime - cur.getStartTime() > AsyncCommandProcessor.PENDING_COMMAND_TIMEOUT) {
              if (this.controller.getLogger() != null && this.controller.getLogger().isInfoEnabled()) {
                this.controller.getLogger().info('Removing expired reply monitor from queue: ' + cur);
              }
              return true;
            }
            return false;
          });
          if (!found) {
            if (this.controller.getLogger() != null) {
              if (this.controller.getLogger().isDebugEnabled()) this.controller.getLogger().debug('Reply cannot be matched to a sent command: ' + cmd.getId() + ', commands in progress: ' + this.sentCommandsQueue.length);
            }
          }
        }
      }
    } catch (e) {
      this.processError(LevelAdapter.ERROR, 'Error in async processor', e);
      this.interrupt();
    }
  }

  public interrupt(): void {
    this.sentCommandsQueue.forEach((cmd) => {
      cmd.terminate();
    });
    this.sentCommandsQueue = [];
    this.isAliveProcessor = false;
  }

  public isActive(): boolean {
    return this.sentCommandsQueue.length !== 0;
  }

  public getActiveCommands(): Array<ReplyMonitor<O, I>> {
    return this.sentCommandsQueue.slice();
  }

  private processError(priority: LevelAdapter, message: string, ex: Error): void {
    if (this.controller.getLogger() != null) {
      this.controller.getLogger().log(priority, message + ': ' + ex);
    }

    try {
      this.controller.disconnectImpl();
    } catch (ex1) {
      this.controller.getLogger().error('Disconnection error', ex1);
    }
  }

  public getStatistics(): CommandProcessorStatistics {
    return this.statistics;
  }

  isAlive(): boolean {
    return this.isAliveProcessor;
  }
}
