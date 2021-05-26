import AsyncRunnable from './AsyncRunnable';

export default class RejectedExecutionHandler {
  public rejectedExecution(task: AsyncRunnable): void {
    console.log('task is rejected');
    throw new Error('Execution of a task was rejected. Check configuration of fine-tune concurrency settings.');
  }
}
