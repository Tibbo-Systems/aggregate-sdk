import JObject from './java/JObject';

export default class TimeUnit extends JObject {
  private readonly unit: number;
  private readonly length: number;
  private readonly description: string;
  private readonly secondary: boolean;
  private readonly calendarField: number;

  constructor(unit: number, length: number, description: string, calendarField: number, secondary: boolean) {
    super();
    this.unit = unit;
    this.length = length;
    this.description = description;
    this.calendarField = calendarField;
    this.secondary = secondary;
  }

  public getUnit(): number {
    return this.unit;
  }

  public getLength(): number {
    return this.length;
  }

  public getDescription(): string {
    return this.description;
  }

  public getCalendarField(): number {
    return this.calendarField;
  }

  public isSecondary(): boolean {
    return this.secondary;
  }

  public toString(): string {
    return this.description;
  }

  /*public int hashCode() : int
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + unit;
        return result;
    }

    public boolean equals(JObject obj)
    {
        if (this == obj)
        {
            return true;
        }
        if (obj == null)
        {
            return false;
        }
        if (getClass() != obj.getClass())
        {
            return false;
        }
        TimeUnit other = (TimeUnit) obj;
        if (unit != other.unit)
        {
            return false;
        }
        return true;
    }*/
}
