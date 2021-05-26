import Binding from './Binding';
import EvaluationOptions from './EvaluationOptions';
import EvaluationEnvironment from '../expression/EvaluationEnvironment';
import Reference from '../expression/Reference';
import ChangeCache from './ChangeCache';
import AsyncRunnable from '../util/java/AsyncRunnable';
export default interface BindingProcessor {
    start(): Promise<boolean>;
    stop(): void;
    isStopped(): boolean;
    setEnabled(enabled: boolean): void;
    isEnabled(): boolean;
    submit(task: AsyncRunnable, executeInThreadPool: boolean): Promise<void>;
    evaluateBindingExpression(method: number, binding: Binding, options: EvaluationOptions, evaluationEnvironment?: EvaluationEnvironment, cause?: Reference, cache?: ChangeCache): Promise<void>;
}
