import LoggerAdapter from './util/logger/LoggerAdapter';
export default class Log {
    static readonly ROOT: string;
    private static readonly LOGGERS_CATEGORY;
    static readonly BINDINGS: LoggerAdapter;
    static readonly COMMANDS_CLIENT: LoggerAdapter;
    static readonly COMMANDS: LoggerAdapter;
    static readonly PROTOCOL_CACHING: LoggerAdapter;
    static readonly DATATABLE: LoggerAdapter;
    static readonly CONTEXT: LoggerAdapter;
    static readonly CONTEXT_CHILDREN: LoggerAdapter;
    static readonly CONTEXT_EVENTS: LoggerAdapter;
    static readonly CONTEXT_ACTIONS: LoggerAdapter;
    static readonly CONTEXT_VARIABLES: LoggerAdapter;
    static readonly PERFORMANCE: LoggerAdapter;
    static readonly CONTEXT_FUNCTIONS: LoggerAdapter;
    static readonly EXPRESSIONS: LoggerAdapter;
    static readonly CORE: LoggerAdapter;
    static readonly CONVERTER: LoggerAdapter;
    static readonly CLIENTS: LoggerAdapter;
    static readonly PROTOCOL: LoggerAdapter;
    static registerLogger(category: string): LoggerAdapter;
    static getLoggers(): Array<LoggerAdapter>;
}
