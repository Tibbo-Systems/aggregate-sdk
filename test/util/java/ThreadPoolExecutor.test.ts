import AsyncRunnable from '../../../src/util/java/AsyncRunnable';
import ThreadPoolExecutor from '../../../src/util/java/ThreadPoolExecutor';
import RejectedExecutionHandler from '../../../src/util/java/RejectedExecutionHandler';

describe('TestThreadPoolExecutor', () => {
  it('execute tasks in sync mode', async () => {
    const mockRunnable = jest.fn();
    const threadPoolExecutor = new ThreadPoolExecutor();
    const task = new (class extends AsyncRunnable {
      async run(): Promise<void> {
        mockRunnable();
        return;
      }
    })();
    for (let i = 0; i < 100; i++) {
      await threadPoolExecutor.submit(task);
    }
    expect(mockRunnable).toHaveBeenCalledTimes(100);
  });

  it('should queue overflow and reject tasks', async () => {
    const mockRunnable = jest.fn();
    const mockRejected = jest.fn();
    const handler = new (class extends RejectedExecutionHandler {
      rejectedExecution(task: AsyncRunnable) {
        mockRejected();
      }
    })();
    const threadPoolExecutor = new ThreadPoolExecutor(1, 1, 10, handler);
    const task = new (class extends AsyncRunnable {
      async run(): Promise<void> {
        mockRunnable();
        return;
      }
    })();
    for (let i = 0; i < 20; i++) {
      threadPoolExecutor.submit(task);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(threadPoolExecutor.getCompletedTaskCount()).toBe(11);
    expect(mockRunnable).toHaveBeenCalledTimes(11);
    expect(mockRejected).toHaveBeenCalledTimes(9);
  });

  it('should execute tasks and expand poolSize', async () => {
    const mockRunnable = jest.fn();
    const threadPoolExecutor = new ThreadPoolExecutor(1, 8);
    const task = new (class extends AsyncRunnable {
      async run(): Promise<void> {
        mockRunnable();
        return;
      }
    })();
    for (let i = 0; i < 20; i++) {
      threadPoolExecutor.submit(task);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(threadPoolExecutor.getCompletedTaskCount()).toBe(20);
    expect(threadPoolExecutor.getMaximumPoolSize()).toBe(8);
    expect(mockRunnable).toHaveBeenCalledTimes(20);
  });

  it('should queue overflow and reject tasks and expand poolSize', async () => {
    const mockRunnable = jest.fn();
    const mockRejected = jest.fn();
    const handler = new (class extends RejectedExecutionHandler {
      rejectedExecution(task: AsyncRunnable) {
        mockRejected();
      }
    })();
    const threadPoolExecutor = new ThreadPoolExecutor(1, 8, 10, handler);
    const task = new (class extends AsyncRunnable {
      async run(): Promise<void> {
        mockRunnable();
        return;
      }
    })();
    for (let i = 0; i < 20; i++) {
      threadPoolExecutor.submit(task);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(threadPoolExecutor.getCompletedTaskCount()).toBe(18);
    expect(mockRunnable).toHaveBeenCalledTimes(18);
    expect(threadPoolExecutor.getMaximumPoolSize()).toBe(8);
    expect(mockRejected).toHaveBeenCalledTimes(2);
  });
});
