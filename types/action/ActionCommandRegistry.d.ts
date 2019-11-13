import GenericActionCommand from './GenericActionCommand';
export default class ActionCommandRegistry {
    private static COMMANDS;
    static static_initializer_0(): void;
    static getCommand(type: string): GenericActionCommand | null;
    private static register;
}
