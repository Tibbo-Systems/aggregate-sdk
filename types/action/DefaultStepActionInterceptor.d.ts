import StepActionInterceptor from './StepActionInterceptor';
import GenericActionResponse from './GenericActionResponse';
export default class DefaultStepActionInterceptor implements StepActionInterceptor {
    interceptActionResponse(actionResponse: GenericActionResponse): void;
    afterLastStep(): void;
}
