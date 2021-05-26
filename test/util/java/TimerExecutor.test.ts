import TimerExecutor from '../../../src/util/java/TimerExecutor';
import AsyncRunnable from '../../../src/util/java/AsyncRunnable';

describe('TestTimerExecutor', () => {
  /* it('execute tasks with period', async () => {
    const mockRunnable = jest.fn();
    const timerExecutor = new TimerExecutor();
    const task = new (class extends AsyncRunnable {
      async run(): Promise<void> {
        mockRunnable();
        return;
      }
    })();
    timerExecutor.schedule(task, 100, 100);
    await new Promise((resolve) => setTimeout(resolve, 1100));
    expect(mockRunnable).toHaveBeenCalledTimes(10);
  }, 2000);*/

  it('execute tasks', async () => {
    const mockRunnable = jest.fn();
    const timerExecutor = new TimerExecutor();
    let countCalledTimes = 0;
    const task = new (class extends AsyncRunnable {
      async run(): Promise<void> {
        mockRunnable();
        countCalledTimes++;
        if (countCalledTimes === 4) timerExecutor.shutdown();
        return;
      }
    })();
    timerExecutor.schedule(task, 100, 100);
    timerExecutor.schedule(task, 100, 100);
    await new Promise((resolve) => setTimeout(resolve, 1100));
    expect(mockRunnable).toHaveBeenCalledTimes(4);
  }, 2000);
});
