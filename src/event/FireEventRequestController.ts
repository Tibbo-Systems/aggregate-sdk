import DefaultRequestController from '../context/DefaultRequestController';
import Event from '../data/Event';

export default class FireEventRequestController extends DefaultRequestController {
  private customExpirationPeriod = 0;

  private ignoreStorageErrors = false;

  private suppressIfNotEnoughMemory = false;

  constructor(customExpirationPeriod: number) {
    super();
    this.customExpirationPeriod = customExpirationPeriod;
  }

  public static valueOf(ignoreStorageErrors: boolean): FireEventRequestController {
    const t = new FireEventRequestController(0);
    t.setIgnoreStorageErrors(ignoreStorageErrors);
    return t;
  }

  public getCustomExpirationPeriod(): number {
    return this.customExpirationPeriod;
  }

  public setCustomExpirationPeriod(customExpirationPeriod: number) {
    this.customExpirationPeriod = customExpirationPeriod;
  }

  public isIgnoreStorageErrors(): boolean {
    return this.ignoreStorageErrors;
  }

  public setIgnoreStorageErrors(ignoreStorageErrors: boolean) {
    this.ignoreStorageErrors = ignoreStorageErrors;
  }

  public process(event: Event): Event | null {
    return event;
  }

  public isSuppressIfNotEnoughMemory(): boolean {
    return this.suppressIfNotEnoughMemory;
  }

  public setSuppressIfNotEnoughMemory(value: boolean) {
    this.suppressIfNotEnoughMemory = value;
  }
}
