import ReplyMonitor from './ReplyMonitor';
import Command from './Command';
import JObject from '../util/java/JObject';
import TableFormat from '../datatable/TableFormat';
import TimeHelper from '../util/TimeHelper';
import Cres from '../Cres';
import DataTable from '../datatable/DataTable';
import DataTableConversion from '../datatable/DataTableConversion';

export default class CommandProcessorStatistics extends JObject {
  private static initCommandProcessorStatistics = false;

  public static readonly FORMAT: TableFormat = new TableFormat(1, 1);

  private static initializeCommandProcessorStatistics0() {
    const LongFieldFormat = require('../datatable/field/LongFieldFormat').default;
    CommandProcessorStatistics.FORMAT.addField(
      '<connectionTime><L><F=N><D=' +
        Cres.get().getString('commConnectionTime') +
        '><H=' +
        Cres.get().getString('statisticsServerConnectionHelpTime') +
        '><E=' +
        LongFieldFormat.EDITOR_PERIOD +
        '><O=' +
        LongFieldFormat.encodePeriodEditorOptions(TimeHelper.SECOND, TimeHelper.DAY) +
        '>'
    );
    CommandProcessorStatistics.FORMAT.addField('<commandCount><L><D=' + Cres.get().getString('commCommandCount') + '><H=' + Cres.get().getString('statisticsServerConnectionHelpCommands') + '>');
    CommandProcessorStatistics.FORMAT.addField('<eventCount><L><D=' + Cres.get().getString('commEventCount') + '><H=' + Cres.get().getString('statisticsServerConnectionHelpEvents') + '>');
    CommandProcessorStatistics.FORMAT.addField(
      '<averageResponseTime><L><D=' +
        Cres.get().getString('commAvgResponseTime') +
        '><H=' +
        Cres.get().getString('statisticsServerConnectionHelpResponceTime') +
        '><E=' +
        LongFieldFormat.EDITOR_PERIOD +
        '><O=' +
        LongFieldFormat.encodePeriodEditorOptions(TimeHelper.MILLISECOND, TimeHelper.MILLISECOND) +
        '>'
    );
    CommandProcessorStatistics.FORMAT.addField('<incomingTraffic><L><D=' + Cres.get().getString('commIncomingTraffic') + '><H=' + Cres.get().getString('statisticsServerConnectionHelpIncoming') + '><E=' + LongFieldFormat.EDITOR_BYTES + '>');
    CommandProcessorStatistics.FORMAT.addField('<outgoingTraffic><L><D=' + Cres.get().getString('commOutgoingTraffic') + '><H=' + Cres.get().getString('statisticsServerConnectionHelpOutgoing') + '><E=' + LongFieldFormat.EDITOR_BYTES + '>');
    CommandProcessorStatistics.FORMAT.addField('<unrepliedCommandCount><L><D=' + Cres.get().getString('commUnrepliedCommandCount') + '><H=' + Cres.get().getString('statisticsServerConnectionHelpUnreplied') + '>');
  }

  private startTime: number | null = null;
  private commandCount = 0;
  private eventCount = 0;
  private averageResponseTime = 0;
  private outgoingTraffic = 0;
  private incomingTraffic = 0;
  private unrepliedCommandCount = 0;

  public static initializeCommandProcessorStatistics() {
    if (CommandProcessorStatistics.initCommandProcessorStatistics) {
      return;
    }

    CommandProcessorStatistics.initializeCommandProcessorStatistics0();
    CommandProcessorStatistics.initCommandProcessorStatistics = true;
  }

  updateOnAsyncCommand(command: Command) {
    this.eventCount++;
    this.incomingTraffic += command.size();
  }

  updateOnSyncCommand<O extends Command, I extends Command>(monitor: ReplyMonitor<O, I>) {
    if (this.commandCount === 0) {
      this.startTime = Date.now();
    }

    this.commandCount++;

    this.averageResponseTime = (this.averageResponseTime * (this.commandCount - 1) + Date.now() - monitor.getStartTime()) / this.commandCount;

    this.outgoingTraffic += monitor.getCommand().size();

    if (monitor.getReply() != null) {
      this.incomingTraffic += (monitor.getReply() as I).size();
    } else {
      this.unrepliedCommandCount++;
    }
  }

  public toDataTable(): DataTable {
    try {
      return DataTableConversion.beanToTable(this, CommandProcessorStatistics.FORMAT);
    } catch (ex) {
      throw new Error(ex.message);
    }
  }

  public getStartTime(): number | null {
    return this.startTime;
  }

  public getConnectionTime(): number | null {
    return this.startTime != null ? Date.now() - this.startTime : null;
  }

  public getCommandCount(): number {
    return this.commandCount;
  }

  public getEventCount(): number {
    return this.eventCount;
  }

  public getAverageResponseTime(): number {
    return this.averageResponseTime;
  }

  public getOutgoingTraffic(): number {
    return this.outgoingTraffic;
  }

  public getIncomingTraffic(): number {
    return this.incomingTraffic;
  }

  public getUnrepliedCommandCount(): number {
    return this.unrepliedCommandCount;
  }
}
