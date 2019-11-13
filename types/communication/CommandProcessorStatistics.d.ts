import ReplyMonitor from './ReplyMonitor';
import Command from './Command';
import JObject from '../util/java/JObject';
import TableFormat from '../datatable/TableFormat';
import DataTable from '../datatable/DataTable';
export default class CommandProcessorStatistics extends JObject {
    private static initCommandProcessorStatistics;
    static readonly FORMAT: TableFormat;
    private static initializeCommandProcessorStatistics0;
    private startTime;
    private commandCount;
    private eventCount;
    private averageResponseTime;
    private outgoingTraffic;
    private incomingTraffic;
    private unrepliedCommandCount;
    static initializeCommandProcessorStatistics(): void;
    updateOnAsyncCommand(command: Command): void;
    updateOnSyncCommand<O extends Command, I extends Command>(monitor: ReplyMonitor<O, I>): void;
    toDataTable(): DataTable;
    getStartTime(): number | null;
    getConnectionTime(): number | null;
    getCommandCount(): number;
    getEventCount(): number;
    getAverageResponseTime(): number;
    getOutgoingTraffic(): number;
    getIncomingTraffic(): number;
    getUnrepliedCommandCount(): number;
}
