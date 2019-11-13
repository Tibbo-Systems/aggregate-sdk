import ActionDefinition from './ActionDefinition';
import ActionLocator from './ActionLocator';

export default interface ActionDirectory<L extends ActionLocator> {
  getActionDefinition(locator: L): ActionDefinition;
}
