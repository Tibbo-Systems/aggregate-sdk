import BatchEntry from './BatchEntry';
export default class BatchContext {
    private entries;
    private currentEntry;
    addBatchEntry(batchEntry: BatchEntry): void;
    getEntries(): Array<BatchEntry> | null;
    getCurrentEntry(): BatchEntry | null;
    markAsPerfomed(entry: BatchEntry): void;
    setCurrentEntry(currentEntry: BatchEntry): void;
}
