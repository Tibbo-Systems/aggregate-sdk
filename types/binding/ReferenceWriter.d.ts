import Reference from '../expression/Reference';
export default interface ReferenceWriter {
    writeReference(ref: Reference, value: any): void;
}
