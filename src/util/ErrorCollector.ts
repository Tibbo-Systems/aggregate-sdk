import Util from './Util';

export default class ErrorCollector {
  private readonly errors: Array<Error> = [];

  public addError(error: Error): void {
    this.errors.push(error);
  }

  public getErrors(): Array<Error> {
    return this.errors;
  }

  public toString(): string {
    return 'ErrorCollector{' + 'errors=' + this.errors + '}';
  }

  public equals(o: any): boolean {
    if (this == o) return true;
    if (!(o instanceof ErrorCollector)) return false;

    const that: ErrorCollector = o as ErrorCollector;
    return Util.equals(this.errors, that.errors);
  }
}
