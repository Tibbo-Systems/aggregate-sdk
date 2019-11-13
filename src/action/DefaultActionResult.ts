import ActionResult from './ActionResult';
import JObject from '../util/java/JObject';

export default class DefaultActionResult extends JObject implements ActionResult {
  private successful: boolean = true;

  public constructor() {
    super();
  }

  public isSuccessful(): boolean {
    return this.successful;
  }

  public setSuccessful(successful: boolean): void {
    this.successful = successful;
  }
}
