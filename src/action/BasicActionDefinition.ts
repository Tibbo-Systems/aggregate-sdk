import AbstractEntityDefinition from '../context/AbstractEntityDefinition';
import ActionDefinition from './ActionDefinition';
import ActionCommandList from './ActionCommandList';
import TreeMask from './TreeMask';
import GroupIdentifier from './GroupIdentifier';
import Permissions from '../security/Permissions';
import ActionCommand from './ActionCommand';
import StringIdentifier from './StringIdentifier';
import ContextUtilsConstants from '../context/ContextUtilsConstants';

export default class BasicActionDefinition extends AbstractEntityDefinition implements ActionDefinition, ActionCommandList {
  private static readonly GROUP_ID_SEPARATOR = '/';
  private static readonly PROPERTY_NAME = 'name';
  private static readonly PROPERTY_DESCRIPTION = 'description';
  private static readonly PROPERTY_DROP_SOURCES = 'dropSources';
  private static readonly PROPERTY_HELP = 'help';
  private static readonly PROPERTY_ACCELERATOR = 'accelerator';
  private static readonly PROPERTY_HIDDEN = 'hidden';
  private static readonly PROPERTY_ENABLED = 'enabled';
  private static readonly PROPERTY_GROUP_ID = 'groupId';
  private static readonly PROPERTY_ICON_ID = 'iconId';
  private static readonly PROPERTY_DEFAULT = 'default';

  private enabled = true;
  private default = false;
  private hidden = false;
  private actionClass: any | null = null;
  private executionGroup: GroupIdentifier | null = null;
  private dropSources: Array<TreeMask> | null = null;
  private commandList: Array<ActionCommand> | null = null;
  private concurrent = true;
  private accelerator: string | null = null;

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
    return this.default;
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
    this.default = isDefault;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  setDropSources(dropSources: Array<TreeMask>) {
    this.dropSources = dropSources;
  }

  setHidden(hidden: boolean) {
    this.hidden = hidden;
  }

  setExecutionGroup(groupIdentifier: GroupIdentifier) {
    this.executionGroup = groupIdentifier;
  }

  getAccelerator(): string | null {
    return this.accelerator;
  }

  setAccelerator(accelerator: string): void {
    this.accelerator = accelerator;
  }

  public setActionClass(actionClass: any | null) {
    this.actionClass = actionClass;
  }

  // TODO Use Action type
  public instantiate(): any {
    if (this.actionClass == null) {
      throw new Error('Redirection to actions of proxy contexts is not supported');
    }
    let action = null;

    try {
      action = this.actionClass.newInstance();
    } catch (error) {
      throw new Error(error);
    }
    return action;
  }

  public getEntityType(): number {
    return ContextUtilsConstants.ENTITY_ACTION;
  }
}
