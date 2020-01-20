import JConstants from '../util/java/JConstants';
import Contexts from './Contexts';
import ContextUtils from './ContextUtils';

export default class ContextSortingHelper {
  private static readonly MAX_INDEX = JConstants.INTEGER_MAX_VALUE / 2;

  // Step between context index values
  private static readonly MULTIPLICATOR = 100;

  private static CONTEXTS_ORDER: Array<string> = [];

  public static _initiliaze() {
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_DEVICES);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_DEVGROUPS);
    // --------------------------------
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_USERS);
    // --------------------------------
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_ALERTS);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_EVENT_FILTERS);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_MODELS);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_CLASSES);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_QUERIES);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_JOBS);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_WORKFLOWS);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_MACHINE_LEARNING);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_SCRIPTS);
    // --------------------------------
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_WIDGETS);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_PROCESS_CONTROL);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_DASHBOARDS);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_REPORTS);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_APPLICATIONS);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_TRACKERS);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_FAVOURITES);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_AUTORUN);
    // --------------------------------
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_PLUGINS_CONFIG);
    // --------------------------------
    ContextSortingHelper.CONTEXTS_ORDER.push('ipsla');
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_COMPLIANCE_POLICIES);
    // --------------------------------
    ContextSortingHelper.CONTEXTS_ORDER.push('organizations');
    ContextSortingHelper.CONTEXTS_ORDER.push('cardholders');
    ContextSortingHelper.CONTEXTS_ORDER.push('shifts');
    ContextSortingHelper.CONTEXTS_ORDER.push('timezones');
    ContextSortingHelper.CONTEXTS_ORDER.push('accessPolicies');
    // --------------------------------
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_DEVICESERVERS);
    // --------------------------------
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_COMMON_DATA); // Hide
    // --------------------------------
    // --------------------------------
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_ADMINISTRATION);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_CONFIG);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_DEBUG);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_EVENTS);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_SCHEDULER);
    ContextSortingHelper.CONTEXTS_ORDER.push(Contexts.CTX_UTILITIES);
  }

  public static getIndex(context: string): number | null {
    if (ContextSortingHelper.CONTEXTS_ORDER.indexOf(context) == -1) {
      const groupsSuffix = ContextUtils.groupsContextName('');
      if (context.endsWith(groupsSuffix)) return ContextSortingHelper.getIndex(context.replace(groupsSuffix, ''));

      return null;
    }

    return ContextSortingHelper.MAX_INDEX - ContextSortingHelper.CONTEXTS_ORDER.indexOf(context) * ContextSortingHelper.MULTIPLICATOR;
  }
}
