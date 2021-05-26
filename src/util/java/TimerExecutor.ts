import AsyncRunnable from './AsyncRunnable';

export default class TimerExecutor {
  private enabled = true;

  public schedule(task: AsyncRunnable, delay: number, period: number): void {
    const _this = this;
    setTimeout(async function executeTask() {
      if (!_this.enabled) return;
      await task.run();
      setTimeout(executeTask, period);
    }, period);
  }

  public shutdown(): void {
    this.enabled = false;
  }
}
