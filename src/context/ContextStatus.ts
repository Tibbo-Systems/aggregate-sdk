export default class ContextStatus {
  private status: number;
  private comment: string | null;

  constructor(status: number = 0, comment: string | null = null) {
    this.status = status;
    this.comment = comment;
  }

  public getComment(): string | null {
    return this.comment;
  }

  public getStatus(): number {
    return this.status;
  }

  public setComment(comment: string): void {
    this.comment = comment;
  }

  public setStatus(status: number): void {
    this.status = status;
  }
}
