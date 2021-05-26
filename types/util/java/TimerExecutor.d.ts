import AsyncRunnable from './AsyncRunnable';
export default class TimerExecutor {
    private enabled;
    schedule(task: AsyncRunnable, delay: number, period: number): void;
    shutdown(): void;
}
