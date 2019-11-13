import BindingProcessor from '../binding/BindingProcessor';
import Evaluator from '../expression/Evaluator';
//TODO DefaultBindingProcessor
/*
export default class DefaultBindingProcessor implements BindingProcessor {

    private readonly provider: BindingProvider;
    private readonly evaluator: Evaluator;
    private executionService: ExecutorService;
    private disableStartupConcurrency: boolean;
    private stopped: boolean;
    private bindingProcessorLatch: CountDownLatch;

    constructor(provider: BindingProvider, evaluator: Evaluator)
    {
        this.provider = provider;
        this.evaluator = evaluator;
        this.bindingProcessorLatch = new CountDownLatch(1);
    }


    public start(): boolean
    {
        this.startproc(executionService != null && !disableStartupConcurrency);

        return !this.stopped;
    }

    protected startproc(): void
    {

    }


}*/
