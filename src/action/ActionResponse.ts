import RequestIdentifier from './RequestIdentifier';

export default interface ActionResponse {
  shouldRemember(): boolean;

  getRequestId(): RequestIdentifier | null;
}
