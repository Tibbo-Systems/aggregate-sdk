export default class TimeUnitsManager {
    private minUnit;
    private maxUnit;
    setMinUnit(minUnit: number): void;
    getMinUnit(): number;
    setMaxUnit(maxUnit: number): void;
    getMaxUnit(): number;
    createTimeString(period: number): string;
}
