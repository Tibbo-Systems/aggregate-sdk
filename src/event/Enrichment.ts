import TableFormat from '../datatable/TableFormat';
import Cres from '../Cres';
import DataTableConversion from '../datatable/DataTableConversion';
import ContextUtils from '../context/ContextUtils';
import JObject from '../util/java/JObject';

export default class Enrichment extends JObject {
  private static __static_initialized: boolean = false;
  static FIELD_NAME: string = 'name';

  static FIELD_VALUE: string = 'value';

  static FIELD_DATE: string = 'date';

  static FIELD_AUTHOR: string = 'author';

  public static FORMAT: TableFormat = new TableFormat();

  static __static_initializer_0() {
    if (Enrichment.__static_initialized) return;
    Enrichment.FORMAT.addField('<' + Enrichment.FIELD_NAME + '><S><D=' + Cres.get().getString('name') + '>');
    Enrichment.FORMAT.addField('<' + Enrichment.FIELD_VALUE + '><S><D=' + Cres.get().getString('value') + '>');
    Enrichment.FORMAT.addField('<' + Enrichment.FIELD_DATE + '><D><D=' + Cres.get().getString('date') + '>');
    Enrichment.FORMAT.addField('<' + Enrichment.FIELD_AUTHOR + '><S><F=N><D=' + Cres.get().getString('author') + '>');
    Enrichment.FORMAT.setNamingExpression(
      'print({}, "{' +
        Enrichment.FIELD_NAME +
        "} + '=' + {" +
        Enrichment.FIELD_VALUE +
        "} + ' (' + {" +
        Enrichment.FIELD_DATE +
        "} + ', ' + {" +
        Enrichment.FIELD_AUTHOR +
        '} + \')\'", "; ")'
    );
    const DefaultFormatConverter = require('../datatable/converter/DefaultFormatConverter').default;

    DataTableConversion.registerFormatConverter(new DefaultFormatConverter(null, Enrichment.FORMAT));
    Enrichment.__static_initialized = true;
  }

  private name: string;

  private value: string;

  private date: Date;

  private author: string | null;

  constructor(name: string | null, value: string, date: Date, author: string | null) {
    super();

    if (!ContextUtils.isValidContextName(name)) {
      throw new Error('Illegal enrichment name: ' + name);
    }

    //@ts-ignore
    this.name = name;
    this.value = value;
    this.date = date;
    this.author = author;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(value: string) {
    this.value = value;
  }

  public getDate(): Date {
    return this.date;
  }

  public setDate(date: Date) {
    this.date = date;
  }

  public getAuthor(): string | null {
    return this.author;
  }

  public setAuthor(author: string) {
    this.author = author;
  }
}
Enrichment.__static_initializer_0();
