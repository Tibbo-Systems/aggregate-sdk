import ProxyContext from "../../src/protocol/ProxyContext";
import ContextUtils from "../../src/context/ContextUtils";
import RemoteServerController from "../../src/protocol/RemoteServerController";

export default class VirtualDeviceManager {

    //@ts-ignore
    private virtualDevice: ProxyContext<any, any>;

    private rlc: RemoteServerController;

    constructor(rlc: RemoteServerController) {
        this.rlc = rlc;
    }


    public async start(): Promise<void> {
        // Creating new device account

        // Getting user's devices container context
        let devicesContextPath = ContextUtils.devicesContextPath('admin');
        let adminDevicesContext = this.rlc.getContextManager().get(devicesContextPath, null);

        //@ts-ignore
        await adminDevicesContext.loadContext();

        // Calling "add" function to create new Virtual Device and providing driver ID, device name, and description
        // Driver IDs may be found in Device Drivers section of the manual
        // This call will implicitly fill in function input data table
        //@ts-ignore
        await adminDevicesContext.callFunction(
            'add',
            ['com.tibbo.linkserver.plugin.device.virtual', 'virtual', 'Virtual Device'],
            null,
            null
        );

        // Returning context of the newly created device
        let deviceContextPath = ContextUtils.deviceContextPath('admin', 'virtual');
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
        return this.virtualDevice;
    }

    async stop() {
        const parent = this.virtualDevice.getParent();
        if (parent != null)
            await parent.callFunction("delete", [this.virtualDevice.getName()], null, null);
    }
}