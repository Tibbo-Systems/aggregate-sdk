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

  public info(message: any, error?: Error): void {
    this.logger.info(message);
  }

  public debug(message: any, error?: Error): void {
    this.logger.debug(message);
  }

  public error(message: any, error?: Error): void {
    this.logger.error(message);
  }

  public warn(message: any, error?: Error): void {
    this.logger.warn(message);
  }

  public trace(message: any, error?: Error): void {
    this.logger.trace(message);
  }

  public fatal(message: any, error?: Error): void {
    this.logger.fatal(message);
  }

  public log(level: LevelAdapter, message: any, error?: Error): void {
    this.logger.fatal(message);
  }
}
