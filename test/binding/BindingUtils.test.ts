import Expression from '../../src/expression/Expression';
import ExpressionUtils from '../../src/expression/ExpressionUtils';

describe('TestBindingUtils', () => {
  it('testFindReferences', () => {
    const exp = '1 + {field[0]} - {other[2]}';

    let refs = ExpressionUtils.findReferences(new Expression(exp));

    expect(refs.length).toBe(2);
    expect(refs[1].getField()).toBe('other');

    refs = ExpressionUtils.findReferences(new Expression("{:eventsByMask('{contextMask}')}"));

    expect(refs.length).toBe(2);
    expect(refs[1].getImage()).toBe('contextMask');
  });
});
