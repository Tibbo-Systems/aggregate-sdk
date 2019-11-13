import BatchEntry from './BatchEntry';

export default class BatchContext {
  private entries: Array<BatchEntry> = new Array();
  private currentEntry: BatchEntry | null = null;

  public constructor() {}

  addBatchEntry(batchEntry: BatchEntry): void {
    this.entries.push(batchEntry);
  }

  public getEntries(): Array<BatchEntry> | null {
    return this.entries;
  }

  public getCurrentEntry(): BatchEntry | null {
    return this.currentEntry;
  }

  public markAsPerfomed(entry: BatchEntry): void {
    if (!this.entries.includes(entry)) {
      throw new Error("Entry '" + entry + "' is not on the list");
    }

    entry.setFulfilled(true);
  }

  public setCurrentEntry(currentEntry: BatchEntry): void {
    this.currentEntry = currentEntry;
  }
}
