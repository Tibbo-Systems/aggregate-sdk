export default class EventSortDirective {
    private field;
    private tablefield;
    private ascending;
    EventSortDirective(column: string, tablefield: boolean, ascending: boolean): void;
    getField(): string | null;
    isAscending(): boolean;
    isTablefield(): boolean;
    setAscending(ascending: boolean): void;
}
