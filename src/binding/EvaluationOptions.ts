import JObject from '../util/java/JObject';

export default class EvaluationOptions extends JObject {
  public static readonly STARTUP = 1;
  public static readonly EVENT = 2;
  public static readonly PERIODIC = 4;

  /* private pattern: number;
  private period = 0; // Milliseconds
  private activator: Reference;
  private condition: Expression;*/
}
