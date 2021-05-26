import StringBuilder from '../util/java/StringBuilder';
import Context from './Context';
import Contexts from './Contexts';
import StringUtils from '../util/StringUtils';
import ContextManager from './ContextManager';
import CallerController from './CallerController';
import ContextUtilsConstants from './ContextUtilsConstants';

export default class ContextUtils {
  public static readonly ENTITY_ANY_TYPE = 0;
  public static readonly ENTITY_VARIABLE = 1;
  public static readonly ENTITY_FUNCTION = 2;
  public static readonly ENTITY_EVENT = 4;
  public static readonly ENTITY_ACTION = 8;
  public static readonly ENTITY_INSTANCE = 100;

  static userContextPath(username: string): string {
    return ContextUtils.createName(Contexts.CTX_USERS, username);
  }

  static deviceServersContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_DEVICESERVERS);
  }

  static dsGroupsContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_DSGROUPS);
  }

  static deviceGroupsContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_DEVGROUPS);
  }

  static groupContextPath(username: string, containerContextName: string, name: string): string {
    return this.createName(this.groupsContextPath(username, containerContextName), name);
  }

  static groupsContextPath(username: string, containerContextName: string): string {
    return this.createName(this.userContextPath(username), this.groupsContextName(containerContextName));
  }

  static groupsContextName(containerContextName: string) {
    return containerContextName + '_' + Contexts.CTX_GROUPS;
  }

  static alertContextPath(owner: string, name: string): string {
    return this.createName(this.alertsContextPath(owner), name);
  }

  static alertsContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_ALERTS);
  }

  static jobsContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_JOBS);
  }

  static queriesContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_QUERIES);
  }

  static queryContextPath(owner: string, name: string): string {
    return this.createName(this.queriesContextPath(owner), name);
  }

  static compliancePoliciesContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_COMPLIANCE_POLICIES);
  }

  static reportsContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_REPORTS);
  }

  static trackersContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_TRACKERS);
  }

  static commonDataContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_COMMON_DATA);
  }

  static eventFiltersContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_EVENT_FILTERS);
  }

  static widgetsContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_WIDGETS);
  }

  static machineLearningContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_MACHINE_LEARNING);
  }

  static dashboardsContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_DASHBOARDS);
  }

  static autorunActionsContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_AUTORUN);
  }

  static favouritesContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_FAVOURITES);
  }

  static scriptsContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_SCRIPTS);
  }

  static modelsContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_MODELS);
  }

  static eventCorrelatorsContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_EVENT_CORRELATORS);
  }

  static eventCorrelatorContextPath(owner: string, name: string): string {
    return this.createName(this.eventCorrelatorsContextPath(owner), name);
  }

  static classesContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_CLASSES);
  }

  static workflowsContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_WORKFLOWS);
  }

  static pluginGlobalConfigContextPath(pluginId: string): string {
    return this.createName(Contexts.CTX_PLUGINS_CONFIG, this.pluginIdToContextName(pluginId));
  }

  static pluginUserConfigContextPath(username: string, pluginId: string): string {
    return this.createName(this.userContextPath(username), Contexts.CTX_PLUGINS_CONFIG, this.pluginIdToContextName(pluginId));
  }

  static devicesContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_DEVICES);
  }

  static deviceContextPath(owner: string, device: string): string {
    return this.createName(this.devicesContextPath(owner), device);
  }

  static applicationsContextPath(owner: string): string {
    return this.createName(this.userContextPath(owner), Contexts.CTX_APPLICATIONS);
  }

  static createName(...parts: Array<string>): string {
    const res = new StringBuilder();

    for (let i = 0; i < parts.length; i++) {
      if (i > 0) {
        res.append(ContextUtilsConstants.CONTEXT_NAME_SEPARATOR);
      }

      res.append(parts[i]);
    }

    return res.toString();
  }

  static createGroup(...parts: Array<string>): string {
    const res = new StringBuilder();

    for (let i = 0; i < parts.length; i++) {
      if (i == parts.length - 1 && parts[i] == null) {
        break;
      }

      if (i > 0) {
        res.append(ContextUtilsConstants.ENTITY_GROUP_SEPARATOR);
      }

      res.append(parts[i]);
    }

    return res.toString();
  }

  static pluginIdToContextName(pluginId: string): string {
    return pluginId.replace(/\./g, '_').replace(/\-/g, '');
  }

  static matchesToMask(mask: string, context: string, contextMayExtendMask = false, maskMayExtendContext = false): boolean {
    if (mask == null || context == null) {
      return true;
    }

    if (!this.isMask(mask)) {
      if (contextMayExtendMask && maskMayExtendContext) {
        const length: number = Math.min(mask.length, context.length);
        return mask.substring(0, length) === context.substring(0, length);
      } else {
        const equals: boolean = mask === context;

        if (maskMayExtendContext) {
          return equals || (mask.length > context.length && mask.startsWith(context) && mask.charAt(context.length) == ContextUtilsConstants.CONTEXT_NAME_SEPARATOR.charAt(0));
        } else if (contextMayExtendMask) {
          return equals || (context.length > mask.length && context.startsWith(mask) && context.charAt(mask.length) == ContextUtilsConstants.CONTEXT_NAME_SEPARATOR.charAt(0));
        } else {
          return equals;
        }
      }
    }

    const maskParts: Array<string> = StringUtils.split(mask, ContextUtilsConstants.CONTEXT_NAME_SEPARATOR.charAt(0));
    const nameParts: Array<string> = StringUtils.split(context, ContextUtilsConstants.CONTEXT_NAME_SEPARATOR.charAt(0));

    if (maskParts.length > nameParts.length && !maskMayExtendContext) {
      return false;
    }

    if (maskParts.length < nameParts.length && !contextMayExtendMask) {
      return false;
    }

    for (let i = 0; i < Math.min(maskParts.length, nameParts.length); i++) {
      if (maskParts[i] === ContextUtilsConstants.CONTEXT_GROUP_MASK && nameParts[i] !== ContextUtilsConstants.CONTEXT_GROUP_MASK) {
        continue;
      } else {
        if (maskParts[i] !== nameParts[i]) {
          return false;
        }
      }
    }

    return true;
  }

  static isMask(name: string): boolean {
    if (name == null) {
      return false;
    }
    return name.indexOf(ContextUtilsConstants.CONTEXT_GROUP_MASK.charAt(0)) > -1;
  }

  static async expandMaskListToContexts(masks: string, contextManager: ContextManager<any>, useVisibleChildren = false, caller?: CallerController): Promise<Array<Context<any, any>>> {
    const result: Array<Context<any, any>> = [];
    const maskList: Array<string> = StringUtils.split(masks, ContextUtilsConstants.MASK_LIST_SEPARATOR.charAt(0));

    for (const mask of maskList) {
      const contexts: Array<Context<any, any>> = await this.expandMaskToContexts(mask, contextManager, useVisibleChildren, caller);
      result.push(...contexts);
    }

    return result;
  }

  static async expandMaskToContexts(mask: string, contextManager: ContextManager<any>, useVisibleChildren = false, caller?: CallerController): Promise<Array<Context<any, any>>> {
    const res: Array<Context<any, any>> = [];
    const paths: Array<string> = await this.expandMaskToPaths(mask, contextManager, useVisibleChildren, caller);

    for (const path of paths) {
      const con: Context<any, any> = await contextManager.get(path, caller);
      if (con != null) {
        res.push(con);
      }
    }

    return res;
  }

  static async expandMaskToPaths(mask: string, contextManager: ContextManager<any>, useVisibleChildren = false, caller?: CallerController): Promise<Array<string>> {
    const result: Array<string> = new Array<string>();
    const parts: Array<string> = StringUtils.split(mask, ContextUtilsConstants.CONTEXT_NAME_SEPARATOR.charAt(0));
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === ContextUtilsConstants.CONTEXT_GROUP_MASK) {
        const head: StringBuilder = new StringBuilder();
        const tail: StringBuilder = new StringBuilder();
        for (let j = 0; j < i; j++) {
          if (j > 0) {
            head.append(ContextUtilsConstants.CONTEXT_NAME_SEPARATOR);
          }
          head.append(parts[j]);
        }

        for (let j = i + 1; j < parts.length; j++) {
          tail.append(ContextUtilsConstants.CONTEXT_NAME_SEPARATOR);
          tail.append(parts[j]);
        }

        const res: Array<string> = await this.expandMaskPart(head.toString(), tail.toString(), contextManager, useVisibleChildren, caller);
        return [...result, ...res];
      }
    }
    if (contextManager.get(mask, caller) != null) {
      result.push(mask);
    }
    return result;
  }

  static async expandMaskPart(head: string, tail: string, contextManager: ContextManager<any>, useVisibleChildren: boolean, caller?: CallerController): Promise<Array<string>> {
    // logger.debug("Expanding context mask part '" + head + " * " + tail + "'");
    const result: Array<string> = new Array<string>();
    const con: Context<any, any> = await contextManager.get(head, caller);

    if (con == null) {
      return result;
    }

    if (con.isMapped()) {
      const mappedChildren: Array<Context<any, any>> = await con.getMappedChildren(caller);
      for (const child of mappedChildren) {
        result.push(child.getPath());
      }
    } else {
      const children: Array<Context<any, any>> = useVisibleChildren ? await con.getVisibleChildren(caller) : await con.getChildren(caller);
      for (const child of children) {
        if (useVisibleChildren) {
          const realChild: Context<any, any> | null = await con.getChild(child.getName());

          if (realChild == null || realChild.getPath() !== child.getPath()) {
            const res: Array<string> = await this.expandMaskToPaths(child.getPath() + tail, contextManager, useVisibleChildren, caller);
            result.push(...res);
            continue;
          }
        }

        result.push(...(await this.expandMaskToPaths(head + ContextUtilsConstants.CONTEXT_NAME_SEPARATOR + child.getName() + tail, contextManager, useVisibleChildren, caller)));
      }
    }

    return result;
  }

  static isRelative(name: string): boolean {
    return name.startsWith(ContextUtilsConstants.CONTEXT_NAME_SEPARATOR);
  }

  // TODO implement StringTokenizer class
  // static isDerivedFrom(childType: string, parentType: string): boolean {
  //     // StringTokenizer
  //     const pst: any = new StringTokenizer(parentType, ContextUtilsConstants.CONTEXT_TYPE_SEPARATOR);
  //     const cst: any = new StringTokenizer(childType, ContextUtilsConstants.CONTEXT_TYPE_SEPARATOR);
  //     if (cst.countTokens() < pst.countTokens()) {
  //         return false;
  //     }
  //     while (pst.hasMoreTokens()) {
  //         if (pst.nextToken() !== cst.nextToken()) {
  //             return false;
  //         }
  //     }
  //     return true;
  // }

  /**
   * Returns base group name. Useful for composite group names that contain several group names delimited with group separator symbol.
   */
  static getBaseGroup(group: string | null): string | null {
    if (group == null) {
      return null;
    }

    const index: number = group.indexOf(ContextUtilsConstants.ENTITY_GROUP_SEPARATOR.charAt(0));
    return index == -1 ? group : group.substring(0, index);
  }

  static getVisualGroup(group: string): string | null {
    if (group == null) {
      return null;
    }

    const index: number = group.indexOf(ContextUtilsConstants.ENTITY_GROUP_SEPARATOR.charAt(0));
    return index == -1 ? null : group.substring(index + 1, group.length);
  }
  //TODO implement CLASS type
  // static getTypeForClass(clazz: Object): string {
  //     const name: string = clazz.getSimpleName();
  //     return this.getTypeForClassSimpleName(name);
  // }

  //TODO Locale.ENGLISH
  static getTypeForClassSimpleName(nameString: string) {
    let name = nameString.substring(0, 1).toLowerCase() + nameString.substring(1, nameString.length);
    if (name.endsWith(ContextUtilsConstants.CONTEXT_CLASS_SUFFIX)) {
      name = nameString.substring(0, nameString.length - ContextUtilsConstants.CONTEXT_CLASS_SUFFIX.length);
    }
    return name;
  }

  static isValidContextNameChar(c: string): boolean {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c == '_';
  }

  static getGroupName(entityName: string): string | null {
    if (entityName == null) {
      return null;
    }
    if (entityName.endsWith(ContextUtilsConstants.ENTITY_GROUP_SUFFIX)) {
      const group: string = entityName.substring(0, entityName.length - ContextUtilsConstants.ENTITY_GROUP_SUFFIX.length);
      return group;
    }
    return null;
  }

  static isValidContextName(name: string | null) {
    if (name == null) {
      return false;
    }
    return name.match(ContextUtilsConstants.CONTEXT_NAME_PATTERN) != null;
  }

  static isValidContextType(s: string) {
    return ContextUtilsConstants.CONTEXT_TYPE_ANY === s || s.match(ContextUtilsConstants.CONTEXT_TYPE_PATTERN) != null;
  }

  // TODO Class implementation
  // public static getTypeForClass(clazz: Class): string {
  //     const name: string = clazz.name;
  //     return this.getTypeForClassSimpleName(name);
  // }
}
