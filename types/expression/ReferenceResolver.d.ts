import DataTable from '../datatable/DataTable';
import Reference from './Reference';
import EvaluationEnvironment from './EvaluationEnvironment';
import ContextManager from '../context/ContextManager';
import Context from '../context/Context';
import CallerController from '../context/CallerController';
import Evaluator from './Evaluator';
export default interface ReferenceResolver {
    setDefaultTable(defaultTable: DataTable | null): void;
    resolveReference(ref: Reference, environment: EvaluationEnvironment): Promise<any>;
    setContextManager(cm: ContextManager<any>): void;
    getContextManager(): ContextManager<any> | null;
    getDefaultTable(): DataTable | null;
    setDefaultContext(defaultContext: Context<any, any>): void;
    getDefaultContext(): Context<any, any> | null;
    setCallerController(callerController?: CallerController): void;
    getCallerController(): CallerController | undefined;
    setEvaluator(evaluator: Evaluator): void;
    getEvaluator(): Evaluator | null;
    setDefaultRow(defaultRow: number | null): void;
    getDefaultRow(): number | null;
}
