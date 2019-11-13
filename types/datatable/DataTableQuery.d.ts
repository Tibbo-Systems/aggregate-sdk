import QueryCondition from './QueryCondition';
export default class DataTableQuery {
    private readonly conditions;
    constructor(...conditions: QueryCondition[]);
    getConditions(): Array<QueryCondition>;
    addCondition(condition: QueryCondition): void;
}
