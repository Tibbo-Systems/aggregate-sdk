import Context from './Context';
export default abstract class DefaultContextVisitor {
    private startContext;
    isConcurrent(): boolean;
    isStartContext(): boolean;
    shouldVisit(context: Context<any, any>): boolean;
    abstract visit(context: Context<any, any>): void;
}
