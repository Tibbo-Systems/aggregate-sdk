//TODO DataTableBindingProvider
import AbstractDataTableBindingProvider from './AbstractDataTableBindingProvider';

export default class DataTableBindingProvider extends AbstractDataTableBindingProvider {
  public static PROPERTY_ENABLED = 'enabled';
  public static PROPERTY_HIDDEN = 'hidden';
  public static PROPERTY_CHOICES = 'choices';
  public static PROPERTY_OPTIONS = 'options';

  constructor() {
    super();
  }
}
