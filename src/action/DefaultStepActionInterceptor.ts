import StepActionInterceptor from './StepActionInterceptor';
import GenericActionResponse from './GenericActionResponse';

export default class DefaultStepActionInterceptor implements StepActionInterceptor {
  public interceptActionResponse(actionResponse: GenericActionResponse): void {}

  public afterLastStep(): void {}
}
