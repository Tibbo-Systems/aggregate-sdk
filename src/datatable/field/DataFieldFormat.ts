import FieldFormat from '../FieldFormat';
import Data from '../../data/Data';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
import TableFormat from '../TableFormat';
import DataTable from '../DataTable';
import FieldConstants from './FieldConstants';
import DataRecord from '../DataRecord';
import StringBuilder from '../../util/java/StringBuilder';
import DataTableFactory from '../DataTableFactory';
import FieldFormatFactory from '../FieldFormatFactory';

export default class DataFieldFormat extends FieldFormat<Data> {
  public static readonly EDITOR_REPORT: string = 'report';

  public static readonly EXTENSIONS_DESCR_FIELD: string = 'extensionsDescr';
  public static readonly MODE_FIELD: string = 'mode';
  public static readonly EXTENSIONS_FIELD: string = 'extensions';
  public static readonly EXTENSION_FIELD: string = 'extensionsFolder';
  public static readonly FOLDER_FIELD: string = 'folder';

  constructor(name: string) {
    super(name);
    DataFieldFormat.initializeDataField();
    this.setTransferEncode(true);
  }

  public static EXTENSIONS_FORMAT: TableFormat = new TableFormat();

  public static DATA_EDITOR_OPTIONS_FORMAT: TableFormat = new TableFormat(1, 1);

  static staticDataFormatInitializer0() {
    const modeF: FieldFormat<any> = FieldFormatFactory.createType(DataFieldFormat.MODE_FIELD, FieldConstants.STRING_FIELD);
    modeF.setNullable(true);

    const edF: FieldFormat<any> = FieldFormatFactory.createType(DataFieldFormat.EXTENSIONS_DESCR_FIELD, FieldConstants.STRING_FIELD);
    edF.setNullable(true);

    // Default value for 'extensions' field
    const extF: FieldFormat<any> = FieldFormatFactory.createType(DataFieldFormat.EXTENSION_FIELD, FieldConstants.STRING_FIELD);
    DataFieldFormat.EXTENSIONS_FORMAT.addField(extF);
    const dt: DataTable = DataTableFactory.of(DataFieldFormat.EXTENSIONS_FORMAT);

    const extsF: FieldFormat<DataTable> = FieldFormatFactory.createType(DataFieldFormat.EXTENSIONS_FIELD, FieldConstants.DATATABLE_FIELD);
    extsF.setDefault(dt);
    extsF.setNullable(true);

    const folderF: FieldFormat<any> = FieldFormatFactory.createType(DataFieldFormat.FOLDER_FIELD, FieldConstants.STRING_FIELD);
    folderF.setNullable(true);

    DataFieldFormat.DATA_EDITOR_OPTIONS_FORMAT.addField(modeF);
    DataFieldFormat.DATA_EDITOR_OPTIONS_FORMAT.addField(edF);
    DataFieldFormat.DATA_EDITOR_OPTIONS_FORMAT.addField(extsF);
    DataFieldFormat.DATA_EDITOR_OPTIONS_FORMAT.addField(folderF);
  }

  public static initDataField = false;

  public static initializeDataField() {
    if (DataFieldFormat.initDataField) return;

    DataFieldFormat.staticDataFormatInitializer0();

    DataFieldFormat.initDataField = true;
  }

  public valueToString(value: Data): string | null {
    if (value == null) {
      return null;
    }

    return value.encodeToString();
  }

  public getType(): string {
    return FieldConstants.DATA_FIELD;
  }

  public getNotNullDefault(): Data {
    const data = new Data();
    data.setShallowCopy(this.isShallow());
    return data;
  }

  valueFromString(value: string, settings: ClassicEncodingSettings | null, validate: boolean): Data {
    try {
      const data: Data = Data.fromString(value);
      data.setShallowCopy(this.isShallow());
      return data;
    } catch (ex) {
      throw new Error('Invalid data block: ' + ex.message);
    }
  }

  public getSuitableEditors(): Array<string> {
    return [FieldConstants.EDITOR_LIST, FieldConstants.D_EDITOR_TEXT, FieldConstants.EDITOR_IMAGE, FieldConstants.EDITOR_SOUND, FieldConstants.EDITOR_HEX, DataFieldFormat.EDITOR_REPORT];
  }

  public static encodeTextEditorOptions(mode: string, extensionsDescription: string, folder: string, extensions: Array<string>): string {
    let esdt: DataTable | null = null;
    if (extensions != null) {
      esdt = DataTableFactory.of(DataFieldFormat.EXTENSIONS_FORMAT);
      for (const ext of extensions) {
        const dr: DataRecord = esdt.addRecord();
        dr.setValue(DataFieldFormat.EXTENSION_FIELD, ext);
      }
    }
    const eodt: DataTable = DataTableFactory.of(DataFieldFormat.DATA_EDITOR_OPTIONS_FORMAT);
    const dr: DataRecord = eodt.addRecord();
    dr.setValue(DataFieldFormat.MODE_FIELD, mode);
    dr.setValue(DataFieldFormat.FOLDER_FIELD, folder);
    dr.setValue(DataFieldFormat.EXTENSIONS_DESCR_FIELD, extensionsDescription);
    dr.setValue(DataFieldFormat.EXTENSIONS_FIELD, esdt);

    return eodt.encodeToString();
  }

  public valueToEncodedString(value: Data, settings: ClassicEncodingSettings, sb: StringBuilder = new StringBuilder(), encodeLevel = 1): StringBuilder | null {
    if (value != null) {
      value.encode(sb, settings, this.isTransferEncode(), encodeLevel);

      return sb;
    }

    return super.valueToEncodedString(value, settings, sb, encodeLevel);
  }

  public isAssignableFrom(value: any): boolean {
    return value instanceof Data;
  }
}
