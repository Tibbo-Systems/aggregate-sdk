import TableFormat from '../TableFormat';
import JObject from '../../util/java/JObject';
import Log from '../../Log';
import Contexts from '../../context/Contexts';
import DataTable from '../DataTable';
import DataRecord from '../DataRecord';
import ClassicEncodingSettings from './ClassicEncodingSettings';
import AbstractAggreGateDeviceController from '../../protocol/AbstractAggreGateDeviceController';
import RootContextConstants from '../../server/RootContextConstants';
import CommonServerFormats from '../../server/CommonServerFormats';
import AbstractContext from '../../context/AbstractContext';
import Util from '../../util/Util';
import AggreGateDevice from '../../protocol/AggreGateDevice';
import ContextManager from '../../context/ContextManager';

export default class FormatCache extends JObject {
  private useExternalIds = false;
  private name: string | null = null;

  private currentId = 0;
  // TODO TableFormat not works as a key
  private readonly reverse: Map<TableFormat, number> = new Map<TableFormat, number>();
  private readonly cache: Map<number, TableFormat> = new Map<number, TableFormat>();

  private controller: AbstractAggreGateDeviceController<AggreGateDevice, ContextManager<any>> | null = null;

  constructor(name: string, controller?: AbstractAggreGateDeviceController<AggreGateDevice, ContextManager<any>>) {
    super();
    this.name = name;
    if (controller) this.controller = controller;
    else this.useExternalIds = true;
  }

  public addIfNotExists(format: TableFormat): number | null {
    let formatId: number | null = this.getId(format);

    if (formatId == null) {
      formatId = this.getId(format);

      if (formatId == null) {
        formatId = this.add(format);
      }
    }

    return formatId;
  }

  public getId(format: TableFormat): number | null {
    if (this.useExternalIds && format.getId() != null) {
      return format.getId();
    }

    let id: any = this.reverse.get(format);

    if (!Util.isNumber(id)) {
      id = this.findIdInReverseMap(format);
    }

    return Util.isNumber(id) ? id : null;
  }

  // TODO: if the formats are not equal by reference, then you need to find everything by key and compare them. Not good for performance
  private findIdInReverseMap(format: TableFormat): number | null {
    for (const entry of this.reverse) {
      const tf = entry[0];
      const id: number = entry[1] as number;
      if (format.equals(tf)) {
        return id;
      }
    }

    return null;
  }

  public getCachedVersion(format: TableFormat | null): TableFormat | null {
    if (format == null) {
      return null;
    }

    const id = this.getId(format);
    let cachedFormat: TableFormat | null = null;

    if (Util.isNumber(id)) {
      const fromCache = this.cache.get(id as number);
      cachedFormat = fromCache ? fromCache : null;
    }

    return cachedFormat != null ? cachedFormat : format;
  }

  public add(format: TableFormat | null): number {
    if (format == null) {
      throw new Error('Format is NULL');
    }

    const id: number = this.currentId++;

    this.addImpl(format, id);

    if (!format.isImmutable()) {
      Log.PROTOCOL_CACHING.warn('Cached mutable format as #' + id + ': ' + format, new Error());
    }

    if (Log.PROTOCOL_CACHING.isDebugEnabled()) {
      Log.PROTOCOL_CACHING.debug("Cache '" + this.name + "' cached format as #" + id + ': ' + format);
    }

    return id;
  }

  private addImpl(format: TableFormat, id: number): TableFormat {
    if (this.useExternalIds && format.isImmutable()) {
      format.setId(id);
    }

    //this.reverse.set(format, id);
    this.cache.set(id, format);

    return format;
  }

  public put(id: number, format: TableFormat): void {
    if (format == null) {
      throw new Error('Format is NULL');
    }

    if (this.addImpl(format, id) == null && Log.PROTOCOL_CACHING.isDebugEnabled()) {
      Log.PROTOCOL_CACHING.debug("Cache '" + this.name + "' cached format as #" + id + ': ' + format);
    }
  }

  public get(id: number): TableFormat | null {
    return this.cache.get(id) ?? null;
  }

  public hasFormat(id: number): boolean {
    return this.cache.has(id);
  }

  public async getFormatFromServer(id: number): Promise<TableFormat> {
    let result = this.get(id);

    if (result) return result;

    if (this.controller != null) {
      try {
        if (Log.PROTOCOL_CACHING.isDebugEnabled()) {
          Log.PROTOCOL_CACHING.debug('Requesting remote format #' + id);
        }

        let output: DataTable;

        const cm: ContextManager<any> | null = this.controller.getContextManager();

        const rootContext: AbstractContext<any, any> | null = cm != null ? cm.get(Contexts.CTX_ROOT, cm.getCallerController()) : null;
        const utilitiesContext: AbstractContext<any, any> | null = cm != null ? cm.get(Contexts.CTX_UTILITIES, cm.getCallerController()) : null;

        if (rootContext != null && rootContext.getFunctionDefinition(RootContextConstants.F_GET_FORMAT) != null) {
          output = await rootContext.callFunction(RootContextConstants.F_GET_FORMAT, [id]);
        } else if (utilitiesContext != null && utilitiesContext.getFunctionDefinition(RootContextConstants.F_GET_FORMAT) != null) {
          output = await utilitiesContext.callFunction(RootContextConstants.F_GET_FORMAT, [id]);
        } else {
          const input: DataTable = DataRecord.createAndFill(CommonServerFormats.FIFT_GET_FORMAT, id).wrap();
          output = await this.controller.callRemoteFunction(Contexts.CTX_UTILITIES, RootContextConstants.F_GET_FORMAT, CommonServerFormats.FOFT_GET_FORMAT, input, null);
        }

        const formatData: string = output.rec().getString(RootContextConstants.FOF_GET_FORMAT_DATA);
        result = TableFormat.createWithFormatAndSettings(formatData, new ClassicEncodingSettings(false));

        if (Log.PROTOCOL_CACHING.isDebugEnabled()) {
          Log.PROTOCOL_CACHING.debug('Received explicitely requested remote format #' + id + ': ' + result);
        }

        this.addImpl(result, id);
      } catch (ex) {
        throw new Error('Error obtaining format #' + id + ': ' + ex.message);
      }
    } else {
      throw new Error('Format requesting is disabled');
    }

    return result;
  }

  clear() {
    this.cache.clear();
    this.reverse.clear();
  }
}
