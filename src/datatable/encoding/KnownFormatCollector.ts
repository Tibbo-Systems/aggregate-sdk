import JObject from '../../util/java/JObject';

export default class KnownFormatCollector extends JObject {
  private readonly formatIds: Map<number, boolean> = new Map<number, boolean>();

  public isKnown(formatId: number): boolean {
    return this.formatIds.has(formatId);
  }

  public isMarked(formatId: number): boolean {
    const marked: boolean | null = this.formatIds.get(formatId) !== undefined ? (this.formatIds.get(formatId) as boolean) : null;

    return marked != null ? marked : false;
  }

  public makeKnown(formatId: number, mark: boolean): void {
    this.formatIds.set(formatId, mark);
  }
}
