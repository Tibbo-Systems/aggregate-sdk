export default class ErrorCollector {
    private readonly errors;
    addError(error: Error): void;
    getErrors(): Array<Error>;
    toString(): string;
    equals(o: any): boolean;
}
