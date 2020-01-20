import { Logger } from 'pino';
import LevelAdapter from './LevelAdapter';
export default class LoggerAdapter {
    private logger;
    constructor(logger: Logger);
    isDebugEnabled(): boolean;
    isTraceEnabled(): boolean;
    isInfoEnabled(): boolean;
    info(message: string, error?: Error): void;
    debug(message: string, error?: Error): void;
    error(message: string, error?: Error): void;
    warn(message: string, error?: Error): void;
    trace(message: string, error?: Error): void;
    fatal(message: string, error?: Error): void;
    log(level: LevelAdapter, message: string, error?: Error): void;
}
