import Log from '../../../Log';
import DataRecord from '../../DataRecord';
import StringUtils from '../../../util/StringUtils';
import DataTable from '../../DataTable';
import AbstractEditorOptionsConverter from './AbstractEditorOptionsConverter';
import EditorOptionsConverter from './EditorOptionsConverter';
import DataTableReplication from '../../DataTableReplication';
import DataTableFactory from '../../DataTableFactory';
import DataTableBuildingConstants from '../../DataTableBuildingConstants';

export default class EditorOptionsUtils {
  private static CONVERTERS: Array<AbstractEditorOptionsConverter> = new Array<AbstractEditorOptionsConverter>();

  static __static_initializer_0() {
    const ExpressionConverter = require('./ExpressionConverter').default;
    const ReferenceConverter = require('./ReferenceConverter').default;
    const ContextMaskConverter = require('./ContextMaskConverter').default;
    const InstanceConverter = require('./InstanceConverter').default;
    const ForeignInstanceConverter = require('./ForeignInstanceConverter').default;
    EditorOptionsUtils.CONVERTERS.push(new ExpressionConverter());
    EditorOptionsUtils.CONVERTERS.push(new ReferenceConverter());
    EditorOptionsUtils.CONVERTERS.push(new ContextMaskConverter());
    EditorOptionsUtils.CONVERTERS.push(new InstanceConverter());
    EditorOptionsUtils.CONVERTERS.push(new ForeignInstanceConverter());
  }

  private static _init = false;

  public static initialize() {
    if (EditorOptionsUtils._init) return;

    EditorOptionsUtils.__static_initializer_0();

    EditorOptionsUtils._init = true;
  }

  constructor() {
    EditorOptionsUtils.initialize();
  }

  private static getConverter(type: string, editor: string | null): EditorOptionsConverter | null {
    for (let converter of this.CONVERTERS) {
      if (converter.isSupportingEditor(editor) && converter.isSupportingType(type)) return converter;
    }

    Log.CONVERTER.debug('Not found converter for editor: ' + editor + ' and type: ' + type);
    return null;
  }

  public static convertToString(fdata: DataRecord): string | null {
    Log.CONVERTER.debug('Starting convertToString, fdata: ' + fdata);

    const type: string = fdata.getString(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_TYPE);
    const editor: string = fdata.getString(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR);
    const options: DataTable = fdata.getDataTable(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR_OPTIONS);
    if (options == null) return null;

    if (options.getRecordCount() == 0) return '';

    const converter: EditorOptionsConverter | null = this.getConverter(type, editor);

    if (converter != null) return converter.convertToString(options);

    if (options.rec().hasField(DataTableBuildingConstants.FIELD_EDITOR_OPTIONS_SIMPLE_FORMAT_OPTIONS)) {
      const eo: string = options.rec().getString(DataTableBuildingConstants.FIELD_EDITOR_OPTIONS_SIMPLE_FORMAT_OPTIONS);
      return StringUtils.isEmpty(eo) ? null : eo;
    }

    return null;
  }

  public static createEditorOptionsTable(
    type: string,
    editor: string | null,
    editorOptions: string | null = null
  ): DataTable {
    Log.CONVERTER.debug('Starting convertToDataTable, type: ' + type + ', editor: ' + editor);

    const converter: EditorOptionsConverter | null = this.getConverter(type, editor);

    if (converter !== null) {
      const table: DataTable = DataTableFactory.of(converter.getFormat());

      if (editorOptions != null) {
        try {
          const eot: DataTable = DataTableFactory.createAndDecode(editorOptions);
          DataTableReplication.copy(eot, table);
        } catch (ex) {
          throw new Error(ex.message);
        }
      }

      return table;
    }

    const DataTableBuilding = require('../../DataTableBuilding').default;
    return DataTableFactory.createWithFirstRecord(
      DataTableBuilding.EDITOR_OPTIONS_SIMPLE_FORMAT,
      editorOptions != null ? editorOptions : new String()
    );
  }

  public static hasConverter(type: string, editor: string): boolean {
    return this.getConverter(type, editor) != null ? true : false;
  }
}
