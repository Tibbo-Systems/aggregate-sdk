import JObject from './JObject';
export default class MessageFormat extends JObject {
    static format(message: string, ...args: any[]): string;
}
