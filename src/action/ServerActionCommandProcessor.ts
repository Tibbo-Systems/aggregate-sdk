import DataTable from '../datatable/DataTable';
import ServerAction from './ServerAction';
import ActionUtils from './ActionUtils';
import FieldConstants from '../datatable/field/FieldConstants';
import ActionDefinition from './ActionDefinition';
import ServerActionInput from './ServerActionInput';
import CallerController from '../context/CallerController';
import ServerContext from '../server/ServerContext';
import RequestIdentifier from './RequestIdentifier';
import ResourceMask from './ResourceMask';
import Reference from '../expression/Reference';
import Contexts from '../context/Contexts';
import Cres from '../Cres';
import StringUtils from '../util/StringUtils';
import GenericActionCommand from './GenericActionCommand';
import GenericActionResponse from './GenericActionResponse';
import EditDataMerger from './EditDataMerger';
import DashboardProperties from '../util/DashboardProperties';
import WindowLocation from '../util/WindowLocation';
import Context from '../context/Context';
import EditData from './command/EditData';
import EditTemplate from './command/EditTemplate';
import Util from '../util/Util';
import Browse from './command/Browse';
import LaunchProcessControlProgram from './command/LaunchProcessControlProgram';
import ShowError from './command/ShowError';
import Log from '../Log';
import EventLevel from '../event/EventLevel';
import ShowMessage from './command/ShowMessage';
import ShowReport from './command/ShowReport';
import SelectEntities from './command/SelectEntities';
import Log4jLevelHelper from '../util/Log4jLevelHelper';
import ShowGuide from './command/ShowGuide';
import ShowEventLog from './command/ShowEventLog';
import EntityList from '../context/EntityList';
import EditText from './command/EditText';
import EditCode from './command/EditCode';
import ContextManager from '../context/ContextManager';
import ShowSystemTree from './command/ShowSystemTree';
import ActivateDashboard from './command/ActivateDashboard';
import EditGridDashboard from './command/EditGridDashboard';

export default class ServerActionCommandProcessor {
  private action: ServerAction | null = null;

  public constructor(action: ServerAction) {
    this.action = action;
  }

  static getExecutionParameter(input: DataTable, name: string): DataTable | null {
    if (input != null && input.getRecordCount() >= 1) {
      if (input.rec().hasField(ActionUtils.FIELD_ACTION_EXECUTION_PARAMETERS)) {
        const executionParameters: DataTable = input.rec().getDataTable(ActionUtils.FIELD_ACTION_EXECUTION_PARAMETERS);
        if (
          executionParameters != null &&
          executionParameters.getRecordCount() > 0 &&
          executionParameters.getFormat().hasField(name)
        ) {
          return executionParameters.rec().getDataTable(name);
        }
      }

      if (input.rec().hasField(name)) {
        if (input.getFieldFormat(name).getType() == FieldConstants.DATATABLE_FIELD)
          return input.rec().getDataTable(name);
        return null;
      }
    }

    return null;
  }

  public fetchDnDSourceContexts(
    title: string,
    actionDefinition: ActionDefinition,
    actionParams: ServerActionInput,
    callerController: CallerController,
    expandedContext: string | null = null
  ): Array<ServerContext> {
    const result: ServerContext | null = this.getDnDSourceContext(actionParams, callerController);

    if (result != null) {
      return new Array(result);
    }

    const id: RequestIdentifier = new RequestIdentifier(ActionUtils.FIELD_ACTION_FROM_CONTEXT);

    const dropSources: Array<ResourceMask<any>> | null = actionDefinition.getDropSources();

    const contextTypes: Array<string> | null = null;
    if (dropSources != null) {
      const contextTypes = new Array();
      for (let dropSource of dropSources) {
        contextTypes.push(dropSource.toString());
      }
    }

    const refs: Array<Reference> = this.selectEntities(
      id,
      title,
      contextTypes,
      Contexts.CTX_ROOT,
      null,
      expandedContext,
      true,
      false,
      false,
      false,
      false,
      false,
      false
    );

    if (refs.length > 0) {
      const res: Array<ServerContext> | null = new Array();
      const paths: Array<string> = new Array();
      for (let ref of refs) {
        const re = ref.getContext();
        re && paths.push(re);
        const definingContext: ServerContext | null = this.action && this.action.getDefiningContext();
        const cur = definingContext && definingContext.get(ref.getContext(), callerController);
        if (cur != null) {
          res.push(cur);
        }
      }

      if (res.length == 0) {
        throw new Error(Cres.get().getString('conNotAvail') + StringUtils.print(paths));
      }

      return res;
    } else {
      return new Array();
    }
  }

  public getDnDSourceContext(
    actionParams: ServerActionInput,
    callerController: CallerController
  ): ServerContext | null {
    if (actionParams.getData().getRecordCount() == 1) {
      let path: string | null = null;

      if (
        actionParams
          .getData()
          .getFormat()
          .hasField(ActionUtils.FIELD_ACTION_FROM_CONTEXT)
      ) {
        path = actionParams
          .getData()
          .rec()
          .getString(ActionUtils.FIELD_ACTION_FROM_CONTEXT);
      }

      if (path != null) {
        const definingContext = this.action && this.action.getDefiningContext();
        return definingContext && definingContext.get(path, callerController);
      }
    }

    return null;
  }

  public send(cmd: GenericActionCommand): GenericActionResponse | null {
    try {
      return this.action && this.action.send(cmd);
    } catch (ex) {
      throw new Error(ex);
    }
  }

  public editDataWithTitle(
    title: string,
    data: DataTable,
    iconId: string | null = null,
    helpId: string | null = null,
    help: string | null = null
  ): DataTable | null {
    return this.editDataWithToolbar(
      null,
      null,
      false,
      title,
      data,
      false,
      false,
      iconId,
      helpId,
      help,
      null,
      null,
      null,
      null,
      null
    );
  }

  public editDataWithToolbar(
    id: RequestIdentifier | null,
    merger: EditDataMerger | null,
    group: boolean,
    title: string,
    data: DataTable,
    useDockableFrame: boolean = false,
    readonly: boolean = false,
    iconId: string | null = null,
    helpId: string | null = null,
    help: string | null = null,
    defaultContext: Context<any, any> | null = null,
    location: WindowLocation | null = null,
    dashboard: DashboardProperties | null = null,
    expression: string | null = null,
    period: number | null = null
  ): DataTable | null {
    const showToolbar: boolean = true;
    const showHeader: boolean | null = null;

    return this.editData(
      id,
      merger,
      group,
      title,
      data,
      useDockableFrame,
      readonly,
      iconId,
      helpId,
      help,
      defaultContext,
      location,
      dashboard,
      expression,
      period,
      showToolbar,
      showHeader,
      null,
      null
    );
  }

  public editData(
    id: RequestIdentifier | null,
    merger: EditDataMerger | null,
    group: boolean,
    title: string,
    data: DataTable,
    useDockableFrame: boolean,
    readonly: boolean,
    iconId: string | null,
    helpId: string | null,
    help: string | null,
    defaultContext: Context<any, any> | null,
    location: WindowLocation | null,
    dashboard: DashboardProperties | null,
    expression: string | null,
    period: number | null,
    showToolbar: boolean,
    showHeader: boolean | null,
    showLineNumbers: boolean | null,
    horizontalScrolling: boolean | null
  ): DataTable | null {
    const defaultContextPath: string | null = defaultContext != null ? defaultContext.getPath() : null;

    const cmd: EditData = new EditData(title, data, readonly);
    cmd.setUseDockableFrame(useDockableFrame);
    cmd.setIconId(iconId);
    cmd.setHelpId(helpId);
    cmd.setHelp(help);
    cmd.setDefaultContext(defaultContextPath);
    cmd.setLocation(location);
    cmd.setDashboard(dashboard);
    cmd.setExpression(expression);
    cmd.setPeriod(period);
    cmd.setRequestId(id);
    cmd.setBatchEntry(group);
    cmd.setShowToolbar(showToolbar);
    cmd.setShowHeader(showHeader);
    cmd.setShowLineNumbers(showLineNumbers);
    cmd.setHorizontalScrolling(horizontalScrolling);

    return this.editDataCmd(cmd, merger);
  }

  public editDataCmd(cmd: EditData, merger: EditDataMerger | null): DataTable | null {
    const resp: GenericActionResponse | null = this.send(cmd);

    if (resp == null) return cmd.getData();

    const edited: DataTable | null = resp.getParameters();

    if (this.action?.getCallerController().isHeadless()) {
      if (edited == null) {
        return cmd.getData();
      }
      if (merger != null) {
        const cmdData = cmd.getData();

        return merger.merge(edited, cmdData);
      }
    }

    return edited;
  }

  protected editTemplate(
    type: string,
    title: string,
    defaultContext: string,
    widgetContext: string,
    widget: string,
    editMode: number
  ): string | null {
    const cmd: GenericActionCommand = EditTemplate.createEditTemplate(
      type,
      title,
      defaultContext,
      widgetContext,
      widget,
      editMode
    );
    const resp: GenericActionResponse | null = this.send(cmd);
    const response: DataTable | null = resp?.getParameters() || null;

    if (response == null || response.getRecordCount() == 0) {
      return null;
    }

    const result: string = response.rec().getString(EditTemplate.RF_RESULT);

    if (!result && !Util.equals(result, ActionUtils.RESPONSE_SAVED)) {
      return null;
    }

    return response.rec().getString(EditTemplate.RF_WIDGET);
  }

  public editWidget(title: string, defaultContext: string, widgetContext: string, widget: string): string | null {
    return this.editTemplate(
      ActionUtils.CMD_EDIT_WIDGET,
      title,
      defaultContext,
      widgetContext,
      widget,
      EditTemplate.EDIT_WIDGET
    );
  }

  public editProcessControlProgram(
    title: string,
    defaultContext: string,
    widgetContext: string,
    widget: string,
    editMode: number
  ): string | null {
    return this.editTemplate(
      ActionUtils.CMD_EDIT_PROCESS_CONTROL_PROGRAM,
      title,
      defaultContext,
      widgetContext,
      widget,
      editMode
    );
  }

  public editWorkflow(title: string, defaultContext: string, widgetContext: string, widget: string): string | null {
    return this.editTemplate(
      ActionUtils.CMD_EDIT_WORKFLOW,
      title,
      defaultContext,
      widgetContext,
      widget,
      EditTemplate.EDIT_WORKFLOW
    );
  }

  public browse(url: string): void {
    this.send(new Browse(url));
  }

  public launchProcessControlProgram(
    title: string,
    widgetContext: string,
    defaultContext: string,
    encodedWidgetTemplate: string,
    location: WindowLocation,
    dp: DashboardProperties,
    input: DataTable
  ): GenericActionResponse | null {
    const cmd: LaunchProcessControlProgram = new LaunchProcessControlProgram(
      title,
      widgetContext,
      defaultContext,
      encodedWidgetTemplate
    );
    cmd.setLocation(location);
    cmd.setDashboard(dp);
    cmd.setInput(input);
    return this.send(cmd);
  }

  public showError(title: string, level: number, message: string, ex: Error): void {
    const cmd: ShowError = new ShowError(title, message, level, ex);
    Log.CONTEXT_ACTIONS.log(Log4jLevelHelper.getLog4jLevelByAggreGateLevel(level), message, ex);
    this.send(cmd);
  }

  public showMessage(
    title: string = Cres.get().getString('info'),
    message: string,
    level: number = EventLevel.INFO
  ): void {
    this.send(new ShowMessage(title, message, level));
  }

  public showReport(
    title: string,
    reportData: any,
    location: WindowLocation,
    dashboard: DashboardProperties,
    reportFormat: string
  ): void {
    const cmd: GenericActionCommand = new ShowReport(title, reportData, location, dashboard, reportFormat);
    this.send(cmd);
  }

  public showEventLog(
    title: string,
    eventList: EntityList,
    showRealtime: boolean,
    showHistory: boolean,
    preloadHistory: boolean,
    showContexts: boolean,
    showNames: boolean,
    showLevels: boolean,
    showAcknowledgements: boolean,
    showEnrichments: boolean,
    customListenerCode: number,
    location: WindowLocation,
    dashboard: DashboardProperties
  ): number | null {
    const resp: GenericActionResponse | null = this.send(
      ShowEventLog.createShowEventLog(
        title,
        eventList,
        showRealtime,
        showHistory,
        preloadHistory,
        showContexts,
        showNames,
        showLevels,
        showAcknowledgements,
        showEnrichments,
        customListenerCode,
        location,
        dashboard
      )
    );

    if (resp == null || resp.getParameters() == null) {
      return -1;
    }

    return (
      resp
        .getParameters()
        ?.rec()
        .getInt(ShowEventLog.RF_LISTENER_CODE) || null
    );
  }

  public showGuide(title: string, invokerContext: string, macroName: string): DataTable | null {
    const resp: GenericActionResponse | null = this.send(new ShowGuide(title, invokerContext, macroName));
    return resp?.getParameters() || null;
  }

  public selectEntities(
    id: RequestIdentifier,
    title: string,
    contextTypes: Array<string> | null,
    rootContext: string,
    defaultContext: string | null,
    expandedContext: string | null,
    showChildren: boolean,
    allowMasks: boolean,
    showVars: boolean,
    showFuncs: boolean,
    showEvents: boolean,
    showFields: boolean,
    singleSelection: boolean
  ): Array<Reference> {
    const ac: GenericActionCommand = SelectEntities.createSelectEntities(
      title,
      contextTypes,
      rootContext,
      defaultContext,
      expandedContext,
      showChildren,
      allowMasks,
      showVars,
      showFuncs,
      showEvents,
      showFields,
      singleSelection
    );
    ac.setRequestId(id);
    const resp: GenericActionResponse | null = this.send(ac);

    const res: Array<Reference> = new Array();
    const rp = resp?.getParameters();

    if (rp) {
      for (let rec of rp) {
        res.push(new Reference(rec.getString(SelectEntities.RF_REFERENCE)));
      }
    }

    return res;
  }

  public editText(title: string, text: string, mode: string): string | null {
    const resp: GenericActionResponse | null = this.send(EditText.createEditText(title, text, mode));

    const response: DataTable | null = resp?.getParameters() || null;

    if (response == null) {
      return null;
    }

    const result: string = response.rec().getString(EditText.RF_RESULT);

    if (!Util.equals(result, ActionUtils.RESPONSE_SAVED)) {
      return null;
    }

    return response.rec().getString(EditText.RF_TEXT);
  }

  public editCode(title: string, code: string, mode: string): string | null {
    const resp: GenericActionResponse | null = this.send(EditCode.createEditCode(title, code, mode));

    const response: DataTable | null = resp?.getParameters() || null;

    if (response == null) {
      return null;
    }

    const result: string = response.rec().getString(EditCode.RF_RESULT);

    if (!Util.equals(result, ActionUtils.RESPONSE_SAVED)) {
      return null;
    }

    return response.rec().getString(EditCode.RF_CODE);
  }

  public showSystemTree(title: string, roots: Context<Context<any, any>, ContextManager<any>> | Array<string>): void {
    const sst: ShowSystemTree = new ShowSystemTree(title, roots);
    sst.setLocation(new WindowLocation(WindowLocation.STATE_FLOATING));
    this.send(sst);
  }

  public activateDashboard(nameString: string, parameters: DataTable): void {
    this.send(ActivateDashboard.createActivateDashboardWithDataTable(nameString, parameters));
  }

  public editDashboard(parameters: DataTable): void {
    this.send(new EditGridDashboard(parameters));
  }
}
