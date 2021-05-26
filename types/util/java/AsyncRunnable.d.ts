export default abstract class AsyncRunnable {
    abstract run(): Promise<void>;
}
