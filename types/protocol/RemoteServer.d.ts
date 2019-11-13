import AggreGateNetworkDevice from './AggreGateNetworkDevice';
export default class RemoteServer extends AggreGateNetworkDevice {
    static readonly DEFAULT_PORT: number;
    static readonly DEFAULT_NON_SECURE_PORT: number;
    static readonly DEFAULT_USERNAME: string;
    static readonly DEFAULT_PASSWORD: string;
    private username;
    private password;
    constructor(address?: string, port?: number, username?: string, password?: string);
    getPassword(): string;
    getUsername(): string;
    setUsername(username: string): void;
    setPassword(password: string): void;
    getInfo(): string;
}
