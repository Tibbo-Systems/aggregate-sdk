import Element from './Element';
import JObject from './java/JObject';
export default class ElementList extends JObject {
    private readonly elements;
    getElement(name: string): Element | null;
    add(el: Element): void;
    get(index: number): Element;
    getElements(): Element[];
    [Symbol.iterator](): IterableIterator<Element>;
}
