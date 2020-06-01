import i18next, { i18n } from 'i18next';
import resources from './res';
import Log from './Log';

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        ...resources,
      },
    },
  },
});

export default class Cres {
  private static readonly GET_LANG = '/web/internalization/current-locale';
  private static readonly GET_CRES = `/web/internalization/locales/`;

  private static readonly res: Cres = new Cres();

  static get(): Cres {
    return Cres.res;
  }

  getString(key: string): string {
    return i18next.t(key);
  }

  static getInitializedLibrary(): i18n {
    return i18next;
  }

  public static async init(): Promise<boolean> {
    try {
      const response = await fetch(`${window.location.origin}${Cres.GET_LANG}`);

      const language = await response.json();

      const resource = await fetch(`${window.location.origin}${Cres.GET_CRES}${language}/cres`);

      const resultResource = await resource.json();

      await i18next.init({
        lng: language,
        resources: {
          ru: {
            translation: {
              ...resultResource,
            },
          },
          en: {
            translation: {
              ...resultResource,
            },
          },
        },
      });

      return true;
    } catch (e) {
      Log.CORE.error(e.message, e);
      return false;
    }
  }
}
