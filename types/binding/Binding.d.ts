import Reference from '../expression/Reference';
import Expression from '../expression/Expression';
import JObject from '../util/java/JObject';
export default class Binding extends JObject {
    private id;
    private target;
    private expression;
    private queue;
    constructor(target: Reference | string, expression: Expression | string);
    getExpression(): Expression;
    getTarget(): Reference;
    getId(): number | null;
    setId(id: number): void;
    getQueue(): string | null;
    setQueue(queue: string): void;
    equals(obj: JObject | null): boolean;
    clone(): Binding;
    toString(): string;
}
