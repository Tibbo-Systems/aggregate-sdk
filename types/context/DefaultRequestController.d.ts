import RequestController from './RequestController';
import Evaluator from '../expression/Evaluator';
export default class DefaultRequestController implements RequestController {
    private originator;
    private lockTimeout;
    private evaluator;
    private queue;
    private replyRequired;
    constructor(evaluator?: Evaluator | null);
    getOriginator(): any;
    setOriginator(originator: any): void;
    getLockTimeout(): number;
    setLockTimeout(lockTimeout: number): void;
    getEvaluator(): Evaluator | null;
    setEvaluator(evaluator: Evaluator): void;
    getQueue(): string | null;
    isReplyRequired(): boolean;
    setReplyRequired(replyRequired: boolean): void;
}
