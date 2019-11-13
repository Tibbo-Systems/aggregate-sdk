import ActionCommand from './ActionCommand';

export default interface ActionCommandList {
  getCommands(): Array<ActionCommand> | null;
}
