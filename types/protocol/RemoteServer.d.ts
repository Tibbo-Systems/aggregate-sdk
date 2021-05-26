import AggreGateNetworkDevice from './AggreGateNetworkDevice';
export default class RemoteServer extends AggreGateNetworkDevice {
    static readonly DEFAULT_PORT: number;
    static readonly DEFAULT_NON_SECURE_PORT: number;
    static readonly DEFAULT_USERNAME: string;
    static readonly DEFAULT_PASSWORD: string;
    static readonly DEFAULT_REQUEST_ADDRESS = "/web/ws/api";
    private username;
    private password;
    private effectiveUsername;
    private readonly requestAddress;
    constructor(address?: string, port?: number, username?: string, password?: string, requestAddress?: string);
    getRequestAddress(): string;
    getPassword(): string;
    getUsername(): string;
    getEffectiveUsername(): string;
    setEffectiveUsername(effectiveUsername: string): void;
    setUsername(username: string): void;
    setPassword(password: string): void;
    getInfo(): string;
}
