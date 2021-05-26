import JObject from './java/JObject';
import EntityRelatedActionDescriptor from '../action/EntityRelatedActionDescriptor';
import ContextManager from '../context/ContextManager';
import CallerController from '../context/CallerController';
import DateUtils from './DateUtils';
import Context from '../context/Context';
import ContextUtils from '../context/ContextUtils';
import EditableChildContextConstants from '../server/EditableChildContextConstants';
import Contexts from '../context/Contexts';
import Log from '../Log';
import DataTableConversion from '../datatable/DataTableConversion';
import UtilitiesContextConstants from '../server/UtilitiesContextConstants';
import User from '../data/User';

export default class UserSettings extends JObject {
  private datePattern: string | null = null;
  private timePattern: string | null = null;
  private timeZone: string | null = null;
  private weekStartDay = 2;

  private variableActions: Array<EntityRelatedActionDescriptor> | null = null;
  private eventActions: Array<EntityRelatedActionDescriptor> | null = null;

  constructor() {
    super();
  }

  static async create(cm: ContextManager<any> | null = null, callerController?: CallerController) {
    const us = new UserSettings();
    if (cm != null) await us.fill(cm, callerController);
    return us;
  }

  public getDatePattern(): string {
    return this.datePattern != null ? this.datePattern : DateUtils.DEFAULT_DATE_PATTERN;
  }

  public setDatePattern(datePattern: string) {
    this.datePattern = datePattern;
  }

  public getTimePattern(): string {
    return this.timePattern != null ? this.timePattern : DateUtils.DEFAULT_TIME_PATTERN;
  }

  public setTimePattern(timePattern: string) {
    this.timePattern = timePattern;
  }

  public getDateTimePattern(): string {
    return DateUtils.getDateTimePattern(this.getDatePattern(), this.getTimePattern());
  }

  public getTimeZone(): string | null {
    return this.timeZone;
  }

  public setTimeZone(timeZone: string) {
    this.timeZone = timeZone;
  }

  public getWeekStartDay(): number {
    return this.weekStartDay;
  }

  public setWeekStartDay(weekStartDay: number) {
    this.weekStartDay = weekStartDay;
  }

  public getVariableActions(): Array<EntityRelatedActionDescriptor> | null {
    return this.variableActions;
  }

  public setVariableActions(variableActions: Array<EntityRelatedActionDescriptor>) {
    this.variableActions = variableActions;
  }

  public getEventActions(): Array<EntityRelatedActionDescriptor> | null {
    return this.eventActions;
  }

  public setEventActions(eventActions: Array<EntityRelatedActionDescriptor>) {
    this.eventActions = eventActions;
  }

  public clone(): UserSettings {
    try {
      const clone: UserSettings = super.clone() as UserSettings;

      if (this.variableActions != null) {
        clone.variableActions = [...this.variableActions];
      }

      if (this.eventActions != null) {
        clone.eventActions = [...this.eventActions];
      }

      return clone;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  public async fill(cm: ContextManager<any>, callerController?: CallerController) {
    await this.fillBasicProperties(cm, callerController);
    await this.fillActions(cm, callerController);
  }

  public async fillBasicProperties(cm: ContextManager<any>, callerController?: CallerController): Promise<void> {
    if (callerController == null) {
      return;
    }

    // Distributed: ok, getting info from directly connected server
    const userContext: Context<any, any> | null = await cm.get(ContextUtils.userContextPath(callerController.getUsername() as string), callerController);

    if (userContext == null || userContext.getVariableDefinition(EditableChildContextConstants.V_CHILD_INFO) == null) {
      return;
    }

    userContext.getVariable(EditableChildContextConstants.V_CHILD_INFO, callerController).then((dataTable) => {
      const userInfo = dataTable.rec();

      this.setDatePattern(userInfo.getString(User.FIELD_DATEPATTERN));
      this.setTimePattern(userInfo.getString(User.FIELD_TIMEPATTERN));
      this.setTimeZone(userInfo.getString(User.FIELD_TIMEZONE));

      if (userInfo.getFormat().hasField(User.FIELD_WEEK_START)) {
        this.setWeekStartDay(userInfo.getInt(User.FIELD_WEEK_START));
      }
    });
  }

  public async fillActions(cm: ContextManager<any>, callerController?: CallerController): Promise<void> {
    try {
      const utilities: Context<any, any> | null = await cm.get(Contexts.CTX_UTILITIES, callerController);

      if (utilities != null) {
        await utilities.init();
        const variableActions = await utilities.callFunction(UtilitiesContextConstants.F_VARIABLE_ACTIONS, null, callerController);
        this.setVariableActions(DataTableConversion.beansFromTable(variableActions, EntityRelatedActionDescriptor, EntityRelatedActionDescriptor.FORMAT, false));

        const eventActions = await utilities.callFunction(UtilitiesContextConstants.F_EVENT_ACTIONS, null, callerController);
        this.setEventActions(DataTableConversion.beansFromTable(eventActions, EntityRelatedActionDescriptor, EntityRelatedActionDescriptor.FORMAT, false));
      }
    } catch (ex) {
      Log.CLIENTS.error('Error retrieving entity-related actions', ex);
    }
  }
}
