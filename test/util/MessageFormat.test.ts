import MessageFormat from '../../src/util/java/MessageFormat';
import { Cres } from '../../src';

describe('MessageFormatTest', () => {
  it('TableRecordsCountTest', () => {
    const recordsCount = 4;
    expect(MessageFormat.format(Cres.get().getString('dtTable'), recordsCount)).toBe('4 record(s)');
  });
  it('dtIllegalFieldValueTest', () => {
    expect(MessageFormat.format(Cres.get().getString('dtIllegalFieldValue'), null, 'Layout (layout), Integer')).toBe("Illegal value 'null' for field 'Layout (layout), Integer':");
  });
  it('dtNullsNotPermitted', () => {
    expect(MessageFormat.format(Cres.get().getString('dtNullsNotPermitted'), 'Columns')).toBe("Null values are not permitted in field 'Columns'");
  });
});
