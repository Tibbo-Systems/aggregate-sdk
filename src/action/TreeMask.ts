export default class TreeMask {
  public static readonly SEPARATOR = '.';

  private readonly mask: string;

  constructor(mask: string) {
    this.mask = mask;
  }

  public includes(resourceMask: TreeMask): boolean {
    if (resourceMask == null) {
      throw new Error('npe');
    }

    if (this.mask == null) {
      return true;
    }

    if (resourceMask.mask == null) {
      return false;
    }

    return resourceMask.mask.startsWith(this.mask) && resourceMask.mask.charAt(this.mask.length) == TreeMask.SEPARATOR;
  }

  public toString(): string {
    return this.mask == null ? '' : this.mask;
  }
}
