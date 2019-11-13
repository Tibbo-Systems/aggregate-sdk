import Command from './Command';
import AbstractDeviceController from './AbstractDeviceController';
import ReplyMonitor from './ReplyMonitor';
import CommandProcessorStatistics from './CommandProcessorStatistics';
export default class AsyncCommandProcessor<I extends Command, O extends Command, C extends AbstractDeviceController<I, O>> {
    private static readonly PENDING_COMMAND_TIMEOUT;
    private readonly controller;
    private isAliveProcessor;
    private sentCommandsQueue;
    private readonly statistics;
    constructor(controller: C);
    sendSyncCommand(cmd: O): Promise<I | null>;
    sendUnrepliedCommand(cmd: O): void;
    resetSentCommandTimeouts(): void;
    private sendCommandImplementation;
    sendCommand(cmd: O): ReplyMonitor<O, I>;
    private waitReplyMonitor;
    private addSentCommand;
    run(): void;
    interrupt(): void;
    isActive(): boolean;
    getActiveCommands(): Array<ReplyMonitor<O, I>>;
    private processError;
    getStatistics(): CommandProcessorStatistics;
    isAlive(): boolean;
}
