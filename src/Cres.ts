import i18next from 'i18next';
import resources from './res';
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
  private static readonly res: Cres = new Cres();

  static get(): Cres {
    return Cres.res;
  }

  getString(key: string): string {
    return i18next.t(key);
  }
}
