import { Logger } from 'pino';
import LevelAdapter from './LevelAdapter';

export default class LoggerAdapter {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public isDebugEnabled(): boolean {
    return this.logger.levelVal === LevelAdapter.ERROR;
  }

  public isTraceEnabled(): boolean {
    return this.logger.levelVal === LevelAdapter.TRACE;
  }

  isInfoEnabled(): boolean {
    return this.logger.levelVal === LevelAdapter.INFO;
  }

  public info(message: string, error?: Error): void {
    if (error != null) this.logger.info(error, message);
    else this.logger.info(message);
  }

  public debug(message: string, error?: Error): void {
    if (error != null) this.logger.debug(error, message);
    else this.logger.debug(message);
  }

  public error(message: string, error?: Error): void {
    if (error != null) this.logger.error(error, message);
    else this.logger.error(message);
  }

  public warn(message: string, error?: Error): void {
    if (error != null) this.logger.warn(error, message);
    else this.logger.warn(message);
  }

  public trace(message: string, error?: Error): void {
    if (error != null) this.logger.trace(error, message);
    else this.logger.trace(message);
  }

  public fatal(message: string, error?: Error): void {
    if (error != null) this.logger.fatal(error, message);
    else this.logger.fatal(message);
  }

  public log(level: LevelAdapter, message: string, error?: Error): void {
    switch (level) {
      case LevelAdapter.DEBUG:
        this.debug(message, error);
        break;
      case LevelAdapter.INFO:
        this.info(message, error);
        break;
      case LevelAdapter.FATAL:
        this.fatal(message, error);
        break;
      case LevelAdapter.ERROR:
        this.error(message, error);
        break;
      case LevelAdapter.WARN:
        this.warn(message, error);
        break;
      case LevelAdapter.TRACE:
        this.trace(message, error);
        break;
      default:
        this.error(message, error);
    }
  }
}
