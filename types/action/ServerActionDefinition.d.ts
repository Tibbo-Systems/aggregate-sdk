import BasicActionDefinition from './BasicActionDefinition';
import Class from '../util/java/Class';
import Permissions from '../security/Permissions';
export default class ServerActionDefinition extends BasicActionDefinition {
    private permissions;
    index: number | null;
    private headless;
    constructor(name: string, descriptionOrClass?: string | Class, actionClass?: Class);
    createServerActionDefinition(name: string, descriptionOrClass: string | Class, actionClass?: Class): ServerActionDefinition;
    compareTo(o: any): number;
    toString(): string;
    getPermissions(): Permissions | null;
    setPermissions(permissions: Permissions): void;
    getIndex(): number | null;
    isHeadless(): boolean;
    setIndex(index: number): void;
    setHeadless(headless: boolean): void;
}
