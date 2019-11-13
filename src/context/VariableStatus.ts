export default class VariableStatus {
  private status: string;
  private comment: string;

  constructor(status: string, comment: string) {
    this.status = status;
    this.comment = comment;
  }

  public getComment(): string {
    return this.comment;
  }

  public getStatus(): string {
    return this.status;
  }

  public setComment(comment: string): void {
    this.comment = comment;
  }

  public setStatus(status: string): void {
    this.status = status;
  }
}
