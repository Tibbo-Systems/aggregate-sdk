import ElementList from './ElementList';
import DataTableUtils from '../datatable/DataTableUtils';
import Element from './Element';
import JObject from './java/JObject';
import StringBuilder from './java/StringBuilder';

export default class StringUtils extends JObject {
  public static readonly UTF8_CHARSET = 'utf8';
  public static readonly ASCII_CHARSET = 'ISO-8859-1';
  public static readonly WINDOWS_1251_CHARSET = 'windows-1251';

  public static elements(source: string, useVisibleSeparators: boolean): ElementList {
    const res: ElementList = new ElementList();

    const elStart: string = useVisibleSeparators ? DataTableUtils.ELEMENT_VISIBLE_START : DataTableUtils.ELEMENT_START;
    const elEnd: string = useVisibleSeparators ? DataTableUtils.ELEMENT_VISIBLE_END : DataTableUtils.ELEMENT_END;
    const elNameValSep: string = useVisibleSeparators
      ? DataTableUtils.ELEMENT_VISIBLE_NAME_VALUE_SEPARATOR
      : DataTableUtils.ELEMENT_NAME_VALUE_SEPARATOR;

    let depth: number = 0,
      startPos: number = -1,
      nameValSepPos: number = -1;

    for (let i = 0; i < source.length; i++) {
      const c: string = source.charAt(i);

      if (c === elStart) {
        depth++;

        if (depth === 1) {
          startPos = i;
        }
      }

      if (c === elNameValSep) {
        if (depth === 1 && nameValSepPos === -1) {
          nameValSepPos = i;
        }
      }

      if (c === elEnd) {
        depth--;

        if (depth < 0) {
          const min: number = Math.max(0, i - 10);
          throw new Error('Invalid closing element at position ' + i + ' (' + source.substring(min, i) + ')');
        }

        if (depth === 0) {
          let name: string | null = null,
            value: string;

          if (nameValSepPos === -1) {
            value = source.substring(startPos + 1, i);
          } else {
            name = source.substring(startPos + 1, nameValSepPos);
            value = source.substring(nameValSepPos + 1, i);
          }

          res.add(new Element(name, value));

          nameValSepPos = -1;
        }
      }
    }

    if (depth >= 1) {
      throw new Error(
        'Missing closing element(s): ' +
          (source.length > 1000
            ? source.substring(0, 500) + '.....' + source.substring(source.length - 501, source.length - 1)
            : source)
      );
    }

    return res;
  }

  public static createMaskedPasswordString(length: number): string {
    const buf: StringBuilder = new StringBuilder();

    for (let i = 0; i < length; ++i) {
      buf.append('\u2022');
    }

    return buf.toString();
  }

  static split(str: string, ch: string, limit: number = -1): Array<string> {
    const res = new Array<string>();

    let index = 0;
    let newindex = 0;

    let finished = false;

    for (;;) {
      newindex = str.indexOf(ch, index);

      if (newindex == -1) {
        finished = true;
        newindex = str.length;
      }

      res.push(str.substring(index, newindex));

      if (limit > -1 && res.length >= limit) {
        res.push(str.substring(Math.min(newindex + 1, str.length - 1)));
        break;
      }

      if (finished) {
        break;
      }

      index = newindex + 1;

      if (index == str.length) {
        res.push('');
        break;
      }
    }
    return res;
  }

  public static print(
    col: Array<any> | null,
    separator: string = 'null',
    escaper?: string,
    skipNullElements?: boolean
  ): string {
    if (col == null) {
      return 'null';
    }

    const res: StringBuilder = new StringBuilder();
    let i: number = 0;
    let elem: any;

    for (elem in col) {
      if (elem == null && skipNullElements) {
        continue;
      }

      if (i > 0) {
        res.append(separator);
      }

      i++;

      res.append(elem != null ? (escaper != null ? escaper + elem.toString() + escaper : elem.toString()) : 'null');
    }

    return res.toString();
  }

  public static isEmpty(text: string): boolean {
    return text == null || text.length === 0;
  }
}
