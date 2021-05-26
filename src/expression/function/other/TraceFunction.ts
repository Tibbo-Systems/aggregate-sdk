import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import TracerManager from '../../util/TracerManager';

export default class TraceFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_OTHER, 'Object value, String message', 'Object', Cres.get().getString('fDescTrace'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, true, parameters);

    const value = parameters[0];

    const message = parameters.length > 1 && parameters[1] != null ? parameters[1].toString() : null;

    let tracer = evaluator.getTracer();

    if (tracer == null) {
      tracer = TracerManager.getDefaultTracer();
    }

    tracer.trace(value, message);

    return value;
  }
}
