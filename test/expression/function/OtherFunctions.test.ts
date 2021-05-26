import EvaluationEnvironment from '../../../src/expression/EvaluationEnvironment';
import Expression from '../../../src/expression/Expression';
import CommonsFixture from '../../tests/CommonsFixture';
import EvaluateFunction from '../../../src/expression/function/other/EvaluateFunction';
import StubContext from '../../tests/StubContext';
import DefaultContextManager from '../../../src/context/DefaultContextManager';
import TraceFunction from '../../../src/expression/function/other/TraceFunction';
import UncheckedCallerController from '../../../src/context/UncheckedCallerController';
import UserFunction from '../../../src/expression/function/other/UserFunction';
import LoginFunction from '../../../src/expression/function/other/LoginFunction';
import TableFromJSONFunction from '../../../src/expression/function/other/TableFromJSONFunction';
import Functions from '../../../src/expression/function/Functions';
import SimpleDataTable from '../../../src/datatable/SimpleDataTable';
import DataTable from '../../../src/datatable/DataTable';
import FieldFormatFactory from '../../../src/datatable/FieldFormatFactory';
import TableFormat from '../../../src/datatable/TableFormat';
import ExpressionEditorOptionsFunction from '../../../src/expression/function/ExpressionEditorOptionsFunction';
import FieldConstants from '../../../src/datatable/field/FieldConstants';
import JsonEncodingHelper from '../../../src/datatable/encoding/JsonEncodingHelper';
import Data from '../../../src/data/Data';
import TableFromCSVFunction from '../../../src/expression/function/other/TableFromCSVFunction';
import XPathFunction from '../../../src/expression/function/other/XPathFunction';
import ByteBuffer from 'bytebuffer';
import AggregateFunction from '../../../src/expression/function/table/AggregateFunction';
import FormatFunction from '../../../src/expression/function/other/FormatFunction';

const evaluationEnvironment = new EvaluationEnvironment();

describe('TestOtherFunctions', () => {
  const format = new TableFormat(2);
  format.addField(FieldFormatFactory.createType('A', FieldConstants.BOOLEAN_FIELD));
  format.addField(FieldFormatFactory.createType('A1', FieldConstants.INTEGER_FIELD));
  format.addField(FieldFormatFactory.createType('A2', FieldConstants.LONG_FIELD));
  format.addField(FieldFormatFactory.createType('A3', FieldConstants.FLOAT_FIELD));
  format.addField(FieldFormatFactory.createType('A4', FieldConstants.DOUBLE_FIELD));
  format.addField(FieldFormatFactory.createType('A5', FieldConstants.COLOR_FIELD));
  format.addField(FieldFormatFactory.createType('A6', FieldConstants.STRING_FIELD));
  format.addField(FieldFormatFactory.createType('A7', FieldConstants.DATE_FIELD));
  format.addField(FieldFormatFactory.createType('A8', FieldConstants.DATA_FIELD).setNullable(true));
  it('testStoreAndLoadFunctions', () => {
    const ev = CommonsFixture.createTestEvaluator();
    let res = ev.evaluate(new Expression("st('var', 11 + 22 + 33) > 50 ? ld('var') : -1"), new EvaluationEnvironment());
    expect(res).toBe(66);
    res = ev.evaluate(new Expression('st("list", 123) != null ? ld("list") : null'), new EvaluationEnvironment());
    expect(res).toBe(123);
  });

  it('testCatchFunction', async () => {
    const ev = CommonsFixture.createTestEvaluator();
    let res = await ev.evaluate(new Expression('catch({.:invalidPathContext}, "error")'), new EvaluationEnvironment());
    expect(res).toBe('error');
    res = await ev.evaluate(new Expression("evaluate(\"'result: ' + string(catch({.:fffF}, 'error'))\")"), new EvaluationEnvironment());
    expect(res).toBe('result: error');
  });

  it('testCatchWithAggregateFunction', async () => {
    const ev = CommonsFixture.createTestEvaluator();
    const format = new TableFormat();
    format.addField('<str><S>');
    const table = new SimpleDataTable(format);
    table.addRecordWith('0');
    table.addRecordWith('1');
    table.addRecordWith('q');
    table.addRecordWith('3');
    const exp1 = '{env/previous} + catch(evaluate("string(integer(string({str})))"), "err")';

    const res = await new AggregateFunction().asyncExecute(ev, new EvaluationEnvironment(), [table, exp1, 'start']);

    expect(res).toBe('start01err3');
  });

  it('testEvaluateFunction', async () => {
    const ev = CommonsFixture.createTestEvaluator();
    const result = await new EvaluateFunction().asyncExecute(CommonsFixture.createTestEvaluator(), evaluationEnvironment, ['dt()']);

    expect(ev.getDefaultResolver().getDefaultTable()?.equals(result)).toBe(true);
  });

  it('testEvaluateFunctionWithAdditionalParams', async () => {
    const ev = CommonsFixture.createTestEvaluator();
    const context = new StubContext('root');
    context.addChild(new StubContext('child'));
    const defaultTable = ev.getDefaultResolver().getDefaultTable();
    const contextManager = new DefaultContextManager(true);
    contextManager.setRoot(context);
    ev.getDefaultResolver().setContextManager(contextManager);

    const result = await new EvaluateFunction().asyncExecute(ev, evaluationEnvironment, ['dt()', 'root', defaultTable, 0]);

    expect(result).toBe(defaultTable);
  });
  it('testFormatFunction', () => {
    const ev = CommonsFixture.createTestEvaluator();
    let pattern = '%1$tm %1$te,%1$tY';
    let data: any = new Date(1521705584);
    let expected = '01 18,1970';
    let result = new FormatFunction().execute(ev, evaluationEnvironment, [pattern, data]);
    expect(result).toBe(expected);

    pattern = '%1$tH %1$tI %1$tk %1$tl';
    data = new Date();
    data.setHours(8);
    result = new FormatFunction().execute(ev, evaluationEnvironment, [pattern, data]);
    expect(result).toBe('08 08 8 8');
    data.setHours(15);
    result = new FormatFunction().execute(ev, evaluationEnvironment, [pattern, data]);
    expect(result).toBe('15 03 15 3');

    pattern = '%1$tM %1$tS %1$ts %1$tL %1$tN %1$tp %1$tz %1$tZ';
    data = new Date(1521705584);
    expected = '41 45 1521705 584 584000000 pm +03:00 Europe/Moscow';
    result = new FormatFunction().execute(ev, evaluationEnvironment, [pattern, data]);
    expect(result).toBe(expected);

    pattern = '%1$tC %1$tY %1$ty %1$tB %1$tb %1$th %1$tm %1$tA %1$ta %1$tj %1$td %1$te';
    data = new Date(1521705);
    expected = '19 1970 70 January Jan Jan 01 Thursday Thu 001 01 1';
    result = new FormatFunction().execute(ev, evaluationEnvironment, [pattern, data]);
    expect(result).toBe(expected);

    pattern = 'HH:mm %1$tR; HH:mm:ss %1$tT; hh:mm:ss A %1$tr; MM/DD/YY %1$tD; YYYY-MM-DD %1$tF; dd MMM DD HH:mm:ss Z YYYY %1$tc';
    data = new Date(1521705);
    expected = 'HH:mm 03:25; HH:mm:ss 03:25:21; hh:mm:ss A 03:25:21 AM; MM/DD/YY 01/01/70; YYYY-MM-DD 1970-01-01; dd MMM DD HH:mm:ss Z YYYY Th Jan 01 03:25:21 +03:00 1970';
    result = new FormatFunction().execute(ev, evaluationEnvironment, [pattern, data]);
    expect(result).toBe(expected);

    pattern = '%4$2s %3$2S %2$2s %1$2s';
    data = ['a', 'b', 'c', 'd'];
    expected = ' d  C  b  a';
    result = new FormatFunction().execute(ev, evaluationEnvironment, [pattern, ...data]);
    expect(result).toBe(expected);

    pattern = 'e = %+10.4f';
    data = Math.E;
    expected = 'e =    +2.7183';
    result = new FormatFunction().execute(ev, evaluationEnvironment, [pattern, data]);
    expect(result).toBe(expected);

    pattern = '%1$h, %2$h, %3$H, %4$H, %5$h';
    data = [123.456, 'false', 123, true, ''];
    expected = '5ac16358, 5cb1923, 7B, 4CF, 0';
    result = new FormatFunction().execute(ev, evaluationEnvironment, [pattern, ...data]);
    expect(result).toBe(expected);

    pattern = '%2$12o %1$o';
    data = [112233, 11];
    expected = '          13 333151';
    result = new FormatFunction().execute(ev, evaluationEnvironment, [pattern, ...data]);
    expect(result).toBe(expected);

    pattern = '%1$4x %2$x';
    data = [123, 11];
    expected = '  7b b';
    result = new FormatFunction().execute(ev, evaluationEnvironment, [pattern, ...data]);
    expect(result).toBe(expected);

    pattern = '%8.2e %E';
    data = [1234.5678, 123.4];
    expected = ' 1.23e+3 1.234E+2';
    result = new FormatFunction().execute(ev, evaluationEnvironment, [pattern, ...data]);
    expect(result).toBe(expected);

    pattern = '%10.2f %f';
    data = [1234.5678, 123.45];
    expected = '   1234.57 123.45';
    result = new FormatFunction().execute(ev, evaluationEnvironment, [pattern, ...data]);
    expect(result).toBe(expected);

    pattern = '%+.2g %.1G';
    data = [1234.5678, 123.52];
    expected = '+1.2e+3 1E+2';
    result = new FormatFunction().execute(ev, evaluationEnvironment, [pattern, ...data]);
    expect(result).toBe(expected);

    pattern = '%a %a';
    data = [123.123456789, 456.456];
    expected = '7b.1f9add373964 1c8.74bc6a7ef9e';
    result = new FormatFunction().execute(ev, evaluationEnvironment, [pattern, ...data]);
    expect(result).toBe(expected);
  });

  it('testTraceFunction,', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const value = 'Trace value';

    const result = new TraceFunction().execute(ev, evaluationEnvironment, [value]);

    expect(result).toBe(value);
  });

  it('testUserFunction', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const username = 'Test username';
    ev.getDefaultResolver().setCallerController(new UncheckedCallerController(username));

    const result = new UserFunction().execute(ev, evaluationEnvironment, []);

    expect(result).toBe(username);
  });

  it('testLoginFunction', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const username = 'Test username';
    ev.getDefaultResolver().setCallerController(new UncheckedCallerController(username));
    const result = new LoginFunction().execute(ev, evaluationEnvironment, []);
    expect(result).toBe(username);
  });

  it('testExpressionEditorOptions', async () => {
    const ev = CommonsFixture.createTestEvaluator();
    const root = new StubContext('root');
    root.addChild(new StubContext('child'));
    const contextManager = new DefaultContextManager(false);

    ev.getDefaultResolver().setContextManager(contextManager);
    ev.getDefaultResolver().setCallerController(contextManager.getCallerController());
    ev.getDefaultResolver().setDefaultContext(root);

    const tf = new TableFormat(1, 1);
    tf.addField(FieldFormatFactory.create('<int><I>'));
    tf.addField(FieldFormatFactory.create('<reference><S>'));
    tf.addField(FieldFormatFactory.create('<description><S><D=description>'));
    const table = new SimpleDataTable(tf, true);

    const expFunction = new ExpressionEditorOptionsFunction();
    const result = await expFunction.asyncExecute(ev, new EvaluationEnvironment(), ['child', 'str', '1', table]);
    expect(result).not.toBeNull();
    expect(result.length === 0).toBeFalsy();
  });

  it('testTableFromJSONFunction', () => {
    const ev = CommonsFixture.createTestEvaluator();
    let simpleJSON =
      '{"coord":{"lon":38.11,"lat":50.2},"weather":[{"id":801,"main":"Clouds","description":"облачно",' +
      '"icon":"02d"}],"base":"cmc stations","main":{"temp":9.1,"pressure":1027.23,"humidity":53,"temp_min":9.1,"temp_max":9.1,' +
      '"sea_level":1048.6,"grnd_level":1027.23},"wind":{"speed":1.97,"deg":27.5007},"clouds":{"all":24},"dt":1444991331,' +
      '"sys":{"message":0.0036,"country":"RU","sunrise":1444967469,"sunset":1445006053},"id":477192,"name":"Valuyki","cod":200, "bool":true}';

    let res = new TableFromJSONFunction(Functions.GROUP_OTHER).execute(ev, new EvaluationEnvironment(), [simpleJSON]);
    let dataTable = res as DataTable;

    expect(dataTable.getFieldCount()).toBe(12);

    for (let i = 0; i < dataTable.getFieldCount(); i++) {
      expect(dataTable.rec().getValue(i)).not.toBeNull();
    }
    expect(dataTable.rec().getDataTable('weather').getRecordCount()).toBe(1);
    const nullValueJSON = '{"null": null}';
    res = new TableFromJSONFunction(Functions.GROUP_OTHER).execute(ev, new EvaluationEnvironment(), [nullValueJSON]);
    dataTable = res as DataTable;
    expect(dataTable.getFieldCount()).toBe(1);
    simpleJSON =
      '{        "cis" : [{        "ucmdbId" : "43ad626bf9d2af05b72a67277bcfe3b1",        "type" : "nt",        "properties" :    {       "name" : "win2008r2ee",       "root_class" : "nt"     }      }, {        "ucmdbId" : "46124847af5f20269ea8aa949aade1ca",        "type" : "unix",        "properties" :    {       "host_isvirtual" : true,       "host_osinstalltype" : "Red Hat Enterprise Linux Server",       "discovered_model" : "VMware Virtual Platform",       "discovered_os_name" : "Red Hat(Linux)",       "primary_dns_name" : "host-linux-oa.factor.edu",       "name" : "host-linux-oa",       "discovered_os_version" : "7.1",       "root_class" : "unix",       "os_architecture" : "64-bit"     }      }, {        "ucmdbId" : "4dbc2336d95eb48f9a6075a0a514d32c",        "type" : "nt",        "properties" :    {       "host_isvirtual" : true,       "host_osinstalltype" : "Server Enterprise",       "discovered_model" : "VMware Virtual Platform",       "discovered_os_name" : "Windows 2008 R2",       "primary_dns_name" : "soib-agt-w2008.factor.edu",       "name" : "soib-agt-w2008",       "discovered_os_version" : "6.1.7601",       "root_class" : "nt",       "os_architecture" : "64-bit"     }      }, {        "ucmdbId" : "4f682706c7ebff93b4e00bc2bb621b14",        "type" : "nt",        "properties" :    {       "name" : "ada",       "root_class" : "nt"     }      } ],      "relations" : null    }';
    res = new TableFromJSONFunction(Functions.GROUP_OTHER).execute(ev, new EvaluationEnvironment(), [simpleJSON]);
    dataTable = res as DataTable;
    expect(dataTable.getFieldCount()).toBe(2);
    const cis = dataTable.rec().getDataTable('cis');
    for (let i = 0; i < cis.getRecordCount(); i++) {
      expect(cis.getRecord(i)).not.toBeNull();
      expect(cis.getRecord(i).getFieldCount()).toBe(1);
      const val = cis.getRecord(i).getDataTable('value');
      expect(val.rec().getFieldCount()).toBe(3);
      for (let j = 0; j < val.rec().getFieldCount(); j++) expect(val.rec().getValue(j)).not.toBeNull();
    }
    const jsonArrays = '{ "idHardware":{ "node": "kas-azk18", "id": "kas-azk18_7408081", "internalId": 7408081 }, "hardware": "tank", "number": 4, "comment": null, "gas": null, "gasName": null, "idChildrenHardware": [] }';

    res = new TableFromJSONFunction(Functions.GROUP_OTHER).execute(ev, new EvaluationEnvironment(), [jsonArrays]);
    dataTable = res as DataTable;

    expect(dataTable.getFieldCount()).toBe(7);

    const hardware = dataTable.rec().getDataTable('idChildrenHardware');
    expect(hardware.getRecordCount()).toBe(0);

    const jsonOuterArray = '[1,2,3]';

    res = new TableFromJSONFunction(Functions.GROUP_OTHER).execute(ev, new EvaluationEnvironment(), [jsonOuterArray]);
    dataTable = res as DataTable;
    expect(dataTable.getRecordCount()).toBe(3);

    // Testing JSON arrays where the first element is null
    const jsonArrayWithTwoAtomicElements = '{ "cis": [ null, true ] }';

    res = new TableFromJSONFunction(Functions.GROUP_OTHER).execute(ev, new EvaluationEnvironment(), [jsonArrayWithTwoAtomicElements]);
    dataTable = res as DataTable;

    expect(dataTable.rec().getDataTable('cis').getRecordCount()).toBe(2);
    expect(dataTable.rec().getDataTable('cis').getFieldFormat(0).getType()).toBe(FieldConstants.BOOLEAN_FIELD);
    expect(dataTable.rec().getDataTable('cis').getRecord(1).getBoolean(0)).toBe(true);

    const jsonArrayWithTwoJSONObjects = '{ "cis": [ { "prop": null }, { "prop": null } ] }';

    expect(dataTable.rec().getDataTable('cis').getRecordCount()).toBe(2);
    res = new TableFromJSONFunction(Functions.GROUP_OTHER).execute(ev, new EvaluationEnvironment(), [jsonArrayWithTwoJSONObjects]);
    dataTable = res as DataTable;

    expect(dataTable.rec().getDataTable('cis').getRecordCount()).toBe(2);
    expect(dataTable.rec().getDataTable('cis').rec().getDataTable(0).getFieldFormat('prop').getType()).toBe(FieldConstants.STRING_FIELD);
    expect(dataTable.rec().getDataTable('cis').getRecord(1).getDataTable(0).rec().getBoolean('prop')).toBeNull();

    const jsonArrayWithTwoJSONObjects2 = '{ "cis": [ { "prop": null }, { "prop": true } ] }';

    expect(dataTable.rec().getDataTable('cis').getRecordCount()).toBe(2);
    res = new TableFromJSONFunction(Functions.GROUP_OTHER).execute(ev, new EvaluationEnvironment(), [jsonArrayWithTwoJSONObjects2]);
    dataTable = res as DataTable;

    expect(dataTable.rec().getDataTable('cis').getRecordCount()).toBe(2);
    expect(dataTable.rec().getDataTable('cis').rec().getDataTable(0).getFieldFormat('prop').getType()).toBe(FieldConstants.BOOLEAN_FIELD);
    expect(dataTable.rec().getDataTable('cis').getRecord(1).getDataTable(0).rec().getBoolean('prop')).toBe(true);

    const jsonArrayWithTwoJSONObjects3 = '{ "cis": [ { "properties": null }, { "properties": { "host_isvirtual": true } } ] }';

    res = new TableFromJSONFunction(Functions.GROUP_OTHER).execute(ev, new EvaluationEnvironment(), [jsonArrayWithTwoJSONObjects3]);
    dataTable = res as DataTable;

    expect(dataTable.rec().getDataTable('cis').getRecordCount()).toBe(2);

    const jsonArrayWithTwoJSONObjects4 = '{ "cis": [ { "properties": { "host_isvirtual": true }}, { "properties": { "host_isvirtual": false} } ] }';

    res = new TableFromJSONFunction(Functions.GROUP_OTHER).execute(ev, new EvaluationEnvironment(), [jsonArrayWithTwoJSONObjects4]);
    dataTable = res as DataTable;

    expect(dataTable.rec().getDataTable('cis').getRecordCount()).toBe(2);

    // Testing JSON arrays with convertUnequalFieldTypesToString parameter
    const jsonArrayWithUnequalFieldTypes5 = '[{"num":48, "test":5}, {"num":654, "test":"ff"}]';
    res = new TableFromJSONFunction(Functions.GROUP_OTHER).execute(ev, new EvaluationEnvironment(), [jsonArrayWithUnequalFieldTypes5, true]);
    dataTable = res as DataTable;
    expect(dataTable.rec().getDataTable(0).getFormat().getField('num').getType()).toBe(FieldConstants.LONG_FIELD);
    expect(dataTable.rec().getDataTable(0).getFormat().getField('test').getType()).toBe(FieldConstants.STRING_FIELD);

    res = new TableFromJSONFunction(Functions.GROUP_OTHER).execute(ev, new EvaluationEnvironment(), ['{"values": [1, 2.2, 4.4, 5.5]}', true]);
    dataTable = res as DataTable;
    expect(dataTable.rec().getDataTable(0).getFormat().getField('value').getType()).toBe(FieldConstants.STRING_FIELD);

    res = new TableFromJSONFunction(Functions.GROUP_OTHER).execute(ev, new EvaluationEnvironment(), ['{"values": [1, 2.2, 4.4, 5.5]}', false]);
    dataTable = res as DataTable;
    expect(dataTable.rec().getDataTable(0).getFormat().getField('value').getType()).toBe(FieldConstants.LONG_FIELD);
  });

  it('testTableFromJSONFunctionWithJSONArray', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const objectOne = { str: 'STR', two: 'TWO' };
    const objectTwo = { str2: 'STR2', two: 'TWO2' };
    const objectThree = { str3: 'STR3' };
    const arr1 = [objectThree];
    const json = JSON.stringify([objectOne, objectTwo, arr1]);
    const res = new TableFromJSONFunction(Functions.GROUP_OTHER).execute(ev, new EvaluationEnvironment(), [json]);
    expect(res.getRecordCount()).toBe(3);
  });
  it('testTableToJson', () => {
    const data = new Data(ByteBuffer.fromUTF8('test data'));
    const date = new Date(1528275600000);
    const originalDataTable = new SimpleDataTable(format);
    originalDataTable.addRecordWith(false, 3, 123456, 1.23456, 1.98765, 'green', 'string', date.getTime(), null);
    originalDataTable.addRecordWith(true, -3, 123, 1.23, 1.987, 'green', 'string', date.getTime(), data);

    const json =
      '[{"A":false,"A1":3,"A2":"123456","A3":1.23456,"A4":1.98765,"A5":"green","A6":"string","A7":"2018-06-06 12:00:00.000","A8":""},{"A":true,"A1":-3,"A2":"123","A3":1.23,"A4":1.987,"A5":"green","A6":"string","A7":"2018-06-06 12:00:00.000","A8":"{\\"id\\":null,\\"name\\":null,\\"preview\\":null,\\"data\\":{\\"buffer\\":{\\"type\\":\\"Buffer\\",\\"data\\":[116,101,115,116,32,100,97,116,97]},\\"offset\\":0,\\"markedOffset\\":-1,\\"limit\\":9,\\"littleEndian\\":false,\\"noAssert\\":false},\\"shallowCopy\\":false,\\"attachments\\":{}}"}]';
    expect(JsonEncodingHelper.tableToJson(originalDataTable)).toBe(json);
  });
  it('testTableWithInnerTableToJson', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const tf = new TableFormat(2);
    tf.addField(FieldFormatFactory.createType('A', FieldConstants.BOOLEAN_FIELD));
    tf.addField(FieldFormatFactory.createType('D', FieldConstants.DATATABLE_FIELD));
    const inner = new SimpleDataTable(format);
    const date = new Date(1528275600000);
    const json = '[{"A":true,"D":[{"A":false,"A1":3,"A2":"123456","A3":1.23456,"A4":987654,"A5":"color","A6":"string","A7":"2018-06-06 12:00:00.000","A8":""}]},{"A":false,"D":[]}]';
    inner.addRecordWith(false, 3, 123456, 1.23456, 987654, 'color', 'string', date, null);
    const originalDataTable = new SimpleDataTable(tf);
    originalDataTable.addRecordWith(true, inner);
    originalDataTable.addRecordWith(false);
    expect(JsonEncodingHelper.tableToJson(originalDataTable)).toBe(json);
  });
  it('testCSVFunction', () => {
    const ev = CommonsFixture.createTestEvaluator();
    //  format is not specified

    let aCsvWithHeader = 'col1;col2\n' + 'val11;val12\n' + 'val21;val22\n';

    let res = new TableFromCSVFunction().execute(ev, new EvaluationEnvironment(), [aCsvWithHeader, 'names', ';']);
    let dataTable = res as DataTable;

    expect(dataTable.getFieldCount()).toBe(2);
    expect(dataTable.hasField('col1')).toBeTruthy();
    expect(dataTable.hasField('col2')).toBeTruthy();

    expect(dataTable.getRecord(0).getValue('col1')).toBe('val11');
    expect(dataTable.getRecord(0).getValue('col2')).toBe('val12');
    expect(dataTable.getRecord(1).getValue('col1')).toBe('val21');
    expect(dataTable.getRecord(1).getValue('col2')).toBe('val22');

    res = new TableFromCSVFunction().execute(ev, new EvaluationEnvironment(), [aCsvWithHeader, 'descriptions', ';']);
    dataTable = res as DataTable;

    expect(dataTable.getFieldCount()).toBe(2);

    expect(dataTable.getFieldFormat('0').getDescription()).toBe('col1');
    expect(dataTable.getFieldFormat('1').getDescription()).toBe('col2');

    expect(dataTable.getRecord(0).getValue('0')).toBe('val11');
    expect(dataTable.getRecord(1).getValue('1')).toBe('val22');

    // format is specified

    const format = '<<col_1><I>><<col_2><F>>';
    const aCsvWithoutHeader = '111,111.1\n' + '222,222.2\n';

    res = new TableFromCSVFunction().execute(ev, new EvaluationEnvironment(), [aCsvWithoutHeader, 'none', ',', format]);
    dataTable = res as DataTable;

    expect(dataTable.getFieldCount()).toBe(2);

    expect(dataTable.getRecord(0).getValue('col_1')).toBe(111);
    expect(Math.abs(111.1 - dataTable.getRecord(0).getValue('col_2')) < 0.00001).toBeTruthy();
    expect(dataTable.getRecord(1).getValue('col_1')).toBe(222);
    expect(Math.abs(222.2 - dataTable.getRecord(1).getValue('col_2')) < 0.00001).toBeTruthy();

    res = new TableFromCSVFunction().execute(ev, new EvaluationEnvironment(), [aCsvWithoutHeader, 'skip', ',', format]);
    dataTable = res as DataTable;

    expect(dataTable.getFieldCount()).toBe(2);

    expect(dataTable.getRecord(0).getValue('col_1')).toBe(222);
    expect(Math.abs(222.2 - dataTable.getRecord(0).getValue('col_2')) < 0.00001).toBeTruthy();

    // test for the case when a character used as the delimiter has to be escaped (format is not specified)

    aCsvWithHeader = 'col1\\;col111;col2\n' + 'val11\\;val111;val12\n' + 'val21;val22\n';

    res = new TableFromCSVFunction().execute(ev, new EvaluationEnvironment(), [aCsvWithHeader, 'names', ';']);
    dataTable = res as DataTable;

    expect(dataTable.getFieldCount()).toBe(2);
    expect(dataTable.hasField('col1;col111')).toBeTruthy();
    expect(dataTable.hasField('col2')).toBeTruthy();

    expect(dataTable.getRecord(0).getValue('col1;col111')).toBe('val11;val111');
  });
  it('testXPathFunction1', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const par1 = `<val1>273</val1>`;
    const par2 = 'val1';
    const par3 = false;
    const res = new XPathFunction().execute(ev, new EvaluationEnvironment(), [par1, par2, par3]);
    expect(res).toBe(par1);
  });
  it('testXPathFunction2', () => {
    const ev = CommonsFixture.createTestEvaluator();
    const values = ['0000', '566', '0.000', '-273.000'];

    const par1 = `<response><val1>${values[0]}</val1><val2>${values[1]}</val2><val3>${values[2]}</val3><val4>${values[3]}</val4></response>`;
    const par2 = 'response';
    const par3 = true;

    const res = new XPathFunction().execute(ev, new EvaluationEnvironment(), [par1, par2, par3]);
    const childrenTable = res.rec().getDataTable(XPathFunction.FIELD_NODE_CHILDREN);
    const val1 = childrenTable.getRecord(0).getValue(XPathFunction.FIELD_NODE_CONTENT);
    const val2 = childrenTable.getRecord(1).getValue(XPathFunction.FIELD_NODE_CONTENT);
    const val3 = childrenTable.getRecord(2).getValue(XPathFunction.FIELD_NODE_CONTENT);
    const val4 = childrenTable.getRecord(3).getValue(XPathFunction.FIELD_NODE_CONTENT);

    expect(values[0]).toBe(val1);
    expect(values[1]).toBe(val2);
    expect(values[2]).toBe(val3);
    expect(values[3]).toBe(val4);
  });
});
