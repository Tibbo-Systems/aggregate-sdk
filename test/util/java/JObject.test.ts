import StringBuilder from '../../../src/util/java/StringBuilder';

describe('TestJObject', () => {
  it('should equals', () => {
    const sb = new StringBuilder();
    sb.append('test');
    expect(sb.toString()).toBe('test');
  });
});
