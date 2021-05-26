import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
import DataTable from '../DataTable';
import Util from '../../util/Util';
import StringBuilder from '../../util/java/StringBuilder';
import DataTableFactory from '../DataTableFactory';
import FieldConstants from './FieldConstants';
import AbstractFieldValidator from '../validator/AbstractFieldValidator';
import Context from '../../context/Context';
import ContextManager from '../../context/ContextManager';
import CallerController from '../../context/CallerController';
import DataTableReplication from '../DataTableReplication';
import DataTableUtils from '../DataTableUtils';
import ProtocolVersion from '../../protocol/ProtocolVersion';
import TableFormat from '../TableFormat';
import ExpressionUtils from '../../expression/ExpressionUtils';
import ElementList from '../../util/ElementList';
import StringUtils from '../../util/StringUtils';
import TransferEncodingHelper from '../encoding/TransferEncodingHelper';
import AbstractDataTable from '../AbstractDataTable';

export default class DataTableFieldFormat extends FieldFormat<DataTable> {
  constructor(name: string) {
    super(name);

    const getDefaultValue = this.getDefaultValue.bind(this);
    const validator = new (class DataTableFieldValidator extends AbstractFieldValidator<DataTable> {
      validate(context: Context<any, any> | null, contextManager: ContextManager<Context<any, any>> | null, caller: CallerController | null, value: any): any {
        const def = getDefaultValue();

        if (def == null || def.getFieldCount() == 0) {
          return value;
        }

        const dt: DataTable = value;

        if (dt == null) {
          return null;
        }

        const msg: string | null = dt.getFormat().extendMessage(def.getFormat());
        if (msg != null) {
          const newValue: DataTable = def.clone();
          DataTableReplication.copy(dt, newValue, true, true, true);
          value = newValue;
        }

        return value;
      }
    })();
    this.addValidator(validator);
  }

  public valueToString(value: DataTable, settings: ClassicEncodingSettings): string | null {
    if (value == null) {
      return null;
    }

    const oldEncodeFormat: boolean | null = settings != null ? settings.isEncodeFormat() : null;

    try {
      if (settings != null && (this.getDefaultValue() == null || (this.getDefaultValue() as DataTable).getFieldCount() == 0 || !Util.equals((this.getDefaultValue() as DataTable).getFormat(), value.getFormat()))) {
        settings.setEncodeFormat(true);
      }

      const res: StringBuilder | null = value.encode(new StringBuilder(), settings, false, 0);
      return res !== null ? res.toString() : null;
    } finally {
      if (oldEncodeFormat != null) {
        settings.setEncodeFormat(oldEncodeFormat);
      }
    }
  }

  public getType(): string {
    return FieldConstants.DATATABLE_FIELD;
  }

  public getNotNullDefault(): DataTable {
    return DataTableFactory.of();
  }

  public makeImmutable(): void {
    super.makeImmutable();

    const defaultValue: DataTable | null = this.getDefaultValue();

    if (defaultValue !== null) {
      defaultValue.makeImmutable();
    }
  }

  public valueFromEncodedString(source: string, settings: ClassicEncodingSettings, validate: boolean): DataTable | null {
    // Copied from the FieldFormat and enhanced to support compatibility with version 5.41 (because a nicer idea of substituting transferEncoding on the fly is not thread safe)

    const nullElement: string = settings.isUseVisibleSeparators() ? DataTableUtils.DATA_TABLE_VISIBLE_NULL : DataTableUtils.DATA_TABLE_NULL;
    const sourceIsNull: boolean = source === nullElement;
    const compatibilityTransferEncode: boolean = ProtocolVersion.V3 === settings.getProtocolVersion() || ProtocolVersion.V2 === settings.getProtocolVersion();
    return sourceIsNull ? null : this.valueFromString(compatibilityTransferEncode ? DataTableUtils.transferDecode(source) : source, settings, validate);
  }

  valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): DataTable | null {
    const defaultValue: DataTable | null = this.getDefaultValue();
    let tempEncodeFieldNames: boolean,
      oldFormat: TableFormat | null = null;
    if (settings != null) {
      oldFormat = settings.getFormat();
      if (defaultValue != null) {
        settings.setFormat(defaultValue.getFormat());
      }
      tempEncodeFieldNames = settings.isEncodeFieldNames();
    } else {
      settings = new ClassicEncodingSettings(ExpressionUtils.useVisibleSeparators(value));
      tempEncodeFieldNames = false;
    }

    try {
      let res: DataTable | null = null;
      if (value != null) {
        const elements: ElementList = StringUtils.elements(value, settings.isUseVisibleSeparators());
        // TODO ProxyDataTable not implemented yet
        // const containsID: boolean = !!elements.getElements().map(element => element.getName()).find(el => el === AbstractDataTable.ELEMENT_ID);
        // res = containsID ? new ProxyDataTable(elements, settings, validate, null) : new SimpleDataTable(elements, settings, validate);
        res = DataTableFactory.createAndDecode(elements, settings, validate);
      }

      if (defaultValue != null && defaultValue.getFieldCount() > 0 && !(res !== null && res.getFormat().extend(defaultValue.getFormat()))) {
        const newRes: DataTable = (this.getDefaultValue() as DataTable).clone();

        if (res != null) DataTableReplication.copy(res, newRes, true, true, true);

        res = newRes;
      }

      if (res != null && validate) {
        res.validate(null, null);
      }

      return res;
    } finally {
      settings.setFormat(oldFormat);
      if (tempEncodeFieldNames) {
        settings.setEncodeFieldNames(true);
      }
    }
  }

  public valueToEncodedString(value: DataTable, settings: ClassicEncodingSettings, sb: StringBuilder = new StringBuilder(), encodeLevel = 1): StringBuilder | null {
    const strVal: string | null = this.valueToString(value, settings);

    if (strVal == null) {
      return sb.append(settings == null || !settings.isUseVisibleSeparators() ? DataTableUtils.DATA_TABLE_NULL : DataTableUtils.DATA_TABLE_VISIBLE_NULL);
    }

    if (settings != null) {
      const compatibilityTransferEncode: boolean = ProtocolVersion.V3 === settings.getProtocolVersion() || ProtocolVersion.V2 === settings.getProtocolVersion();
      if (compatibilityTransferEncode) {
        return TransferEncodingHelper.encode(strVal, sb, encodeLevel);
      }
    }

    return sb.append(strVal);
  }

  public static encodeEditorOptions(showTableData: boolean): string {
    return showTableData ? '1' : '0';
  }

  public isAssignableFrom(value: any): boolean {
    return value instanceof AbstractDataTable;
  }
}
