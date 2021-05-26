import Log from '../../Log';
import AsyncRunnable from './AsyncRunnable';
import RejectedExecutionHandler from './RejectedExecutionHandler';

export default class ThreadPoolExecutor {
  private completedTaskCount = 0;

  private largestPoolSize = 0;
  private _shutdown = false;
  private queueLength;
  private queue = Array<AsyncRunnable>();
  private activeTasks = 0;
  private corePoolSize: number;
  private maximumPoolSize: number;
  private rejectedExecutionHandler: RejectedExecutionHandler;

  constructor(corePoolSize = 0, maximumPoolSize = 0, queueLength = 100, rejectedExecutionHandler: RejectedExecutionHandler = new RejectedExecutionHandler()) {
    if (corePoolSize > maximumPoolSize) throw new Error('maximumPoolSize cannot be less then corePoolSize');
    if (corePoolSize < 0 || maximumPoolSize < 0) throw new Error('maximumPoolSize and corePoolSize should be greater or equal zero');
    if (queueLength < 0) throw new Error('queueLength should be greater or equal zero');
    this.rejectedExecutionHandler = rejectedExecutionHandler;
    this.corePoolSize = corePoolSize;
    this.maximumPoolSize = maximumPoolSize;
    this.queueLength = queueLength;
  }

  public shutdown(): void {
    this._shutdown = true;
    this.queue = new Array<AsyncRunnable>();
  }

  public isShutdown(): boolean {
    return this._shutdown;
  }

  public async submit(task: AsyncRunnable): Promise<void> {
    if (this.isShutdown()) {
      Log.BINDINGS.error('executor has already stopped');
      throw new Error('executor has already stopped');
    }
    if (this.isConcurrentProcessing()) {
      if (this.activeTasks >= this.maximumPoolSize && this.queue.length >= this.queueLength) {
        this.rejectedExecutionHandler.rejectedExecution(task);
        return;
      }

      if (this.activeTasks < this.corePoolSize) {
        return this.executeTask(task);
      }

      if (this.activeTasks === this.corePoolSize) {
        if (this.queue.length < this.queueLength) {
          this.queue.push(task);
          return;
        } else {
          if (this.activeTasks < this.maximumPoolSize) {
            const willExecutedTask = this.takeTask();
            this.queue.push(task);
            return this.executeTask(willExecutedTask);
          } else {
            this.rejectedExecutionHandler.rejectedExecution(task);
            return;
          }
        }
      }
      if (this.activeTasks > this.corePoolSize && this.activeTasks < this.maximumPoolSize) {
        const willExecutedTask = this.takeTask();
        this.queue.push(task);
        return this.executeTask(willExecutedTask);
      } else {
        this.rejectedExecutionHandler.rejectedExecution(task);
        return;
      }
    } else {
      return task.run();
    }
  }

  private takeTask(): AsyncRunnable {
    const task = this.queue[0];
    this.queue.shift();
    return task;
  }

  private executeTask(task: AsyncRunnable): Promise<void> {
    this.activeTasks++;
    if (this.activeTasks > this.largestPoolSize) this.largestPoolSize = this.activeTasks;
    return new Promise<void>((resolve) => {
      return task.run().then(() => {
        this.completedTaskCount++;
        resolve();
      });
    }).then(() => {
      this.activeTasks--;
      if (this.queue.length !== 0 && !this.isShutdown()) {
        this.executeTask(this.takeTask());
      }
    });
  }

  public isConcurrentProcessing(): boolean {
    return this.corePoolSize > 0;
  }

  public getTaskCount(): number {
    return this.completedTaskCount + this.queue.length;
  }

  public getQueueSize(): number {
    return this.queue.length;
  }

  public getActiveCount(): number {
    return this.activeTasks;
  }

  public getMaximumPoolSize(): number {
    return this.maximumPoolSize;
  }

  public getCompletedTaskCount(): number {
    return this.completedTaskCount;
  }
}
