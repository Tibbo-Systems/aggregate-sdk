import DataTable from '../datatable/DataTable';
import AbstractReferenceResolver from './AbstractReferenceResolver';
import Reference from './Reference';
import EvaluationEnvironment from './EvaluationEnvironment';
export default class DefaultReferenceResolver extends AbstractReferenceResolver {
    static readonly SELECTION_VALUE_DESCRIPTION: string;
    static readonly ROW: string;
    constructor(defaultTable?: DataTable);
    resolveReference(ref: Reference, environment: EvaluationEnvironment): any;
}
