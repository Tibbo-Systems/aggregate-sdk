import LoggerAdapter from './util/logger/LoggerAdapter';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require('pino')({
  // browser: { asObject: true },
  prettyPrint: {
    colorize: false,
    messageFormat: '{category} - {msg}',
    ignore: 'pid,hostname',
    translateTime: 'h:MM:ss',
  },
});
export default class Log {
  static readonly ROOT: string = 'ag';

  static readonly BINDINGS: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.bindings' }));
  static readonly COMMANDS_CLIENT: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.commands.client' }));
  static readonly COMMANDS: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.commands' }));
  static readonly PROTOCOL_CACHING: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.protocol.caching' }));
  static readonly DATATABLE: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.datatable' }));
  static readonly CONTEXT: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.context' }));
  static readonly CONTEXT_CHILDREN: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.context.children' }));
  static readonly CONTEXT_EVENTS: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.context.events' }));
  static readonly CONTEXT_ACTIONS: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.context.actions' }));
  static readonly CONTEXT_VARIABLES: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.context.variables' }));
  static readonly PERFORMANCE: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.performance' }));
  static readonly CONTEXT_FUNCTIONS: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.functions' }));
  static readonly EXPRESSIONS: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.expressions' }));
  static readonly CORE: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.core' }));
  static readonly CONVERTER: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.converter' }));
  static readonly CLIENTS: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.clients' }));
  static readonly PROTOCOL: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.protocol' }));

  public static createLogger(category: string): LoggerAdapter {
    return new LoggerAdapter(logger.child({ category: category }));
  }
}
