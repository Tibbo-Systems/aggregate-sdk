export default class ContextStatus {
    private status;
    private comment;
    constructor(status?: number, comment?: string | null);
    getComment(): string | null;
    getStatus(): number;
    setComment(comment: string): void;
    setStatus(status: number): void;
}
