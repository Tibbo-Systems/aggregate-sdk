export default interface EntityGroupMember {
    getName(): string;
    getDescription(): string;
    getGroup(): string;
    getIconId(): string;
    shouldIgnoreBaseGroup(): boolean;
}
