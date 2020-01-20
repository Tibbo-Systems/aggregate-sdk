import Context from './Context';

export default abstract class DefaultContextVisitor {
  private startContext = true;

  isConcurrent(): boolean {
    return false;
  }

  isStartContext(): boolean {
    const res = this.startContext;
    this.startContext = false;
    return res;
  }

  shouldVisit(context: Context<any, any>): boolean {
    return !context.isProxy();
  }

  abstract visit(context: Context<any, any>): void;
}
