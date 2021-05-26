import DateFunction from './DateFunction';
export default class DateFieldFunction extends DateFunction {
    private field;
    constructor(field: number, description?: string | null);
    executeDate(calendar: Date, parameters: Array<any>): any;
}
