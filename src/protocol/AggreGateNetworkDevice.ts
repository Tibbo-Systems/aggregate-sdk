import AggreGateDevice from './AggreGateDevice';
import TimeHelper from '../util/TimeHelper';

export default abstract class AggreGateNetworkDevice extends AggreGateDevice {
  public static readonly DEFAULT_ADDRESS: string = 'localhost';

  public static readonly DEFAULT_CONNECTION_TIMEOUT: number = 20 * TimeHelper.SECOND_IN_MS;

  private address: string;
  private port: number;

  private connectionTimeout: number = AggreGateNetworkDevice.DEFAULT_CONNECTION_TIMEOUT;

  private reconnectionAttempts = 0;

  private reconnectionDelay = 1000;

  constructor(id: string, type: string, address: string, port: number) {
    super(id, type);
    this.address = address;
    this.port = port;
  }

  public getAddress(): string {
    return this.address;
  }

  public getPort(): number {
    return this.port;
  }

  public setPort(port: number): void {
    this.port = port;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public getConnectionTimeout(): number {
    return this.connectionTimeout;
  }

  public setConnectionTimeout(connectionTimeout: number): void {
    this.connectionTimeout = connectionTimeout;
  }

  public getReconnectionAttempts(): number {
    return this.reconnectionAttempts;
  }

  public setReconnectionAttempts(reconnectionAttempts: number): void {
    this.reconnectionAttempts = reconnectionAttempts;
  }

  public setReconnectionDelay(reconnectionDelay: number): void {
    this.reconnectionDelay = reconnectionDelay;
  }

  public getReconnectionDelay(): number {
    return this.reconnectionDelay;
  }

  public getInfo(): string {
    return this.address + ':' + this.port;
  }
}
