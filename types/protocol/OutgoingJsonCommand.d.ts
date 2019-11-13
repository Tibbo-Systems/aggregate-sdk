import OutgoingAggreGateCommand from './OutgoingAggregateCommand';
export default class OutgoingJsonCommand extends OutgoingAggreGateCommand {
    private parameters;
    addParam(param: string): OutgoingAggreGateCommand;
    complete(): void;
}
