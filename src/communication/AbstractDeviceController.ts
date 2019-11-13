import CommandParserListener from './CommandParserListener';
import Command from './Command';
import CommandParser from './CommandParser';
import AsyncCommandProcessor from './AsyncCommandProcessor';
import Log from '../Log';
import ReplyMonitor from './ReplyMonitor';
import CommandProcessorStatistics from './CommandProcessorStatistics';
import LoggerAdapter from '../util/logger/LoggerAdapter';

export default abstract class AbstractDeviceController<I extends Command, O extends Command>
  implements CommandParserListener {
  private readonly logger: LoggerAdapter;

  private readonly commandTimeout: number;

  private commandParser: CommandParser<I> | null = null;

  private processor: AsyncCommandProcessor<I, O, AbstractDeviceController<I, O>> = new AsyncCommandProcessor(this);

  private connecting: boolean = false;
  private connected: boolean = false;

  private loggingIn: boolean = false;
  private loggedIn: boolean = false;
  private resetTimeoutsOnData: boolean = false;

  constructor(commandTimeout: number, logger: LoggerAdapter) {
    this.commandTimeout = commandTimeout;
    this.logger = logger;
  }

  public async connect(): Promise<void> {
    if (this.isConnected() || this.connecting) {
      return;
    }

    try {
      this.connecting = true;

      if (await this.connectImpl()) {
        this.setConnected(true);
      }
    } finally {
      this.connecting = false;
    }
    return;
  }

  protected async checkAndConnect(): Promise<void> {
    this.connect();
  }

  public async login(): Promise<void> {
    if (this.isLoggedIn() || this.loggingIn) {
      return;
    }

    try {
      this.loggingIn = true;
      if (await this.loginImpl()) {
        this.setLoggedIn(true);
      }
    } finally {
      this.loggingIn = false;
    }
  }

  public disconnect(): void {
    this.disconnectImpl();
    this.processor.interrupt();
    this.setLoggedIn(false);
    this.setConnected(false);
  }

  public async sendCommand(cmd: O): Promise<I | null> {
    await this.checkAndConnect();

    let reply: I | null;
    try {
      reply = await this.processor.sendSyncCommand(cmd);
    } catch (ex) {
      this.setLoggedIn(false);
      this.setConnected(false);
      throw ex;
    }

    if (this.logger != null && this.logger.isDebugEnabled()) {
      this.logger.debug("Received reply '" + reply + "' to command: " + cmd);
    }

    return reply;
  }

  public isActive(): boolean {
    if (this.connecting || this.loggingIn) {
      return true;
    }
    if (this.processor != null) {
      return this.processor.isActive();
    }
    return false;
  }

  processAsyncCommand(cmd: Command) {
    if (this.logger != null && this.logger.isInfoEnabled()) {
      Log.COMMANDS.info('Received async command: ' + cmd);
    }
  }

  newDataReceived(): void {
    if (this.resetTimeoutsOnData) {
      this.resetCommandTimeouts();
    }
  }

  private resetCommandTimeouts(): void {
    this.processor.resetSentCommandTimeouts();
  }

  protected startCommandProcessor(): void {
    // this.processor = new AsyncCommandProcessor(this);
    //this.processor.start();
  }

  protected abstract async connectImpl(): Promise<boolean>;

  protected abstract async loginImpl(): Promise<boolean>;

  public abstract disconnectImpl(): void;

  public abstract send(command: O): void;

  public getCommandParser(): CommandParser<I> {
    return this.commandParser as CommandParser<I>;
  }

  public getCommandTimeout(): number {
    return this.commandTimeout;
  }

  public getLogger(): LoggerAdapter {
    return this.logger;
  }

  public setCommandParser(commandParser: CommandParser<I>) {
    this.commandParser = commandParser;
    this.commandParser.setListener(this);
    this.startCommandProcessor();
    this.commandParser.getChannel().setListener(() => {
      this.processor.run();
    });
  }

  public isConnected() {
    return this.connected && (this.processor == null || this.processor.isAlive());
  }

  private setConnected(connected: boolean) {
    this.connected = connected;
  }

  private isLoggedIn() {
    return this.isConnected() && this.loggedIn;
  }

  private setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }

  public setResetTimeoutsOnData(resetTimeoutWhenDataReceived: boolean): void {
    this.resetTimeoutsOnData = resetTimeoutWhenDataReceived;
  }

  public getActiveCommands(): Array<ReplyMonitor<O, I>> {
    return this.processor != null ? this.processor.getActiveCommands() : new Array();
  }

  public getStatistics(): CommandProcessorStatistics | null {
    return this.processor != null ? this.processor.getStatistics() : null;
  }
}
