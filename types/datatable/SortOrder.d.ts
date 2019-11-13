import JObject from '../util/java/JObject';
export default class SortOrder extends JObject {
    private field;
    private ascending;
    constructor(field: string, ascending: boolean);
    getField(): string;
    setField(field: string): void;
    isAscending(): boolean;
    setAscending(ascending: boolean): void;
}
