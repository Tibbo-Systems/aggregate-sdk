export default class ActionExecutionMode {
  public static NORMAL = 0;

  public static REDIRECT = 1;

  public static BATCH = 2;

  public static TEST = 3;

  public static HEADLESS = 4;

  private code = 0;

  public constructor(code: number) {
    this.code = code;
  }

  public getCode(): number {
    return this.code;
  }
}
