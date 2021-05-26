import StringBuilder from './java/StringBuilder';
import TimeHelper from './TimeHelper';

export default class TimeUnitsManager {
  private minUnit = 0;
  private maxUnit = Number.MAX_VALUE;

  public setMinUnit(minUnit: number) {
    this.minUnit = minUnit;
  }
  public getMinUnit() {
    return this.minUnit;
  }
  public setMaxUnit(maxUnit: number) {
    this.maxUnit = maxUnit;
  }
  public getMaxUnit() {
    return this.maxUnit;
  }
  public createTimeString(period: number) {
    const result = new StringBuilder();

    let pass = 0;

    for (const unit of TimeHelper.getReversedUnits()) {
      if (unit.getUnit() > this.getMaxUnit()) {
        continue;
      }

      if (unit.isSecondary()) {
        continue;
      }

      const count = Math.floor(period / unit.getLength());

      const addZero = result.length() === 0 && unit.getUnit() == this.getMinUnit();

      if (count > 0 || addZero) {
        result.append((pass > 0 ? ' ' : '') + count + ' ' + unit.getDescription());

        period -= count * unit.getLength();
      }

      if (unit.getUnit() <= this.getMinUnit()) {
        break;
      }

      pass++;
    }

    return result.toString().trim();
  }
}
