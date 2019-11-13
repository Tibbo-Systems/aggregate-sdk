import RequestController from './RequestController';
import Evaluator from '../expression/Evaluator';

export default class DefaultRequestController implements RequestController {
  private originator: any;

  private lockTimeout: number = 0;

  private evaluator: Evaluator | null;

  private queue: string | null = null;

  private replyRequired: boolean = true;

  constructor(evaluator: Evaluator | null = null) {
    this.evaluator = evaluator;
  }

  public getOriginator(): any {
    return this.originator;
  }

  public setOriginator(originator: any) {
    this.originator = originator;
  }

  public getLockTimeout(): number {
    return this.lockTimeout;
  }

  public setLockTimeout(lockTimeout: number) {
    this.lockTimeout = lockTimeout;
  }

  public getEvaluator(): Evaluator | null {
    return this.evaluator;
  }

  public setEvaluator(evaluator: Evaluator) {
    this.evaluator = evaluator;
  }

  public getQueue(): string | null {
    return this.queue;
  }

  public isReplyRequired(): boolean {
    return this.replyRequired;
  }

  public setReplyRequired(replyRequired: boolean) {
    this.replyRequired = replyRequired;
  }
}
