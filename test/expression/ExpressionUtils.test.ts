import Expression from '../../src/expression/Expression';
import ExpressionUtils from '../../src/expression/ExpressionUtils';
import Reference from '../../src/expression/Reference';

describe('TestExpressionUtils', () => {
  it('testSyntaxValidation', () => {
    const str =
      'cell({:executeQuery("SELECT SUM(data.' +
      'processList' +
      '$hrSWRunPerfMem) as value FROM users.admin.devices.localhost:' +
      'processList' +
      ' as data WHERE ' +
      'processList' +
      "$hrSWRunName = 'svchost.exe' AND " +
      'processList' +
      '$hrSWRunPath = \'C:\\\\Windows\\\\system32\\\\\'" )}, "value") > 3600';

    ExpressionUtils.validateSyntax(new Expression(str), false);
  });

  it('testFunctionParameters', () => {
    const params = '"constant", \'expression\', unquoted_expression';
    const res = Reference.getFunctionParameters(params, true);
    expect(res.length).toBe(3);
    expect(res[0]).toBe('constant');
    expect(res[1].getText()).toBe(new Expression('expression').getText());
    expect(res[2].getText()).toBe(new Expression('unquoted_expression').getText());
  });

  it('testEscaping', () => {
    const params = "\"SELECT COUNT(*) as value FROM users.admin.devices.lh:processList as data     WHERE       processList$hrSWRunName = 'csrss.exe' AND processList$hrSWRunPath = 'C:\\\\Windows\\\\system32\\\\' \"";
    const res = Reference.getFunctionParameters(params, false);
    expect(res.length).toBe(1);
    expect(res[0]).toBe("SELECT COUNT(*) as value FROM users.admin.devices.lh:processList as data     WHERE       processList$hrSWRunName = 'csrss.exe' AND processList$hrSWRunPath = 'C:\\Windows\\system32\\' ");
  });
});
