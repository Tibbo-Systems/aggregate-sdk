import AbstractFieldValidator from './AbstractFieldValidator';
import Context from '../../context/Context';
import ContextManager from '../../context/ContextManager';
import CallerController from '../../context/CallerController';
import Util from '../../util/Util';
import FieldConstants from '../field/FieldConstants';

export default class IdValidator extends AbstractFieldValidator<any> {
  public validate(
    context: Context<any, any>,
    contextManager: ContextManager<Context<any, any>>,
    caller: CallerController,
    value: any
  ): any {
    if (value != null && Util.isString(value)) {
      return Util.descriptionToName(value.toString());
    }

    return value;
  }

  public shouldEncode(): boolean {
    return true;
  }

  public encode(): string {
    return '';
  }

  public getType(): string | null {
    return FieldConstants.VALIDATOR_ID;
  }
}
