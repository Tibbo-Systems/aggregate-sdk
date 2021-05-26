import AggreGateDevice from './AggreGateDevice';
export default abstract class AggreGateNetworkDevice extends AggreGateDevice {
    static readonly DEFAULT_ADDRESS: string;
    static readonly DEFAULT_CONNECTION_TIMEOUT: number;
    private address;
    private port;
    private connectionTimeout;
    private reconnectionAttempts;
    private reconnectionDelay;
    constructor(id: string, type: string, address: string, port: number);
    getAddress(): string;
    getPort(): number;
    setPort(port: number): void;
    setAddress(address: string): void;
    getConnectionTimeout(): number;
    setConnectionTimeout(connectionTimeout: number): void;
    getReconnectionAttempts(): number;
    setReconnectionAttempts(reconnectionAttempts: number): void;
    setReconnectionDelay(reconnectionDelay: number): void;
    getReconnectionDelay(): number;
    getInfo(): string;
}
