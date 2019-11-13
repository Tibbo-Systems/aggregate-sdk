import AbstractAggreGateDeviceController from './AbstractAggreGateDeviceController';
import RemoteServer from './RemoteServer';
import RemoteContextManager from './RemoteContextManager';
import OutgoingAggreGateCommand from './OutgoingAggregateCommand';
import LoggerAdapter from '../util/logger/LoggerAdapter';
export default class RemoteServerController extends AbstractAggreGateDeviceController<RemoteServer, RemoteContextManager> {
    private dataChannel;
    constructor(device: RemoteServer, async: boolean, useContextManager?: boolean, logger?: LoggerAdapter, maxEventQueueLength?: number, json?: boolean);
    connectToServer(): Promise<RemoteServerController>;
    protected connectImpl(): Promise<boolean>;
    protected prepareDataChannel(): Promise<void>;
    protected loginImpl(): Promise<boolean>;
    disconnectImpl(): void;
    send(command: OutgoingAggreGateCommand): void;
    isConnected(): boolean;
    getAddress(): string | null;
    start(): void;
}
