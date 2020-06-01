import AbstractEntityDefinition from './AbstractEntityDefinition';
import TableFormat from '../datatable/TableFormat';
import Comparable from '../util/java/Comparable';
import Context from './Context';
import CallerController from './CallerController';
import RequestController from './RequestController';
import DataTable from '../datatable/DataTable';
import Util from '../util/Util';
import JObject from '../util/java/JObject';
import Permissions from '../security/Permissions';
import ContextUtilsConstants from './ContextUtilsConstants';

export default class FunctionDefinition extends AbstractEntityDefinition implements Comparable<FunctionDefinition> {
  private inputFormat: TableFormat | null = null;
  private outputFormat: TableFormat | null = null;
  private hidden = false;
  private permissions: Permissions | null = null;

  private concurrent = false;

  private implementation: ((con: Context<any, any>, def: FunctionDefinition, parameters: DataTable, caller?: CallerController, request?: RequestController) => DataTable) | null = null;

  constructor(name: string, inputFormat: TableFormat | null, outputFormat: TableFormat | null, description?: string, group?: string) {
    super();
    this.init(name, inputFormat, outputFormat, description, group);
  }

  private init(name: string, inputFormat: TableFormat | null, outputFormat: TableFormat | null, description?: string, group?: string): void {
    this.setName(name);

    this.setInputFormat(inputFormat);
    this.setOutputFormat(outputFormat);

    if (description) this.setDescription(description);
    if (group) this.setGroup(group);
  }

  public getInputFormat(): TableFormat | null {
    return this.inputFormat;
  }

  public getOutputFormat(): TableFormat | null {
    return this.outputFormat;
  }

  public isHidden(): boolean {
    return this.hidden;
  }

  public getPermissions(): Permissions | null {
    return this.permissions;
  }

  public getImplementation(): ((con: Context<any, any>, def: FunctionDefinition, parameters: DataTable, caller?: CallerController, request?: RequestController) => DataTable) | null {
    return this.implementation;
  }

  public setInputFormat(inputFormat: TableFormat | null) {
    if (inputFormat != null) {
      inputFormat.makeImmutable(null);
    }
    this.inputFormat = inputFormat;
  }

  public setOutputFormat(outputFormat: TableFormat | null) {
    if (outputFormat != null) {
      outputFormat.makeImmutable(null);
    }
    this.outputFormat = outputFormat;
  }

  public setHidden(hidden: boolean) {
    this.hidden = hidden;
  }

  public setPermissions(permissions: Permissions) {
    this.permissions = permissions;
  }

  public isConcurrent(): boolean {
    return this.concurrent;
  }

  public setConcurrent(concurrent: boolean) {
    this.concurrent = concurrent;
  }

  public setImplementation(implementation: (con: Context<any, any>, def: FunctionDefinition, parameters: DataTable, caller?: CallerController, request?: RequestController) => DataTable) {
    this.implementation = implementation;
  }

  compareTo(d: FunctionDefinition): number {
    if (this.getIndex() != null || d.getIndex() != null) {
      const my = this.getIndex() != null ? this.getIndex() : 0;
      const other = d.getIndex() != null ? d.getIndex() : 0;
      return Util.compare(other as number, my as number);
    }

    return 0;
  }

  equals(obj: JObject | null): boolean {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    if (!(obj instanceof FunctionDefinition)) {
      return false;
    }
    const other: FunctionDefinition = obj as FunctionDefinition;
    if (this.getDescription() == null) {
      if (other.getDescription() != null) {
        return false;
      }
    } else if (this.getDescription() !== other.getDescription()) {
      return false;
    }
    if (this.getGroup() == null) {
      if (other.getGroup() != null) {
        return false;
      }
    } else if (this.getGroup() !== other.getGroup()) {
      return false;
    }
    if (this.getHelp() == null) {
      if (other.getHelp() != null) {
        return false;
      }
    } else if (this.getHelp() !== other.getHelp()) {
      return false;
    }
    if (this.hidden != other.hidden) {
      return false;
    }
    if (this.getIndex() == null) {
      if (other.getIndex() != null) {
        return false;
      }
    } else if (this.getIndex() !== other.getIndex()) {
      return false;
    }
    if (this.inputFormat == null) {
      if (other.inputFormat != null) {
        return false;
      }
    } else if (!this.inputFormat.equals(other.inputFormat)) {
      return false;
    }
    if (this.getName() == null) {
      if (other.getName() != null) {
        return false;
      }
    } else if (this.getName() !== other.getName()) {
      return false;
    }
    if (this.outputFormat == null) {
      if (other.outputFormat != null) {
        return false;
      }
    } else if (!this.outputFormat.equals(other.outputFormat)) {
      return false;
    }
    if (this.permissions == null) {
      if (other.permissions != null) {
        return false;
      }
    } else if (!this.permissions.equals(other.permissions)) {
      return false;
    }
    return true;
  }

  getEntityType(): number {
    return ContextUtilsConstants.ENTITY_FUNCTION;
  }
}
