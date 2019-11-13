import { Logger } from 'pino';
import LevelAdapter from './LevelAdapter';
export default class LoggerAdapter {
    private logger;
    constructor(logger: Logger);
    isDebugEnabled(): boolean;
    isTraceEnabled(): boolean;
    isInfoEnabled(): boolean;
    info(message: any, error?: Error): void;
    debug(message: any, error?: Error): void;
    error(message: any, error?: Error): void;
    warn(message: any, error?: Error): void;
    trace(message: any, error?: Error): void;
    fatal(message: any, error?: Error): void;
    log(level: LevelAdapter, message: any, error?: Error): void;
}
