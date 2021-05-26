import DefaultContextManager from '../context/DefaultContextManager';
import ProxyContext from './ProxyContext';
import AbstractAggreGateDeviceController from './AbstractAggreGateDeviceController';
import DefaultContextEventListener from '../context/DefaultContextEventListener';
import AggreGateDevice from './AggreGateDevice';
import ContextManager from '../context/ContextManager';
export default class RemoteContextManager extends DefaultContextManager<ProxyContext<any, any>> {
    private initialized;
    private initializing;
    private readonly deviceController;
    constructor(controller: AbstractAggreGateDeviceController<AggreGateDevice, ContextManager<any>>, async: boolean, eventQueueLength: number);
    initialize(): void;
    stop(): void;
    getController(): AbstractAggreGateDeviceController<AggreGateDevice, ContextManager<any>>;
    private sendAddListener;
    private sendRemoveListener;
    protected addListenerToContext(con: ProxyContext<any, any>, event: string, listener: DefaultContextEventListener, mask: boolean, weak: boolean): void;
    protected removeListenerFromContext(con: ProxyContext<any, any>, event: string, listener: DefaultContextEventListener, mask: boolean): void;
    addMaskEventListener(mask: string, event: string, listener: DefaultContextEventListener, weak?: boolean): Promise<void>;
    removeMaskEventListener(mask: string, event: string, listener: DefaultContextEventListener): Promise<void>;
    contextRemoved(con: ProxyContext<any, any>): void;
}
