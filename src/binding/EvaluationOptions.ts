import JObject from '../util/java/JObject';
import Expression from '../expression/Expression';
import Reference from '../expression/Reference';

export default class EvaluationOptions extends JObject {
  public static readonly STARTUP = 1;
  public static readonly EVENT = 2;
  public static readonly PERIODIC = 4;

  private pattern: number;
  private period = 0; // Milliseconds
  private activator: Reference | null = null;
  private condition: Expression | null = null;

  constructor(pattern: number) {
    super();
    this.pattern = pattern;
  }

  public static of(startup: boolean, event: boolean, period = 0): EvaluationOptions {
    let pattern = 0;
    if (startup) {
      pattern |= EvaluationOptions.STARTUP;
    }
    if (event) {
      pattern |= EvaluationOptions.EVENT;
    }
    if (period > 0) {
      pattern |= EvaluationOptions.PERIODIC;
    }
    const options = new EvaluationOptions(pattern);
    options.setPeriod(period);
    return options;
  }

  public setPeriod(period: number): void {
    this.period = period;
  }

  public getPattern(): number {
    return this.pattern;
  }

  public getPeriod(): number {
    return this.period;
  }

  public getActivator(): Reference | null {
    return this.activator;
  }

  public getCondition(): Expression | null {
    return this.condition;
  }

  public setPattern(pattern: number): void {
    this.pattern = pattern;
  }

  public setActivator(activator: Reference): void {
    this.activator = activator;
  }

  public setCondition(condition: Expression): void {
    this.condition = condition;
  }

  public isProcessOnStartup(): boolean {
    return (this.pattern & EvaluationOptions.STARTUP) > 0;
  }

  public isProcessOnEvent(): boolean {
    return (this.pattern & EvaluationOptions.EVENT) > 0;
  }

  public isProcessPeriodically(): boolean {
    return (this.pattern & EvaluationOptions.PERIODIC) > 0;
  }

  public clone(): EvaluationOptions {
    const options = new EvaluationOptions(this.pattern);
    options.setPeriod(this.period);
    if (this.activator != null) options.setActivator(this.activator);
    if (this.condition != null) options.setCondition(this.condition);
    return options;
  }

  public toString(): string {
    return (
      (this.isProcessOnStartup() ? '1' : '0') +
      (this.isProcessOnEvent() ? '1' : '0') +
      (this.isProcessPeriodically() ? '1' : '0') +
      (this.isProcessPeriodically() ? ', period=' + this.period : '') +
      ', activator=' +
      this.activator +
      ', condition=' +
      this.condition
    );
  }
}
