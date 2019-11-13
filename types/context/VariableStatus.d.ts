export default class VariableStatus {
    private status;
    private comment;
    constructor(status: string, comment: string);
    getComment(): string;
    getStatus(): string;
    setComment(comment: string): void;
    setStatus(status: string): void;
}
