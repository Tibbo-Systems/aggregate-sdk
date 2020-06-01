import Tracer from './Tracer';
import TableFormat from '../../datatable/TableFormat';
import Context from '../../context/AbstractContext';
import Cres from '../../Cres';
import EventDefinition from '../../context/EventDefinition';

export default class ContextExpressionTracer implements Tracer {
  public static E_TRACE = 'trace';
  public static EF_TRACE_VALUE = 'value';
  public static EF_TRACE_MESSAGE = 'message';

  private static EFT_TRACE = new TableFormat(1, 1);

  static __static_initializer_0() {
    ContextExpressionTracer.EFT_TRACE.addField('<' + ContextExpressionTracer.EF_TRACE_VALUE + '><S><F=N><D=' + Cres.get().getString('value') + '>');
    ContextExpressionTracer.EFT_TRACE.addField('<' + ContextExpressionTracer.EF_TRACE_MESSAGE + '><S><F=N><D=' + Cres.get().getString('message') + '>');
  }

  private context: Context<any, any>;
  private traceEventGroup: string;

  constructor(context: Context<any, any>, traceEventGroup: string) {
    this.context = context;
    this.traceEventGroup = traceEventGroup;
    this.install();
  }

  install() {
    const target = this.getContext();

    if (target == null) {
      return;
    }

    if (target.getEventDefinition(ContextExpressionTracer.E_TRACE) != null) {
      return;
    }

    const ed = new EventDefinition(ContextExpressionTracer.E_TRACE, ContextExpressionTracer.EFT_TRACE, Cres.get().getString('trace'));
    ed.setGroup(this.traceEventGroup);

    target.addEventDefinition(ed);
  }

  trace(value: object, message: string): void {
    this.install();

    const target = this.getContext();

    target.fireEvent(ContextExpressionTracer.E_TRACE, [value != null ? value.toString() : null, message]);
  }

  protected getContext(): Context<any, any> {
    return this.context;
  }
}
