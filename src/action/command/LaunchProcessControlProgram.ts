import TableFormat from '../../datatable/TableFormat';
import LaunchWidget from './LaunchWidget';
import ActionUtils from '../ActionUtils';
import ProcessControlContextConstants from '../../server/ProcessControlContextConstants';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import FieldConstants from '../../datatable/field/FieldConstants';
import DataTable from '../../datatable/DataTable';

export default class LaunchProcessControlProgram extends LaunchWidget {
  public static readonly FIFT_DEBUG_PROGRAM: TableFormat = new TableFormat(
    1,
    1,
    '<' + ProcessControlContextConstants.FIF_DEBUG_PROGRAM_PARAMETERS + '><I><A=1>'
  );

  public static readonly FIFT_BREAKPOINT: TableFormat = new TableFormat();

  static __static_initializer_0() {
    LaunchProcessControlProgram.FIFT_BREAKPOINT.addField(
      FieldFormatFactory.createType(ProcessControlContextConstants.FIF_BREAKPOINT_POSITION, FieldConstants.STRING_FIELD)
    );
    LaunchProcessControlProgram.FIFT_BREAKPOINT.addField(
      FieldFormatFactory.createType(
        ProcessControlContextConstants.FIF_BREAKPOINT_POSITION_LINE,
        FieldConstants.INTEGER_FIELD
      ).setDefault(-1)
    );
  }

  private static _init = false;

  public static initialize() {
    if (LaunchProcessControlProgram._init) return;
    LaunchProcessControlProgram.__static_initializer_0();
    LaunchProcessControlProgram._init = true;
  }

  public constructor(title?: string, widgetContext?: string, defaultContext?: string, template?: string) {
    super(title, widgetContext, defaultContext, template);
    this.setType(ActionUtils.CMD_LAUNCH_PROCESS_CONTROL_PROGRAM);
  }

  public static createLaunchProcessControlProgramWithDataTable(title: string, parameters: DataTable) {
    const launchProcessControlProgram = new LaunchProcessControlProgram();
    launchProcessControlProgram.setTitle(title);
    launchProcessControlProgram.setParameters(parameters);
    return launchProcessControlProgram;
  }
}

LaunchProcessControlProgram.initialize();
