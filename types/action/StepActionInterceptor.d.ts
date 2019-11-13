import GenericActionResponse from './GenericActionResponse';
export default interface StepActionInterceptor {
    interceptActionResponse(actionResponse: GenericActionResponse): void;
    afterLastStep(): void;
}
