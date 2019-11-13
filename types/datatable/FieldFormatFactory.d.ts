import FieldFormat from './FieldFormat';
import JObject from '../util/java/JObject';
import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
export default class FieldFormatFactory {
    static createType(name: string | null, type: string | null): FieldFormat<any>;
    static createWith<S extends any>(name: string, type: string, description: string | null, defaultValue?: any | null, nullable?: boolean, group?: string | null): FieldFormat<S>;
    static create<S extends JObject>(format: string, settings?: ClassicEncodingSettings, validate?: boolean): FieldFormat<S>;
}
