import DefaultActionResult from '../DefaultActionResult';
import GenericActionResponse from '../GenericActionResponse';
export default class EditPropertiesResult extends DefaultActionResult {
    private readonly code;
    private readonly changedProperties;
    constructor(code: string, changedProperties?: Array<string>);
    getCode(): string | null;
    getChangedProperties(): Array<string> | null;
    static parse(resp: GenericActionResponse): EditPropertiesResult;
}
