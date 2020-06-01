import Runnable from '../../util/java/Runnable';

export default interface ActionExecutor {
  addInterruptionListener(listener: Runnable): void;

  removeInterruptionListener(listener: Runnable): void;
}
