import OutgoingAggreGateCommand from './OutgoingAggregateCommand';
import JObject from '../util/java/JObject';
export default class ProtocolCommandBuilder extends JObject {
    private readonly json;
    constructor(json: boolean);
    createCommand(): OutgoingAggreGateCommand;
    static createCommand(json: boolean): OutgoingAggreGateCommand;
    startMessage(version?: string): OutgoingAggreGateCommand;
    operationMessage(): OutgoingAggreGateCommand;
    getVariableOperation(context: string, name: string): OutgoingAggreGateCommand;
    setVariableOperation(context: string, name: string, encodedValue: string, queueName: string | null): OutgoingAggreGateCommand;
    callFunctionOperation(context: string, name: string, encodedInput: string, queueName: string | null, flags: string | null): OutgoingAggreGateCommand;
    addEventListenerOperation(context: string, name: string, listenerHashCode: number | undefined, filter: string | null, fingerprint: string | undefined): OutgoingAggreGateCommand;
    removeEventListenerOperation(context: string, name: string, listenerHashCode: number | undefined, filter: string | null, fingerprint: string | undefined): OutgoingAggreGateCommand;
    private eventListenerOperation;
}
