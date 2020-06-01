import JObject from '../util/java/JObject';
export default class EvaluationOptions extends JObject {
    static readonly STARTUP = 1;
    static readonly EVENT = 2;
    static readonly PERIODIC = 4;
}
