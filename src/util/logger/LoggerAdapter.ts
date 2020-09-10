import { Logger } from 'pino';
import LevelAdapter from './LevelAdapter';

export default class LoggerAdapter {
  private logger: Logger;
  private readonly category: string;

  constructor(logger: Logger, category: string) {
    this.logger = logger;
    this.category = category;
  }

  public getCategory(): string {
    return this.category;
  }

  public isDebugEnabled(): boolean {
    return this.logger.level === LevelAdapter.DEBUG;
  }

  public isTraceEnabled(): boolean {
    return this.logger.level === LevelAdapter.TRACE;
  }

  isInfoEnabled(): boolean {
    return this.logger.level === LevelAdapter.INFO;
  }

  public info(message: string, error?: Error): void {
    if (error != null) this.logger.info(error, new Date().toLocaleTimeString(), this.category, message);
    else this.logger.info(new Date().toLocaleTimeString(), this.category, message);
  }

  public debug(message: string, error?: Error): void {
    if (error != null) this.logger.debug(error, new Date().toLocaleTimeString(), this.category, message);
    else this.logger.debug(new Date().toLocaleTimeString(), this.category, message);
  }

  public error(message: string, error?: Error): void {
    if (error != null) this.logger.error(error, new Date().toLocaleTimeString(), this.category, message);
    else this.logger.error(new Date().toLocaleTimeString(), this.category, message);
  }

  public warn(message: string, error?: Error): void {
    if (error != null) this.logger.warn(error, new Date().toLocaleTimeString(), this.category, message);
    else this.logger.warn(new Date().toLocaleTimeString(), this.category, message);
  }

  public trace(message: string, error?: Error): void {
    if (error != null) this.logger.trace(error, new Date().toLocaleTimeString(), this.category, message);
    else this.logger.trace(new Date().toLocaleTimeString(), this.category, message);
  }

  public fatal(message: string, error?: Error): void {
    if (error != null) this.logger.fatal(error, new Date().toLocaleTimeString(), this.category, message);
    else this.logger.fatal(new Date().toLocaleTimeString(), this.category, message);
  }

  public setLevel(level: LevelAdapter): void {
    this.logger.level = level;
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
