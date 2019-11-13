import GageBean from './GageBean';

export default class GageGageBean extends GageBean {
  private gages: Array<GageBean> | null = null;

  public getGage(): Array<GageBean> | null {
    return this.gages;
  }

  public setGage(gages: Array<GageBean> | null) {
    this.gages = gages;
  }
}
