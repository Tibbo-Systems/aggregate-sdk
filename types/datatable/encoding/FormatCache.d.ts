import TableFormat from '../TableFormat';
import JObject from '../../util/java/JObject';
import AbstractAggreGateDeviceController from '../../protocol/AbstractAggreGateDeviceController';
import AggreGateDevice from '../../protocol/AggreGateDevice';
import ContextManager from '../../context/ContextManager';
export default class FormatCache extends JObject {
    private useExternalIds;
    private name;
    private currentId;
    private readonly reverse;
    private readonly cache;
    private controller;
    constructor(name: string, controller?: AbstractAggreGateDeviceController<AggreGateDevice, ContextManager<any>>);
    addIfNotExists(format: TableFormat): number | null;
    getId(format: TableFormat): number | null;
    private findIdInReverseMap;
    getCachedVersion(format: TableFormat | null): TableFormat | null;
    add(format: TableFormat | null): number;
    private addImpl;
    put(id: number, format: TableFormat): void;
    get(id: number): TableFormat | null;
    hasFormat(id: number): boolean;
    getFormatFromServer(id: number): Promise<TableFormat>;
    clear(): void;
}
