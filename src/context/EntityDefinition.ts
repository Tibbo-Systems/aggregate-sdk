export default interface EntityDefinition {
  getName(): string;

  getDescription(): string | null;

  getHelp(): string | null;

  getGroup(): string;

  getIndex(): number | null;

  getIconId(): string | null;

  toDetailedString(): string | null;

  getOwner(): any | null;

  getEntityType(): number | null;
}
