import EventLevel from '../event/EventLevel';
import LevelAdapter from './logger/LevelAdapter';

export default class Log4jLevelHelper {
  private static LEVEL_TABLE: Map<number, number> = new Map();

  static __static_initializer_0() {
    Log4jLevelHelper.LEVEL_TABLE.set(LevelAdapter.DEBUG, EventLevel.NOTICE);
    Log4jLevelHelper.LEVEL_TABLE.set(LevelAdapter.INFO, EventLevel.INFO);
    Log4jLevelHelper.LEVEL_TABLE.set(LevelAdapter.WARN, EventLevel.WARNING);
    Log4jLevelHelper.LEVEL_TABLE.set(LevelAdapter.ERROR, EventLevel.ERROR);
    Log4jLevelHelper.LEVEL_TABLE.set(LevelAdapter.FATAL, EventLevel.FATAL);
  }

  private static _init = false;

  public static initialize() {
    if (Log4jLevelHelper._init) return;
    Log4jLevelHelper.__static_initializer_0();
    Log4jLevelHelper._init = true;
  }

  public static getLog4jLevelByAggreGateLevel(aggreGateLevel: number): number {
    for (let entry of Log4jLevelHelper.LEVEL_TABLE) {
      if (entry[1] == aggreGateLevel) {
        return entry[0];
      }
    }

    return 0;
  }
}

Log4jLevelHelper.initialize();
