/* eslint-disable @typescript-eslint/no-this-alias */
import ContextManager from './ContextManager';
import Context from './Context';
import TableFormat from '../datatable/TableFormat';
import Cres from '../Cres';
import ActionConstants from './ActionConstants';
import VariableDefinition from './VariableDefinition';
import EventDefinition from './EventDefinition';
import FunctionDefinition from './FunctionDefinition';
import DefaultPermissionChecker from '../security/DefaultPermissionChecker';
import EventLevel from '../event/EventLevel';
import Icons from '../util/Icons';
import ContextUtils from './ContextUtils';
import ContextUtilsConstants from './ContextUtilsConstants';
import VariableData from './VariableData';
import EventData from './EventData';
import FunctionData from './FunctionData';
import ActionDefinition from '../action/ActionDefinition';
import PermissionChecker from '../security/PermissionChecker';
import ContextStatus from './ContextStatus';
import DataTable from '../datatable/DataTable';
import NullPermissionChecker from '../security/NullPermissionChecker';
import VariableStatus from './VariableStatus';
import ContextSortingHelper from './ContextSortingHelper';
import Log from '../Log';
import CallerController from './CallerController';
import StringUtils from '../util/StringUtils';
import Util from '../util/Util';
import Contexts from './Contexts';
import DataRecord from '../datatable/DataRecord';
import RequestController from './RequestController';
import MessageFormat from '../util/java/MessageFormat';
import JObject from '../util/java/JObject';
import SimpleDataTable from '../datatable/SimpleDataTable';
import AbstractDataTable from '../datatable/AbstractDataTable';
import FireEventRequestController from '../event/FireEventRequestController';
import Event from '../data/Event';
import Expression from '../expression/Expression';
import Evaluator from '../expression/Evaluator';
import ClassicEncodingSettings from '../datatable/encoding/ClassicEncodingSettings';
import DataTableUtils from '../datatable/DataTableUtils';
import EntityDefinition from './EntityDefinition';
import DefaultContextVisitor from './DefaultContextVisitor';
import Permissions from '../security/Permissions';
import BasicActionDefinition from '../action/BasicActionDefinition';
import TreeMask from '../action/TreeMask';
import GroupIdentifier from '../action/GroupIdentifier';
import CompatibilityConverter from './CompatibilityConverter';
import DataTableReplication from '../datatable/DataTableReplication';
import DataTableConversion from '../datatable/DataTableConversion';
import FireChangeEventRequestController from './FireChangeEventRequestController';
import EventUtils from '../event/EventUtils';
import EventProcessingRule from '../event/EventProcessingRule';
import Enrichment from '../event/Enrichment';
import DataTableFactory from '../datatable/DataTableFactory';
import FieldConstants from '../datatable/field/FieldConstants';
import FieldFormatFactory from '../datatable/FieldFormatFactory';
import DefaultContextEventListener from './DefaultContextEventListener';
import LevelAdapter from '../util/logger/LevelAdapter';

export default abstract class AbstractContext<C extends Context<C, M>, M extends ContextManager<any>> extends JObject implements Context<C, M> {
  static readonly IMPLEMENTATION_METHOD_PREFIX: string = 'callF';

  static readonly SETTER_METHOD_PREFIX: string = 'setV';

  static readonly GETTER_METHOD_PREFIX: string = 'getV';

  public static readonly EXECUTOR_THREADS_PERCENT_FOR_VISITORS: number = 10;

  public static readonly V_INFO: string = 'info';

  public static readonly V_CHILDREN: string = 'children';

  public static readonly V_VARIABLES: string = 'variables';

  public static readonly V_FUNCTIONS: string = 'functions';

  public static readonly V_EVENTS: string = 'events';

  public static readonly V_ACTIONS: string = 'actions';

  public static readonly V_VARIABLE_STATUSES: string = 'variableStatuses';

  public static readonly F_GET_COPY_DATA: string = 'getCopyData';

  public static readonly F_COPY: string = 'copy';

  public static readonly F_COPY_TO_CHILDREN: string = 'copyToChildren';

  public static readonly F_UPDATE_VARIABLE: string = 'updateVariable';

  public static readonly E_INFO: string = 'info';

  public static readonly E_UPDATED: string = 'updated';

  public static readonly E_CHANGE: string = 'change';

  public static readonly E_DESTROYED: string = 'destroyed';

  public static readonly E_INFO_CHANGED: string = 'infoChanged';

  public static readonly E_VARIABLE_ADDED: string = 'variableAdded';

  public static readonly E_VARIABLE_REMOVED: string = 'variableRemoved';

  public static readonly E_FUNCTION_ADDED: string = 'functionAdded';

  public static readonly E_FUNCTION_REMOVED: string = 'functionRemoved';

  public static readonly E_EVENT_ADDED: string = 'eventAdded';

  public static readonly E_EVENT_REMOVED: string = 'eventRemoved';

  public static readonly E_ACTION_ADDED: string = 'actionAdded';

  public static readonly E_ACTION_REMOVED: string = 'actionRemoved';

  public static readonly E_ACTION_STATE_CHANGED: string = 'actionStateChanged';

  public static readonly E_CHILD_REMOVED: string = 'childRemoved';

  public static readonly E_CHILD_ADDED: string = 'childAdded';

  public static readonly E_VARIABLE_STATUS_CHANGED: string = 'variableStatusChanged';

  public static readonly VF_INFO_DESCRIPTION: string = 'description';

  public static readonly VF_INFO_TYPE: string = 'type';

  public static readonly VF_INFO_GROUP: string = 'group';

  public static readonly VF_INFO_ICON: string = 'icon';

  public static readonly VF_INFO_LOCAL_ROOT: string = 'localRoot';

  public static readonly VF_INFO_PEER_ROOT: string = 'peerRoot';

  public static readonly VF_INFO_PEER_PRIMARY_ROOT: string = 'peerPrimaryRoot';

  public static readonly VF_INFO_REMOTE_ROOT: string = 'remoteRoot';

  public static readonly VF_INFO_REMOTE_PATH: string = 'remotePath';

  public static readonly VF_INFO_MAPPED: string = 'mapped';

  public static readonly VF_CHILDREN_NAME: string = 'name';

  public static readonly VF_VARIABLE_STATUSES_COMMENT: string = 'comment';

  public static readonly VF_VARIABLE_STATUSES_STATUS: string = 'status';

  public static readonly VF_VARIABLE_STATUSES_NAME: string = 'name';

  public static readonly FIF_COPY_DATA_RECIPIENTS: string = 'recipients';

  public static readonly FIF_COPY_DATA_GROUP: string = 'group';

  public static readonly FOF_COPY_DATA_NAME: string = 'name';

  public static readonly FOF_COPY_DATA_DESCRIPTION: string = 'description';

  public static readonly FOF_COPY_DATA_REPLICATE: string = 'replicate';

  public static readonly FOF_COPY_DATA_FIELDS: string = 'fields';

  public static readonly FOF_COPY_DATA_VALUE: string = 'value';

  public static readonly FIF_REPLICATE_FIELDS_NAME: string = 'name';

  public static readonly FIF_REPLICATE_FIELDS_DESCRIPTION: string = 'description';

  public static readonly FIF_REPLICATE_FIELDS_REPLICATE: string = 'replicate';

  public static readonly FIF_COPY_DATA_RECIPIENTS_RECIPIENT: string = 'recipient';

  public static readonly EF_INFO_INFO: string = 'info';

  public static readonly EF_EVENT_REMOVED_NAME: string = 'name';

  public static readonly EF_FUNCTION_REMOVED_NAME: string = 'name';

  public static readonly EF_VARIABLE_REMOVED_NAME: string = 'name';

  public static readonly EF_ACTION_REMOVED_NAME: string = 'name';

  public static readonly EF_CHILD_REMOVED_CHILD: string = 'child';

  public static readonly EF_CHILD_ADDED_CHILD: string = 'child';

  static readonly FIELD_REPLICATE_CONTEXT: string = 'context';

  public static readonly FIELD_REPLICATE_VARIABLE: string = 'variable';

  public static readonly FIELD_REPLICATE_SUCCESSFUL: string = 'successful';

  public static readonly FIELD_REPLICATE_ERRORS: string = 'errors';

  public static readonly V_UPDATE_VARIABLE: string = 'variable';

  public static readonly V_UPDATE_VARIABLE_EXPRESSION: string = 'expression';

  public static readonly FIELD_UPDATE_VARIABLE_SUCCESSFUL: string = 'successful';

  public static readonly FIELD_UPDATE_VARIABLE_ERRORS: string = 'errors';

  public static readonly EF_UPDATED_VARIABLE: string = 'variable';

  public static readonly EF_UPDATED_VALUE: string = 'value';

  public static readonly EF_UPDATED_USER: string = 'user';

  public static readonly EF_UPDATED_UPDATE_ORIGINATOR: string = 'updateOriginator';

  public static readonly EF_CHANGE_VARIABLE: string = 'variable';

  public static readonly EF_CHANGE_VALUE: string = 'value';

  public static readonly EF_CHANGE_DATA: string = 'data';

  public static readonly FIELD_VD_NAME: string = 'name';

  public static readonly FIELD_VD_FORMAT: string = 'format';

  public static readonly FIELD_VD_DESCRIPTION: string = 'description';

  public static readonly FIELD_VD_READABLE: string = 'readable';

  public static readonly FIELD_VD_WRITABLE: string = 'writable';

  public static readonly FIELD_VD_HELP: string = 'help';

  public static readonly FIELD_VD_GROUP: string = 'group';

  public static readonly FIELD_VD_ICON_ID: string = 'iconId';

  public static readonly FIELD_VD_HELP_ID: string = 'helpId';

  public static readonly FIELD_VD_CACHE_TIME: string = 'cacheTime';

  public static readonly FIELD_VD_SERVER_CACHING_MODE: string = 'serverCachingMode';

  public static readonly FIELD_FD_NAME: string = 'name';

  public static readonly FIELD_FD_INPUTFORMAT: string = 'inputformat';

  public static readonly FIELD_FD_OUTPUTFORMAT: string = 'outputformat';

  public static readonly FIELD_FD_DESCRIPTION: string = 'description';

  public static readonly FIELD_FD_HELP: string = 'help';

  public static readonly FIELD_FD_GROUP: string = 'group';

  public static readonly FIELD_FD_ICON_ID: string = 'iconId';

  public static readonly FIELD_FD_CONCURRENT: string = 'concurrent';

  public static readonly FIELD_FD_PERMISSIONS: string = 'permissions';

  public static readonly FIELD_ED_NAME: string = 'name';

  public static readonly FIELD_ED_FORMAT: string = 'format';

  public static readonly FIELD_ED_DESCRIPTION: string = 'description';

  public static readonly FIELD_ED_HELP: string = 'help';

  public static readonly FIELD_ED_LEVEL: string = 'level';

  public static readonly FIELD_ED_GROUP: string = 'group';

  public static readonly FIELD_ED_ICON_ID: string = 'iconId';

  private static _init = false;

  public static VARIABLE_DEFINITION_FORMAT: TableFormat = new TableFormat();

  private static __static_initializer_0() {
    AbstractContext.VARIABLE_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_VD_NAME + '><S>');
    AbstractContext.VARIABLE_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_VD_FORMAT + '><S><F=N>');
    AbstractContext.VARIABLE_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_VD_DESCRIPTION + '><S><F=N>');
    AbstractContext.VARIABLE_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_VD_READABLE + '><B>');
    AbstractContext.VARIABLE_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_VD_WRITABLE + '><B>');
    AbstractContext.VARIABLE_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_VD_HELP + '><S><F=N>');
    AbstractContext.VARIABLE_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_VD_GROUP + '><S><F=N>');
    AbstractContext.VARIABLE_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_VD_ICON_ID + '><S><F=N>');
    AbstractContext.VARIABLE_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_VD_HELP_ID + '><S><F=N>');
    AbstractContext.VARIABLE_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_VD_CACHE_TIME + '><L><F=N>');
  }

  public static readonly EF_VARIABLE_ADDED: TableFormat = new TableFormat();

  private static __static_initializer_1() {
    AbstractContext.EF_VARIABLE_ADDED.setMinRecords(1);
    AbstractContext.EF_VARIABLE_ADDED.setMaxRecords(1);
  }

  public static readonly FUNCTION_DEFINITION_FORMAT: TableFormat = new TableFormat();

  private static __static_initializer_2() {
    AbstractContext.FUNCTION_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_FD_NAME + '><S>');
    AbstractContext.FUNCTION_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_FD_INPUTFORMAT + '><S><F=N>');
    AbstractContext.FUNCTION_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_FD_OUTPUTFORMAT + '><S><F=N>');
    AbstractContext.FUNCTION_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_FD_DESCRIPTION + '><S><F=N>');
    AbstractContext.FUNCTION_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_FD_HELP + '><S><F=N>');
    AbstractContext.FUNCTION_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_FD_GROUP + '><S><F=N>');
    AbstractContext.FUNCTION_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_FD_ICON_ID + '><S><F=N>');
    AbstractContext.FUNCTION_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_FD_CONCURRENT + '><B><F=N>');
    AbstractContext.FUNCTION_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_FD_PERMISSIONS + '><S><F=N>');
  }

  public static EF_FUNCTION_ADDED: TableFormat = new TableFormat();

  private static __static_initializer_3() {
    AbstractContext.EF_FUNCTION_ADDED.setMinRecords(1);
    AbstractContext.EF_FUNCTION_ADDED.setMaxRecords(1);
  }

  public static readonly EVENT_DEFINITION_FORMAT: TableFormat = new TableFormat();

  private static __static_initializer_4() {
    AbstractContext.EVENT_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_ED_NAME + '><S>');
    AbstractContext.EVENT_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_ED_FORMAT + '><S><F=N>');
    AbstractContext.EVENT_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_ED_DESCRIPTION + '><S><F=N>');
    AbstractContext.EVENT_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_ED_HELP + '><S><F=N>');
    AbstractContext.EVENT_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_ED_LEVEL + '><I>');
    AbstractContext.EVENT_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_ED_GROUP + '><S><F=N>');
    AbstractContext.EVENT_DEFINITION_FORMAT.addField('<' + AbstractContext.FIELD_ED_ICON_ID + '><S><F=N>');
  }

  public static readonly EF_EVENT_ADDED: TableFormat = new TableFormat();

  private static __static_initializer_5() {
    AbstractContext.EF_EVENT_ADDED.setMinRecords(1);
    AbstractContext.EF_EVENT_ADDED.setMaxRecords(1);
  }

  public static readonly VFT_CHILDREN: TableFormat = FieldFormatFactory.create('<' + AbstractContext.VF_CHILDREN_NAME + '><S>').wrap();

  public static readonly INFO_DEFINITION_FORMAT: TableFormat = new TableFormat(1, 1);

  private static __static_initializer_6() {
    AbstractContext.INFO_DEFINITION_FORMAT.addField('<' + AbstractContext.VF_INFO_DESCRIPTION + '><S><F=N><D=' + Cres.get().getString('description') + '>');
    AbstractContext.INFO_DEFINITION_FORMAT.addField('<' + AbstractContext.VF_INFO_TYPE + '><S><D=' + Cres.get().getString('type') + '>');
    AbstractContext.INFO_DEFINITION_FORMAT.addField('<' + AbstractContext.VF_INFO_GROUP + '><S><F=N><D=' + Cres.get().getString('group') + '>');
    AbstractContext.INFO_DEFINITION_FORMAT.addField('<' + AbstractContext.VF_INFO_ICON + '><S><F=N><D=' + Cres.get().getString('conIconId') + '>');
    AbstractContext.INFO_DEFINITION_FORMAT.addField('<' + AbstractContext.VF_INFO_LOCAL_ROOT + '><S><D=' + Cres.get().getString('conLocalRoot') + '>');
    AbstractContext.INFO_DEFINITION_FORMAT.addField('<' + AbstractContext.VF_INFO_PEER_ROOT + '><S><F=N><D=' + Cres.get().getString('conPeerRoot') + '>');
    AbstractContext.INFO_DEFINITION_FORMAT.addField('<' + AbstractContext.VF_INFO_PEER_PRIMARY_ROOT + '><S><F=N><D=' + Cres.get().getString('conPeerPrimaryRoot') + '>');
    AbstractContext.INFO_DEFINITION_FORMAT.addField('<' + AbstractContext.VF_INFO_REMOTE_ROOT + '><S><F=N><D=' + Cres.get().getString('conRemoteRoot') + '>');
    AbstractContext.INFO_DEFINITION_FORMAT.addField('<' + AbstractContext.VF_INFO_REMOTE_PATH + '><S><D=' + Cres.get().getString('conRemotePath') + '>');
    AbstractContext.INFO_DEFINITION_FORMAT.addField('<' + AbstractContext.VF_INFO_MAPPED + '><B><F=N><D=' + Cres.get().getString('conMapped') + '>');
  }

  public static ACTION_DEF_FORMAT: TableFormat = new TableFormat();

  private static __static_initializer_7() {
    AbstractContext.ACTION_DEF_FORMAT.addField('<' + ActionConstants.FIELD_AD_NAME + '><S>');
    AbstractContext.ACTION_DEF_FORMAT.addField('<' + ActionConstants.FIELD_AD_DESCRIPTION + '><S><F=N>');
    AbstractContext.ACTION_DEF_FORMAT.addField('<' + ActionConstants.FIELD_AD_HELP + '><S><F=N>');
    AbstractContext.ACTION_DEF_FORMAT.addField('<' + ActionConstants.FIELD_AD_ACCELERATOR + '><S><F=N>');
    AbstractContext.ACTION_DEF_FORMAT.addField('<' + ActionConstants.FIELD_AD_DROP_SOURCES + '><T><F=N>');
    AbstractContext.ACTION_DEF_FORMAT.addField('<' + ActionConstants.FIELD_AD_HIDDEN + '><B>');
    AbstractContext.ACTION_DEF_FORMAT.addField('<' + ActionConstants.FIELD_AD_ENABLED + '><B>');
    AbstractContext.ACTION_DEF_FORMAT.addField('<' + ActionConstants.FIELD_AD_ICON_ID + '><S><F=N>');
    AbstractContext.ACTION_DEF_FORMAT.addField('<' + ActionConstants.FIELD_AD_GROUP + '><S><F=N>');
    AbstractContext.ACTION_DEF_FORMAT.addField('<' + ActionConstants.FIELD_AD_EXECUTION_GROUP + '><S><F=N>');
    AbstractContext.ACTION_DEF_FORMAT.addField('<' + ActionConstants.FIELD_AD_DEFAULT + '><B>');
  }

  public static RESOURCE_MASKS_FORMAT: TableFormat = FieldFormatFactory.create('<' + ActionConstants.FIELD_AD_RESOURCE_MASKS_RESOURCE_MASK + '><S><F=N>').wrap();

  public static FIFT_GET_COPY_DATA: TableFormat = new TableFormat(1, 1);

  private static __static_initializer_8() {
    AbstractContext.FIFT_GET_COPY_DATA.addField('<' + AbstractContext.FIF_COPY_DATA_GROUP + '><S><F=N>');
    AbstractContext.FIFT_GET_COPY_DATA.addField('<' + AbstractContext.FIF_COPY_DATA_RECIPIENTS + '><T><F=N>');
  }

  public static FIFT_GET_COPY_DATA_RECIPIENTS: TableFormat = FieldFormatFactory.create('<' + AbstractContext.FIF_COPY_DATA_RECIPIENTS_RECIPIENT + '><S>').wrap();

  public static REPLICATE_INPUT_FORMAT: TableFormat = new TableFormat();

  private static __static_initializer_9() {
    AbstractContext.REPLICATE_INPUT_FORMAT.addField('<' + AbstractContext.FOF_COPY_DATA_NAME + '><S><F=RHK>');
    AbstractContext.REPLICATE_INPUT_FORMAT.addField('<' + AbstractContext.FOF_COPY_DATA_DESCRIPTION + '><S><F=R><D=' + Cres.get().getString('variable') + '>');
    AbstractContext.REPLICATE_INPUT_FORMAT.addField('<' + AbstractContext.FOF_COPY_DATA_REPLICATE + '><B><A=0><D=' + Cres.get().getString('replicate') + '>');
    AbstractContext.REPLICATE_INPUT_FORMAT.addField('<' + AbstractContext.FOF_COPY_DATA_FIELDS + '><T><D=' + Cres.get().getString('fields') + '>');
    AbstractContext.REPLICATE_INPUT_FORMAT.addField('<' + AbstractContext.FOF_COPY_DATA_VALUE + '><T><D=' + Cres.get().getString('value') + '>');
  }

  public static FIFT_REPLICATE_FIELDS: TableFormat = new TableFormat();

  private static __static_initializer_10() {
    AbstractContext.FIFT_REPLICATE_FIELDS.addField('<' + AbstractContext.FIF_REPLICATE_FIELDS_NAME + '><S><F=RHK>');
    AbstractContext.FIFT_REPLICATE_FIELDS.addField('<' + AbstractContext.FIF_REPLICATE_FIELDS_DESCRIPTION + '><S><F=R><D=' + Cres.get().getString('field') + '>');
    AbstractContext.FIFT_REPLICATE_FIELDS.addField('<' + AbstractContext.FIF_REPLICATE_FIELDS_REPLICATE + '><B><A=1><D=' + Cres.get().getString('replicate') + '>');
    AbstractContext.FIFT_REPLICATE_FIELDS.setNamingExpression("print({}, '{" + AbstractContext.FIF_REPLICATE_FIELDS_REPLICATE + '} ? {' + AbstractContext.FIF_REPLICATE_FIELDS_DESCRIPTION + "} : null', ', ')");
  }

  public static REPLICATE_OUTPUT_FORMAT: TableFormat = new TableFormat();

  private static __static_initializer_11() {
    AbstractContext.REPLICATE_OUTPUT_FORMAT.addField('<' + AbstractContext.FIELD_REPLICATE_VARIABLE + '><S><D=' + Cres.get().getString('variable') + '>');
    AbstractContext.REPLICATE_OUTPUT_FORMAT.addField('<' + AbstractContext.FIELD_REPLICATE_SUCCESSFUL + '><B><D=' + Cres.get().getString('successful') + '>');
    AbstractContext.REPLICATE_OUTPUT_FORMAT.addField('<' + AbstractContext.FIELD_REPLICATE_ERRORS + '><S><D=' + Cres.get().getString('errors') + '>');
  }

  static REPLICATE_TO_CHILDREN_OUTPUT_FORMAT: TableFormat = new TableFormat();

  private static __static_initializer_12() {
    AbstractContext.REPLICATE_TO_CHILDREN_OUTPUT_FORMAT.addField('<' + AbstractContext.FIELD_REPLICATE_CONTEXT + '><S><D=' + Cres.get().getString('context') + '>');
    AbstractContext.REPLICATE_TO_CHILDREN_OUTPUT_FORMAT.addField('<' + AbstractContext.FIELD_REPLICATE_VARIABLE + '><S><D=' + Cres.get().getString('variable') + '>');
    AbstractContext.REPLICATE_TO_CHILDREN_OUTPUT_FORMAT.addField('<' + AbstractContext.FIELD_REPLICATE_SUCCESSFUL + '><B><D=' + Cres.get().getString('successful') + '>');
    AbstractContext.REPLICATE_TO_CHILDREN_OUTPUT_FORMAT.addField('<' + AbstractContext.FIELD_REPLICATE_ERRORS + '><S><D=' + Cres.get().getString('errors') + '>');
  }

  public static FIFT_UPDATE_VARIABLE: TableFormat = new TableFormat();

  private static __static_initializer_13() {
    AbstractContext.FIFT_UPDATE_VARIABLE.addField(FieldFormatFactory.createWith(AbstractContext.V_UPDATE_VARIABLE, FieldConstants.STRING_FIELD, Cres.get().getString('variable')));
    AbstractContext.FIFT_UPDATE_VARIABLE.addField(FieldFormatFactory.createWith(AbstractContext.V_UPDATE_VARIABLE_EXPRESSION, FieldConstants.STRING_FIELD, Cres.get().getString('expression')));
  }

  public static EF_UPDATED: TableFormat = new TableFormat(1, 1);

  private static __static_initializer_14() {
    AbstractContext.EF_UPDATED.addField('<' + AbstractContext.EF_UPDATED_VARIABLE + '><S>');
    AbstractContext.EF_UPDATED.addField('<' + AbstractContext.EF_UPDATED_VALUE + '><T>');
    AbstractContext.EF_UPDATED.addField('<' + AbstractContext.EF_UPDATED_USER + '><S><F=N>');
  }

  public static EF_CHANGE: TableFormat = new TableFormat(1, 1);

  private static __static_initializer_15() {
    AbstractContext.EF_CHANGE.addField('<' + AbstractContext.EF_CHANGE_VARIABLE + '><S>');
    AbstractContext.EF_CHANGE.addField('<' + AbstractContext.EF_CHANGE_VALUE + '><T><F=N>');
    AbstractContext.EF_CHANGE.addField('<' + AbstractContext.EF_CHANGE_DATA + '><S><F=N>');
  }

  public static EFT_INFO: TableFormat = new TableFormat(1, 1, '<' + AbstractContext.EF_INFO_INFO + '><S><D=' + Cres.get().getString('info') + '>');
  public static EFT_VARIABLE_REMOVED: TableFormat = new TableFormat(1, 1, '<' + AbstractContext.EF_INFO_INFO + '><S><D=' + Cres.get().getString('info') + '>');
  public static EFT_EVENT_REMOVED: TableFormat = new TableFormat(1, 1, '<' + AbstractContext.EF_VARIABLE_REMOVED_NAME + '><S>');
  public static EFT_FUNCTION_REMOVED: TableFormat = new TableFormat(1, 1, '<' + AbstractContext.EF_EVENT_REMOVED_NAME + '><S>');
  public static EFT_CHILD_REMOVED: TableFormat = new TableFormat(1, 1, '<' + AbstractContext.EF_FUNCTION_REMOVED_NAME + '><S>');
  public static EFT_CHILD_ADDED: TableFormat = new TableFormat(1, 1, '<' + AbstractContext.EF_CHILD_REMOVED_CHILD + '><S>');
  public static EFT_ACTION_REMOVED: TableFormat = new TableFormat(1, 1, '<' + AbstractContext.EF_CHILD_ADDED_CHILD + '><S>');

  public static VD_INFO: VariableDefinition;

  private static __static_initializer_16() {
    AbstractContext.VD_INFO = new VariableDefinition(AbstractContext.V_INFO, AbstractContext.INFO_DEFINITION_FORMAT, true, false, Cres.get().getString('conContextProps'), ContextUtilsConstants.GROUP_SYSTEM);
    AbstractContext.VD_INFO.setHidden(true);
    AbstractContext.VD_INFO.setReadPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static VD_VARIABLES: VariableDefinition;

  private static __static_initializer_17() {
    AbstractContext.VD_VARIABLES = new VariableDefinition(AbstractContext.V_VARIABLES, AbstractContext.VARIABLE_DEFINITION_FORMAT, true, false, Cres.get().getString('conVarList'));
    AbstractContext.VD_VARIABLES.setHidden(true);
    AbstractContext.VD_VARIABLES.setReadPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static VD_FUNCTIONS: VariableDefinition;

  private static __static_initializer_18() {
    AbstractContext.VD_FUNCTIONS = new VariableDefinition(AbstractContext.V_FUNCTIONS, AbstractContext.FUNCTION_DEFINITION_FORMAT, true, false, Cres.get().getString('conFuncList'));

    AbstractContext.VD_FUNCTIONS.setHidden(true);
    AbstractContext.VD_FUNCTIONS.setReadPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static VD_EVENTS: VariableDefinition;

  private static __static_initializer_19() {
    AbstractContext.VD_EVENTS = new VariableDefinition(AbstractContext.V_EVENTS, AbstractContext.EVENT_DEFINITION_FORMAT, true, false, Cres.get().getString('conEvtList'));
    AbstractContext.VD_EVENTS.setHidden(true);
    AbstractContext.VD_EVENTS.setReadPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static VD_ACTIONS: VariableDefinition;

  private static __static_initializer_20() {
    AbstractContext.VD_ACTIONS = new VariableDefinition(AbstractContext.V_ACTIONS, AbstractContext.ACTION_DEF_FORMAT, true, false, Cres.get().getString('conActionList'));
    AbstractContext.VD_ACTIONS.setHidden(true);
    AbstractContext.VD_ACTIONS.setReadPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static VD_CHILDREN: VariableDefinition;

  private static __static_initializer_21() {
    AbstractContext.VD_CHILDREN = new VariableDefinition(AbstractContext.V_CHILDREN, AbstractContext.VFT_CHILDREN, true, false, Cres.get().getString('conChildList'));
    AbstractContext.VD_CHILDREN.setHidden(true);
    AbstractContext.VD_CHILDREN.setReadPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  static FD_GET_COPY_DATA: FunctionDefinition;

  private static __static_initializer_22() {
    AbstractContext.FD_GET_COPY_DATA = new FunctionDefinition(AbstractContext.F_GET_COPY_DATA, AbstractContext.FIFT_GET_COPY_DATA, AbstractContext.REPLICATE_INPUT_FORMAT);
    AbstractContext.FD_GET_COPY_DATA.setHidden(true);
  }

  static FD_COPY: FunctionDefinition;

  private static __static_initializer_23() {
    AbstractContext.FD_COPY = new FunctionDefinition(AbstractContext.F_COPY, AbstractContext.REPLICATE_INPUT_FORMAT, AbstractContext.REPLICATE_OUTPUT_FORMAT, Cres.get().getString('conCopyProperties'));
    AbstractContext.FD_COPY.setHidden(true);
  }

  static FD_COPY_TO_CHILDREN: FunctionDefinition;

  private static __static_initializer_24() {
    AbstractContext.FD_COPY_TO_CHILDREN = new FunctionDefinition(AbstractContext.F_COPY_TO_CHILDREN, AbstractContext.REPLICATE_INPUT_FORMAT, AbstractContext.REPLICATE_TO_CHILDREN_OUTPUT_FORMAT, Cres.get().getString('conCopyToChildren'));
    AbstractContext.FD_COPY_TO_CHILDREN.setHidden(true);
  }

  static FD_UPDATE_VARIABLE: FunctionDefinition;

  private static __static_initializer_25() {
    AbstractContext.FD_UPDATE_VARIABLE = new FunctionDefinition(AbstractContext.F_UPDATE_VARIABLE, AbstractContext.FIFT_UPDATE_VARIABLE, null, Cres.get().getString('updateVariable'), ContextUtilsConstants.GROUP_SYSTEM);
    AbstractContext.FD_UPDATE_VARIABLE.setConcurrent(true);
  }

  public static ED_INFO: EventDefinition;

  private static __static_initializer_26() {
    AbstractContext.ED_INFO = new EventDefinition(AbstractContext.E_INFO, AbstractContext.EFT_INFO, Cres.get().getString('info'), ContextUtilsConstants.GROUP_DEFAULT);
    AbstractContext.ED_INFO.setLevel(EventLevel.INFO);
    AbstractContext.ED_INFO.setIconId(Icons.EVT_INFO);
    AbstractContext.ED_INFO.getPersistenceOptions().setDedicatedTablePreferred(true);
  }

  public static ED_CHILD_ADDED: EventDefinition;

  private static __static_initializer_27() {
    AbstractContext.ED_CHILD_ADDED = new EventDefinition(AbstractContext.E_CHILD_ADDED, AbstractContext.EFT_CHILD_ADDED, Cres.get().getString('conChildAdded'), ContextUtilsConstants.GROUP_SYSTEM);
    AbstractContext.ED_CHILD_ADDED.setConcurrency(EventDefinition.CONCURRENCY_SYNCHRONOUS);
    AbstractContext.ED_CHILD_ADDED.setHidden(true);
    AbstractContext.ED_CHILD_ADDED.setPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static ED_CHILD_REMOVED: EventDefinition;

  private static __static_initializer_28() {
    AbstractContext.ED_CHILD_REMOVED = new EventDefinition(AbstractContext.E_CHILD_REMOVED, AbstractContext.EFT_CHILD_REMOVED, Cres.get().getString('conChildRemoved'), ContextUtilsConstants.GROUP_SYSTEM);
    AbstractContext.ED_CHILD_REMOVED.setConcurrency(EventDefinition.CONCURRENCY_SYNCHRONOUS);
    AbstractContext.ED_CHILD_REMOVED.setHidden(true);
    AbstractContext.ED_CHILD_REMOVED.setPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static ED_VARIABLE_ADDED: EventDefinition;

  private static __static_initializer_29() {
    AbstractContext.ED_VARIABLE_ADDED = new EventDefinition(AbstractContext.E_VARIABLE_ADDED, AbstractContext.EF_VARIABLE_ADDED, Cres.get().getString('conVarAdded'), ContextUtilsConstants.GROUP_SYSTEM);
    AbstractContext.ED_VARIABLE_ADDED.setHidden(true);
    AbstractContext.ED_VARIABLE_ADDED.setPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static ED_VARIABLE_REMOVED: EventDefinition;

  private static __static_initializer_30() {
    AbstractContext.ED_VARIABLE_REMOVED = new EventDefinition(AbstractContext.E_VARIABLE_REMOVED, AbstractContext.EFT_VARIABLE_REMOVED, Cres.get().getString('conVarRemoved'), ContextUtilsConstants.GROUP_SYSTEM);
    AbstractContext.ED_VARIABLE_REMOVED.setHidden(true);
    AbstractContext.ED_VARIABLE_REMOVED.setPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static ED_FUNCTION_ADDED: EventDefinition;

  private static __static_initializer_31() {
    AbstractContext.ED_FUNCTION_ADDED = new EventDefinition(AbstractContext.E_FUNCTION_ADDED, AbstractContext.EF_FUNCTION_ADDED, Cres.get().getString('conFuncAdded'), ContextUtilsConstants.GROUP_SYSTEM);
    AbstractContext.ED_FUNCTION_ADDED.setHidden(true);
    AbstractContext.ED_FUNCTION_ADDED.setPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static ED_FUNCTION_REMOVED: EventDefinition;

  private static __static_initializer_32() {
    AbstractContext.ED_FUNCTION_REMOVED = new EventDefinition(AbstractContext.E_FUNCTION_REMOVED, AbstractContext.EFT_FUNCTION_REMOVED, Cres.get().getString('conFuncRemoved'), ContextUtilsConstants.GROUP_SYSTEM);
    AbstractContext.ED_FUNCTION_REMOVED.setHidden(true);
    AbstractContext.ED_FUNCTION_REMOVED.setPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static ED_EVENT_ADDED: EventDefinition;

  private static __static_initializer_33() {
    AbstractContext.ED_EVENT_ADDED = new EventDefinition(AbstractContext.E_EVENT_ADDED, AbstractContext.EF_EVENT_ADDED, Cres.get().getString('conEvtAdded'), ContextUtilsConstants.GROUP_SYSTEM);
    AbstractContext.ED_EVENT_ADDED.setHidden(true);
    AbstractContext.ED_EVENT_ADDED.setPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static ED_EVENT_REMOVED: EventDefinition;

  private static __static_initializer_34() {
    AbstractContext.ED_EVENT_REMOVED = new EventDefinition(AbstractContext.E_EVENT_REMOVED, AbstractContext.EFT_EVENT_REMOVED, Cres.get().getString('conEvtRemoved'), ContextUtilsConstants.GROUP_SYSTEM);
    AbstractContext.ED_EVENT_REMOVED.setHidden(true);
    AbstractContext.ED_EVENT_REMOVED.setPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static ED_ACTION_ADDED: EventDefinition;

  private static __static_initializer_35() {
    AbstractContext.ED_ACTION_ADDED = new EventDefinition(
      AbstractContext.E_ACTION_ADDED,
      AbstractContext.ACTION_DEF_FORMAT.clone()
        .setMinRecords(1)
        .setMaxRecords(1),
      Cres.get().getString('conActionAdded')
    );
    AbstractContext.ED_ACTION_ADDED.setHidden(true);
    AbstractContext.ED_ACTION_ADDED.setPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static ED_ACTION_REMOVED: EventDefinition;

  private static __static_initializer_36() {
    AbstractContext.ED_ACTION_REMOVED = new EventDefinition(AbstractContext.E_ACTION_REMOVED, AbstractContext.EFT_ACTION_REMOVED, Cres.get().getString('conActionRemoved'));

    AbstractContext.ED_ACTION_REMOVED.setHidden(true);
    AbstractContext.ED_ACTION_REMOVED.setPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static ED_ACTION_STATE_CHANGED: EventDefinition;

  private static __static_initializer_37() {
    AbstractContext.ED_ACTION_STATE_CHANGED = new EventDefinition(AbstractContext.E_ACTION_STATE_CHANGED, AbstractContext.ACTION_DEF_FORMAT, Cres.get().getString('conActionStateChanged'));

    AbstractContext.ED_ACTION_STATE_CHANGED.setHidden(true);
    AbstractContext.ED_ACTION_STATE_CHANGED.setPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static ED_INFO_CHANGED: EventDefinition;

  private static __static_initializer_38() {
    AbstractContext.ED_INFO_CHANGED = new EventDefinition(AbstractContext.E_INFO_CHANGED, AbstractContext.INFO_DEFINITION_FORMAT, Cres.get().getString('conInfoChanged'), ContextUtilsConstants.GROUP_SYSTEM);

    AbstractContext.ED_INFO_CHANGED.setHidden(true);
    AbstractContext.ED_INFO_CHANGED.setPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  public static ED_UPDATED: EventDefinition;

  private static __static_initializer_39() {
    AbstractContext.ED_UPDATED = new EventDefinition(AbstractContext.E_UPDATED, AbstractContext.EF_UPDATED, Cres.get().getString('conUpdated'), ContextUtilsConstants.GROUP_SYSTEM);

    AbstractContext.ED_UPDATED.setHidden(true);
    AbstractContext.ED_UPDATED.setConcurrency(EventDefinition.CONCURRENCY_CONCURRENT);
    AbstractContext.ED_UPDATED.setFingerprintExpression('{' + AbstractContext.EF_UPDATED_VARIABLE + '}');
  }

  public static ED_CHANGE: EventDefinition;

  private static __static_initializer_40() {
    AbstractContext.ED_CHANGE = new EventDefinition(AbstractContext.E_CHANGE, AbstractContext.EF_CHANGE, Cres.get().getString('change'), ContextUtilsConstants.GROUP_SYSTEM);
    AbstractContext.ED_CHANGE.setHidden(true);
    AbstractContext.ED_CHANGE.getPersistenceOptions().setDedicatedTablePreferred(true);
  }

  public static ED_DESTROYED: EventDefinition;

  private static __static_initializer_41() {
    AbstractContext.ED_DESTROYED = new EventDefinition(AbstractContext.E_DESTROYED, TableFormat.EMPTY_FORMAT, Cres.get().getString('conDestroyedPermanently'), ContextUtilsConstants.GROUP_SYSTEM);
    AbstractContext.ED_DESTROYED.setConcurrency(EventDefinition.CONCURRENCY_SYNCHRONOUS);
    AbstractContext.ED_DESTROYED.setHidden(true);
    AbstractContext.ED_DESTROYED.setPermissions(DefaultPermissionChecker.getNullPermissions());
  }

  static VFT_VARIABLE_STATUSES: TableFormat = new TableFormat();

  private static __static_initializer_42() {
    AbstractContext.VFT_VARIABLE_STATUSES.addField('<' + AbstractContext.VF_VARIABLE_STATUSES_NAME + '><S>');
    AbstractContext.VFT_VARIABLE_STATUSES.addField('<' + AbstractContext.VF_VARIABLE_STATUSES_STATUS + '><S><F=N>');
    AbstractContext.VFT_VARIABLE_STATUSES.addField('<' + AbstractContext.VF_VARIABLE_STATUSES_COMMENT + '><S><F=N>');
  }

  public static initialize() {
    if (AbstractContext._init) return;

    AbstractContext.__static_initializer_0();
    AbstractContext.__static_initializer_1();
    AbstractContext.__static_initializer_2();
    AbstractContext.__static_initializer_3();
    AbstractContext.__static_initializer_4();
    AbstractContext.__static_initializer_5();
    AbstractContext.__static_initializer_6();
    AbstractContext.__static_initializer_7();
    AbstractContext.__static_initializer_8();
    AbstractContext.__static_initializer_9();
    AbstractContext.__static_initializer_10();
    AbstractContext.__static_initializer_11();
    AbstractContext.__static_initializer_12();
    AbstractContext.__static_initializer_13();
    AbstractContext.__static_initializer_14();
    AbstractContext.__static_initializer_15();
    AbstractContext.__static_initializer_16();
    AbstractContext.__static_initializer_17();
    AbstractContext.__static_initializer_18();
    AbstractContext.__static_initializer_19();
    AbstractContext.__static_initializer_20();
    AbstractContext.__static_initializer_21();
    AbstractContext.__static_initializer_22();
    AbstractContext.__static_initializer_23();
    AbstractContext.__static_initializer_24();
    AbstractContext.__static_initializer_25();
    AbstractContext.__static_initializer_26();
    AbstractContext.__static_initializer_27();
    AbstractContext.__static_initializer_28();
    AbstractContext.__static_initializer_29();
    AbstractContext.__static_initializer_30();
    AbstractContext.__static_initializer_31();
    AbstractContext.__static_initializer_32();
    AbstractContext.__static_initializer_33();
    AbstractContext.__static_initializer_34();
    AbstractContext.__static_initializer_35();
    AbstractContext.__static_initializer_36();
    AbstractContext.__static_initializer_37();
    AbstractContext.__static_initializer_38();
    AbstractContext.__static_initializer_39();
    AbstractContext.__static_initializer_40();
    AbstractContext.__static_initializer_41();
    AbstractContext.__static_initializer_42();
    AbstractContext._init = true;
  }

  static readonly DEFAULT_EVENT_LEVEL: number = -1;

  static readonly DEFAULT_PERMISSIONS: Permissions = DefaultPermissionChecker.getNullPermissions();

  public static readonly CALLER_CONTROLLER_PROPERTY_DEBUG: string = 'debug';

  public static readonly CALLER_CONTROLLER_PROPERTY_NO_UPDATED_EVENTS: string = 'no_updated_events';

  public static readonly CALLER_CONTROLLER_PROPERTY_NO_CHANGE_EVENTS: string = 'no_change_events';

  public static readonly CALLER_CONTROLLER_PROPERTY_NO_STATISTICS: string = 'no_statistics';

  public static readonly CALLER_CONTROLLER_PROPERTY_NO_VALIDATION: string = 'no_validation';

  public static readonly INDEX_HIGHEST: number = 400;

  public static readonly INDEX_VERY_HIGH: number = 300;

  public static readonly INDEX_HIGH: number = 200;

  public static readonly INDEX_HIGHER: number = 100;

  public static readonly INDEX_NORMAL: number = 0;

  public static readonly INDEX_LOWER: number = -100;

  public static readonly INDEX_LOW: number = -200;

  public static readonly INDEX_VERY_LOW: number = -300;

  public static readonly INDEX_LOWEST: number = -400;

  public static readonly DELTA_HIGHEST: number = 40;

  public static readonly DELTA_VERY_HIGH: number = 30;

  public static readonly DELTA_HIGH: number = 20;

  public static readonly DELTA_HIGHER: number = 10;

  public static readonly DELTA_LOWER: number = -10;

  public static readonly DELTA_LOW: number = -20;

  public static readonly DELTA_VERY_LOW: number = -30;

  public static readonly DELTA_LOWEST: number = -400;

  static readonly VERY_LOW_PERFORMANCE_THRESHOLD: number = 120000;

  static readonly LOW_PERFORMANCE_THRESHOLD: number = 20000;

  static readonly SORT_THRESHOLD: number = 10000;

  static readonly MOVE_LOCK_TIMEOUT: number = 2;

  private contextManager: M | null = null;

  private variableData: Map<string, VariableData> = new Map();

  private functionData: Map<string, FunctionData> = new Map();

  private eventData: Map<string, EventData> = new Map();

  private actionDefinitions: Array<ActionDefinition> = [];

  private name = '';
  private description: string | null = null;
  private type: string | null = null;
  private group: string | null = null;
  private iconId: string | null = null;

  private parent: Context<C, M> | null = null;

  private setupComplete = false;
  private started = false;
  private stopped = false;

  private index: number | null;

  private permissionCheckingEnabled = true;
  private permissions: Permissions | null = null;
  private childrenViewPermissions: Permissions | null = null;
  private permissionChecker: PermissionChecker = new NullPermissionChecker();

  private children: Array<Context<C, M>> = [];
  private childrenMap: Map<string, Context<C, M>> = new Map();

  private valueCheckingEnabled = true;
  private childrenConcurrencyEnabled = false; // Avoid enabling if context's children may have subchildren

  private childrenSortingEnabled = true;

  private fireUpdateEvents = true;

  private status: ContextStatus | null = null;

  private variableStatuses: Map<string, VariableStatus> | null = null;
  private variableStatusesTable: DataTable | null = null;
  private variableStatusesUpdated = false;

  private path: string | null = null; // Cached, for internal use

  public constructor(name: string) {
    super();
    this.setName(name);
    this.index = ContextSortingHelper.getIndex(name);
  }

  public setup(contextManager: M | null): void {
    this.setContextManager(contextManager);
    this.setupContext();
  }

  protected setupContext(): void {
    try {
      if (this.setupComplete) {
        return;
      }

      this.setupPermissions();

      this.setupMyself();

      this.setupComplete = true;

      this.setupChildren();
    } catch (ex) {
      throw new Error("Error setting up context '" + toString() + "': " + ex.message);
    }
  }

  public setupPermissions(): void {}

  public setupMyself(): void {
    this.addVariableDefinition(AbstractContext.VD_INFO);

    this.addVariableDefinition(AbstractContext.VD_VARIABLES);

    this.addVariableDefinition(AbstractContext.VD_FUNCTIONS);

    this.addVariableDefinition(AbstractContext.VD_EVENTS);

    this.addVariableDefinition(AbstractContext.VD_ACTIONS);

    this.addVariableDefinition(AbstractContext.VD_CHILDREN);

    this.addFunctionDefinition(AbstractContext.FD_GET_COPY_DATA);

    this.addFunctionDefinition(AbstractContext.FD_COPY);

    this.addFunctionDefinition(AbstractContext.FD_COPY_TO_CHILDREN);

    this.addFunctionDefinition(AbstractContext.FD_UPDATE_VARIABLE);

    this.addEventDefinition(AbstractContext.ED_INFO);

    this.addEventDefinition(AbstractContext.ED_CHILD_ADDED);

    this.addEventDefinition(AbstractContext.ED_CHILD_REMOVED);

    this.addEventDefinition(AbstractContext.ED_VARIABLE_ADDED);

    this.addEventDefinition(AbstractContext.ED_VARIABLE_REMOVED);

    this.addEventDefinition(AbstractContext.ED_FUNCTION_ADDED);

    this.addEventDefinition(AbstractContext.ED_FUNCTION_REMOVED);

    this.addEventDefinition(AbstractContext.ED_EVENT_ADDED);

    this.addEventDefinition(AbstractContext.ED_EVENT_REMOVED);

    this.addEventDefinition(AbstractContext.ED_ACTION_ADDED);

    this.addEventDefinition(AbstractContext.ED_ACTION_REMOVED);

    this.addEventDefinition(AbstractContext.ED_ACTION_STATE_CHANGED);

    this.addEventDefinition(AbstractContext.ED_INFO_CHANGED);

    this.addEventDefinition(AbstractContext.ED_UPDATED);

    this.addEventDefinition(this.getChangeEventDefinition());

    this.addEventDefinition(AbstractContext.ED_DESTROYED);
  }

  public setupChildren(): void {}

  teardown(): void {}

  start(): void {
    this.children.forEach(child => {
      if (this.isChildrenConcurrencyEnabled()) {
        const promise = new Promise((resolve, reject) => {
          child.start();
          Log.CONTEXT_CHILDREN.debug("Started context  '" + child.getPath());
          resolve();
        });
      } else {
        child.start();
        Log.CONTEXT_CHILDREN.debug("Started context  '" + child.getPath());
      }
    });
    this.started = true;
  }

  stop(): void {
    this.stopped = true;
    this.children.forEach(child => {
      if (this.isChildrenConcurrencyEnabled()) {
        const promise = new Promise((resolve, reject) => {
          child.stop();
          Log.CONTEXT_CHILDREN.debug("Stopped context  '" + child.getPath());
          resolve();
        });
      } else {
        child.stop();
        Log.CONTEXT_CHILDREN.debug("Stopped context  '" + child.getPath());
      }
    });
    this.started = false;
  }

  getChildren(caller: CallerController | null = null): Array<Context<C, M>> {
    if (!this.checkPermissions(this.getChildrenViewPermissions(), caller, this, null)) {
      if (Log.CONTEXT_CHILDREN.isDebugEnabled()) {
        Log.CONTEXT_CHILDREN.debug("Access to child '" + name + "' denied in context '" + this.getPath() + "'");
      }
      return [];
    }

    return this.children.filter(child => this.shouldSeeChild(caller, child));
  }

  private shouldSeeChild(caller: CallerController | null, cur: Context<any, any>): boolean {
    return this.checkPermissions(cur.getPermissions(), caller, cur, null) || this.canSee(caller, cur);
  }

  private canSee(caller: CallerController | null, con: Context<any, any>): boolean {
    if (!this.permissionCheckingEnabled) {
      return true;
    }

    return this.getPermissionChecker().canSee(caller != null ? caller.getPermissions() : null, con.getPath(), this.getContextManager());
  }

  public getVisibleChildren(caller: CallerController | null = null): Array<Context<C, M>> {
    return this.getChildren(caller);
  }

  public isMapped(): boolean {
    return false;
  }

  public getMappedChildren(caller: CallerController | null = null): Array<Context<C, M>> {
    return this.isMapped() ? this.getVisibleChildren(caller) : this.getChildren(caller);
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string | null {
    return this.description;
  }

  public setDescription(description: string): void {
    const old = this.description;
    this.description = description;

    if (old == null || old !== description) {
      this.contextInfoChanged();
    }
  }

  public getParent(): Context<C, M> | null {
    return this.parent;
  }

  public hasParent(parentContext: Context<C, M>): boolean {
    if (parentContext == null) {
      return false;
    }

    let root: Context<C, M> | null = this;

    while (root?.getParent() != null) {
      root = root.getParent();
      if (root === parentContext) {
        return true;
      }
    }
    return false;
  }

  public getRoot(): C {
    let root: Context<C, M> | null = this;

    while (root?.getParent() != null) {
      root = root.getParent();
    }

    return root as C;
  }

  public get(contextPath: string, caller: CallerController | null = null): Context<C, M> | null {
    if (contextPath == null) {
      return null;
    }

    const relative = ContextUtils.isRelative(contextPath);

    if (relative) {
      contextPath = contextPath.substring(1);
    }

    let cur: Context<C, M> | null = relative ? this : this.getRootWithLookup(caller);

    if (contextPath.length == 0) {
      return cur;
    }

    let fullPath = '';

    if (caller != null) {
      fullPath = relative ? ContextUtils.createName(this.getPath(), contextPath) : contextPath;

      const cached: C = caller.lookup(fullPath) as C;

      if (cached != null) {
        return cached;
      }
    }

    let lastName = this.getRoot().getName();
    const names: Array<string> = StringUtils.split(contextPath, ContextUtilsConstants.CONTEXT_NAME_SEPARATOR.charAt(0));

    for (const child of names) {
      if (child.length == 0) {
        return null;
      }

      if (cur == null) {
        break;
      }

      lastName = cur.getName();
      cur = cur.getChild(child, caller);
    }
    if (cur == null) {
      Log.CONTEXT_CHILDREN.debug("Context '" + contextPath + "' not found in '" + this.getPath() + "', last found: '" + lastName + "'");
    }

    if (caller != null && cur != null) {
      caller.cache(fullPath, cur);
    }
    return cur;
  }

  getPermissions(): Permissions {
    if (!this.permissionCheckingEnabled) {
      return AbstractContext.DEFAULT_PERMISSIONS;
    }

    if (this.permissions != null) {
      return this.permissions;
    }

    const parent = this.getParent();
    if (parent != null) {
      return parent.getPermissions();
    }

    return AbstractContext.DEFAULT_PERMISSIONS;
  }

  protected setName(name: string): void {
    this.path = null; // Resetting cache

    if (!ContextUtils.isValidContextName(name)) {
      throw new Error(Cres.get().getString('conIllegalName') + name);
    }
    this.name = name;
  }

  private getRootWithLookup(caller: CallerController | null): C {
    if (caller == null) {
      return this.getRoot();
    }

    let root: C = caller.lookup(Contexts.CTX_ROOT) as C;

    if (root == null) {
      root = this.getRoot();
      caller.cache(Contexts.CTX_ROOT, root);
    }
    return root;
  }

  setParent(parent: Context<C, M> | null): void {
    this.parent = parent;
  }

  protected setPermissions(permissions: Permissions): void {
    this.permissions = permissions;
  }

  protected setPermissionChecker(permissionChecker: PermissionChecker): void {
    this.permissionChecker = permissionChecker;
  }

  protected setFireUpdateEvents(fireUpdateEvents: boolean): void {
    this.fireUpdateEvents = fireUpdateEvents;
  }

  protected isFireUpdateEvents(): boolean {
    return this.fireUpdateEvents;
  }

  private setContextManager(contextManager: M | null): void {
    if (this.contextManager != null && this.contextManager != contextManager) {
      throw new Error('Context manager already set');
    }

    this.contextManager = contextManager;
  }

  protected setChildrenViewPermissions(childrenViewPermissions: Permissions): void {
    this.childrenViewPermissions = childrenViewPermissions;
  }

  public setChildrenSortingEnabled(childrenSortingEnabled: boolean): void {
    this.childrenSortingEnabled = childrenSortingEnabled;
  }

  public isChildrenSortingEnabled(): boolean {
    return this.childrenSortingEnabled;
  }

  protected setValueCheckingEnabled(valueCheckingEnabled: boolean): void {
    this.valueCheckingEnabled = valueCheckingEnabled;
  }

  public isChildrenConcurrencyEnabled(): boolean {
    return this.childrenConcurrencyEnabled;
  }

  protected setChildrenConcurrencyEnabled(childrenConcurrencyEnabled: boolean): void {
    this.childrenConcurrencyEnabled = childrenConcurrencyEnabled;
  }

  protected checkThisPermissions(needPermissions: Permissions | null, caller: CallerController | null, accessedEntityDefinition: EntityDefinition): void {
    if (!this.checkPermissions(needPermissions, caller, this, accessedEntityDefinition)) {
      throw new Error(MessageFormat.format(Cres.get().getString('conAccessDenied'), this.getPath(), caller != null ? caller.getPermissions() : '', needPermissions));
    }
  }

  protected checkPermissions(needPermissions: Permissions | null, caller: CallerController | null, accessedContext: Context<C, M>, accessedEntityDefinition: EntityDefinition | null): boolean {
    if (!this.permissionCheckingEnabled) {
      return true;
    }

    return this.getPermissionChecker().has(caller, needPermissions, accessedContext, accessedEntityDefinition);
  }

  addChild(child: Context<C, M>, index: number | null = null): void {
    const startTime = Date.now();

    const existing: Context<C, M> | null = this.getChildWithoutCheckingPerms(child.getName());
    if (existing != null) {
      throw new Error(MessageFormat.format(Cres.get().getString('conChildExists'), child.getName(), this.getPath()));
    }

    if (index != null) {
      if (this.childrenSortingEnabled) {
        throw new Error('Cannot add child with pre-defined index as children sorting is enabled');
      }
      this.children[index] = child;
    } else {
      this.children.push(child);
    }
    this.childrenMap.set(child.getName().toLowerCase(), child);

    // Disabling sorting for large child sets to avoid performance degradation. Children management should be anyway performed via groups in this case.
    if (this.childrenSortingEnabled && this.children.length < AbstractContext.SORT_THRESHOLD) {
      this.children.sort((a, b) => {
        const t = (a as unknown) as AbstractContext<C, M>;
        return t.compareTo(b);
      });
    }

    try {
      child.setParent(this);

      child.setup(this.getContextManager());

      if (this.setupComplete && this.fireUpdateEvents) {
        this.fireEvent(AbstractContext.E_CHILD_ADDED, [child.getName()]);
      }

      const cm = this.getContextManager();
      if (cm != null) {
        // If a child added already has own children, contextAdded() won't be called for them
        cm.contextAdded(child);
      }
    } catch (ex) {
      this.childrenMap.delete(child.getName());
      this.children.splice(this.children.indexOf(child));
      throw new Error("Error adding child '" + child.toString() + "' to context '" + toString() + "': " + ex.message);
    }
  }

  public removeFromParent(): void {
    if (this.getParent() != null) {
      this.getParent()?.removeChild(this);
    } else {
      Log.CONTEXT_CHILDREN.debug("Can't remove context '" + this.getPath() + "' from its parent: no parent context was set");
    }
  }

  destroy(moving: boolean): void {
    if (!moving) {
      this.stop();
      this.destroyChildren(false);
    }

    if (this.fireUpdateEvents) {
      const ed: EventDefinition | null = this.getEventDefinition(AbstractContext.E_DESTROYED);
      if (ed != null) {
        this.fireEvent(ed.getName());
      }
    }
    for (const ed of this.eventData.values()) {
      if (Log.CONTEXT_EVENTS.isDebugEnabled()) {
        Log.CONTEXT_EVENTS.debug("Removing all listeners of event '" + ed.getDefinition().getName() + "'");
      }
      ed.clearListeners();
    }
    this.removeFromParent();
  }

  protected destroyChildren(moving: boolean): void {
    for (const child of this.children) {
      child.destroy(moving);
    }
  }

  removeChild(child: string | Context<C, M>): void {
    let removedChild: Context<C, M> | null;
    if (Util.isString(child)) {
      removedChild = this.getChildWithoutCheckingPerms(child as string);
      if (removedChild != null) {
        Log.CONTEXT_CHILDREN.debug("Remove error: child '" + name + "' not found in context " + this.getPath());
        return;
      }
    }
    removedChild = child as C;
    if (this.children.indexOf(removedChild) != -1) {
      if (this.getContextManager() != null) {
        const cm = this.getContextManager() as M;
        removedChild.accept(
          new (class Visitor extends DefaultContextVisitor {
            visit(context: Context<any, any>): void {
              cm.contextRemoved(removedChild);
            }

            shouldVisit(context: Context<any, any>): boolean {
              return true;
            }
          })()
        );
      }
      this.childrenMap.delete(removedChild.getName().toLowerCase());
      this.children.splice(this.children.indexOf(removedChild));
      if (this.setupComplete && this.fireUpdateEvents) {
        this.fireEvent(AbstractContext.E_CHILD_REMOVED, [removedChild.getName()]);
      }

      removedChild.setParent(null);
    }
  }

  public reorderChild(child: C, index: number): void {
    if (this.childrenSortingEnabled) {
      throw new Error('Cannot reorder children when children sorting is enabled');
    }

    const oi: number = this.children.indexOf(child);
    this.children.splice(oi);
    this.children[index - (oi < index ? 1 : 0)] = child;
  }

  destroyChild(child: Context<C, M>, moving: boolean): void {
    child.destroy(moving);
  }

  updatePrepare(): void {}

  protected movePrepare(oldPath: string, oldName: string, newPath: string, newName: string): void {}

  protected moveInternal(oldPath: string, oldName: string, newPath: string, newName: string): void {
    this.setName(newName);

    for (const child of this.children) {
      ((child as unknown) as AbstractContext<C, M>).moveInternal(ContextUtils.createName(oldPath, child.getName()), child.getName(), ContextUtils.createName(newPath, child.getName()), child.getName());
    }
  }

  protected moveFinalize(oldPath: string, oldName: string, newPath: string, newName: string): void {}

  move(newParent: C, newName: string): void {
    this._move(this.getPath(), newParent, newName);
  }

  private _move(oldPath: string, newParent: Context<C, M>, newName: string): void {
    Log.CONTEXT.debug('Moving context ' + this.getPath() + ' to ' + newParent.getPath() + ' and/or renaming to ' + newName);

    const oldName = this.getName();

    const newPath: string = ContextUtils.createName(newParent.getPath(), newName);

    this.movePrepare(oldPath, oldName, newPath, newName);

    this.getParent()?.destroyChild(this, true);

    this.moveInternal(oldPath, oldName, newPath, newName);

    newParent.addChild(this, null);

    this.moveFinalize(oldPath, oldName, newPath, newName);
  }

  getChild(name: string, caller: CallerController | null = null): C | null {
    if (!this.checkPermissions(this.getChildrenViewPermissions(), caller, this, null)) {
      return null;
    }

    const child: C | null = this.getChildWithoutCheckingPerms(name);

    if (child != null && this.shouldSeeChild(caller, child)) {
      return child;
    }

    return null;
  }

  private getChildWithoutCheckingPerms(name: string): C | null {
    if (this.childrenMap.has(name.toLowerCase())) return this.childrenMap.get(name.toLowerCase()) as C;
    return null;
  }

  getPath(): string {
    if (this.getParent() == null) {
      return this.createPath();
    }

    if (this.path == null) {
      this.path = this.createPath();
    }

    return this.path as string;
  }

  private createPath(): string {
    let con: Context<C, M> | null = this;
    let nm: string = this.getName();

    do {
      con = con.getParent();
      if (con != null) {
        if (con.getParent() != null) {
          nm = con.getName() + ContextUtilsConstants.CONTEXT_NAME_SEPARATOR + nm;
        }
      }
    } while (con != null);

    return nm;
  }

  addEventListener(name: string, listener: DefaultContextEventListener, weak = false): boolean {
    const ed: EventData = this.getEventData(name);

    if (ed == null) {
      throw new Error(Cres.get().getString('conEvtNotAvail') + name);
    }

    try {
      const permissions: Permissions | null = ed.getDefinition().getPermissions() != null ? ed.getDefinition().getPermissions() : this.getPermissions();
      this.checkThisPermissions(permissions, listener.getCallerController(), ed.getDefinition());
    } catch (ex) {
      Log.CONTEXT_EVENTS.warn("Error adding listener '" + listener + "' of event '" + ed.getDefinition().getName() + "' in context '" + this.getPath() + "': " + ex.message);
      return false;
    }

    if (Log.CONTEXT_EVENTS.isDebugEnabled()) {
      Log.CONTEXT_EVENTS.debug("Adding '" + listener + "' as listener of event '" + ed.getDefinition().getName() + "' in '" + this.getPath() + "'");
    }

    return ed.addListener(listener, weak);
  }

  removeEventListener(name: string, listener: DefaultContextEventListener): boolean {
    const ed: EventData = this.getEventData(name);

    if (ed == null) {
      Log.CONTEXT_EVENTS.warn("Error removing listener of event '" + name + "' in context '" + this.getPath() + "': event definition not found");
      return false;
    }

    if (Log.CONTEXT_EVENTS.isDebugEnabled()) {
      {
        Log.CONTEXT_EVENTS.debug("Removing '" + listener + "' listener of event '" + ed.getDefinition().getName() + "' in '" + this.getPath() + "'");
      }
    }
    return ed.removeListener(listener);
  }

  getVariableDefinitions(caller: CallerController | null = null, includeHidden = false): Array<VariableDefinition> {
    const list = new Array<VariableDefinition>();

    const debug: boolean = caller != null && caller.getProperties().has(AbstractContext.CALLER_CONTROLLER_PROPERTY_DEBUG);

    for (const d of this.variableData.values()) {
      const def: VariableDefinition = d.getDefinition();
      if ((caller == null || caller.isPermissionCheckingEnabled()) && !includeHidden && def.isHidden() && !debug) {
        continue;
      }

      const readPermissions: Permissions | null = def.getReadPermissions() != null ? def.getReadPermissions() : this.getPermissions();
      const writePermissions: Permissions | null = def.getWritePermissions() != null ? def.getWritePermissions() : this.getPermissions();

      const readAccessGranted: boolean = this.checkPermissions(readPermissions, caller, this, def);
      const writeAccessGranted: boolean = this.checkPermissions(writePermissions, caller, this, def);

      if (!readAccessGranted && !writeAccessGranted) {
        continue;
      }

      if (def.isReadable() == readAccessGranted && def.isWritable() == writeAccessGranted) {
        list.push(def);
      } else {
        const clone = def.clone();

        clone.setReadable(def.isReadable() && readAccessGranted);
        clone.setWritable(def.isWritable() && writeAccessGranted);

        list.push(clone);
      }
    }

    return list;
  }

  getVariableDefinitionsByGroup(group: string, caller: CallerController | null = null): Array<VariableDefinition> {
    const vars = this.getVariableDefinitions(caller);
    const defs = new Array(vars.length);

    for (const vd of vars) {
      if (vd.getGroup() != null && (Util.equals(group, vd.getGroup()) || vd.getGroup().startsWith(group + ContextUtilsConstants.ENTITY_GROUP_SEPARATOR))) {
        defs.push(vd);
      }
    }

    return defs;
  }

  public getPermissionChecker(): PermissionChecker {
    return this.permissionChecker;
  }

  getChildrenViewPermissions(): Permissions {
    return this.childrenViewPermissions != null ? this.childrenViewPermissions : this.getPermissions();
  }

  getContextManager(): M | null {
    return this.contextManager;
  }

  isSetupComplete(): boolean {
    return this.setupComplete;
  }

  isStarted(): boolean {
    return this.started;
  }

  isStopped(): boolean {
    return this.stopped;
  }

  isInitializedStatus(): boolean {
    return this.setupComplete;
  }

  isInitializedInfo(): boolean {
    return this.setupComplete;
  }

  isInitializedChildren(): boolean {
    return this.setupComplete;
  }

  isInitializedVariables(): boolean {
    return this.setupComplete;
  }

  isInitializedFunctions(): boolean {
    return this.setupComplete;
  }

  isInitializedEvents(): boolean {
    return this.setupComplete;
  }

  getFunctionDefinitions(caller: CallerController | null = null, includeHidden = false): Array<FunctionDefinition> {
    const list: Array<FunctionDefinition> = new Array<FunctionDefinition>();
    const debug = caller != null ? caller.getProperties().has(AbstractContext.CALLER_CONTROLLER_PROPERTY_DEBUG) : false;
    for (const d of this.functionData.values()) {
      const def = d.getDefinition();

      const permissions: Permissions | null = def.getPermissions() != null ? def.getPermissions() : this.getPermissions();

      if (!this.checkPermissions(permissions, caller, this, def)) {
        continue;
      }

      if ((caller == null || caller.isPermissionCheckingEnabled()) && !includeHidden && def.isHidden() && !debug) {
        continue;
      }

      list.push(def);
    }
    return list;
  }

  getFunctionDefinitionsByGroup(group: string, caller: CallerController | null = null): Array<FunctionDefinition> {
    const defs: Array<FunctionDefinition> = [];

    for (const fd of this.getFunctionDefinitions(caller)) {
      if (fd.getGroup() != null && (Util.equals(group, fd.getGroup()) || fd.getGroup().startsWith(group + ContextUtilsConstants.ENTITY_GROUP_SEPARATOR))) {
        defs.push(fd);
      }
    }
    return defs;
  }

  getType(): string | null {
    return this.type;
  }

  getIconId(): string | null {
    return this.iconId;
  }

  getIndex(): number | null {
    return this.index;
  }

  getGroup(): string | null {
    return this.group;
  }

  getLocalRoot(withParent: boolean): string | null {
    return Contexts.CTX_ROOT;
  }

  isProxy(): boolean {
    return false;
  }

  isDistributed(): boolean {
    return false;
  }

  getPeerRoot(): string | null {
    return null;
  }

  getRemoteRoot(): string | null {
    return null;
  }

  getRemotePath(): string | null {
    return this.getPath();
  }

  getPeerPath(): string {
    return this.getPath();
  }

  getLocalPrimaryRoot(): string | null {
    return null;
  }

  public setType(type: string): void {
    if (!ContextUtils.isValidContextType(type)) {
      throw new Error(Cres.get().getString('conIllegalType') + type);
    }

    const old = this.type;
    this.type = type;

    if (old == null || old !== type) {
      this.contextInfoChanged();
    }
  }

  protected setPermissionCheckingEnabled(permissionCheckingEnabled: boolean): void {
    this.permissionCheckingEnabled = permissionCheckingEnabled;
  }

  protected setIconId(iconId: string): void {
    const old = this.iconId;
    this.iconId = iconId;

    if (old == null || old !== iconId) {
      this.contextInfoChanged();
    }
  }

  private contextInfoChanged(): void {
    if (this.setupComplete) {
      const cm = this.getContextManager();
      if (cm != null) {
        cm.contextInfoChanged(this);
      }

      if (this.fireUpdateEvents) {
        const ed = this.getEventDefinition(AbstractContext.E_INFO_CHANGED);
        if (ed != null) {
          this.fireEvent(AbstractContext.E_INFO_CHANGED, this.createContextInfoTable());
        }
      }
    }
  }

  public setGroup(group: string): void {
    const old = this.group;
    this.group = group;

    if (old == null || old !== group) {
      this.contextInfoChanged();
    }
  }

  getEventDefinitionsByGroup(group: string, caller: CallerController | null = null): Array<EventDefinition> {
    const res: Array<EventDefinition> = new Array<EventDefinition>();

    for (const ed of this.getEventDefinitions(caller)) {
      if (ed.getGroup() != null && (Util.equals(group, ed.getGroup()) || ed.getGroup().startsWith(group + ContextUtilsConstants.ENTITY_GROUP_SEPARATOR))) {
        res.push(ed);
      }
    }
    return res;
  }

  getEventDefinitions(caller: CallerController | null = null, includeHidden = false): Array<EventDefinition> {
    const list: Array<EventDefinition> = new Array<EventDefinition>();
    const debug = caller != null ? caller.getProperties().has(AbstractContext.CALLER_CONTROLLER_PROPERTY_DEBUG) : false;
    for (const d of this.eventData.values()) {
      const permissions: Permissions | null = d.getDefinition().getPermissions() != null ? d.getDefinition().getPermissions() : this.getPermissions();

      if (!this.checkPermissions(permissions, caller, this, d.getDefinition())) {
        continue;
      }

      if ((caller == null || caller.isPermissionCheckingEnabled()) && !includeHidden && d.getDefinition().isHidden() && !debug) {
        continue;
      }

      list.push(d.getDefinition());
    }
    return list;
  }

  getActionDefinition(name: string, caller?: CallerController): ActionDefinition | null {
    let actions;

    if (caller) actions = this.getActionDefinitions(caller, true);
    else actions = this.actionDefinitions;

    for (const def of actions) {
      if (def.getName() === name) {
        return def;
      }
    }

    return null;
  }

  getDefaultActionDefinition(caller: CallerController): ActionDefinition | null {
    for (const def of this.getActionDefinitions(caller, true)) {
      if (def.getName() === name) {
        return def;
      }
    }
    return null;
  }

  addActionDefinition(def: ActionDefinition): void {
    if (def.getName() == null) {
      throw new Error("Action name can't be NULL");
    }
    this.actionDefinitions = this.actionDefinitions.filter(actionDefinition => def.getName() !== actionDefinition.getName());
    this.actionDefinitions.push(def);
    this.actionDefinitions.sort((a, b) => {
      return a.compareTo(b);
    });
    if (this.isSetupComplete() && this.isFireUpdateEvents()) {
      const ed = this.getEventDefinition(AbstractContext.E_ACTION_ADDED);
      if (ed != null) {
        this.fireEvent(ed.getName(), this.actDefToDataRecord(def).wrap());
      }
    }
  }

  getActionDefinitions(caller: CallerController | null = null, includeHidden = false): Array<ActionDefinition> {
    const list: Array<ActionDefinition> = new Array<ActionDefinition>();
    const debug: boolean = caller != null ? caller.getProperties().has(AbstractContext.CALLER_CONTROLLER_PROPERTY_DEBUG) : false;
    for (const d of this.actionDefinitions) {
      if (!this.checkPermissions(d.getPermissions() != null ? d.getPermissions() : this.getPermissions(), caller, this, d)) {
        continue;
      }

      if (d.isHidden() && !debug && !includeHidden) {
        continue;
      }

      list.push(d);
    }
    return list;
  }

  removeActionDefinition(name: string): void {
    for (let i = 0; i < this.actionDefinitions.length; i++) {
      const def = this.actionDefinitions[i];
      if (def.getName() === name) {
        if (this.isSetupComplete() && this.isFireUpdateEvents()) {
          const ed = this.getEventDefinition(AbstractContext.E_ACTION_REMOVED);
          if (ed != null) {
            this.fireEvent(ed.getName(), [name]);
          }
          this.actionDefinitions.splice(i, 1);
          break;
        }
      }
    }
  }

  public actDefFromDataRecord(rec: DataRecord): BasicActionDefinition {
    const def: BasicActionDefinition = new BasicActionDefinition(rec.getString(ActionConstants.FIELD_AD_NAME));
    def.setDescription(rec.getString(ActionConstants.FIELD_AD_DESCRIPTION));
    def.setHelp(rec.getString(ActionConstants.FIELD_AD_HELP));

    /* const accelerator: string = rec.getString(ActionConstants.FIELD_AD_ACCELERATOR);
         if (accelerator != null) {
             def.setAccelerator(new KeyStroke(accelerator));
         }*/

    const dropSourcesTable: DataTable = rec.getDataTable(ActionConstants.FIELD_AD_DROP_SOURCES);
    if (dropSourcesTable != null && dropSourcesTable.getRecordCount() > 0) {
      const dropSources: Array<TreeMask> = new Array<TreeMask>();

      for (const ds of dropSourcesTable) {
        dropSources.push(new TreeMask(ds.getString(ActionConstants.FIELD_AD_RESOURCE_MASKS_RESOURCE_MASK)));
      }
      def.setDropSources(dropSources);
    }

    def.setHidden(rec.getBoolean(ActionConstants.FIELD_AD_HIDDEN));
    def.setEnabled(rec.getBoolean(ActionConstants.FIELD_AD_ENABLED));
    def.setIconId(rec.getString(ActionConstants.FIELD_AD_ICON_ID));
    def.setGroup(rec.getString(ActionConstants.FIELD_AD_GROUP));

    const executionGroup = rec.getString(ActionConstants.FIELD_AD_EXECUTION_GROUP);
    if (executionGroup != null) {
      def.setExecutionGroup(new GroupIdentifier(executionGroup));
    }

    def.setDefault(rec.getBoolean(ActionConstants.FIELD_AD_DEFAULT));

    return def;
  }

  private async getVariableByDefinition(def: VariableDefinition, caller: CallerController | null, request: RequestController | null): Promise<DataTable> {
    const startTime = Date.now();
    this.setupVariables();
    const data: VariableData = this.getVariableData(def.getName());
    try {
      const permissions: Permissions | null = def.getReadPermissions() != null ? def.getReadPermissions() : this.getPermissions();
      this.checkThisPermissions(permissions, caller, def);
      if (Log.CONTEXT_VARIABLES.isDebugEnabled()) {
        Log.CONTEXT_VARIABLES.debug("Trying to get variable '" + def.getName() + "' from context '" + this.getPath() + "'");
      }

      const result: DataTable = await this.executeGetter(data, caller, request);
      if (result.isInvalid()) {
        throw new Error(result.getInvalidationMessage() as string);
      }
      const endTime = Date.now();
      if (endTime - startTime > AbstractContext.LOW_PERFORMANCE_THRESHOLD) {
        const level = endTime - startTime > AbstractContext.VERY_LOW_PERFORMANCE_THRESHOLD ? LevelAdapter.INFO : LevelAdapter.DEBUG;
        Log.PERFORMANCE.log(level, "Getting value of variable '" + def + "' in context '" + this.getPath() + "' took " + (endTime - startTime) + ' milliseconds');
      }

      return result;
    } catch (e) {
      throw new Error(MessageFormat.format(Cres.get().getString('conErrGettingVar'), def.toString(), toString()) + e.message);
    } finally {
      data.registerGetOperation();
    }
  }

  private checkVariableValue(def: VariableDefinition, val: DataTable, caller: CallerController | null): DataTable {
    if (!this.valueCheckingEnabled) {
      return val;
    }

    let value = val;

    if (caller == null || !caller.getProperties().has(AbstractContext.CALLER_CONTROLLER_PROPERTY_NO_VALIDATION)) {
      const msg: string | null = this.checkVariableValueFormat(def, value);

      if (msg != null) {
        Log.CONTEXT_VARIABLES.debug("Invalid value of variable '" + def.getName() + "': " + msg);

        let newValue: DataTable = this.getDefaultValue(def);
        DataTableReplication.copy(value, newValue, true, true, true, true, true);
        const converters: Array<CompatibilityConverter> = def.getCompatibilityConverters();

        for (const converter of converters) {
          try {
            newValue = converter.convert(value, newValue);
          } catch (e) {
            Log.CONTEXT_VARIABLES.warn("Error converting value of variable '" + def.getName() + "' by '" + converter + "': " + e.message);
          }
        }

        value = newValue;
        this.checkVariableValueFormat(def, value);
      }
    }

    return value;
  }

  private checkVariableValueFormat(def: VariableDefinition, table: DataTable): string | null {
    if (!this.valueCheckingEnabled) {
      return null;
    }

    const requiredFormat: TableFormat | null = def.getFormat();

    if (requiredFormat != null) {
      const msg: string | null = table.conformMessage(requiredFormat);
      if (msg != null) {
        return 'Invalid format: ' + msg;
      }
    }

    return null;
  }

  private async executeGetter(data: VariableData, caller: CallerController | null, request: RequestController | null): Promise<DataTable> {
    let result: DataTable | null = this.executeGetterMethod(data, caller, request);
    if (result != null) {
      return result;
    }

    const def: VariableDefinition = data.getDefinition();

    const getter = def.getGetter();
    if (getter != null) {
      result = getter(this, def, caller, request);
    }
    if (result != null) {
      return result;
    }

    result = await this.getVariableImpl(def, caller, request);
    if (result != null) {
      return result;
    }

    return this.executeDefaultGetterByDefinition(def, caller, false, true); // Setting check to false as we'll check value later
  }

  private executeGetterMethod(data: VariableData, caller: CallerController | null, request: RequestController | null): DataTable | null {
    if (!data.isGetterCached()) {
      const method = Object.getOwnPropertyDescriptor(this, AbstractContext.GETTER_METHOD_PREFIX + data.getDefinition().getName());
      data.setGetterCached(true);
      if (method) {
        data.setGetterMethod(method);
      } else {
        return null;
      }
    }
    const getter: PropertyDescriptor | null = data.getGetterMethod();
    if (getter != null) {
      getter.value(data.getDefinition(), caller, request);
    }
    return null;
  }

  public executeDefaultGetter(name: string, caller: CallerController, check = true, createDefault = true): DataTable {
    const def: VariableDefinition | null = this.getVariableDefinition(name);

    if (def == null) {
      throw new Error(MessageFormat.format(Cres.get().getString('conVarNotAvailExt'), name, this.getPath()));
    }

    return this.executeDefaultGetterByDefinition(def, caller, check, createDefault);
  }

  private executeDefaultGetterByDefinition(def: VariableDefinition, caller: CallerController | null, check: boolean, createDefault: boolean): DataTable {
    const value: DataTable = this.executeDefaultGetterImpl(def, caller);

    if (value == null) {
      if (createDefault) return this.getDefaultValue(def);
      throw new Error('npe' + def.getName());
    }

    return check ? this.checkVariableValue(def, value, caller) : value;
  }

  protected executeDefaultGetterImpl(vd: VariableDefinition, caller: CallerController | null): DataTable {
    const value = this.getVariableData(vd.getName()).getValue();

    return value != null ? (value as DataTable) : this.getDefaultValue(vd);
  }

  public equals(obj: JObject | null): boolean {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    const other: AbstractContext<C, M> = obj as AbstractContext<C, M>;
    if (this.getRoot() != other.getRoot()) return false;
    if (!Util.equals(this.getPath(), other.getPath())) {
      return false;
    }
    return true;
  }

  async getVariable(name: string, caller?: CallerController | null, request?: RequestController | null): Promise<DataTable> {
    return await this.getVariableByDefinition(this.getAndCheckVariableDefinition(name), caller ?? null, request ?? null);
  }

  async getVariableClone(name: string, caller: CallerController | null): Promise<DataTable> {
    return (await this.getVariable(name, caller)).clone();
  }

  protected async getVariableImpl(def: VariableDefinition, caller: CallerController | null, request: RequestController | null): Promise<DataTable | null> {
    return null;
  }

  async getVariableObject(name: string, caller: CallerController | null): Promise<any> {
    const def: VariableDefinition = this.getAndCheckVariableDefinition(name);
    const data: VariableData = this.getVariableData(name);
    if (this.isSetupComplete() && data.getValue() != null) {
      return data.getValue();
    }

    if (def.getValueClass() == null) {
      throw new Error('Value class not defined for variable: ' + def.toDetailedString());
    }

    let value;

    const table: DataTable = await this.getVariable(name, caller);

    const format = def.getFormat() as TableFormat;
    const list = DataTableConversion.beansFromTable(table, def.getValueClass(), format, true);

    if (format.isSingleRecord()) {
      value = list[0];
    } else {
      value = list;
    }
    // Caching must be disabled if write lock is held by current thread (e.g. this method is called from variable setter)
    if (this.isSetupComplete() && def.isLocalCachingEnabled() /*&& !data.getReadWriteLock().isWriteLockedByCurrentThread()*/) {
      data.setValue(value);
    }
    return value;
  }

  private async setVariableByDefinition(def: VariableDefinition, caller: CallerController | null, request: RequestController | null, value: DataTable): Promise<void> {
    const startTime = Date.now();
    this.setupVariables();
    const data: VariableData = this.getVariableData(def.getName());
    try {
      if (value == null) {
        throw new Error('Value cannot be NULL');
      }
      let resultingValue: DataTable = value;
      const permissions: Permissions | null = def.getWritePermissions() != null ? def.getWritePermissions() : this.getPermissions();
      this.checkThisPermissions(permissions, caller, def);
      if (!def.isWritable() && caller != null && caller.isPermissionCheckingEnabled()) {
        throw new Error(Cres.get().getString('conVarReadOnly'));
      }

      if (Log.CONTEXT_VARIABLES.isDebugEnabled()) {
        Log.CONTEXT_VARIABLES.debug("Trying to set variable '" + def.getName() + "' in context '" + this.getPath() + "'");
      }

      if (def.storeChangesOnlyInHistory()) {
        const oldValue: DataTable = await this.getVariableByDefinition(def, caller, request);
        const valueNotChanged: boolean = value.equals(oldValue);
        if (valueNotChanged) return;
      }
      if (caller == null || !caller.getProperties().has(AbstractContext.CALLER_CONTROLLER_PROPERTY_NO_VALIDATION)) {
        value.validate(this, this.getContextManager(), caller);
      }

      if (value.getTimestamp() == null) {
        value = value.cloneIfImmutable();
        resultingValue = value;
        value.setTimestamp(new Date());
      }
      // Preventing changes to read-only fields to be made by "client" callers (i.e. ones with permission checking enabled)
      const format = def.getFormat();
      if (value.isSimple() && format != null && format.hasReadOnlyFields() && caller != null && caller.isPermissionCheckingEnabled()) {
        resultingValue = (await this.getVariableByDefinition(def, caller, request)).clone();
        DataTableReplication.copy(value, resultingValue, false, true, true, true, true);
        this.checkVariableValueFormat(def, resultingValue);
      }

      if (caller == null || !caller.getProperties().has(AbstractContext.CALLER_CONTROLLER_PROPERTY_NO_VALIDATION)) {
        const msg: string | null = this.checkVariableValueFormat(def, resultingValue);

        if (msg != null) {
          Log.CONTEXT_VARIABLES.debug("Invalid value of variable '" + def.getName() + "': " + msg + ' (value: ' + resultingValue + ')');
          value = resultingValue;
          resultingValue = (await this.getVariableByDefinition(def, caller, request)).clone();
          DataTableReplication.copy(value, resultingValue, true, true, true, true, true);
        }
      }
      if (def.isLocalCachingEnabled()) {
        data.setValue(null); // Resetting cache
      }

      if (this.executeSetter(data, caller, request, resultingValue)) this.variableUpdated(def, caller, resultingValue);

      const endTime = Date.now();
      if (endTime - startTime > AbstractContext.LOW_PERFORMANCE_THRESHOLD) {
        const level = endTime - startTime > AbstractContext.VERY_LOW_PERFORMANCE_THRESHOLD ? LevelAdapter.INFO : LevelAdapter.DEBUG;
        Log.PERFORMANCE.log(level, "Setting value of variable '" + def + "' in context '" + this.getPath() + "' took " + (endTime - startTime) + ' milliseconds');
      }
    } finally {
      data.registerSetOperation();
    }
  }

  protected variableUpdated(def: VariableDefinition, caller: CallerController | null, value: DataTable): void {
    this.fireUpdatedEvent(def, caller, value);

    this.fireChangeEvent(def, caller, new Date(), value);
  }

  protected fireUpdatedEvent(def: VariableDefinition, caller: CallerController | null, value: DataTable): void {
    const callerAllowsUpdatedEvents: boolean = caller == null || !caller.getProperties().has(AbstractContext.CALLER_CONTROLLER_PROPERTY_NO_UPDATED_EVENTS);

    if (this.isAllowUpdatedEvents(def) && callerAllowsUpdatedEvents) {
      const ed: EventDefinition | null = this.getEventDefinition(AbstractContext.E_UPDATED);
      if (ed != null) {
        this.fireEvent(AbstractContext.E_UPDATED, [def.getName(), value, caller != null ? caller.getUsername() : null]);
      }
    }
  }

  public fireChangeEvent(def: VariableDefinition, caller: CallerController | null, timestamp: Date, value: DataTable): void {
    const callerAllowsChangeEvents: boolean = caller == null || !caller.getProperties().has(AbstractContext.CALLER_CONTROLLER_PROPERTY_NO_CHANGE_EVENTS);

    if (this.isAllowUpdatedEvents(def) && callerAllowsChangeEvents) {
      const ed: EventDefinition | null = this.getEventDefinition(AbstractContext.E_CHANGE);
      if (ed != null) {
        const fer = new FireChangeEventRequestController(def.getChangeEventsExpirationPeriod(), def, value);

        const eventData = DataTableFactory.createWithFirstRecord(ed.getFormat(), def.getName());

        this._fireEvent(ed, eventData, EventLevel.NONE, null, timestamp, null, caller, fer, null);
      }
    }
  }

  protected isAllowUpdatedEvents(def: VariableDefinition): boolean {
    return this.setupComplete && this.fireUpdateEvents && def != null && def.isAllowUpdateEvents();
  }

  protected setupVariables(): void {}

  private executeSetter(data: VariableData, caller: CallerController | null, request: RequestController | null, value: DataTable): boolean {
    const def: VariableDefinition = data.getDefinition();

    if (!this.isAllowSetterExecution(def, request, value)) return false;

    if (this.executeSetterMethod(data, caller, request, value)) {
      return true;
    }
    const setter = def.getSetter();
    if (setter != null) {
      if (setter(this, def, caller, request, value)) {
        return true;
      }
    }

    if (this.setVariableImpl(def, caller, request, value)) {
      return true;
    }

    this.executeDefaultSetter(def, caller, value);
    return true;
  }

  private executeSetterMethod(data: VariableData, caller: CallerController | null, request: RequestController | null, value: DataTable): boolean {
    if (!data.isSetterCached()) {
      const method = Object.getOwnPropertyDescriptor(this, AbstractContext.SETTER_METHOD_PREFIX + data.getDefinition().getName());
      data.setSetterCached(true);
      if (method) {
        data.setSetterMethod(method);
      } else {
        return false;
      }
    }
    const setter: PropertyDescriptor | null = data.getSetterMethod();
    if (setter != null) {
      setter.value(data.getDefinition(), caller, request);
    }
    return false;
  }

  public getDefaultValue(def: VariableDefinition): DataTable {
    if (def.getDefaultValue() != null) {
      return def.getDefaultValue() as DataTable;
    }
    return new SimpleDataTable(def.getFormat(), true);
  }

  public executeDefaultSetter(def: VariableDefinition, caller: CallerController | null, value: DataTable): void {
    this.executeDefaultSetterImpl(def, caller, value);
  }

  protected executeDefaultSetterImpl(vd: VariableDefinition, caller: CallerController | null, value: DataTable): void {
    this.getVariableData(vd.getName()).setValue(value);
  }

  async setVariable(name: string, value: DataTable, caller?: CallerController | null, request?: RequestController | null): Promise<void> {
    const def = this.getAndCheckVariableDefinition(name);
    await this.setVariableByDefinition(def, caller ?? null, request ?? null, value);
  }

  protected setVariableImpl(def: VariableDefinition, caller: CallerController | null, request: RequestController | null, value: DataTable): boolean {
    return false;
  }

  protected isAllowSetterExecution(data: VariableDefinition, request: RequestController | null, value: DataTable): boolean {
    return true;
  }

  private getAndCheckVariableDefinition(name: string): VariableDefinition {
    this.setupVariables();

    const def: VariableDefinition | null = this.getVariableDefinition(name);

    if (def == null) {
      throw new Error(MessageFormat.format(Cres.get().getString('conVarNotAvailExt'), name, this.getPath()));
    }
    return def;
  }

  async setVariableField(variable: string, field: string, record = 0, value: any, cc: CallerController | null): Promise<boolean> {
    const tab: DataTable = await this.getVariableClone(variable, cc);

    tab.setTimestamp(new Date());
    const old = tab.getRecord(record).getValue(field);
    tab.getRecord(record).setValue(field, value);
    this.setVariable(variable, tab, cc);
    return old == null ? value != null : !Util.equals(old, value);
  }

  public async addVariableRecord(variable: string, cc: CallerController | null, record: DataRecord | Array<any>): Promise<void> {
    const tab = await this.getVariableClone(variable, cc);

    if (record instanceof DataRecord) {
      tab.addRecordFromRecord(record);
    } else {
      const rec = tab.addRecord() as DataRecord;
      for (let i = 0; i < record.length; i++) {
        rec.addValue(record[i]);
      }
    }

    await this.setVariable(variable, tab, cc);
  }

  public compareTo(context: Context<C, M>): number {
    const index = this.getIndex();
    const otherIndex = context.getIndex();
    if (index != null || otherIndex != null) {
      const my: number = index != null ? index : 0;
      const other: number = otherIndex != null ? otherIndex : 0;
      return Util.compare(other, my);
    } else {
      return this.getName().localeCompare(context.getName());
    }
  }

  public async removeVariableRecords(variable: string, cc: CallerController | null, field: string, value: any): Promise<void> {
    const tab = await this.getVariableClone(variable, cc);

    for (let i = 0; i < tab.getRecords().length; i++) {
      const rec = tab.getRecords()[i];
      if (Util.equals(rec.getValue(field), value)) {
        tab.getRecords().splice(i, 1);
      }
    }
    await this.setVariable(variable, tab, cc);
  }

  protected async callFunctionByDefinition(def: FunctionDefinition, parameters: DataTable, caller: CallerController | null, request: RequestController | null): Promise<DataTable> {
    const startTime = Date.now();

    this.setupFunctions();

    const data: FunctionData = this.getFunctionData(def.getName());
    try {
      this.checkThisPermissions(def.getPermissions() != null ? def.getPermissions() : this.getPermissions(), caller, def);

      Log.CONTEXT_FUNCTIONS.debug("Trying to call function '" + def.getName() + "' of context '" + this.getPath() + "'");

      if (def.getPermissions() != null) {
        this.checkThisPermissions(def.getPermissions(), caller, def);
      }

      const requiredInputFormat: TableFormat | null = def.getInputFormat();
      const requiredOutputFormat: TableFormat | null = def.getOutputFormat();

      parameters.validate(this, this.getContextManager(), caller);

      if (this.valueCheckingEnabled && requiredInputFormat != null && (caller == null || !caller.getProperties().has(AbstractContext.CALLER_CONTROLLER_PROPERTY_NO_VALIDATION))) {
        let msg = parameters.conformMessage(requiredInputFormat);
        if (msg !== null) {
          Log.CONTEXT_FUNCTIONS.debug("Invalid input format of function '" + def.getName() + "': " + msg);

          const newParameters: DataTable = new SimpleDataTable(def.getInputFormat(), true);
          DataTableReplication.copy(parameters, newParameters, true, true, true, true, true);
          parameters = newParameters;

          msg = parameters.conformMessage(requiredInputFormat);
          if (msg !== null) {
            throw new Error('Invalid format: ' + msg);
          }
        }
      }
      let result: DataTable = await this.executeImplementation(data, caller, request, parameters);

      if (result.isInvalid()) {
        if (result.getInvalidationMessage() != null) throw new Error(result.getInvalidationMessage() as string);
        else throw new Error();
      }

      if (result.getRecordCount() != null && result.getRecordCount() == 0 && result.getFormat().getFieldCount() == 0) {
        result.setFormat(def.getOutputFormat());
      }

      if (this.valueCheckingEnabled && requiredOutputFormat != null && (caller == null || !caller.getProperties().has(AbstractContext.CALLER_CONTROLLER_PROPERTY_NO_VALIDATION))) {
        let msg: string | null = result.conformMessage(requiredOutputFormat);
        if (msg != null) {
          Log.CONTEXT_FUNCTIONS.debug("Invalid output format of function '" + def.getName() + "': " + msg);

          const newResult: DataTable = new SimpleDataTable(def.getOutputFormat(), true);
          DataTableReplication.copy(result, newResult, true, true, true, true, true);
          result = newResult;

          msg = result.conformMessage(requiredOutputFormat);
          if (msg != null) {
            throw new Error("Function '" + def.getName() + "' of context '" + this.getPath() + "' returned value of invalid format: " + msg);
          }
        }
      }
      const endTime = Date.now();
      if (endTime - startTime > AbstractContext.LOW_PERFORMANCE_THRESHOLD) {
        const level = endTime - startTime > AbstractContext.VERY_LOW_PERFORMANCE_THRESHOLD ? LevelAdapter.INFO : LevelAdapter.DEBUG;
        Log.PERFORMANCE.log(level, "Function '" + def + "' in context '" + this.getPath() + "' was executing for " + (endTime - startTime) + ' milliseconds');
      }
      return result;
    } catch (e) {
      throw new Error(MessageFormat.format(Cres.get().getString('conErrCallingFunc'), def.toString(), toString()) + e.message);
    } finally {
      data.registerExecution();
    }
  }

  private async executeImplementation(data: FunctionData, caller: CallerController | null, request: RequestController | null, parameters: DataTable): Promise<DataTable> {
    let result: DataTable | null = this.executeImplementationMethod(data, caller, request, parameters);

    if (result != null) {
      return result;
    }

    const def: FunctionDefinition = data.getDefinition();
    const impl = def.getImplementation();
    if (impl != null) {
      result = impl(this, def, caller, request, parameters);

      if (result != null) {
        return result;
      }

      return this.getDefaultFunctionOutput(def);
    }

    result = await this.callFunctionImpl(def, caller, request, parameters);

    if (result != null) {
      return result;
    }

    throw new Error(MessageFormat.format(Cres.get().getString('conFuncNotImpl'), def.getName(), this.getPath()));
  }

  private executeImplementationMethod(data: FunctionData, caller: CallerController | null, request: RequestController | null, parameters: DataTable): DataTable | null {
    const def: FunctionDefinition = data.getDefinition();
    if (!data.isImplementationCached()) {
      const method = Object.getOwnPropertyDescriptor(this, AbstractContext.IMPLEMENTATION_METHOD_PREFIX + data.getDefinition().getName());
      data.setImplementationCached(true);
      if (method) {
        data.setImplementationMethod(method);
      } else {
        return null;
      }
    }
    const implementation = data.getImplementationMethod();
    if (implementation) {
      const result = implementation.value(def, caller, request, parameters);
      if (result != null) {
        return result;
      }
      return this.getDefaultFunctionOutput(def);
    }
    return null;
  }

  private getDefaultFunctionOutput(def: FunctionDefinition): DataTable {
    const format: TableFormat | null = def.getOutputFormat();
    return format != null ? new SimpleDataTable(format, true) : new SimpleDataTable();
  }

  protected setupFunctions(): void {}

  async callFunction(name: string, parameters: DataTable | Array<any> | null = null, caller?: CallerController | null, request?: RequestController | null): Promise<DataTable> {
    const c = caller ?? null;
    const r = request ?? null;

    const def: FunctionDefinition = this.getAndCheckFunctionDefinition(name);
    if (parameters === null) {
      return await this.callFunctionByDefinition(def, new SimpleDataTable(def.getInputFormat(), true), c, r);
    }
    if (parameters instanceof AbstractDataTable) {
      return await this.callFunctionByDefinition(def, parameters as AbstractDataTable, c, r);
    } else {
      return await this.callFunctionByDefinition(def, DataTableFactory.createWithFirstRecord(def.getInputFormat(), ...parameters), c, r);
    }
  }

  protected async callFunctionImpl(def: FunctionDefinition, caller: CallerController | null, request: RequestController | null, parameters: DataTable): Promise<DataTable | null> {
    return null;
  }

  private getAndCheckFunctionDefinition(name: string): FunctionDefinition {
    this.setupFunctions();

    const def: FunctionDefinition | null = this.getFunctionDefinition(name);

    if (def == null) {
      throw new Error(MessageFormat.format(Cres.get().getString('conFuncNotAvailExt'), name, this.getPath()));
    }
    return def;
  }

  addVariableDefinition(def: VariableDefinition): void {
    const normalizedVariableName: string = def.getName().toLowerCase();

    if (this.getVariableDefinition(def.getName()) != null) {
      const variableData: VariableData = this.variableData.get(normalizedVariableName) as VariableData;
      variableData.setDefinition(def);

      if (variableData.getValue() instanceof AbstractDataTable) {
        const oldValue: DataTable = variableData.getValue() as AbstractDataTable;
        const resultingValue: DataTable = new SimpleDataTable(def.getFormat());
        DataTableReplication.copy(oldValue, resultingValue, true, true, true, true, true);
        variableData.setValue(resultingValue);
      }
    } else {
      this.variableData.set(normalizedVariableName, new VariableData(def));
    }

    if (this.setupComplete && this.fireUpdateEvents && !def.isHidden()) {
      this.fireVariableAdded(def);
    }

    this.getContextManager()?.variableAdded(this, def);
  }

  protected fireVariableAdded(def: VariableDefinition): void {
    const ed: EventDefinition | null = this.getEventDefinition(AbstractContext.E_VARIABLE_ADDED);
    if (ed != null) {
      this.fireEvent(ed.getName(), DataTableFactory.createFromDataRecord(this.varDefToDataRecord(def, null)));
    }
  }

  removeVariableDefinition(name: string): void {
    const def: VariableDefinition | null = this.getVariableDefinition(name);
    if (def == null) {
      return;
    }

    const data: boolean = this.variableData.delete(def.getName().toLowerCase());
    if (!data) return;

    if (this.variableStatuses != null) {
      this.variableStatuses.delete(def.getName());
      this.variableStatusesTable = null;
    }

    if (this.setupComplete && this.fireUpdateEvents && !def.isHidden()) {
      const ed: EventDefinition | null = this.getEventDefinition(AbstractContext.E_VARIABLE_REMOVED);
      if (ed != null) {
        this.fireEvent(ed.getName(), [def.getName()]);
      }
    }
    this.getContextManager()?.variableRemoved(this, def);
  }

  addFunctionDefinition(def: FunctionDefinition): void {
    const normalizedFunctionName = def.getName().toLowerCase();

    if (this.getFunctionDefinition(def.getName()) != null) {
      this.functionData.get(normalizedFunctionName)?.setDefinition(def);
    } else {
      this.functionData.set(normalizedFunctionName, new FunctionData(def));
    }

    if (this.setupComplete && this.fireUpdateEvents && !def.isHidden()) {
      this.fireFunctionAdded(def);
    }

    this.getContextManager()?.functionAdded(this, def);
  }

  protected fireFunctionAdded(def: FunctionDefinition): void {
    const ed: EventDefinition | null = this.getEventDefinition(AbstractContext.E_FUNCTION_ADDED);
    if (ed != null) {
      this.fireEvent(ed.getName(), DataTableFactory.createFromDataRecord(this.funcDefToDataRecord(def, null)));
    }
  }

  removeFunctionDefinition(name: string): void {
    const def = this.getFunctionDefinition(name);
    if (def == null) {
      return;
    }

    this.functionData.delete(def.getName().toLowerCase());
    if (this.setupComplete && this.fireUpdateEvents && !def.isHidden()) {
      const ed = this.getEventDefinition(AbstractContext.E_FUNCTION_REMOVED);
      if (ed != null) {
        this.fireEvent(ed.getName(), [def.getName()]);
      }
    }
    this.getContextManager()?.functionRemoved(this, def);
  }

  addEventDefinition(def: EventDefinition): void {
    const normalizedEventName = def.getName().toLowerCase();

    const existentDefinition: EventDefinition | null = this.getEventDefinition(def.getName());
    if (existentDefinition != null) {
      (this.eventData.get(normalizedEventName) as EventData).setDefinition(def);
    } else {
      this.eventData.set(normalizedEventName, new EventData(def, this));
    }

    if (this.setupComplete && this.fireUpdateEvents && !def.isHidden()) {
      this.fireEventAdded(def);
    }

    this.getContextManager()?.eventAdded(this, def);
  }

  protected fireEventAdded(def: EventDefinition): void {
    const ed: EventDefinition | null = this.getEventDefinition(AbstractContext.E_EVENT_ADDED);
    if (ed != null) {
      this.fireEvent(ed.getName(), DataTableFactory.createFromDataRecord(this.evtDefToDataRecord(def, null)));
    }
  }

  removeEventDefinition(name: string): void {
    const def = this.getEventDefinition(name);
    if (def == null) {
      return;
    }
    if (this.eventData.delete(def.getName().toLowerCase())) {
      if (this.setupComplete && this.fireUpdateEvents && !def.isHidden()) {
        const ed: EventDefinition | null = this.getEventDefinition(AbstractContext.E_EVENT_REMOVED);
        if (ed != null) {
          this.fireEvent(ed.getName(), [def.getName()]);
        }
      }

      this.getContextManager()?.eventRemoved(this, def);
    }
  }

  getVariableData(name: string): VariableData {
    return this.variableData.get(name.toLocaleLowerCase()) as VariableData;
  }

  getVariableDefinition(name: string, caller: CallerController | null = null): VariableDefinition | null {
    if (!caller) {
      const data = this.getVariableData(name);
      return data != null ? data.getDefinition() : null;
    }
    const def: VariableDefinition | null = this.getVariableDefinition(name);

    if (def == null) {
      return null;
    }

    const readPermissions: Permissions | null = def.getReadPermissions() != null ? def.getReadPermissions() : this.getPermissions();
    const writePermissions: Permissions | null = def.getWritePermissions() != null ? def.getWritePermissions() : this.getPermissions();

    const readAccessGranted: boolean = this.checkPermissions(readPermissions, caller, this, def);
    const writeAccessGranted: boolean = this.checkPermissions(writePermissions, caller, this, def);

    return readAccessGranted || writeAccessGranted ? def : null;
  }

  getFunctionData(name: string): FunctionData {
    return this.functionData.get(name.toLowerCase()) as FunctionData;
  }

  getFunctionDefinition(name: string, caller: CallerController | null = null): FunctionDefinition | null {
    const data: FunctionData = this.getFunctionData(name);
    const def = data != null ? data.getDefinition() : null;

    if (def == null) {
      return null;
    }
    const permissions: Permissions | null = def.getPermissions() != null ? def.getPermissions() : this.getPermissions();
    const accessGranted: boolean = this.checkPermissions(permissions, caller, this, def);

    return accessGranted ? def : null;
  }

  getEventData(name: string): EventData {
    return this.eventData.get(name.toLowerCase()) as EventData;
  }

  getEventDefinition(name: string, caller: CallerController | null = null): EventDefinition | null {
    const data: EventData = this.getEventData(name);
    const def = data != null ? data.getDefinition() : null;

    if (def == null) {
      return null;
    }
    const permissions: Permissions | null = def.getPermissions() != null ? def.getPermissions() : this.getPermissions();
    const accessGranted: boolean = this.checkPermissions(permissions, caller, this, def);

    return accessGranted ? def : null;
  }

  private getAndCheckEventDefinition(name: string): EventDefinition {
    this.setupEvents();

    const def: EventDefinition | null = this.getEventDefinition(name);

    if (def == null) {
      throw new Error(MessageFormat.format(Cres.get().getString('conEvtNotAvailExt'), name, this.getPath()));
    }

    return def;
  }

  protected setupEvents(): void {}

  protected postEvent(ev: Event, ed: EventDefinition, caller: CallerController | null, request: FireEventRequestController | null): void {}

  protected updateEvent(ev: Event, ed: EventDefinition, caller: CallerController | null, request: FireEventRequestController | null): void {}

  protected _fireEvent(
    ed: EventDefinition,
    data: DataTable,
    level: number,
    id: number | null,
    creationtime: Date | null,
    listener: number | null,
    caller: CallerController | null,
    request: FireEventRequestController | null,
    permissions: Permissions | null
  ): Event | null {
    if (id == null) {
      id = EventUtils.generateEventId();
    }

    const event: Event = Event.createEventWithPermission(this.getPath(), ed, level == AbstractContext.DEFAULT_EVENT_LEVEL ? ed.getLevel() : level, data, id, creationtime, permissions);
    return this._fireEventWithEvent(ed, event, listener, caller, request);
  }

  protected _fireEventWithEvent(ed: EventDefinition, event: Event, listener: number | null, caller: CallerController | null, request: FireEventRequestController | null): Event | null {
    const logger = Log.CONTEXT_EVENTS;
    if (caller != null) {
      this.checkThisPermissions(ed.getFirePermissions() != null ? ed.getFirePermissions() : this.getPermissions(), caller, ed);
    }
    const rule: EventProcessingRule | null = this.getEventProcessingRule(event);

    const prefilter: Expression | null = rule != null ? rule.getPrefilterExpression() : null;
    if (prefilter != null) {
      try {
        const evaluator: Evaluator = new Evaluator(this.getContextManager(), this, event.getData(), this.getEventProcessingCallerController());

        if (!evaluator.evaluateToBoolean(prefilter)) {
          rule?.addFiltered();

          if (logger.isDebugEnabled()) {
            logger.debug("Event '" + ed + "' in context '" + this.getPath() + "' was suppressed by pre-filter");
          }

          return null;
        }
      } catch (ex) {
        logger.info("Error processing pre-filter expression for event '" + ed + "' in context '" + this.getPath() + "': " + ex.message, ex);
      }
    }

    if (logger.isDebugEnabled()) {
      logger.debug('Event fired: ' + event);
    }

    event.setListener(listener);

    event.setSessionID(caller != null ? caller.getSessionID() : null);

    if (request != null) {
      event.setOriginator(request.getOriginator());
    }
    const edata: EventData = this.getEventData(ed.getName());

    if (edata == null) {
      return null;
    }

    edata.registerFiredEvent();

    const deduplicator: Expression | null = rule != null ? rule.getDeduplicatorExpression() : null;
    if (deduplicator != null) {
      try {
        const evaluator: Evaluator = new Evaluator(this.getContextManager(), this, event.getData(), this.getEventProcessingCallerController());

        const deduplicationId: string = evaluator.evaluateToString(deduplicator);

        event.setDeduplicationId(deduplicationId);
      } catch (ex) {
        logger.info("Error processing deduplicator expression for event '" + ed + "' in context '" + this.getPath() + "': " + ex.message, ex);
      }
    }

    if (event.getData()?.isInvalid()) {
      throw new Error(event.getData()?.getInvalidationMessage());
    }

    const format = ed.getFormat();
    if (format != null) {
      const msg = event.getData()?.conformMessage(format);
      if (msg != null) {
        logger.debug("Wrong format data for event '" + ed + "' in context '" + toString() + "': " + msg);
        const newData: DataTable = new SimpleDataTable(ed.getFormat(), true);
        // TODO Value can't be null?
        DataTableReplication.copy(event.getData() as DataTable, newData);
        event.setData(newData);
      }
    }

    this.processBindings(event);

    this.processEnrichments(event, rule, caller);

    let customExpirationPeriod: number | null = null;

    if (request != null && request.getCustomExpirationPeriod() != null) {
      customExpirationPeriod = request.getCustomExpirationPeriod();
    }

    if (customExpirationPeriod != null) {
      if (customExpirationPeriod > 0) {
        event.setExpirationtime(new Date(Date.now() + customExpirationPeriod));
      }
      // Otherwise event won't be persisted
    } else {
      const userDefinedExpirationPeriod: number | null = rule != null ? rule.getPeriod() : null;
      if (userDefinedExpirationPeriod != null && userDefinedExpirationPeriod > 0) {
        event.setExpirationtime(new Date(Date.now() + userDefinedExpirationPeriod));
      }
      // Otherwise event won't be persisted
    }
    const customMemoryStorageSize: number | null = rule != null ? (rule.getDeduplicator() != null && rule.getDeduplicator().length > 0 ? rule.getQueue() : null) : null;

    const processed: Event = request != null ? request.process(event) : event;

    if (processed == null) {
      return null;
    }

    const duplicate: Event | null = edata.store(processed, customMemoryStorageSize);

    if (duplicate == null) {
      this.postEvent(event, ed, caller, request);

      if (rule != null) {
        rule.addSaved();
      }
    } else {
      this.updateEvent(duplicate, ed, caller, request);

      if (rule != null) {
        rule.addDuplicate();
      }
    }
    if (this.contextManager != null && (duplicate == null || rule == null || rule.isDuplicateDispatching())) {
      this.contextManager.queue(edata, event, request);
    }
    return event;
  }

  fireEvent(
    name: string,
    data: DataTable | Array<any> | null = null,
    caller: CallerController | null = null,
    level: number = AbstractContext.DEFAULT_EVENT_LEVEL,
    id: number | null = null,
    creationtime: Date | null = null,
    listener: number | null = null,
    request: FireEventRequestController | null = null
  ): Event | null {
    let params;
    const ed = this.getAndCheckEventDefinition(name);
    if (data === null) {
      params = new SimpleDataTable(ed.getFormat(), true);
    } else if (data instanceof Array) {
      params = DataTableFactory.createWithFirstRecord(ed.getFormat(), data);
    } else {
      params = data;
    }

    return this._fireEvent(this.getAndCheckEventDefinition(name), params, level, id, creationtime, listener, caller, request, null);
  }

  protected getEventProcessingRule(event: Event): EventProcessingRule | null {
    return null;
  }

  protected processBindings(event: Event): void {}

  private processEnrichments(event: Event, rule: EventProcessingRule | null, caller: CallerController | null): void {
    if (rule == null || rule.getEnrichments() == null) {
      return;
    }

    const evaluator: Evaluator = new Evaluator(this.getContextManager(), this, event.getData(), this.getEventProcessingCallerController());

    for (const enrichmentRule of rule.getEnrichments()) {
      const name: string = enrichmentRule.getName();
      try {
        const result = evaluator.evaluateToString(enrichmentRule.getEnrichmentExpression());

        if (result == null) {
          continue;
        }

        event.addEnrichment(new Enrichment(name, result.toString(), new Date(), caller != null ? caller.getUsername() : null));
      } catch (ex) {
        Log.CONTEXT_EVENTS.error("Error adding enrichment '" + name + "' to event '" + event + "': " + ex);
      }
    }
  }

  protected getEventProcessingCallerController(): CallerController {
    return (this.getContextManager() as ContextManager<any>).getCallerController();
  }

  getEventHistory(name: string): Array<Event> {
    const ed: EventData = this.getEventData(name);

    if (ed == null) {
      throw new Error(Cres.get().getString('conEvtNotAvail') + name);
    }

    return ed.getHistory();
  }

  toDetailedString(): string {
    const description = this.getDescription();
    return description != null ? description + ' (' + this.getPath() + ')' : this.getPath();
  }

  toString(): string {
    const description = this.getDescription();
    return description != null ? description : this.getPath();
  }

  accept(visitor: DefaultContextVisitor): void {
    if (visitor.shouldVisit(this)) {
      if (visitor.isConcurrent()) {
        throw new Error('not implemented yet');
      } else {
        visitor.visit(this);
        for (const child of this.children) {
          child.accept(visitor);
        }
      }
    }
  }

  protected getChangeEventDefinition(): EventDefinition {
    return AbstractContext.ED_CHANGE;
  }

  public getVvariables(def: VariableDefinition, caller: CallerController, request: RequestController): DataTable {
    const ans: DataTable = new SimpleDataTable(def.getFormat());
    for (const vardef of this.getVariableDefinitions(caller)) {
      ans.addRecordFromRecord(this.varDefToDataRecord(vardef, caller));
    }
    return ans;
  }

  protected encodeFormat(format: TableFormat | null, caller: CallerController | null): string | null {
    return format != null ? format.encodeUseSeparator(false) : null;
  }

  protected decodeFormat(source: string, caller: CallerController | null): TableFormat | null {
    return source != null ? TableFormat.createWithFormatAndSettings(source, new ClassicEncodingSettings(false)) : null;
  }

  protected varDefToDataRecord(vd: VariableDefinition, caller: CallerController | null = null): DataRecord {
    {
      const rec = new DataRecord(AbstractContext.VARIABLE_DEFINITION_FORMAT);

      rec.setValue(AbstractContext.FIELD_VD_NAME, vd.getName());
      rec.setValue(AbstractContext.FIELD_VD_FORMAT, this.encodeFormat(vd.getFormat(), caller));
      rec.setValue(AbstractContext.FIELD_VD_DESCRIPTION, vd.getDescription());
      rec.setValue(AbstractContext.FIELD_VD_READABLE, vd.isReadable());
      rec.setValue(AbstractContext.FIELD_VD_WRITABLE, vd.isWritable());
      rec.setValue(AbstractContext.FIELD_VD_HELP, vd.getHelp());
      rec.setValue(AbstractContext.FIELD_VD_GROUP, vd.getGroup());
      rec.setValue(AbstractContext.FIELD_VD_ICON_ID, vd.getIconId());
      rec.setValue(AbstractContext.FIELD_VD_HELP_ID, vd.getHelpId());
      rec.setValue(AbstractContext.FIELD_VD_CACHE_TIME, vd.getRemoteCacheTime());

      return rec;
    }
  }

  public varDefFromDataRecord(rec: DataRecord, caller: CallerController | null = null): VariableDefinition {
    const variable: string = rec.getString(AbstractContext.FIELD_VD_NAME);

    const readable: boolean = rec.getBoolean(AbstractContext.FIELD_VD_READABLE);

    const writable: boolean = rec.getBoolean(AbstractContext.FIELD_VD_WRITABLE);

    let format: TableFormat | null;
    try {
      format = this.decodeFormat(rec.getString(AbstractContext.FIELD_VD_FORMAT), caller);
    } catch (ex) {
      throw new Error("Error decoding format of variable '" + variable + "': " + ex.message);
    }

    const def: VariableDefinition = new VariableDefinition(variable, format, readable, writable, rec.getString(AbstractContext.FIELD_VD_DESCRIPTION), rec.getString(AbstractContext.FIELD_VD_GROUP));

    def.setHelp(rec.getString(AbstractContext.FIELD_VD_HELP));
    def.setIconId(rec.getString(AbstractContext.FIELD_VD_ICON_ID));

    if (rec.hasField(AbstractContext.FIELD_VD_HELP_ID)) {
      def.setHelpId(rec.getString(AbstractContext.FIELD_VD_HELP_ID));
    }

    if (rec.hasField(AbstractContext.FIELD_VD_CACHE_TIME)) {
      def.setRemoteCacheTime(rec.getLong(AbstractContext.FIELD_VD_CACHE_TIME));
    }

    return def;
  }

  public getVfunctions(def: VariableDefinition, caller: CallerController, request: RequestController): DataTable {
    const ans: DataTable = new SimpleDataTable(def.getFormat());
    for (const funcdef of this.getFunctionDefinitions(caller)) {
      ans.addRecordFromRecord(this.funcDefToDataRecord(funcdef, caller));
    }
    return ans;
  }

  protected funcDefToDataRecord(fd: FunctionDefinition, caller: CallerController | null = null): DataRecord {
    const rec: DataRecord = new DataRecord(AbstractContext.FUNCTION_DEFINITION_FORMAT);
    rec.setValue(AbstractContext.FIELD_FD_NAME, fd.getName());
    rec.setValue(AbstractContext.FIELD_FD_INPUTFORMAT, this.encodeFormat(fd.getInputFormat(), caller));
    rec.setValue(AbstractContext.FIELD_FD_OUTPUTFORMAT, this.encodeFormat(fd.getOutputFormat(), caller));
    rec.setValue(AbstractContext.FIELD_FD_DESCRIPTION, fd.getDescription());
    rec.setValue(AbstractContext.FIELD_FD_HELP, fd.getHelp());
    rec.setValue(AbstractContext.FIELD_FD_GROUP, fd.getGroup());
    rec.setValue(AbstractContext.FIELD_FD_ICON_ID, fd.getIconId());
    rec.setValue(AbstractContext.FIELD_FD_CONCURRENT, fd.isConcurrent());
    if (fd.getPermissions() != null) rec.setValue(AbstractContext.FIELD_FD_PERMISSIONS, (fd.getPermissions() as Permissions).encode());

    return rec;
  }

  public funcDefFromDataRecord(rec: DataRecord, caller: CallerController | null = null): FunctionDefinition {
    const func: string = rec.getString(AbstractContext.FIELD_FD_NAME);

    let inputFormat: TableFormat | null;
    try {
      inputFormat = this.decodeFormat(rec.getString(AbstractContext.FIELD_FD_INPUTFORMAT), caller);
    } catch (ex) {
      throw new Error("Error decoding input format of function '" + func + "': " + ex.message);
    }

    let outputFormat: TableFormat | null;
    try {
      outputFormat = this.decodeFormat(rec.getString(AbstractContext.FIELD_FD_OUTPUTFORMAT), caller);
    } catch (ex) {
      throw new Error("Error decoding output format of function '" + func + "': " + ex.message);
    }

    const def: FunctionDefinition = new FunctionDefinition(func, inputFormat, outputFormat, rec.getString(AbstractContext.FIELD_FD_DESCRIPTION), rec.getString(AbstractContext.FIELD_FD_GROUP));

    def.setHelp(rec.getString(AbstractContext.FIELD_FD_HELP));
    def.setIconId(rec.getString(AbstractContext.FIELD_FD_ICON_ID));

    if (rec.hasField(AbstractContext.FIELD_FD_CONCURRENT) && rec.getBoolean(AbstractContext.FIELD_FD_CONCURRENT) != null) def.setConcurrent(rec.getBoolean(AbstractContext.FIELD_FD_CONCURRENT));

    if (rec.hasField(AbstractContext.FIELD_FD_PERMISSIONS) && rec.getString(AbstractContext.FIELD_FD_PERMISSIONS) != null) def.setPermissions(new Permissions(rec.getString(AbstractContext.FIELD_FD_PERMISSIONS)));

    return def;
  }

  loadContext(): Promise<Context<C, M>> {
    return new Promise(resolve => {
      return null;
    });
  }

  public getVevents(def: VariableDefinition, caller: CallerController, request: RequestController): DataTable {
    const ans: DataTable = new SimpleDataTable(def.getFormat());
    for (const ed of this.getEventDefinitions(caller)) {
      ans.addRecordFromRecord(this.evtDefToDataRecord(ed, caller));
    }
    return ans;
  }

  protected evtDefToDataRecord(ed: EventDefinition, caller: CallerController | null = null): DataRecord {
    return new DataRecord(AbstractContext.EVENT_DEFINITION_FORMAT)
      .addString(ed.getName())
      .addString(this.encodeFormat(ed.getFormat(), caller))
      .addString(ed.getDescription())
      .addString(ed.getHelp())
      .addInt(ed.getLevel())
      .addString(ed.getGroup())
      .addString(ed.getIconId());
  }

  public evtDefFromDataRecord(rec: DataRecord, caller: CallerController | null = null): EventDefinition {
    const event: string = rec.getString(AbstractContext.FIELD_ED_NAME);

    let format: TableFormat | null;
    try {
      format = this.decodeFormat(rec.getString(AbstractContext.FIELD_ED_FORMAT), caller);
    } catch (ex) {
      throw new Error("Error decoding format of event '" + event + "': " + ex.message);
    }

    const def: EventDefinition = new EventDefinition(event, format, rec.getString(AbstractContext.FIELD_ED_DESCRIPTION), rec.getString(AbstractContext.FIELD_ED_GROUP));

    def.setLevel(rec.getInt(AbstractContext.FIELD_ED_LEVEL));
    def.setHelp(rec.getString(AbstractContext.FIELD_ED_HELP));
    def.setIconId(rec.getString(AbstractContext.FIELD_ED_ICON_ID));
    return def;
  }

  public getVactions(def: VariableDefinition, caller: CallerController, request: RequestController): DataTable {
    const ans: DataTable = new SimpleDataTable(def.getFormat());
    for (const adef of this.getActionDefinitions(caller)) {
      ans.addRecordFromRecord(this.actDefToDataRecord(adef));
    }
    return ans;
  }

  protected actDefToDataRecord(def: ActionDefinition): DataRecord {
    const resourceMasks: DataTable = new SimpleDataTable(AbstractContext.RESOURCE_MASKS_FORMAT);
    const treeMasks: Array<TreeMask> | null = def.getDropSources();
    if (treeMasks != null) {
      for (const resourceMask of treeMasks) {
        const record = resourceMasks.addRecord() as DataRecord;
        record.addString(resourceMask.toString());
      }
    }

    const rec: DataRecord = new DataRecord(AbstractContext.ACTION_DEF_FORMAT);
    rec.addString(def.getName());
    rec.addString(def.getDescription());
    rec.addString(def.getHelp());
    rec.addString(def.getAccelerator() == null ? null : def.getAccelerator().toString());
    rec.addDataTable(resourceMasks);
    rec.addBoolean(def.isHidden());
    rec.addBoolean(def.isEnabled());
    rec.addString(def.getIconId());
    rec.addString(def.getGroup());
    rec.addString(def.getExecutionGroup() == null ? null : def.getExecutionGroup().toString());
    rec.addBoolean(def.isDefault());
    return rec;
  }

  public enableStatus(): void {
    this.status = new ContextStatus();
  }

  getStatus(): ContextStatus | null {
    return this.status;
  }

  public setStatus(status: number, comment: string): void {
    if (this.status == null) throw new Error('Status is disabled');

    const statusChanged: boolean = this.status.getStatus() != status;

    const commentChanged = !Util.equals(this.status.getComment(), comment);

    const oldStatus = this.status.getStatus();

    this.status.setStatus(status);
    this.status.setComment(comment);

    if (statusChanged || commentChanged) {
      this.fireStatusChanged(status, comment, oldStatus);
    }
  }

  protected fireStatusChanged(status: number, comment: string, oldStatus: number): void {}

  public enableVariableStatuses(persistent: boolean): void {
    const vd: VariableDefinition = new VariableDefinition(AbstractContext.V_VARIABLE_STATUSES, AbstractContext.VFT_VARIABLE_STATUSES, true, true);
    vd.setPersistent(persistent);
    vd.setLocalCachingMode(VariableDefinition.CACHING_NONE);
    vd.setGetter((con, def, caller, request) => {
      return this.getVariableStatusesTable();
    });

    this.addVariableDefinition(vd);
    this.addEventDefinition(new EventDefinition(AbstractContext.E_VARIABLE_STATUS_CHANGED, AbstractContext.VFT_VARIABLE_STATUSES));
  }

  private getVariableStatusesTable(): DataTable {
    if (this.variableStatusesTable == null) return this.createVariableStatusesTable();

    return this.variableStatusesTable;
  }

  private createVariableStatusesTable(): DataTable {
    const table: DataTable = new SimpleDataTable(AbstractContext.VFT_VARIABLE_STATUSES);
    const statuses: Map<string, VariableStatus> = this.getVariableStatuses();

    for (const [name, vs] of statuses.entries()) {
      const record: DataRecord = table.addRecord() as DataRecord;
      record
        .addString(name)
        .addString(vs.getStatus())
        .addString(vs.getComment());
    }
    this.variableStatusesTable = table;
    return table;
  }

  private getVariableStatuses(): Map<string, VariableStatus> {
    this.ensureVariableStatuses();
    return this.variableStatuses as Map<string, VariableStatus>;
  }

  private ensureVariableStatuses(): void {
    if (this.variableStatuses == null) {
      this.variableStatuses = new Map();

      const statuses: DataTable = this.fetchVariableStatuses();

      for (const rec of statuses) {
        this.variableStatuses.set(rec.getString(AbstractContext.VF_VARIABLE_STATUSES_NAME), new VariableStatus(rec.getString(AbstractContext.VF_VARIABLE_STATUSES_STATUS), rec.getString(AbstractContext.VF_VARIABLE_STATUSES_COMMENT)));
      }
    }
  }

  protected fetchVariableStatuses(): DataTable {
    return new SimpleDataTable(AbstractContext.VFT_VARIABLE_STATUSES);
  }

  public updateVariableStatus(variable: string, status: VariableStatus, persistent: boolean): void {
    let old: VariableStatus | null = null;
    this.ensureVariableStatuses();

    const vs = this.variableStatuses as Map<string, VariableStatus>;

    if (vs.has(variable)) old = vs.get(variable) as VariableStatus;

    vs.set(variable, status);

    const changed = old == null || !Util.equals(old.getStatus(), status.getStatus());

    if (changed) this.variableStatusesTable = null;

    if (changed) {
      this.variableStatusesUpdated = true;
      this.fireEvent(AbstractContext.E_VARIABLE_STATUS_CHANGED, [variable, status.getStatus(), status.getComment()]);
    }

    if (persistent) {
      this.saveVariableStatuses();
    }
  }

  protected clearVariableStatuses(): void {
    if (this.variableStatuses != null) {
      this.variableStatuses.clear();
      this.variableStatusesTable = null;
    }
    this.saveVariableStatuses();
  }

  protected saveVariableStatuses(): void {
    if (this.variableStatusesUpdated) {
      this.persistVariableStatuses(this.getVariableStatusesTable());
    }
    this.variableStatusesUpdated = false;
  }

  protected persistVariableStatuses(statuses: DataTable): void {
    // Do nothing, statuses persistence may be supported by descendants
  }

  public getVariableStatus(name: string): VariableStatus {
    return this.getVariableStatuses().get(name) as VariableStatus;
  }

  public getVchildren(def: VariableDefinition, caller: CallerController, request: RequestController): DataTable {
    const ans: DataTable = new SimpleDataTable(def.getFormat());
    for (const con of this.getChildren(caller)) {
      const record: DataRecord = ans.addRecord() as DataRecord;
      record.addString(con.getName());
    }
    return ans;
  }

  public getVinfo(def: VariableDefinition, caller: CallerController, request: RequestController): DataTable {
    return this.createContextInfoTable();
  }

  protected createContextInfoTable(): DataTable {
    return DataTableFactory.createWithFirstRecord(AbstractContext.INFO_DEFINITION_FORMAT, [
      this.getDescription(),
      this.getType(),
      this.getGroup(),
      this.getIconId(),
      this.getLocalRoot(true),
      this.getPeerRoot(),
      this.getLocalPrimaryRoot(),
      this.getRemoteRoot(),
      this.getRemotePath(),
      this.isMapped(),
    ]);
  }

  public async callFgetCopyData(def: FunctionDefinition, caller: CallerController, request: RequestController, parameters: DataTable): Promise<DataTable> {
    const tf: TableFormat = def.getOutputFormat() as TableFormat;
    const result: DataTable = new SimpleDataTable(tf.clone());

    const group: string = parameters.rec().getString(AbstractContext.VF_INFO_GROUP);

    let recipients: Array<Context<C, M>> | null = null;

    const recipientsTable: DataTable = parameters.rec().getDataTable(AbstractContext.FIF_COPY_DATA_RECIPIENTS);

    if (recipientsTable != null) {
      recipients = new Array<Context<C, M>>();

      for (const rec of recipientsTable) {
        const recipient = this.getContextManager()?.get(rec.getString(AbstractContext.FIF_COPY_DATA_RECIPIENTS_RECIPIENT), caller);

        if (recipient != null) {
          recipients.push(recipient);
        }
      }
    }
    for (const vd of this.getVariableDefinitions(caller)) {
      if (group != null && !Util.equals(ContextUtils.getBaseGroup(vd.getGroup()), group)) {
        continue;
      }

      if (group == null && vd.getGroup() == null) {
        continue;
      }

      if (!vd.isReadable()) {
        continue;
      }

      if (vd.getFormat() == null || !vd.getFormat()?.isReplicated()) {
        continue;
      }

      if (recipients != null) {
        let skip = true;

        for (const recipient of recipients) {
          const rvd: VariableDefinition | null = recipient.getVariableDefinition(vd.getName(), null);
          if (rvd != null && rvd.isWritable() && (rvd.getFormat() == null || rvd.getFormat()?.isReplicated())) {
            skip = false;
          }
        }

        if (skip) {
          continue;
        }
      }

      const value: DataTable = await this.getVariable(vd.getName(), caller);

      const format: TableFormat = value.getFormat().clone();

      const fields: DataTable = new SimpleDataTable(AbstractContext.FIFT_REPLICATE_FIELDS);

      for (const ff of format) {
        if (ff.isNotReplicated()) {
          ff.setReadonly(true);
        }

        if (!ff.isHidden() && !ff.isReadonly() && !ff.isNotReplicated()) {
          const record: DataRecord = fields.addRecord() as DataRecord;
          record
            .addString(ff.getName())
            .addString(ff.toString())
            .addBoolean(true);
        }
      }

      const record: DataRecord = fields.addRecord() as DataRecord;
      record
        .addString(vd.getName())
        .addString(vd.getDescription())
        .addBoolean(false)
        .addDataTable(fields)
        .addDataTable(value);
    }

    result.fixRecords();

    return result;
  }

  public async callFcopy(def: FunctionDefinition, caller: CallerController, request: RequestController, parameters: DataTable): Promise<DataTable> {
    const result: DataTable = new SimpleDataTable(def.getOutputFormat());
    for (const rec of parameters) {
      if (!rec.getBoolean(AbstractContext.FOF_COPY_DATA_REPLICATE)) {
        continue;
      }
      const varName: string = rec.getString(AbstractContext.FOF_COPY_DATA_NAME);
      const providedDesc: string = rec.getString(AbstractContext.FOF_COPY_DATA_DESCRIPTION);
      const varValue: DataTable = rec.getDataTable(AbstractContext.FOF_COPY_DATA_VALUE);

      const targetVd: VariableDefinition | null = this.getVariableDefinition(varName, caller);

      if (targetVd == null) {
        const record: DataRecord = result.addRecord() as DataRecord;
        record
          .addString(providedDesc)
          .addBoolean(false)
          .addString(Cres.get().getString('conVarNotAvailInTgt'));
        continue;
      }

      const varDesc: string | null = targetVd.getDescription();

      if (!targetVd.isWritable()) {
        const record: DataRecord = result.addRecord() as DataRecord;
        record
          .addString(varDesc)
          .addBoolean(false)
          .addString(Cres.get().getString('conVarNotWritableInTgt'));
        continue;
      }
      let tgtVal: DataTable;

      try {
        tgtVal = await this.getVariableClone(varName, caller);
      } catch (ex) {
        const record: DataRecord = result.addRecord() as DataRecord;
        record
          .addString(varDesc)
          .addBoolean(false)
          .addString(Cres.get().getString('conErrGettingTgtVar') + ex.message);
        continue;
      }

      const fields: Array<string> = new Array<string>();
      for (const fieldRec of rec.getDataTable(AbstractContext.FOF_COPY_DATA_FIELDS)) {
        if (fieldRec.getBoolean(AbstractContext.FIF_REPLICATE_FIELDS_REPLICATE)) {
          fields.push(fieldRec.getString(AbstractContext.FIF_REPLICATE_FIELDS_NAME));
        }
      }
      const tableCopyErrors: Set<string> = this.replicateVariableOnCopy(varName, varValue, tgtVal, fields, caller);

      DataTableUtils.inlineData(tgtVal, this.getContextManager(), caller);

      try {
        this.setVariableByDefinition(targetVd, caller, request, tgtVal);
      } catch (ex) {
        Log.CONTEXT_FUNCTIONS.warn('Error setting variable during context copy', ex);
        const record: DataRecord = result.addRecord() as DataRecord;
        record
          .addString(varDesc)
          .addBoolean(false)
          .addString(Cres.get().getString('conErrSettingTgtVar') + ex.message);
        continue;
      }

      if (tableCopyErrors.size > 0) {
        const record: DataRecord = result.addRecord() as DataRecord;
        record
          .addString(varDesc)
          .addBoolean(false)
          .addString(StringUtils.print(Array.from(tableCopyErrors), '; '));
      } else {
        const record: DataRecord = result.addRecord() as DataRecord;
        record.addString(varDesc).addBoolean(true);
      }
    }
    return result;
  }

  public async callFupdateVariable(def: FunctionDefinition, caller: CallerController, request: RequestController, parameters: DataTable): Promise<DataTable> {
    const rec: DataRecord = parameters.rec();

    const varName: string = rec.getString(AbstractContext.V_UPDATE_VARIABLE);
    const expression: Expression = new Expression(rec.getString(AbstractContext.V_UPDATE_VARIABLE_EXPRESSION));

    const data: VariableData = this.getVariableData(varName);

    if (data == null) {
      throw new Error(MessageFormat.format(Cres.get().getString('conVarNotAvailExt'), varName, this.getPath()));
    }
    const variableValue: DataTable = await this.getVariable(varName, caller);
    const res: DataTable = new Evaluator(this.getContextManager(), this, variableValue, caller).evaluateToDataTable(expression);
    this.setVariable(varName, res, caller);
    return res;
  }

  public replicateVariableOnCopy(variableName: string, variableValue: DataTable, targetValue: DataTable, fields: Array<string>, caller: CallerController): Set<string> {
    return DataTableReplication.copy(variableValue, targetValue, false, false, true, true, false, fields);
  }

  public async callFcopyToChildren(def: FunctionDefinition, caller: CallerController, request: RequestController, parameters: DataTable): Promise<DataTable> {
    return await this.copyTo(def, caller, request, parameters, this.getChildren(caller));
  }

  protected async copyTo(def: FunctionDefinition, caller: CallerController, request: RequestController, parameters: DataTable, children: Array<Context<C, M>>): Promise<DataTable> {
    const result: DataTable = new SimpleDataTable(def.getOutputFormat());

    for (const child of this.children) {
      const conDesc: string | null = child.getDescription() != null ? child.getDescription() : child.getPath();
      let conRes: DataTable;

      try {
        conRes = await child.callFunction(AbstractContext.F_COPY, parameters, caller, request);
      } catch (ex) {
        const record: DataRecord = result.addRecord() as DataRecord;
        record
          .addString(conDesc)
          .addString(null)
          .addBoolean(false)
          .addString(ex.message);
        continue;
      }

      for (const rec of conRes) {
        const record: DataRecord = result.addRecord() as DataRecord;
        record
          .addString(conDesc)
          .addString(rec.getString(AbstractContext.FIELD_REPLICATE_VARIABLE))
          .addBoolean(rec.getBoolean(AbstractContext.FIELD_REPLICATE_SUCCESSFUL))
          .addString(rec.getString(AbstractContext.FIELD_REPLICATE_ERRORS));
      }
    }

    return result;
  }
}

AbstractContext.initialize();
