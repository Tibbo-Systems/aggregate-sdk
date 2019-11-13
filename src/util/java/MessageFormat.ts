import JObject from './JObject';

export default class MessageFormat extends JObject {
  public static format(message: string, ...args: any[]): string {
    for (let i = 0; i < args.length; i++) {
      message = message.replace("'{" + i + "}'", args[i]);
    }

    if (message.indexOf(args[0]) === -1) message = message.concat(...(args as string[]));

    return message;
  }
}
