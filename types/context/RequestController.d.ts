import Evaluator from '../expression/Evaluator';
export default interface RequestController {
    getOriginator(): any;
    getLockTimeout(): number;
    getEvaluator(): Evaluator | null;
    getQueue(): string | null;
    isReplyRequired(): boolean;
}
