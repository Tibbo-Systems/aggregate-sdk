import TableFormat from '../../src/datatable/TableFormat';
import DataTableFactory from '../../src/datatable/DataTableFactory';
import DataTableUtils from '../../src/datatable/DataTableUtils';
import Evaluator from '../../src/expression/Evaluator';
import ErrorCollector from '../../src/util/ErrorCollector';

describe('TestDataTableBinding', () => {
  const VF_TEST_STR = 'str';
  const VF_TEST_INT = 'int';
  const VF_TEST_FLOAT = 'float';
  const VF_TEST_DATATABLE = 'datatable';
  const VF_TEST_DATE = 'date';

  let VFT_TEST: TableFormat;

  beforeEach(() => {
    VFT_TEST = new TableFormat(1, 1);
    VFT_TEST.addField('<' + VF_TEST_STR + '><S>');
    VFT_TEST.addField('<' + VF_TEST_INT + '><I>');
    VFT_TEST.addField('<' + VF_TEST_FLOAT + '><F>');
    VFT_TEST.addField('<' + VF_TEST_DATATABLE + '><T>');
    VFT_TEST.addField('<' + VF_TEST_DATE + '><D>');
  });

  it('testTwoSimpleBindings', async () => {
    const tf = VFT_TEST.clone();
    tf.addBinding(VF_TEST_INT, '123');
    tf.addBinding(VF_TEST_STR, '{' + VF_TEST_INT + '} == 123 ? "ok" : "no"');
    const dt = DataTableFactory.of(tf, 1);
    const evaluator = new Evaluator();
    const errorCollector = new ErrorCollector();
    const res = await DataTableUtils.processBindings(dt, evaluator, errorCollector);

    const expected = DataTableFactory.of(tf, 1);
    expected.rec().setValue(VF_TEST_INT, 123);
    expected.rec().setValue(VF_TEST_STR, 'ok');

    expect(expected.equals(res)).toBeTruthy();
    expect(errorCollector.getErrors().length).toBe(0);
  });

  it('testBindingWithError', async () => {
    const tf = VFT_TEST.clone();
    tf.addBinding(VF_TEST_STR, '{' + VF_TEST_INT);
    const dt = DataTableFactory.of(tf, 1);
    const evaluator = new Evaluator();
    const errorCollector = new ErrorCollector();
    const res = await DataTableUtils.processBindings(dt, evaluator, errorCollector);
    const expected = DataTableFactory.of(tf, 1);

    expect(expected.equals(res)).toBeTruthy();
    expect(errorCollector.getErrors().length).toBe(1);
  });
});
