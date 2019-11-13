import JObject from './java/JObject';
export default class TimeUnit extends JObject {
    private readonly unit;
    private readonly length;
    private readonly description;
    private readonly secondary;
    private readonly calendarField;
    constructor(unit: number, length: number, description: string, calendarField: number, secondary: boolean);
    getUnit(): number;
    getLength(): number;
    getDescription(): string;
    getCalendarField(): number;
    isSecondary(): boolean;
    toString(): string;
}
