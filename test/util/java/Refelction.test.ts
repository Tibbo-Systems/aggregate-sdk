import Reflection from '../../../src/util/java/Reflection';

describe('TestClass', () => {
  it('should equals', () => {
    const str: string = 'gfh';

    const clazz = Reflection.getClass(str);

    console.log(clazz);
  });
});
