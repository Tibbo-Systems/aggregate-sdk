import Cres from '../Cres';

export default class EventLevel {
  private static readonly LEVELS = new Map<number, string>();
  private static readonly SELECTION_VALUES = new Map<number, string>();

  public static readonly NUM_LEVELS: number = 5;

  public static readonly NONE: number = 0;

  public static readonly NOTICE: number = 1;

  public static readonly INFO: number = 2;

  public static readonly WARNING: number = 3;

  public static readonly ERROR: number = 4;

  public static readonly FATAL: number = 5;

  private static _init = false;

  static _static_init() {
    if (EventLevel._init) return;
    EventLevel.LEVELS.set(EventLevel.NOTICE, Cres.get().getString('conElNotice'));
    EventLevel.LEVELS.set(EventLevel.INFO, Cres.get().getString('conElInfo'));
    EventLevel.LEVELS.set(EventLevel.WARNING, Cres.get().getString('conElWarning'));
    EventLevel.LEVELS.set(EventLevel.ERROR, Cres.get().getString('conElError'));
    EventLevel.LEVELS.set(EventLevel.FATAL, Cres.get().getString('conElFatal'));
    EventLevel.LEVELS.set(EventLevel.NONE, Cres.get().getString('conElNotDefined'));

    EventLevel.SELECTION_VALUES.set(0, Cres.get().getString('none'));

    for (let i = 1; i <= EventLevel.NUM_LEVELS; i++) {
      EventLevel.SELECTION_VALUES.set(i, EventLevel.getName(i));
    }
    EventLevel._init = true;
  }

  public static isValid(level: number): boolean {
    return EventLevel.LEVELS.has(level);
  }

  public static getName(level: number): string {
    return EventLevel.LEVELS.get(level) as string;
  }

  public static getSelectionValues(): Map<number, string> {
    return new Map(EventLevel.SELECTION_VALUES);
  }
}

EventLevel._static_init();
