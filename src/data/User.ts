import JObject from '../util/java/JObject';

export default class User extends JObject {
  public static readonly FIELD_NAME: string = 'name';
  public static readonly FIELD_FIRSTNAME: string = 'firstname';
  public static readonly FIELD_LASTNAME: string = 'lastname';
  public static readonly FIELD_PASSWORD: string = 'password';
  public static readonly FIELD_PASSWORD_EXPIRATION_DATE: string = 'passwordExpirationDate';
  public static readonly FIELD_PASSWORD_UPDATED: string = 'passwordUpdated';
  public static readonly FIELD_USE_EXTERNAL_AUTHENTICATION: string = 'useExternalAuthentication';
  public static readonly FIELD_COUNTRY: string = 'country';
  public static readonly FIELD_REGION: string = 'region';
  public static readonly FIELD_ZIP: string = 'zip';
  public static readonly FIELD_CITY: string = 'city';
  public static readonly FIELD_ADDRESS1: string = 'address1';
  public static readonly FIELD_ADDRESS2: string = 'address2';
  public static readonly FIELD_COMMENTS: string = 'comments';
  public static readonly FIELD_COMPANY: string = 'company';
  public static readonly FIELD_DEPARTMENT: string = 'department';
  public static readonly FIELD_EMAIL: string = 'email';
  public static readonly FIELD_PHONE: string = 'phone';
  public static readonly FIELD_FAX: string = 'fax';
  public static readonly FIELD_TIMEZONE: string = 'timezone';
  public static readonly FIELD_LOCALE: string = 'locale';
  public static readonly FIELD_DATEPATTERN: string = 'datepattern';
  public static readonly FIELD_TIMEPATTERN: string = 'timepattern';
  public static readonly FIELD_WEEK_START: string = 'weekStart';
  public static readonly FIELD_CAPTCHA: string = 'captcha';
  public static readonly FIELD_EXTERNAL_USER: string = 'externalUser';

  public static readonly DEFAULT_ADMIN_USERNAME: string = 'admin';
  public static readonly DEFAULT_ADMIN_PASSWORD: string = 'admin';

  public static readonly DEFAULT_LOCALE: string = 'en';
}
