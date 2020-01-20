import StringUtils from '../../src/util/StringUtils';
import ElementList from '../../src/util/ElementList';
import Element from '../../src/util/Element';

describe('TestStringUtils', () => {
  it('testSplit', () => {
    let str = 'this+is++a+test+';
    let ch = '+';
    let res: Array<string> = StringUtils.split(str, ch);
    expect(res.length).toBe(6);
    expect(res[1]).toBe('is');
    expect(res[2]).toBe('');
    expect(res[4]).toBe('test');
    expect(res[5]).toBe('');

    str = 'name:S';
    ch = ':';
    res = StringUtils.split(str, ch);
    expect(res.length).toBe(2);
    expect(res[1]).toBe('S');

    str = '::';
    ch = ':';
    res = StringUtils.split(str, ch);
    expect(res.length).toBe(3);
    expect(res[1]).toBe('');

    str = 'A^21-09-2006,15:35:07';
    ch = '^';
    res = StringUtils.split(str, ch);
    expect(res.length).toBe(2);
    expect(res[1]).toBe('21-09-2006,15:35:07');
  });

  it('testElements', () => {
    let s = '<x=2><z=3><x><k=sss><n=<x=3>><r=<aa=<xx><bb>>>';
    let el: Element | null = null;

    let res: ElementList = StringUtils.elements(s, true);

    expect(res.getElements().length).toBe(6);
    expect(res.get(2).getName()).toBeNull();
    el = res.getElement('k') as Element;
    expect(el.getValue()).toBe('sss');
    el = res.get(2);
    expect(el.getValue()).toBe('x');
    el = res.get(4);
    expect(el.getValue()).toBe('<x=3>');
    el = res.get(5);
    expect(el.getValue()).toBe('<aa=<xx><bb>>');

    s = '<{ackRequired#enabled}={notifyOwner}>';

    res = StringUtils.elements(s, true);
    expect(res.getElements().length).toBe(1);
    el = res.get(0);
    expect(el.getName()).toBe('{ackRequired#enabled}');
    expect(el.getValue()).toBe('{notifyOwner}');

    s = '<{v1}={v2} != 5>';
    res = StringUtils.elements(s, true);
    el = res.get(0);
    expect(el.getName()).toBe('{v1}');
    expect(el.getValue()).toBe('{v2} != 5');
  });
});
