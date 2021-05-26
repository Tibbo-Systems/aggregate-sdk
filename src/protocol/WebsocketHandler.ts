import Log from '../Log';

export default class WebsocketHandler {
  public afterConnectionEstablished(ev: Event): void {
    //  if (Log.PROTOCOL.isDebugEnabled())
    Log.PROTOCOL.info('Connection with remote server established');
  }

  public tryReconnect(attempt: number, reconnectionAttempts: number): void {
    Log.PROTOCOL.info(`Reconnection attempt ${attempt} of ${reconnectionAttempts}`);
  }

  public connectionRefused(deviceDescription: string, deviceInfo: string): void {}

  public handleTransportError(ev: Event): void {}

  public afterConnectionClosed(ev: CloseEvent): void {}
}
