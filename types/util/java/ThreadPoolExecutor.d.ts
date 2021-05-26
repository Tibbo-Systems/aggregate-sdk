import AsyncRunnable from './AsyncRunnable';
import RejectedExecutionHandler from './RejectedExecutionHandler';
export default class ThreadPoolExecutor {
    private completedTaskCount;
    private largestPoolSize;
    private _shutdown;
    private queueLength;
    private queue;
    private activeTasks;
    private corePoolSize;
    private maximumPoolSize;
    private rejectedExecutionHandler;
    constructor(corePoolSize?: number, maximumPoolSize?: number, queueLength?: number, rejectedExecutionHandler?: RejectedExecutionHandler);
    shutdown(): void;
    isShutdown(): boolean;
    submit(task: AsyncRunnable): Promise<void>;
    private takeTask;
    private executeTask;
    isConcurrentProcessing(): boolean;
    getTaskCount(): number;
    getQueueSize(): number;
    getActiveCount(): number;
    getMaximumPoolSize(): number;
    getCompletedTaskCount(): number;
}
