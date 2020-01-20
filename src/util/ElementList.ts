import Element from './Element';
import JObject from './java/JObject';

export default class ElementList extends JObject {
  private readonly elements: Array<Element> = [];

  public getElement(name: string): Element | null {
    for (const el of this.elements) {
      if (el.getName() != null && el.getName() === name) {
        return el;
      }
    }

    return null;
  }

  public add(el: Element): void {
    this.elements.push(el);
  }

  public get(index: number): Element {
    if (this.elements.length <= index || index < 0) throw new Error('Index: ' + index + ', Size: ' + this.elements.length);

    return this.elements[index];
  }

  public getElements() {
    return this.elements;
  }

  [Symbol.iterator]() {
    return this.elements[Symbol.iterator]();
  }
}
