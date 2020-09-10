import Context from './Context';
import AbstractCallerController from './AbstractCallerController';
export default class PropertiesLock {
    private readonly context;
    private readonly lockingPropertiesEditorUUIDs;
    private _lockedBy;
    constructor(context: Context<any, any>);
    lockedBy(): string | null;
    lock(caller: AbstractCallerController, propertiesEditorUUID: string): string | null;
    private getLockedMessage;
    unlock(caller: AbstractCallerController, propertiesEditorUUID: string): boolean;
    breakLock(): void;
    private getLockOwnerName;
}
