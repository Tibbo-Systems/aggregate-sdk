import DefaultRequestController from '../context/DefaultRequestController';
import Event from '../data/Event';
export default class FireEventRequestController extends DefaultRequestController {
    private customExpirationPeriod;
    private ignoreStorageErrors;
    private suppressIfNotEnoughMemory;
    constructor(customExpirationPeriod: number);
    static valueOf(ignoreStorageErrors: boolean): FireEventRequestController;
    getCustomExpirationPeriod(): number;
    setCustomExpirationPeriod(customExpirationPeriod: number): void;
    isIgnoreStorageErrors(): boolean;
    setIgnoreStorageErrors(ignoreStorageErrors: boolean): void;
    process(event: Event): Event | null;
    isSuppressIfNotEnoughMemory(): boolean;
    setSuppressIfNotEnoughMemory(value: boolean): void;
}
