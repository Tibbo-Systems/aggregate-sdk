import OutgoingAggreGateCommand from './OutgoingAggregateCommand';
import ProtocolVersion from './ProtocolVersion';
import AggreGateCommand from './AggreGateCommand';
import TransferEncodingHelper from '../datatable/encoding/TransferEncodingHelper';
import OutgoingJsonCommand from './OutgoingJsonCommand';
import JObject from '../util/java/JObject';

export default class ProtocolCommandBuilder extends JObject {
  private readonly json: boolean;

  constructor(json: boolean) {
    super();
    this.json = json;
  }

  public createCommand(): OutgoingAggreGateCommand {
    return ProtocolCommandBuilder.createCommand(this.json);
  }

  public static createCommand(json: boolean): OutgoingAggreGateCommand {
    if (json) return new OutgoingJsonCommand();
    else return new OutgoingAggreGateCommand();
  }

  public startMessage(version: string = ProtocolVersion.V4): OutgoingAggreGateCommand {
    const cmd = ProtocolCommandBuilder.createCommand(this.json);
    cmd.addParam(AggreGateCommand.COMMAND_CODE_MESSAGE);
    cmd.addParam(AggreGateCommand.generateId());
    cmd.addParam(AggreGateCommand.MESSAGE_CODE_START);
    cmd.addParam(version);
    return cmd;
  }

  public operationMessage(): OutgoingAggreGateCommand {
    const cmd = ProtocolCommandBuilder.createCommand(this.json);
    cmd.addParam(AggreGateCommand.COMMAND_CODE_MESSAGE);
    cmd.addParam(AggreGateCommand.generateId());
    cmd.addParam(AggreGateCommand.MESSAGE_CODE_OPERATION);
    return cmd;
  }

  public getVariableOperation(context: string, name: string): OutgoingAggreGateCommand {
    const cmd = this.operationMessage();
    cmd.addParam(AggreGateCommand.COMMAND_OPERATION_GET_VAR);
    cmd.addParam(context);
    cmd.addParam(name);
    return cmd;
  }

  public setVariableOperation(context: string, name: string, encodedValue: string, queueName: string | null): OutgoingAggreGateCommand {
    const cmd = this.operationMessage();
    cmd.addParam(AggreGateCommand.COMMAND_OPERATION_SET_VAR);
    cmd.addParam(context);
    cmd.addParam(name);
    cmd.addParam(encodedValue);
    if (queueName != null) {
      cmd.addParam(TransferEncodingHelper.encodeFromString(queueName) as string);
    }
    return cmd;
  }

  public callFunctionOperation(context: string, name: string, encodedInput: string, queueName: string | null, flags: string | null): OutgoingAggreGateCommand {
    const cmd = this.operationMessage();
    cmd.addParam(AggreGateCommand.COMMAND_OPERATION_CALL_FUNCTION);
    cmd.addParam(context);
    cmd.addParam(name);
    cmd.addParam(encodedInput);
    if (queueName != null || flags != null) {
      if (queueName == null) {
        queueName = '';
      }
      cmd.addParam(TransferEncodingHelper.encodeFromString(queueName) as string);
    }

    if (flags != null) {
      cmd.addParam(TransferEncodingHelper.encodeFromString(flags) as string);
    }
    return cmd;
  }

  public addEventListenerOperation(context: string, name: string, listenerHashCode: number | null, filter: string | null, fingerprint: string | null): OutgoingAggreGateCommand {
    return this.eventListenerOperation(AggreGateCommand.COMMAND_OPERATION_ADD_EVENT_LISTENER, context, name, listenerHashCode, filter, fingerprint);
  }

  public removeEventListenerOperation(context: string, name: string, listenerHashCode: number | null, filter: string | null, fingerprint: string | null): OutgoingAggreGateCommand {
    return this.eventListenerOperation(AggreGateCommand.COMMAND_OPERATION_REMOVE_EVENT_LISTENER, context, name, listenerHashCode, filter, fingerprint);
  }

  private eventListenerOperation(commandName: string, context: string, name: string, listenerHashCode: number | null, filter: string | null, fingerprint: string | null): OutgoingAggreGateCommand {
    const cmd = this.operationMessage();

    cmd.addParam(commandName);
    cmd.addParam(context);
    cmd.addParam(name);
    cmd.addParam(listenerHashCode ? listenerHashCode.toString() : '');

    if (filter != null) {
      cmd.addParam(TransferEncodingHelper.encodeFromString(filter) as string);
    } else if (fingerprint != null) {
      // add empty filter parameter to ensure fingerprint parameter order in command
      cmd.addParam('');
    }

    if (fingerprint != null) {
      cmd.addParam(TransferEncodingHelper.encodeFromString(fingerprint) as string);
    }

    return cmd;
  }
}
