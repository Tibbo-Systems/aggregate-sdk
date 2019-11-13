//TODO DataTableBindingProvider
import AbstractDataTableBindingProvider from './AbstractDataTableBindingProvider';

export default class DataTableBindingProvider extends AbstractDataTableBindingProvider {
  public static PROPERTY_ENABLED: string = 'enabled';
  public static PROPERTY_HIDDEN: string = 'hidden';
  public static PROPERTY_CHOICES: string = 'choices';
  public static PROPERTY_OPTIONS: string = 'options';

  constructor() {
    super();
  }
}
