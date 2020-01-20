import TableFormat from '../datatable/TableFormat';
import Cres from '../Cres';
import DataTableConversion from '../datatable/DataTableConversion';
import DefaultFormatConverter from '../datatable/converter/DefaultFormatConverter';
import JObject from '../util/java/JObject';

export default class Acknowledgement extends JObject {
  public static readonly FIELD_AUTHOR: string = 'author';

  public static readonly FIELD_TIME: string = 'time';

  public static readonly FIELD_TEXT: string = 'text';

  public static readonly FORMAT: TableFormat = new TableFormat();
  private static __static_initialized = false;

  static __static_initializer_0() {
    if (Acknowledgement.__static_initialized) return;

    Acknowledgement.FORMAT.addField('<' + Acknowledgement.FIELD_AUTHOR + '><S><F=N><D=' + Cres.get().getString('author') + '>');
    Acknowledgement.FORMAT.addField('<' + Acknowledgement.FIELD_TIME + '><D><D=' + Cres.get().getString('time') + '>');
    Acknowledgement.FORMAT.addField('<' + Acknowledgement.FIELD_TEXT + '><S><D=' + Cres.get().getString('text') + '>');
    Acknowledgement.FORMAT.setNamingExpression('print({}, "{' + Acknowledgement.FIELD_TIME + "} + ': ' + {" + Acknowledgement.FIELD_TEXT + "} + ' (' + {" + Acknowledgement.FIELD_AUTHOR + '} + \')\'", "; ")');
    DataTableConversion.registerFormatConverter(new DefaultFormatConverter(null, Acknowledgement.FORMAT));

    Acknowledgement.__static_initialized = true;
  }

  private author: string;

  private time: Date;

  private text: string;

  constructor(author: string, time: Date, text: string) {
    super();
    this.author = author;
    this.time = time;
    this.text = text;
  }

  public getAuthor(): string {
    return this.author;
  }

  public getText(): string {
    return this.text;
  }

  public getTime(): Date {
    return this.time;
  }

  public setAuthor(author: string) {
    this.author = author;
  }

  public setText(text: string) {
    this.text = text;
  }

  public setTime(time: Date) {
    this.time = time;
  }

  public getFormat(): TableFormat {
    return Acknowledgement.FORMAT;
  }

  clone(): Acknowledgement {
    return super.clone() as Acknowledgement;
  }
}

Acknowledgement.__static_initializer_0();
