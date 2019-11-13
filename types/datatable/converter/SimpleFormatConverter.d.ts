import AbstractFormatConverter from './AbstractFormatConverter';
export default abstract class SimpleFormatConverter<T> extends AbstractFormatConverter<T> {
    constructor(valueClass: string);
    convertToBean(value: any, originalValue: T | null): T;
    protected abstract simpleToBean(value: any): T;
}
