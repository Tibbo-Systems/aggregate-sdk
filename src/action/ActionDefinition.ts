import EntityDefinition from '../context/EntityDefinition';
import Permissions from '../security/Permissions';
import TreeMask from './TreeMask';
import Action from './Action';
import InitialRequest from './InitialRequest';
import ActionCommand from './ActionCommand';
import ActionResponse from './ActionResponse';

export default interface ActionDefinition extends EntityDefinition {
  /**
   * Returns true if action execution is allowed.
   * @return {boolean}
   */
  isEnabled(): boolean;

  /**
   * Enables/disables action.
   * @param {boolean} enabled
   */
  setEnabled(enabled: boolean): void;

  /**
   * Returns true if action is a default action in context.
   * @return {boolean}
   */
  isDefault(): boolean;

  /**
   * Sets default flag for the action.
   * @param {boolean} b
   */
  setDefault(b: boolean): void;

  /**
   * Returns true if action supports non-interactive execution.
   * @return {boolean}
   */
  isHeadless(): boolean;

  /**
   * Returns true if action is hidden.
   * @return {boolean}
   */
  isHidden(): boolean;

  /**
   * Returns key stroke used to initiate the action in any UI.
   * @return {com.tibbo.aggregate.common.action.KeyStroke}
   */

  //getAccelerator() : KeyStroke;

  /**
   * Returns the drop source context masks.
   * @return {*[]}
   */
  getDropSources(): Array<TreeMask> | null;

  /**
   * Returns permissions required to execute action.
   * @return {com.tibbo.aggregate.common.security.Permissions}
   */
  getPermissions(): Permissions | null;

  /**
   * Some category of actions may be applied to groups of objects. To make system know what actions to group the definition has an execution group. If action can't be grouped, execution group should
   * be null.
   * @return {com.tibbo.aggregate.common.action.GroupIdentifier}
   */
  //getExecutionGroup() : GroupIdentifier;

  /**
   * Creates and return an instance of the action
   * @return {*}
   */

  instantiate(): Action<InitialRequest, ActionCommand, ActionResponse>;

  /**
   * If false, parallel execution of several action instances is not allowed
   * @return {boolean}
   */
  isConcurrent(): boolean;

  compareTo(o: any): number;

  /**
   * Returns the execution lock
   * @return {java.util.concurrent.locks.ReentrantLock}
   */
  // getExecutionLock() : java.util.concurrent.locks.ReentrantLock;
  getAccelerator(): any;

  getExecutionGroup(): any;
}
