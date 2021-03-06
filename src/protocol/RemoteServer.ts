import Cres from '../Cres';
import AggreGateNetworkDevice from './AggreGateNetworkDevice';

export default class RemoteServer extends AggreGateNetworkDevice {
  public static readonly DEFAULT_PORT: number = 6460;
  public static readonly DEFAULT_NON_SECURE_PORT: number = 6461;
  public static readonly DEFAULT_USERNAME: string = 'admin';
  public static readonly DEFAULT_PASSWORD: string = 'admin';
  public static readonly DEFAULT_REQUEST_ADDRESS = '/web/ws/api';

  private username: string;
  private password: string;
  private effectiveUsername: string;
  private readonly requestAddress: string;

  constructor(
    address: string = RemoteServer.DEFAULT_ADDRESS,
    port: number = RemoteServer.DEFAULT_PORT,
    username: string = RemoteServer.DEFAULT_USERNAME,
    password: string = RemoteServer.DEFAULT_PASSWORD,
    requestAddress: string = RemoteServer.DEFAULT_REQUEST_ADDRESS
  ) {
    super('server', Cres.get().getString('server'), address, port);
    this.username = username;
    this.password = password;
    this.effectiveUsername = username;
    this.requestAddress = requestAddress;
  }

  public getRequestAddress(): string {
    return this.requestAddress;
  }

  public getPassword(): string {
    return this.password;
  }

  public getUsername(): string {
    return this.username;
  }

  public getEffectiveUsername(): string {
    return this.effectiveUsername;
  }

  public setEffectiveUsername(effectiveUsername: string): void {
    this.effectiveUsername = effectiveUsername;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getInfo(): string {
    return super.getInfo() + (this.username != null ? ', ' + this.username : '');
  }
}
