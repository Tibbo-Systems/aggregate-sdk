import DataTable from '../datatable/DataTable';
import AbstractReferenceResolver from './AbstractReferenceResolver';
import Reference from './Reference';
import EvaluationEnvironment from './EvaluationEnvironment';
import JObject from '../util/java/JObject';

export default class DefaultReferenceResolver extends AbstractReferenceResolver {
  public static readonly SELECTION_VALUE_DESCRIPTION: string = 'svdesc';
  public static readonly ROW: string = 'row';

  constructor(defaultTable?: DataTable) {
    super();
    if (defaultTable) this.setDefaultTable(defaultTable);
  }

  //TODO not-implemented
  resolveReference(ref: Reference, environment: EvaluationEnvironment): any {
    return new JObject();
  }
}
