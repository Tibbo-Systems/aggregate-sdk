import AbstractEntityDefinition from '../context/AbstractEntityDefinition';
import ActionDefinition from './ActionDefinition';
import ActionCommandList from './ActionCommandList';
import TreeMask from './TreeMask';
import GroupIdentifier from './GroupIdentifier';
import Permissions from '../security/Permissions';
import ActionCommand from './ActionCommand';
import StringIdentifier from './StringIdentifier';
import ContextUtilsConstants from '../context/ContextUtilsConstants';

export default class BasicActionDefinition extends AbstractEntityDefinition
  implements ActionDefinition, ActionCommandList {
  //TODO Java PropertyChangeSupport
  // private propertyChangeListeners: PropertyChangeSupport = new PropertyChangeSupport(this);

  //TODO using Class in Java
  private actionClass: any = null;
  private enabled: boolean = true;
  private _isDefault: boolean = false;
  private hidden: boolean = false;
  private executionGroup: GroupIdentifier | null = null;
  private dropSources: Array<TreeMask> | null = null;
  private commandList: Array<ActionCommand> | null = null;
  private concurrent: boolean = true;

  constructor(name: string) {
    super();
    super.setName(name);
  }

  compareTo(o: any): number {
    return 0;
  }

  getCommands(): Array<ActionCommand> | null {
    return this.commandList;
  }

  getDropSources(): Array<TreeMask> | null {
    if (this.dropSources) {
      return this.dropSources;
    }
    return null;
  }

  getPermissions(): Permissions | null {
    return null;
  }

  isConcurrent(): boolean {
    return this.concurrent;
  }

  isDefault(): boolean {
    return this._isDefault;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  isHeadless(): boolean {
    return false;
  }

  isHidden(): boolean {
    return this.hidden;
  }

  getExecutionGroup(): StringIdentifier | null {
    return this.executionGroup;
  }

  setDefault(isDefault: boolean): void {
    const oldIsDefault: boolean = this.isDefault();
    //    TODO not implemented. using propertyChangeListeners
  }

  setEnabled(enabled: boolean): void {
    //    TODO not implemented. using propertyChangeListeners
  }

  setDropSources(dropSources: Array<TreeMask>) {
    //    TODO not implemented. using propertyChangeListeners
  }

  setHidden(hidden: boolean) {
    //    TODO not implemented. using propertyChangeListeners
  }

  setExecutionGroup(groupIdentifier: GroupIdentifier) {
    //    TODO not implemented. using propertyChangeListeners
  }

  getAccelerator(): any {
    //    TODO not use KeyStroke from Java
  }

  public setActionClass(actionClass: any | null) {
    this.actionClass = actionClass;
  }

  // TODO Use Action type
  public instantiate(): any {
    if (this.actionClass == null) {
      throw new Error('Redirection to actions of proxy contexts is not supported');
    }
    let action: any = null;

    try {
      action = this.actionClass.newInstance();
    } catch (error) {
      throw new Error(error);
    }
    return action;
  }

  // TODO implement ReentrantLock

  public getEntityType(): number {
    return ContextUtilsConstants.ENTITY_ACTION;
  }
}
