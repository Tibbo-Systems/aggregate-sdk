import JObject from '../util/java/JObject';

export default class AggreGateCodes extends JObject {
  static readonly REPLY_CODE_OK: string = 'A';
  static readonly REPLY_CODE_DENIED: string = 'D';
  static readonly REPLY_CODE_ERROR: string = 'E';

  public static readonly REPLY_CODE_PASSWORD_EXPIRED: string = 'AG-10001';
}
