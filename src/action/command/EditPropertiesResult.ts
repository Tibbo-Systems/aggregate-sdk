import DefaultActionResult from '../DefaultActionResult';
import GenericActionResponse from '../GenericActionResponse';
import DataTable from '../../datatable/DataTable';
import ActionUtils from '../ActionUtils';
import EditProperties from './EditProperties';
import ActionUtilsConstants from '../ActionUtilsConstants';

export default class EditPropertiesResult extends DefaultActionResult {
  private readonly code: string | null = null;
  private readonly changedProperties: Array<string> | null = null;

  public constructor(code: string, changedProperties: Array<string> = new Array<string>()) {
    super();
    if (changedProperties) {
      this.code = code;
      this.changedProperties = changedProperties;
    }
  }

  public getCode(): string | null {
    return this.code;
  }

  public getChangedProperties(): Array<string> | null {
    return this.changedProperties;
  }

  public static parse(resp: GenericActionResponse): EditPropertiesResult {
    const ps: DataTable | null = resp.getParameters();
    if (ps == null || ps.getRecordCount() === 0) {
      return new EditPropertiesResult(ActionUtilsConstants.RESPONSE_CLOSED);
    }

    const result: string = ps.rec().getString(EditProperties.RF_EDIT_PROPERTIES_RESULT);
    ActionUtils.checkResponseCode(result);
    const savedProperties: Array<string> = new Array<string>();

    for (const rec of ps.rec().getDataTable(EditProperties.RF_EDIT_PROPERTIES_CHANGED_PROPERTIES)) {
      savedProperties.push(rec.getString(EditProperties.FIELD_PROPERTIES_PROPERTY));
    }

    return new EditPropertiesResult(result, savedProperties);
  }
}
