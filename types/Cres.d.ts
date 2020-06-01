import { i18n } from 'i18next';
export default class Cres {
    private static readonly GET_LANG;
    private static readonly GET_CRES;
    private static readonly res;
    static get(): Cres;
    getString(key: string): string;
    static getInitializedLibrary(): i18n;
    static init(): Promise<boolean>;
}
