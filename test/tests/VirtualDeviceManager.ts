import ProxyContext from "../../src/protocol/ProxyContext";
import ContextUtils from "../../src/context/ContextUtils";
import RemoteServerController from "../../src/protocol/RemoteServerController";
import Log from "../../src/Log";

export default class VirtualDeviceManager {


    private virtualDevice: ProxyContext<any, any> | null = null;

    private rlc: RemoteServerController;
    private createVirtualDevice: boolean;

    constructor(rlc: RemoteServerController, createVirtualDevice: boolean) {
        this.rlc = rlc;
        this.createVirtualDevice = createVirtualDevice;
    }


    public async start(): Promise<void> {
        // Creating new device account

        // Getting user's devices container context
        const devicesContextPath = ContextUtils.devicesContextPath('admin');
        const adminDevicesContext = this.rlc.getContextManager().get(devicesContextPath, null);


        await adminDevicesContext?.loadContext();

        if (!this.createVirtualDevice)
            return;

        // Calling "add" function to create new Virtual Device and providing driver ID, device name, and description
        // Driver IDs may be found in Device Drivers section of the manual
        // This call will implicitly fill in function input data table
  
        try {
            await adminDevicesContext?.callFunction('add', ['com.tibbo.linkserver.plugin.device.virtual', 'virtual', 'Virtual Device']);
        }
        catch (e) {
            Log.CONTEXT_ACTIONS.warn(e.message,e)
        }

        // Returning context of the newly created device
        const deviceContextPath = ContextUtils.deviceContextPath('admin', 'virtual');
        this.virtualDevice = this.rlc.getContextManager().get(deviceContextPath, null) as ProxyContext<any, any>;
        await this.deviceSynchronization();
        await this.virtualDevice.loadContext();
    }


    private async deviceSynchronization(): Promise<void> {
        await new Promise(resolve => {
            // this.signalAll = resolve;
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    }


    getVirtualDevice(): ProxyContext<any, any> {
        return this.virtualDevice as ProxyContext<any, any>;
    }

    async stop() {
        if (!this.createVirtualDevice)
            return;
        const parent = this.virtualDevice?.getParent();
        if (parent != null)
            await parent.callFunction("delete", [this.virtualDevice?.getName()], null, null);
    }
}