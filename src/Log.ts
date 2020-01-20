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

  static readonly BINDINGS: LoggerAdapter = new LoggerAdapter(logger.child('ag.bindings'));
  static readonly COMMANDS_CLIENT: LoggerAdapter = new LoggerAdapter(logger.child('ag.commands.client'));
  static readonly COMMANDS: LoggerAdapter = new LoggerAdapter(logger.child('ag.commands'));
  static readonly PROTOCOL_CACHING: LoggerAdapter = new LoggerAdapter(logger.child('ag.protocol.caching'));
  static readonly DATATABLE: LoggerAdapter = new LoggerAdapter(logger.child('ag.datatable'));
  static readonly CONTEXT: LoggerAdapter = new LoggerAdapter(logger.child('ag.context'));
  static readonly CONTEXT_CHILDREN: LoggerAdapter = new LoggerAdapter(logger.child('ag.context.children'));
  static readonly CONTEXT_EVENTS: LoggerAdapter = new LoggerAdapter(logger.child({ category: 'ag.context.events' }));
  static readonly CONTEXT_ACTIONS: LoggerAdapter = new LoggerAdapter(logger.child('ag.context.actions'));
  static readonly CONTEXT_VARIABLES: LoggerAdapter = new LoggerAdapter(logger.child('ag.context.variables'));
  static readonly PERFORMANCE: LoggerAdapter = new LoggerAdapter(logger.child('ag.performance'));
  static readonly CONTEXT_FUNCTIONS: LoggerAdapter = new LoggerAdapter(logger.child('ag.functions'));
  static readonly EXPRESSIONS: LoggerAdapter = new LoggerAdapter(logger.child('ag.expressions'));
  static readonly CORE: LoggerAdapter = new LoggerAdapter(logger.child('ag.core'));
  static readonly CONVERTER: LoggerAdapter = new LoggerAdapter(logger.child('ag.converter'));
  static readonly CLIENTS: LoggerAdapter = new LoggerAdapter(logger.child('ag.clients'));
  static readonly PROTOCOL: LoggerAdapter = new LoggerAdapter(logger.child('ag.protocol'));
}
