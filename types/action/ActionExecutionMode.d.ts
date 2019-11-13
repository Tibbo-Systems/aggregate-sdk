export default class ActionExecutionMode {
    static NORMAL: number;
    static REDIRECT: number;
    static BATCH: number;
    static TEST: number;
    static HEADLESS: number;
    private code;
    constructor(code: number);
    getCode(): number;
}
