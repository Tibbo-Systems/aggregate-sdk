import StringBuilder from '../../../src/util/java/StringBuilder';

describe('TestStringBuilder', () => {
  it('empty sb should append string', () => {
    const sb = new StringBuilder();
    sb.append('test');
    expect(sb.toString()).toBe('test');
  });

  it('sb should append string', () => {
    const sb = new StringBuilder('test');
    sb.append('test');
    expect(sb.toString()).toBe('testtest');
  });
});
