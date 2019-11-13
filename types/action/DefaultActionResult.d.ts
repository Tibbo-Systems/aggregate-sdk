import ActionResult from './ActionResult';
import JObject from '../util/java/JObject';
export default class DefaultActionResult extends JObject implements ActionResult {
    private successful;
    constructor();
    isSuccessful(): boolean;
    setSuccessful(successful: boolean): void;
}
