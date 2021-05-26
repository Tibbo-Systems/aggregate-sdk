export default class WebsocketHandler {
    afterConnectionEstablished(ev: Event): void;
    tryReconnect(attempt: number, reconnectionAttempts: number): void;
    connectionRefused(deviceDescription: string, deviceInfo: string): void;
    handleTransportError(ev: Event): void;
    afterConnectionClosed(ev: CloseEvent): void;
}
