export default class ActionExecutionMode {
  public static NORMAL: number = 0;

  public static REDIRECT: number = 1;

  public static BATCH: number = 2;

  public static TEST: number = 3;

  public static HEADLESS: number = 4;

  private code: number = 0;

  public constructor(code: number) {
    this.code = code;
  }

  public getCode(): number {
    return this.code;
  }
}
