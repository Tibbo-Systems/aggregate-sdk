import BasicActionDefinition from './BasicActionDefinition';
import Permissions from '../security/Permissions';
export default class ServerActionDefinition extends BasicActionDefinition {
    private permissions;
    index: number | null;
    private headless;
    constructor(name: string, descriptionOrClass?: string);
    createServerActionDefinition(name: string, descriptionOrClass: string): ServerActionDefinition;
    compareTo(o: any): number;
    toString(): string;
    getPermissions(): Permissions | null;
    setPermissions(permissions: Permissions): void;
    getIndex(): number | null;
    isHeadless(): boolean;
    setIndex(index: number): void;
    setHeadless(headless: boolean): void;
}
