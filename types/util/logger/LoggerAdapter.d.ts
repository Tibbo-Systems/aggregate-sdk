import { Logger } from 'pino';
import LevelAdapter from './LevelAdapter';
export default class LoggerAdapter {
    private logger;
    private readonly category;
    constructor(logger: Logger, category: string);
    getCategory(): string;
    isDebugEnabled(): boolean;
    isTraceEnabled(): boolean;
    isInfoEnabled(): boolean;
    info(message: string, error?: Error): void;
    debug(message: string, error?: Error): void;
    error(message: string, error?: Error): void;
    warn(message: string, error?: Error): void;
    trace(message: string, error?: Error): void;
    fatal(message: string, error?: Error): void;
    setLevel(level: LevelAdapter): void;
    log(level: LevelAdapter, message: string, error?: Error): void;
}
