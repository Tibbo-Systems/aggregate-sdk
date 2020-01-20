import JObject from '../util/java/JObject';
import Expression from './Expression';
import ContextManager from '../context/ContextManager';
import Context from '../context/Context';
import DataTable from '../datatable/DataTable';
import CallerController from '../context/CallerController';
import ReferenceResolver from './ReferenceResolver';
import EnvironmentReferenceResolver from './EnvironmentReferenceResolver';
import EvaluationEnvironment from './EvaluationEnvironment';
import Function from './functions/Function';
import Tracer from './util/Tracer';
export default class Evaluator extends JObject {
    private static readonly ENVIRONMENT_PREVIOUS;
    private static readonly ENVIRONMENT_COUNT;
    private readonly resolvers;
    private keepPreviousResult;
    private readonly customFunctions;
    private tracer;
    private previousResult;
    private count;
    private setKeepPreviousResult;
    private getKeepPreviousResult;
    private getCount;
    getPreviousResult(): any;
    restorePreviousResult(previousResult: any): void;
    private readonly environmentResolver;
    constructor(cm?: ContextManager<any> | null, defaultContext?: Context<any, any> | null, defaultTable?: DataTable | null, caller?: CallerController | null);
    evaluateToString(expression: Expression | null): string;
    private init;
    setResolver(schema: string, resolver: ReferenceResolver | null): void;
    static createWithResolver(resolver: ReferenceResolver): Evaluator;
    evaluate(expression: Expression | null, environment?: EvaluationEnvironment, attributed?: boolean): any;
    evaluateToBoolean(prefilter: Expression): boolean;
    getEnvironmentResolver(): EnvironmentReferenceResolver;
    evaluateToDataTable(expression: Expression): DataTable;
    setDefaultTable(data: DataTable | null): void;
    getDefaultResolver(): ReferenceResolver;
    getResolvers(): Map<string | null, ReferenceResolver | null>;
    evaluateToBooleanOrNull(expression: Expression): boolean | null;
    getCustomFunction(functionName: string): Function | undefined;
    getTracer(): Tracer | null;
    registerCustomFunction(name: string, impl: Function): void;
}
