export default abstract class AsyncRunnable {
  public abstract run(): Promise<void>;
}
