import AbstractEntityDefinition from './AbstractEntityDefinition';
import PersistenceOptions from '../event/PersistenceOptions';
import TableFormat from '../datatable/TableFormat';
import Permissions from '../security/Permissions';
import Comparable from '../util/java/Comparable';
import JObject from '../util/java/JObject';
export default class EventDefinition extends AbstractEntityDefinition implements Comparable<EventDefinition> {
    static readonly CONCURRENCY_SYNCHRONOUS = 0;
    static readonly CONCURRENCY_SEQUENTIAL = 1;
    static readonly CONCURRENCY_CONCURRENT = 2;
    private permissions;
    private format;
    private hidden;
    private expirationPeriod;
    private level;
    private firePermissions;
    private queueLength;
    private concurrency;
    private persistenceOptions;
    private memoryStorageSize;
    private sessionBound;
    private fingerprintExpression;
    constructor(name: string, tableFormat: TableFormat | null, description?: string, group?: string);
    private init;
    setFormat(format: TableFormat | null): void;
    setHidden(hidden: boolean): void;
    setPermissions(permissions: Permissions): void;
    setExpirationPeriod(expirationPeriod: number): void;
    setLevel(level: number): void;
    getFormat(): TableFormat | null;
    isHidden(): boolean;
    getPermissions(): Permissions | null;
    getExpirationPeriod(): number;
    getLevel(): number;
    getFirePermissions(): Permissions | null;
    setFirePermissions(firePermissions: Permissions): void;
    getPersistenceOptions(): PersistenceOptions;
    getMemoryStorageSize(): number;
    setMemoryStorageSize(memoryStorageSize: number): void;
    getConcurrency(): number;
    setConcurrency(concurrency: number): void;
    setSessionBound(sessionBound: boolean): void;
    isSessionBound(): boolean;
    compareTo(d: EventDefinition): number;
    clone(): EventDefinition;
    getFingerprintExpression(): string | null;
    setFingerprintExpression(expression: string): void;
    getEntityType(): number;
    getQueueLength(): number;
    setQueueLength(queueLength: number): void;
    equals(obj: JObject | null): boolean;
}
