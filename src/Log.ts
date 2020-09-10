import LoggerAdapter from './util/logger/LoggerAdapter';
import logger from 'pino';

export default class Log {
  static readonly ROOT: string = 'ag';
  private static readonly LOGGERS_CATEGORY = new Array<LoggerAdapter>();

  static readonly BINDINGS: LoggerAdapter = Log.registerLogger('ag.bindings');
  static readonly COMMANDS_CLIENT: LoggerAdapter = Log.registerLogger('ag.commands.client');
  static readonly COMMANDS: LoggerAdapter = Log.registerLogger('ag.commands');
  static readonly PROTOCOL_CACHING: LoggerAdapter = Log.registerLogger('ag.protocol.caching');
  static readonly DATATABLE: LoggerAdapter = Log.registerLogger('ag.datatable');
  static readonly CONTEXT: LoggerAdapter = Log.registerLogger('ag.context');
  static readonly CONTEXT_CHILDREN: LoggerAdapter = Log.registerLogger('ag.context.children');
  static readonly CONTEXT_EVENTS: LoggerAdapter = Log.registerLogger('ag.context.events');
  static readonly CONTEXT_ACTIONS: LoggerAdapter = Log.registerLogger('ag.context.actions');
  static readonly CONTEXT_VARIABLES: LoggerAdapter = Log.registerLogger('ag.context.variables');
  static readonly PERFORMANCE: LoggerAdapter = Log.registerLogger('ag.performance');
  static readonly CONTEXT_FUNCTIONS: LoggerAdapter = Log.registerLogger('ag.context.functions');
  static readonly EXPRESSIONS: LoggerAdapter = Log.registerLogger('ag.expressions');
  static readonly CORE: LoggerAdapter = Log.registerLogger('ag.core');
  static readonly CONVERTER: LoggerAdapter = Log.registerLogger('ag.converter');
  static readonly CLIENTS: LoggerAdapter = Log.registerLogger('ag.clients');
  static readonly PROTOCOL: LoggerAdapter = Log.registerLogger('ag.protocol');

  public static registerLogger(category: string): LoggerAdapter {
    const log = new LoggerAdapter(logger(), category);
    this.LOGGERS_CATEGORY.push(log);
    return log;
  }

  public static getLoggers(): Array<LoggerAdapter> {
    return this.LOGGERS_CATEGORY;
  }
}
