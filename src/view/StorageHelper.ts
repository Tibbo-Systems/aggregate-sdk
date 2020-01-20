import TableFormat from '../datatable/TableFormat';
import FieldFormat from '../datatable/FieldFormat';
import FieldConstants from '../datatable/field/FieldConstants';
import FieldFormatFactory from '../datatable/FieldFormatFactory';
import ViewFilterElement from './ViewFilterElement';
import Cres from '../Cres';
import Functions from '../expression/functions/Functions';
import DataTableBindingProvider from '../datatable/DataTableBindingProvider';
import DataTableBuilding from '../datatable/DataTableBuilding';
import DefaultReferenceResolver from '../expression/DefaultReferenceResolver';
import FunctionDefinition from '../context/FunctionDefinition';
import ContextUtils from '../context/ContextUtils';
import ContextUtilsConstants from '../context/ContextUtilsConstants';
import DataRecord from '../datatable/DataRecord';
import DataTable from '../datatable/DataTable';
import Context from '../context/Context';
import CallerController from '../context/CallerController';
import ContextManager from '../context/ContextManager';

export default class StorageHelper {
  public static readonly CLASS_FIELD_INSTANCE_ID: string = 'instance_id';
  public static readonly CLASS_FIELD_AUTHOR: string = 'author';
  public static readonly CLASS_FIELD_CREATION_TIME: string = 'creation_time';
  public static readonly CLASS_FIELD_UPDATE_TIME: string = 'update_time';

  public static readonly MANY_TO_MANY_FIELD_RELATION_ID: string = 'relation_id';
  public static readonly MANY_TO_MANY_FIELD_LEFT_ID: string = 'left_id';
  public static readonly MANY_TO_MANY_FIELD_RIGTH_ID: string = 'right_id';
  public static readonly MANY_TO_MANY_TABLE_PREFIX: string = 'REL_';

  public static readonly CF_STORAGE_CONTEXT: string = 'storageContext';
  public static readonly CF_INLUDE_RECORD: string = 'includeRecord';
  public static readonly CF_RECORD_INDEX: string = 'recordIndex';
  public static readonly CF_RECORD_DESCRIPTION: string = 'recordDescription';

  public static readonly SORT_ASCENDING: number = 0;
  public static readonly SORT_DESCENDING: number = 1;

  public static readonly VISIBILITY_DISABLED: number = 0;
  public static readonly VISIBILITY_VISIBLE: number = 1;
  public static readonly VISIBILITY_HIDDEN: number = 2;

  public static readonly F_STORAGE_OPEN: string = 'storageOpen';
  public static readonly F_STORAGE_CLOSE: string = 'storageClose';
  public static readonly F_STORAGE_GET: string = 'storageGet';
  public static readonly F_STORAGE_UPDATE: string = 'storageUpdate';
  public static readonly F_STORAGE_DELETE: string = 'storageDelete';
  public static readonly F_STORAGE_INSERT: string = 'storageInsert';
  public static readonly F_STORAGE_VIEWS: string = 'storageViews';
  public static readonly F_STORAGE_TABLES: string = 'storageTables';
  public static readonly F_STORAGE_COLUMNS: string = 'storageColumns';
  public static readonly F_STORAGE_RELATIONS: string = 'storageRelations';
  public static readonly F_STORAGE_FILTER: string = 'storageFilter';
  public static readonly F_STORAGE_SORTING: string = 'storageSorting';
  public static readonly F_STORAGE_CONSTRUCT: string = 'storageConstruct';
  public static readonly F_STORAGE_OPERATIONS: string = 'storageOperations';
  public static readonly F_STORAGE_CONSTRUCT_RELATION: string = 'storageConstructRelation';
  public static readonly F_STORAGE_DELETE_RELATION: string = 'storageDeleteRelation';
  public static readonly F_STORAGE_LINK_INSTANCES: string = 'storageLinkInstances';
  public static readonly F_STORAGE_UNLINK_INSTANCES: string = 'storageUnlinkInstances';
  public static readonly F_STORAGE_LINKED_INSTANCES_FILTER: string = 'storageLinkedInstancesFilter';
  public static readonly F_STORAGE_GET_FORMAT: string = 'storageGetFormat';

  public static readonly FIF_STORAGE_OPEN_ID: string = 'id';
  public static readonly FIF_STORAGE_OPEN_VIEW: string = 'view';
  public static readonly FIF_STORAGE_OPEN_QUERY: string = 'query';
  public static readonly FIF_STORAGE_OPEN_TABLE: string = 'table';
  public static readonly FIF_STORAGE_OPEN_COLUMNS: string = 'columns';
  public static readonly FIF_STORAGE_OPEN_FILTER: string = 'filter';
  public static readonly FIF_STORAGE_OPEN_SORTING: string = 'sorting';
  public static readonly FIF_STORAGE_OPEN_GET_DATA: string = 'getData';
  public static readonly FIF_STORAGE_OPEN_LIMIT: string = 'limit';
  public static readonly FIF_STORAGE_OPEN_OFFSET: string = 'offSet';

  public static readonly FOF_STORAGE_OPEN_ID: string = 'id';
  public static readonly FOF_STORAGE_OPEN_COUNT: string = 'count';
  public static readonly FOF_STORAGE_OPEN_DATA: string = 'data';

  public static readonly FIF_STORAGE_CLOSE_ID: string = 'id';

  public static readonly FIF_STORAGE_GET_ID: string = 'id';
  public static readonly FIF_STORAGE_GET_FIRST: string = 'first';
  public static readonly FIF_STORAGE_GET_COUNT: string = 'count';

  public static readonly FOF_STORAGE_GET_SIZE: string = 'size';
  public static readonly FOF_STORAGE_GET_DATA: string = 'data';

  public static readonly FIF_STORAGE_UPDATE_ID: string = 'id';
  public static readonly FIF_STORAGE_UPDATE_ROW: string = 'row';
  public static readonly FIF_STORAGE_UPDATE_COLUMN: string = 'column';
  public static readonly FIF_STORAGE_UPDATE_VALUE: string = 'value';
  public static readonly FIF_STORAGE_UPDATE_TABLE: string = 'table';
  public static readonly FIF_STORAGE_UPDATE_FILTER: string = 'filter';

  public static readonly FOF_STORAGE_UPDATE_COUNT: string = 'count';

  public static readonly FIF_STORAGE_DELETE_ID: string = 'id';
  public static readonly FIF_STORAGE_DELETE_ROWLIST: string = 'rowList';
  public static readonly FIF_STORAGE_DELETE_TABLE: string = 'table';
  public static readonly FIF_STORAGE_DELETE_FILTER: string = 'filter';

  public static readonly FOF_STORAGE_DELETE_COUNT: string = 'count';

  public static readonly FIF_STORAGE_INSERT_ID: string = 'id';
  public static readonly FIF_STORAGE_INSERT_VALUES: string = 'values';
  public static readonly FIF_STORAGE_INSERT_TABLE: string = 'table';

  public static readonly FOF_STORAGE_INSERT_ROW: string = 'row';
  public static readonly FOF_STORAGE_INSERT_INSTANCE_ID: string = 'instanceId';

  public static readonly FIF_STORAGE_COLUMNS_TABLE: string = 'table';
  public static readonly FIF_STORAGE_COLUMNS_COLUMNS: string = 'columns';
  public static readonly FIF_STORAGE_COLUMNS_LIFE_CYCLES: string = 'lifeCycles';

  public static readonly FIF_STORAGE_RELATIONS_TABLE: string = 'table';
  public static readonly FIF_STORAGE_RELATIONS_DASHBOARD_CLASS: string = 'dashboardClass';

  public static readonly FIF_STORAGE_FILTER_TABLE: string = 'table';
  public static readonly FIF_STORAGE_FILTER_FILTER: string = 'filter';

  public static readonly FIF_STORAGE_SORTING_TABLE: string = 'table';
  public static readonly FIF_STORAGE_SORTING_SORTING: string = 'sorting';

  public static readonly FIF_STORAGE_CONSTRUCT_TABLE: string = 'table';
  public static readonly FIF_STORAGE_CONSTRUCT_FIELDS: string = 'fields';
  public static readonly FIF_STORAGE_CONSTRUCT_LIFE_CYCLES: string = 'lifeCycles';
  public static readonly FIF_STORAGE_MANY_TO_MANY_RELATIONS: string = 'manyToManyRelations';

  public static readonly FIF_STORAGE_CONSTRUCT_RELATION_TABLE: string = 'table';
  public static readonly FIF_STORAGE_CONSTRUCT_RELATION_PRIMARY_KEY_TYPE: string = 'primaryKeyType';
  public static readonly FIF_STORAGE_CONSTRUCT_RELATION_RELATED_TABLE: string = 'relatedTable';
  public static readonly FIF_STORAGE_CONSTRUCT_RELATION_RELATED_PRIMARY_KEY_TYPE: string = 'relatedPrimaryKeyType';
  public static readonly FIF_STORAGE_CONSTRUCT_RELATION_NAME: string = 'name';
  public static readonly FIF_STORAGE_CONSTRUCT_RELATION_CASCADE_DELETE: string = 'cascadeDelete';

  public static readonly FIF_STORAGE_DELETE_RELATION_TABLE: string = 'table';
  public static readonly FIF_STORAGE_DELETE_RELATION_PRIMARY_KEY_TYPE: string = 'primaryKeyType';
  public static readonly FIF_STORAGE_DELETE_RELATION_RELATED_TABLE: string = 'relatedTable';
  public static readonly FIF_STORAGE_DELETE_RELATION_RELATED_PRIMARY_KEY_TYPE: string = 'relatedPrimaryKeyType';
  public static readonly FIF_STORAGE_DELETE_RELATION_NAME: string = 'name';

  public static readonly FIF_STORAGE_OPERATIONS_TABLE: string = 'table';
  public static readonly FIF_STORAGE_OPERATIONS_COLUMN: string = 'column';

  public static readonly FIF_STORAGE_LINK_INSTANCES_TABLE: string = 'table';
  public static readonly FIF_STORAGE_LINK_INSTANCES_RELATED_TABLE: string = 'relatedTable';
  public static readonly FIF_STORAGE_LINK_INSTANCES_RELATION_NAME: string = 'relationName';
  public static readonly FIF_STORAGE_LINK_INSTANCES_RELATED_IDS: string = 'relatedIds';

  public static readonly FIF_STORAGE_LINK_INSTANCES_INSTANCE_ID: string = 'instanceId';
  public static readonly FIF_STORAGE_LINK_INSTANCES_RELATED_ID: string = 'relatedId';

  public static readonly FIF_STORAGE_LINKED_INSTANCES_FILTER_INSTANCE_ID: string = 'instanceId';
  public static readonly FIF_STORAGE_LINKED_INSTANCES_FILTER_TABLE: string = 'table';
  public static readonly FIF_STORAGE_LINKED_INSTANCES_FILTER_RELATED_TABLE: string = 'relatedTable';
  public static readonly FIF_STORAGE_LINKED_INSTANCES_FILTER_RELATION_NAME: string = 'relationName';
  public static readonly FIF_STORAGE_LINKED_INSTANCES_FILTER_RELATION_OWNER: string = 'relationOwner';
  public static readonly FIF_STORAGE_LINKED_INSTANCES_FILTER_GET_RELATED: string = 'getRelated';

  public static readonly FIF_STORAGE_GET_FORMAT_TABLE: string = 'table';
  public static readonly FIF_STORAGE_GET_FORMAT_VIEW: string = 'view';

  public static FIELD_COLUMNS_NAME = 'name';
  public static readonly FIELD_COLUMNS_DESCRIPTION: string = 'description';
  public static readonly FIELD_COLUMNS_GROUP: string = 'group';
  public static readonly FIELD_COLUMNS_VISIBILITY: string = 'visible';
  public static readonly FIELD_COLUMNS_READONLY: string = 'readonly';
  public static readonly FIELD_COLUMNS_PRIMARY_KEY: string = 'primaryKey';
  public static readonly FIELD_COLUMNS_IS_CALCULATED_FIELD: string = 'isCalculatedField';
  public static readonly FIELD_COLUMNS_FIELD_DATATABLE: string = 'dataTableField';

  public static readonly FIELD_SORTING_COLUMN: string = 'column';
  public static readonly FIELD_SORTING_ORDER: string = 'order';

  public static readonly FIFT_STORAGE_OPEN: TableFormat = new TableFormat(1, 1);

  protected constructor() {
    StorageHelper.initialize();
  }

  static __static_initializer_0() {
    StorageHelper.FIFT_STORAGE_OPEN.addField('<' + StorageHelper.FIF_STORAGE_OPEN_ID + '><L><F=N><D=' + Cres.get().getString('id') + '>');
    StorageHelper.FIFT_STORAGE_OPEN.addField('<' + StorageHelper.FIF_STORAGE_OPEN_VIEW + '><S><F=N><D=' + Cres.get().getString('view') + '>');
    StorageHelper.FIFT_STORAGE_OPEN.addField('<' + StorageHelper.FIF_STORAGE_OPEN_QUERY + '><S><F=N><D=' + Cres.get().getString('query') + '>');
    StorageHelper.FIFT_STORAGE_OPEN.addField('<' + StorageHelper.FIF_STORAGE_OPEN_TABLE + '><S><F=N><D=' + Cres.get().getString('table') + '>');
    StorageHelper.FIFT_STORAGE_OPEN.addField('<' + StorageHelper.FIF_STORAGE_OPEN_COLUMNS + '><T><F=N><D=' + Cres.get().getString('columns') + '>');
    StorageHelper.FIFT_STORAGE_OPEN.addField('<' + StorageHelper.FIF_STORAGE_OPEN_FILTER + '><T><F=N><D=' + Cres.get().getString('filter') + '>');
    StorageHelper.FIFT_STORAGE_OPEN.addField('<' + StorageHelper.FIF_STORAGE_OPEN_SORTING + '><T><F=N><D=' + Cres.get().getString('sorting') + '>');
    StorageHelper.FIFT_STORAGE_OPEN.addField('<' + StorageHelper.FIF_STORAGE_OPEN_GET_DATA + '><B><D=' + Cres.get().getString('getData') + '>');
    StorageHelper.FIFT_STORAGE_OPEN.addField('<' + StorageHelper.FIF_STORAGE_OPEN_LIMIT + '><I><F=N><D=' + Cres.get().getString('limit') + '>');
    StorageHelper.FIFT_STORAGE_OPEN.addField('<' + StorageHelper.FIF_STORAGE_OPEN_OFFSET + '><I><F=N><D=' + Cres.get().getString('offSet') + '>');
  }

  public static readonly FOFT_STORAGE_OPEN: TableFormat = new TableFormat(1, 1);

  static __static_initializer_1() {
    StorageHelper.FOFT_STORAGE_OPEN.addField('<' + StorageHelper.FOF_STORAGE_OPEN_ID + '><L><D=' + Cres.get().getString('id') + '>');
    StorageHelper.FOFT_STORAGE_OPEN.addField('<' + StorageHelper.FOF_STORAGE_OPEN_COUNT + '><I><F=N><D=' + Cres.get().getString('count') + '>');
    StorageHelper.FOFT_STORAGE_OPEN.addField('<' + StorageHelper.FOF_STORAGE_OPEN_DATA + '><T><F=N><D=' + Cres.get().getString('data') + '>');
  }

  public static readonly FIFT_STORAGE_CLOSE: TableFormat = new TableFormat(1, 1);

  static __static_initializer_2() {
    StorageHelper.FIFT_STORAGE_CLOSE.addField('<' + StorageHelper.FIF_STORAGE_CLOSE_ID + '><L><D=' + Cres.get().getString('id') + '>');
  }

  public static readonly FIFT_STORAGE_GET: TableFormat = new TableFormat(1, 1);

  static __static_initializer_3() {
    StorageHelper.FIFT_STORAGE_GET.addField('<' + StorageHelper.FIF_STORAGE_GET_ID + '><L><D=' + Cres.get().getString('id') + '>');
    StorageHelper.FIFT_STORAGE_GET.addField('<' + StorageHelper.FIF_STORAGE_GET_FIRST + '><I><D=' + Cres.get().getString('first') + '>');
    StorageHelper.FIFT_STORAGE_GET.addField('<' + StorageHelper.FIF_STORAGE_GET_COUNT + '><I><D=' + Cres.get().getString('count') + '>');
  }

  public static readonly FOFT_STORAGE_GET: TableFormat = new TableFormat(1, 1);

  static __static_initializer_4() {
    StorageHelper.FOFT_STORAGE_GET.addField('<' + StorageHelper.FOF_STORAGE_GET_SIZE + '><I><F=N><D=' + Cres.get().getString('size') + '>');
    StorageHelper.FOFT_STORAGE_GET.addField('<' + StorageHelper.FOF_STORAGE_GET_DATA + '><T><F=N><D=' + Cres.get().getString('data') + '>');
  }

  public static readonly FIFT_STORAGE_UPDATE: TableFormat = new TableFormat(1, 1);

  static __static_initializer_5() {
    StorageHelper.FIFT_STORAGE_UPDATE.addField('<' + StorageHelper.FIF_STORAGE_UPDATE_ID + '><L><F=N><D=' + Cres.get().getString('id') + '>');
    StorageHelper.FIFT_STORAGE_UPDATE.addField('<' + StorageHelper.FIF_STORAGE_UPDATE_ROW + '><I><F=N><D=' + Cres.get().getString('row') + '>');
    StorageHelper.FIFT_STORAGE_UPDATE.addField('<' + StorageHelper.FIF_STORAGE_UPDATE_COLUMN + '><S><D=' + Cres.get().getString('column') + '>');
    StorageHelper.FIFT_STORAGE_UPDATE.addField('<' + StorageHelper.FIF_STORAGE_UPDATE_VALUE + '><T><D=' + Cres.get().getString('value') + '>');
    StorageHelper.FIFT_STORAGE_UPDATE.addField('<' + StorageHelper.FIF_STORAGE_UPDATE_TABLE + '><S><F=N><D=' + Cres.get().getString('table') + '>');
    StorageHelper.FIFT_STORAGE_UPDATE.addField('<' + StorageHelper.FIF_STORAGE_UPDATE_FILTER + '><T><F=N><D=' + Cres.get().getString('filter') + '>');
  }

  public static readonly FOFT_STORAGE_UPDATE: TableFormat = new TableFormat();

  static __static_initializer_6() {
    StorageHelper.FOFT_STORAGE_UPDATE.addField('<' + StorageHelper.FOF_STORAGE_UPDATE_COUNT + '><I><D=' + Cres.get().getString('count') + '>');
  }

  public static readonly FIFT_STORAGE_DELETE: TableFormat = new TableFormat(1, 1);

  static __static_initializer_7() {
    StorageHelper.FIFT_STORAGE_DELETE.addField('<' + StorageHelper.FIF_STORAGE_DELETE_ID + '><L><F=N><D=' + Cres.get().getString('id') + '>');
    StorageHelper.FIFT_STORAGE_DELETE.addField('<' + StorageHelper.FIF_STORAGE_DELETE_ROWLIST + '><T><F=N><D=' + Cres.get().getString('rowList') + '>');
    StorageHelper.FIFT_STORAGE_DELETE.addField('<' + StorageHelper.FIF_STORAGE_DELETE_TABLE + '><S><F=N><D=' + Cres.get().getString('table') + '>');
    StorageHelper.FIFT_STORAGE_DELETE.addField('<' + StorageHelper.FIF_STORAGE_DELETE_FILTER + '><T><F=N><D=' + Cres.get().getString('filter') + '>');
  }

  public static readonly FOFT_STORAGE_DELETE: TableFormat = new TableFormat();

  static __static_initializer_8() {
    StorageHelper.FOFT_STORAGE_DELETE.addField('<' + StorageHelper.FOF_STORAGE_DELETE_COUNT + '><I><D=' + Cres.get().getString('count') + '>');
  }

  public static readonly FIFT_STORAGE_INSERT: TableFormat = new TableFormat(1, 1);

  static __static_initializer_9() {
    StorageHelper.FIFT_STORAGE_INSERT.addField('<' + StorageHelper.FIF_STORAGE_INSERT_ID + '><L><F=N><D=' + Cres.get().getString('id') + '>');
    StorageHelper.FIFT_STORAGE_INSERT.addField('<' + StorageHelper.FIF_STORAGE_INSERT_VALUES + '><T><D=' + Cres.get().getString('values') + '>');
    StorageHelper.FIFT_STORAGE_INSERT.addField('<' + StorageHelper.FIF_STORAGE_INSERT_TABLE + '><S><F=N><D=' + Cres.get().getString('table') + '>');
  }

  public static readonly FOFT_STORAGE_INSERT: TableFormat = new TableFormat();

  static __static_initializer_10() {
    StorageHelper.FOFT_STORAGE_INSERT.addField('<' + StorageHelper.FOF_STORAGE_INSERT_INSTANCE_ID + '><S><D=' + Cres.get().getString('instanceId') + '>');
  }

  public static readonly FIFT_STORAGE_COLUMNS: TableFormat = new TableFormat(1, 1);

  static __static_initializer_11() {
    StorageHelper.FIFT_STORAGE_COLUMNS.addField('<' + StorageHelper.FIF_STORAGE_COLUMNS_TABLE + '><S><D=' + Cres.get().getString('table') + '>');
    StorageHelper.FIFT_STORAGE_COLUMNS.addField('<' + StorageHelper.FIF_STORAGE_COLUMNS_COLUMNS + '><T><D=' + Cres.get().getString('columns') + '>');
    StorageHelper.FIFT_STORAGE_COLUMNS.addField(FieldFormatFactory.createType(StorageHelper.FIF_STORAGE_COLUMNS_LIFE_CYCLES, FieldConstants.DATATABLE_FIELD).setNullable(true));
  }

  public static readonly FIFT_STORAGE_RELATIONS: TableFormat = new TableFormat(1, 1);

  static __static_initializer_12() {
    StorageHelper.FIFT_STORAGE_RELATIONS.addField('<' + StorageHelper.FIF_STORAGE_RELATIONS_TABLE + '><S><D=' + Cres.get().getString('table') + '>');
    StorageHelper.FIFT_STORAGE_RELATIONS.addField('<' + StorageHelper.FIF_STORAGE_RELATIONS_DASHBOARD_CLASS + '><S>');
  }

  public static readonly FIFT_STORAGE_FILTER: TableFormat = new TableFormat(1, 1);

  static __static_initializer_13() {
    StorageHelper.FIFT_STORAGE_FILTER.addField('<' + StorageHelper.FIF_STORAGE_FILTER_TABLE + '><S><D=' + Cres.get().getString('table') + '>');
    StorageHelper.FIFT_STORAGE_FILTER.addField('<' + StorageHelper.FIF_STORAGE_FILTER_FILTER + '><T><D=' + Cres.get().getString('filter') + '>');
  }

  public static readonly FIFT_STORAGE_SORTING: TableFormat = new TableFormat(1, 1);

  static __static_initializer_14() {
    StorageHelper.FIFT_STORAGE_SORTING.addField('<' + StorageHelper.FIF_STORAGE_SORTING_TABLE + '><S><D=' + Cres.get().getString('table') + '>');
    StorageHelper.FIFT_STORAGE_SORTING.addField('<' + StorageHelper.FIF_STORAGE_SORTING_SORTING + '><T><D=' + Cres.get().getString('sorting') + '>');
  }

  public static readonly FIFT_STORAGE_CONSTRUCT: TableFormat = new TableFormat(1, 1);

  static __static_initializer_15() {
    StorageHelper.FIFT_STORAGE_CONSTRUCT.addField('<' + StorageHelper.FIF_STORAGE_CONSTRUCT_TABLE + '><S><D=' + Cres.get().getString('table') + '>');
    StorageHelper.FIFT_STORAGE_CONSTRUCT.addField('<' + StorageHelper.FIF_STORAGE_CONSTRUCT_FIELDS + '><T><F=N><D=' + Cres.get().getString('fields') + '>');
    StorageHelper.FIFT_STORAGE_CONSTRUCT.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_CONSTRUCT_LIFE_CYCLES, FieldConstants.DATATABLE_FIELD, Cres.get().getString('lifeCycles')).setNullable(true));
    StorageHelper.FIFT_STORAGE_CONSTRUCT.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_MANY_TO_MANY_RELATIONS, FieldConstants.DATATABLE_FIELD, Cres.get().getString('classManyToManyRelations')).setNullable(true));
  }

  public static readonly FIFT_STORAGE_OPERATIONS: TableFormat = new TableFormat(1, 1);

  static __static_initializer_16() {
    StorageHelper.FIFT_STORAGE_OPERATIONS.addField('<' + StorageHelper.FIF_STORAGE_OPERATIONS_TABLE + '><S><D=' + Cres.get().getString('table') + '>');
    StorageHelper.FIFT_STORAGE_OPERATIONS.addField('<' + StorageHelper.FIF_STORAGE_OPERATIONS_COLUMN + '><S><D=' + Cres.get().getString('column') + '>');
  }

  public static readonly FIFT_STORAGE_CONSTRUCT_RELATION: TableFormat = new TableFormat(1, 1);

  static __static_initializer_17() {
    StorageHelper.FIFT_STORAGE_CONSTRUCT_RELATION.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_CONSTRUCT_RELATION_TABLE, FieldConstants.STRING_FIELD, Cres.get().getString('table')));
    StorageHelper.FIFT_STORAGE_CONSTRUCT_RELATION.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_CONSTRUCT_RELATION_PRIMARY_KEY_TYPE, FieldConstants.STRING_FIELD, Cres.get().getString('primaryKeyType')));
    StorageHelper.FIFT_STORAGE_CONSTRUCT_RELATION.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_CONSTRUCT_RELATION_RELATED_TABLE, FieldConstants.STRING_FIELD, Cres.get().getString('relatedTable')));
    StorageHelper.FIFT_STORAGE_CONSTRUCT_RELATION.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_CONSTRUCT_RELATION_RELATED_PRIMARY_KEY_TYPE, FieldConstants.STRING_FIELD, Cres.get().getString('relatedPrimaryKeyType')));
    StorageHelper.FIFT_STORAGE_CONSTRUCT_RELATION.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_CONSTRUCT_RELATION_NAME, FieldConstants.STRING_FIELD, Cres.get().getString('relationName')));
    StorageHelper.FIFT_STORAGE_CONSTRUCT_RELATION.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_CONSTRUCT_RELATION_CASCADE_DELETE, FieldConstants.BOOLEAN_FIELD, Cres.get().getString('classManyToManyCascadeDelete')));
  }

  public static readonly FIFT_STORAGE_DELETE_RELATION: TableFormat = new TableFormat(1, 1);

  static __static_initializer_18() {
    StorageHelper.FIFT_STORAGE_DELETE_RELATION.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_DELETE_RELATION_TABLE, FieldConstants.STRING_FIELD, Cres.get().getString('table')));
    StorageHelper.FIFT_STORAGE_DELETE_RELATION.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_CONSTRUCT_RELATION_PRIMARY_KEY_TYPE, FieldConstants.STRING_FIELD, Cres.get().getString('primaryKeyType')));
    StorageHelper.FIFT_STORAGE_DELETE_RELATION.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_DELETE_RELATION_RELATED_TABLE, FieldConstants.STRING_FIELD, Cres.get().getString('relatedTable')));
    StorageHelper.FIFT_STORAGE_DELETE_RELATION.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_CONSTRUCT_RELATION_RELATED_PRIMARY_KEY_TYPE, FieldConstants.STRING_FIELD, Cres.get().getString('relatedPrimaryKeyType')));
    StorageHelper.FIFT_STORAGE_DELETE_RELATION.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_DELETE_RELATION_NAME, FieldConstants.STRING_FIELD, Cres.get().getString('relationName')));
  }

  public static readonly FORMAT_RELATED_IDS: TableFormat = new TableFormat();

  static __static_initializer_19() {
    StorageHelper.FORMAT_RELATED_IDS.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_LINK_INSTANCES_INSTANCE_ID, FieldConstants.STRING_FIELD, Cres.get().getString('instanceId')));
    StorageHelper.FORMAT_RELATED_IDS.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_LINK_INSTANCES_RELATED_ID, FieldConstants.STRING_FIELD, Cres.get().getString('relatedId')));
  }

  public static readonly FIFT_STORAGE_LINK_INSTANCES: TableFormat = new TableFormat(1, 1);

  static __static_initializer_20() {
    StorageHelper.FIFT_STORAGE_LINK_INSTANCES.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_LINK_INSTANCES_TABLE, FieldConstants.STRING_FIELD, Cres.get().getString('table')));
    StorageHelper.FIFT_STORAGE_LINK_INSTANCES.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_LINK_INSTANCES_RELATED_TABLE, FieldConstants.STRING_FIELD, Cres.get().getString('relatedTable')));
    StorageHelper.FIFT_STORAGE_LINK_INSTANCES.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_LINK_INSTANCES_RELATION_NAME, FieldConstants.STRING_FIELD, Cres.get().getString('relationName')));
    StorageHelper.FIFT_STORAGE_LINK_INSTANCES.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_LINK_INSTANCES_RELATED_IDS, FieldConstants.DATATABLE_FIELD, Cres.get().getString('relatedIds')));
  }

  public static readonly FIFT_STORAGE_UNLINK_INSTANCES: TableFormat = StorageHelper.FIFT_STORAGE_LINK_INSTANCES.clone();

  public static readonly FIFT_STORAGE_LINKED_INSTANCES_FILTER: TableFormat = new TableFormat(1, 1);

  static __static_initializer_21() {
    StorageHelper.FIFT_STORAGE_LINKED_INSTANCES_FILTER.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_LINKED_INSTANCES_FILTER_INSTANCE_ID, FieldConstants.STRING_FIELD, Cres.get().getString('instanceId')));
    StorageHelper.FIFT_STORAGE_LINKED_INSTANCES_FILTER.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_LINKED_INSTANCES_FILTER_TABLE, FieldConstants.STRING_FIELD, Cres.get().getString('table')));
    StorageHelper.FIFT_STORAGE_LINKED_INSTANCES_FILTER.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_LINKED_INSTANCES_FILTER_RELATED_TABLE, FieldConstants.STRING_FIELD, Cres.get().getString('relatedTable')));
    StorageHelper.FIFT_STORAGE_LINKED_INSTANCES_FILTER.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_LINKED_INSTANCES_FILTER_RELATION_NAME, FieldConstants.STRING_FIELD, Cres.get().getString('relationName')));
    StorageHelper.FIFT_STORAGE_LINKED_INSTANCES_FILTER.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_LINKED_INSTANCES_FILTER_RELATION_OWNER, FieldConstants.BOOLEAN_FIELD, Cres.get().getString('relationOwner')));
    StorageHelper.FIFT_STORAGE_LINKED_INSTANCES_FILTER.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_LINKED_INSTANCES_FILTER_GET_RELATED, FieldConstants.BOOLEAN_FIELD, Cres.get().getString('getRelated')));
  }

  public static readonly FOFT_STORAGE_LINKED_INSTANCES_FILTER: TableFormat = ViewFilterElement.FORMAT.clone();

  public static readonly FIFT_STORAGE_GET_FORMAT: TableFormat = new TableFormat(1, 1);

  static __static_initializer_22() {
    StorageHelper.FIFT_STORAGE_GET_FORMAT.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_GET_FORMAT_TABLE, FieldConstants.STRING_FIELD, Cres.get().getString('table'), null, true));
    StorageHelper.FIFT_STORAGE_GET_FORMAT.addField(FieldFormatFactory.createWith(StorageHelper.FIF_STORAGE_GET_FORMAT_VIEW, FieldConstants.STRING_FIELD, Cres.get().getString('view'), null, true));
  }

  public static readonly FORMAT_COLUMNS: TableFormat = new TableFormat();

  static __static_initializer_23() {
    StorageHelper.FORMAT_COLUMNS.addField('<' + StorageHelper.FIELD_COLUMNS_NAME + '><S><F=EK><D=' + Cres.get().getString('name') + '>');
    StorageHelper.FORMAT_COLUMNS.addField('<' + StorageHelper.FIELD_COLUMNS_DESCRIPTION + '><S><F=R><D=' + Cres.get().getString('description') + '>');
    StorageHelper.FORMAT_COLUMNS.addField('<' + StorageHelper.FIELD_COLUMNS_GROUP + '><S><D=' + Cres.get().getString('group') + '>');

    const ff: FieldFormat<any> = FieldFormatFactory.createWith(StorageHelper.FIELD_COLUMNS_VISIBILITY, FieldConstants.INTEGER_FIELD, Cres.get().getString('visibility'), StorageHelper.VISIBILITY_VISIBLE);
    ff.addSelectionValue(StorageHelper.VISIBILITY_VISIBLE, Cres.get().getString('visible'));
    ff.addSelectionValue(StorageHelper.VISIBILITY_HIDDEN, Cres.get().getString('hidden'));
    ff.addSelectionValue(StorageHelper.VISIBILITY_DISABLED, Cres.get().getString('disabled'));
    StorageHelper.FORMAT_COLUMNS.addField(ff);

    StorageHelper.FORMAT_COLUMNS.addField('<' + StorageHelper.FIELD_COLUMNS_READONLY + '><B><A=0><D=' + Cres.get().getString('readOnly') + '>');
    StorageHelper.FORMAT_COLUMNS.addField('<' + StorageHelper.FIELD_COLUMNS_PRIMARY_KEY + '><B><F=R><A=0><D=' + Cres.get().getString('primaryKey') + '>');

    StorageHelper.FORMAT_COLUMNS.getField(StorageHelper.FIELD_COLUMNS_GROUP).setReadonly(true);

    StorageHelper.FORMAT_COLUMNS.addField(FieldFormatFactory.createWith(StorageHelper.FIELD_COLUMNS_IS_CALCULATED_FIELD, FieldConstants.BOOLEAN_FIELD, Cres.get().getString('isCalculatedField')).setDefault(false));
    StorageHelper.FORMAT_COLUMNS.addField(
      FieldFormatFactory.createWith(StorageHelper.FIELD_COLUMNS_FIELD_DATATABLE, FieldConstants.DATATABLE_FIELD, Cres.get().getString('fieldColumnDataTable'))
        .setNullable(true)
        .setDefault(null)
    );

    StorageHelper.FORMAT_COLUMNS.setNamingExpression(Functions.PRINT + '({}, "{' + StorageHelper.FIELD_COLUMNS_VISIBILITY + '} ? {' + StorageHelper.FIELD_COLUMNS_NAME + '} : null", ", ")');
    StorageHelper.FORMAT_COLUMNS.addBinding(StorageHelper.FIELD_COLUMNS_FIELD_DATATABLE + '#' + DataTableBindingProvider.PROPERTY_ENABLED, '{' + StorageHelper.FIELD_COLUMNS_IS_CALCULATED_FIELD + '}');
    StorageHelper.FORMAT_COLUMNS.addBinding(
      StorageHelper.FIELD_COLUMNS_FIELD_DATATABLE,
      '{' +
        StorageHelper.FIELD_COLUMNS_IS_CALCULATED_FIELD +
        '} ? ( {' +
        StorageHelper.FIELD_COLUMNS_FIELD_DATATABLE +
        '} == null ? ' +
        Functions.TABLE +
        '("' +
        this.getTableForCalculatedField() +
        '") : {' +
        StorageHelper.FIELD_COLUMNS_FIELD_DATATABLE +
        '} ) : null'
    );
    StorageHelper.FORMAT_COLUMNS.addBinding(StorageHelper.FIELD_COLUMNS_NAME + '#' + DataTableBindingProvider.PROPERTY_ENABLED, '{' + StorageHelper.FIELD_COLUMNS_IS_CALCULATED_FIELD + '}');
  }

  private static getTableForCalculatedField(): string {
    const cloneFormat: TableFormat = DataTableBuilding.FIELDS_FORMAT.clone()
      .setMaxRecords(1)
      .setMinRecords(1);
    cloneFormat
      .getField(StorageHelper.FIELD_COLUMNS_NAME)
      .setHidden(true)
      .setValidators([]);
    const replaceFirst = cloneFormat.encodeUseSeparator(true).replace('\\\\', '\\\\\\\\');
    return replaceFirst.replace('"', '\\\\"');
  }

  public static readonly FORMAT_SORTING: TableFormat = new TableFormat();

  static __static_initializer_24() {
    StorageHelper.FORMAT_SORTING.addField('<' + StorageHelper.FIELD_SORTING_COLUMN + '><S><F=E><D=' + Cres.get().getString('viewColumnOrExpression') + '>');

    const ff: FieldFormat<any> = FieldFormatFactory.create('<' + StorageHelper.FIELD_SORTING_ORDER + '><I><D=' + Cres.get().getString('sortOrder') + '>');
    ff.addSelectionValue(StorageHelper.SORT_ASCENDING, Cres.get().getString('ascending'));
    ff.addSelectionValue(StorageHelper.SORT_DESCENDING, Cres.get().getString('descending'));
    StorageHelper.FORMAT_SORTING.addField(ff);

    StorageHelper.FORMAT_SORTING.setReorderable(true);

    StorageHelper.FORMAT_SORTING.setNamingExpression(
      Functions.PRINT + '({}, "{' + StorageHelper.FIELD_SORTING_COLUMN + "} + ' ' + {" + StorageHelper.FIELD_SORTING_ORDER + '#' + DefaultReferenceResolver.SELECTION_VALUE_DESCRIPTION + '}", ", ")'
    );
  }

  public static readonly FORMAT_ROWLIST: TableFormat = new TableFormat();

  static __static_initializer_25() {
    StorageHelper.FORMAT_ROWLIST.addField(FieldFormatFactory.createWith('row', FieldConstants.INTEGER_FIELD, Cres.get().getString('row')));
  }

  public static readonly FOFT_ADD_ROW_ACTION: TableFormat = new TableFormat(1, 1);

  static __static_initializer_26() {
    StorageHelper.FOFT_ADD_ROW_ACTION.addField(FieldFormatFactory.createType(StorageHelper.CF_STORAGE_CONTEXT, FieldConstants.STRING_FIELD));
  }

  public static readonly FOFT_REMOVE_OR_UPDATE_ROW_ACTION: TableFormat = new TableFormat();

  static __static_initializer_27() {
    StorageHelper.FOFT_REMOVE_OR_UPDATE_ROW_ACTION.addField(FieldFormatFactory.createType(StorageHelper.CF_INLUDE_RECORD, FieldConstants.BOOLEAN_FIELD).setDefault(true));
    StorageHelper.FOFT_REMOVE_OR_UPDATE_ROW_ACTION.addField(FieldFormatFactory.createType(StorageHelper.CF_STORAGE_CONTEXT, FieldConstants.STRING_FIELD).setNullable(true));
    StorageHelper.FOFT_REMOVE_OR_UPDATE_ROW_ACTION.addField(FieldFormatFactory.createType(StorageHelper.CF_RECORD_INDEX, FieldConstants.INTEGER_FIELD).setNullable(true));
    StorageHelper.FOFT_REMOVE_OR_UPDATE_ROW_ACTION.addField(FieldFormatFactory.createType(StorageHelper.CLASS_FIELD_INSTANCE_ID, FieldConstants.LONG_FIELD).setNullable(true));
    StorageHelper.FOFT_REMOVE_OR_UPDATE_ROW_ACTION.addField(FieldFormatFactory.createType(StorageHelper.CF_RECORD_DESCRIPTION, FieldConstants.STRING_FIELD).setNullable(true));
  }

  private static readonly GROUP_STORAGE: string = ContextUtils.createGroup(ContextUtilsConstants.GROUP_DEFAULT, Cres.get().getString('storage'));

  public static FD_STORAGE_OPEN: FunctionDefinition;
  static __static_initializer_28() {
    StorageHelper.FD_STORAGE_OPEN = new FunctionDefinition(StorageHelper.F_STORAGE_OPEN, StorageHelper.FIFT_STORAGE_OPEN, StorageHelper.FOFT_STORAGE_OPEN, Cres.get().getString('storageOpen'), StorageHelper.GROUP_STORAGE);
  }

  public static FD_STORAGE_CLOSE: FunctionDefinition;
  static __static_initializer_29() {
    StorageHelper.FD_STORAGE_CLOSE = new FunctionDefinition(StorageHelper.F_STORAGE_CLOSE, StorageHelper.FIFT_STORAGE_CLOSE, TableFormat.EMPTY_FORMAT, Cres.get().getString('storageClose'), StorageHelper.GROUP_STORAGE);
  }

  public static FD_STORAGE_GET: FunctionDefinition;
  static __static_initializer_30() {
    StorageHelper.FD_STORAGE_GET = new FunctionDefinition(StorageHelper.F_STORAGE_GET, StorageHelper.FIFT_STORAGE_GET, StorageHelper.FOFT_STORAGE_GET, Cres.get().getString('storageGet'), StorageHelper.GROUP_STORAGE);
  }

  public static FD_STORAGE_UPDATE: FunctionDefinition;
  static __static_initializer_31() {
    StorageHelper.FD_STORAGE_UPDATE = new FunctionDefinition(StorageHelper.F_STORAGE_UPDATE, StorageHelper.FIFT_STORAGE_UPDATE, StorageHelper.FOFT_STORAGE_UPDATE, Cres.get().getString('storageUpdate'), StorageHelper.GROUP_STORAGE);
  }

  public static FD_STORAGE_DELETE: FunctionDefinition;
  static __static_initializer_32() {
    StorageHelper.FD_STORAGE_DELETE = new FunctionDefinition(StorageHelper.F_STORAGE_DELETE, StorageHelper.FIFT_STORAGE_DELETE, StorageHelper.FOFT_STORAGE_DELETE, Cres.get().getString('storageDelete'), StorageHelper.GROUP_STORAGE);
  }

  public static FD_STORAGE_INSERT: FunctionDefinition;
  static __static_initializer_33() {
    StorageHelper.FD_STORAGE_INSERT = new FunctionDefinition(StorageHelper.F_STORAGE_INSERT, StorageHelper.FIFT_STORAGE_INSERT, StorageHelper.FOFT_STORAGE_INSERT, Cres.get().getString('storageInsert'), StorageHelper.GROUP_STORAGE);
  }

  public static FD_STORAGE_VIEWS: FunctionDefinition;
  static __static_initializer_34() {
    StorageHelper.FD_STORAGE_VIEWS = new FunctionDefinition(StorageHelper.F_STORAGE_VIEWS, TableFormat.EMPTY_FORMAT, DataTableBuilding.SELECTION_VALUES_FORMAT, Cres.get().getString('storageViews'), StorageHelper.GROUP_STORAGE);
  }

  public static FD_STORAGE_TABLES: FunctionDefinition;
  static __static_initializer_35() {
    StorageHelper.FD_STORAGE_TABLES = new FunctionDefinition(StorageHelper.F_STORAGE_TABLES, TableFormat.EMPTY_FORMAT, DataTableBuilding.SELECTION_VALUES_FORMAT, Cres.get().getString('storageTables'), StorageHelper.GROUP_STORAGE);
  }

  public static FD_STORAGE_COLUMNS: FunctionDefinition;
  static __static_initializer_36() {
    StorageHelper.FD_STORAGE_COLUMNS = new FunctionDefinition(StorageHelper.F_STORAGE_COLUMNS, StorageHelper.FIFT_STORAGE_COLUMNS, StorageHelper.FORMAT_COLUMNS, Cres.get().getString('storageColumns'), StorageHelper.GROUP_STORAGE);
  }

  public static FD_STORAGE_RELATIONS: FunctionDefinition;
  static __static_initializer_37() {
    StorageHelper.FD_STORAGE_RELATIONS = new FunctionDefinition(StorageHelper.F_STORAGE_RELATIONS, StorageHelper.FIFT_STORAGE_RELATIONS, StorageHelper.FORMAT_COLUMNS);
  }

  public static FD_STORAGE_FILTER: FunctionDefinition;
  static __static_initializer_38() {
    StorageHelper.FD_STORAGE_FILTER = new FunctionDefinition(StorageHelper.F_STORAGE_FILTER, StorageHelper.FIFT_STORAGE_FILTER, null);
  }

  public static FD_STORAGE_SORTING: FunctionDefinition;
  static __static_initializer_39() {
    StorageHelper.FD_STORAGE_SORTING = new FunctionDefinition(StorageHelper.F_STORAGE_SORTING, StorageHelper.FIFT_STORAGE_SORTING, null);
  }

  public static FD_STORAGE_CONSTRUCT: FunctionDefinition;
  static __static_initializer_40() {
    StorageHelper.FD_STORAGE_CONSTRUCT = new FunctionDefinition(StorageHelper.F_STORAGE_CONSTRUCT, StorageHelper.FIFT_STORAGE_CONSTRUCT, TableFormat.EMPTY_FORMAT);
  }

  public static FD_STORAGE_OPERATIONS: FunctionDefinition;
  static __static_initializer_41() {
    StorageHelper.FD_STORAGE_OPERATIONS = new FunctionDefinition(StorageHelper.F_STORAGE_OPERATIONS, StorageHelper.FIFT_STORAGE_OPERATIONS, DataTableBuilding.SELECTION_VALUES_FORMAT);
  }

  public static FD_STORAGE_CONSTRUCT_RELATION: FunctionDefinition;
  static __static_initializer_42() {
    StorageHelper.FD_STORAGE_CONSTRUCT_RELATION = new FunctionDefinition(StorageHelper.F_STORAGE_CONSTRUCT_RELATION, StorageHelper.FIFT_STORAGE_CONSTRUCT_RELATION, TableFormat.EMPTY_FORMAT);
  }

  public static FD_STORAGE_DELETE_RELATION: FunctionDefinition;
  static __static_initializer_43() {
    StorageHelper.FD_STORAGE_DELETE_RELATION = new FunctionDefinition(StorageHelper.F_STORAGE_DELETE_RELATION, StorageHelper.FIFT_STORAGE_DELETE_RELATION, TableFormat.EMPTY_FORMAT);
  }

  public static FD_STORAGE_LINK_INSTANCES: FunctionDefinition;
  static __static_initializer_44() {
    StorageHelper.FD_STORAGE_LINK_INSTANCES = new FunctionDefinition(StorageHelper.F_STORAGE_LINK_INSTANCES, StorageHelper.FIFT_STORAGE_LINK_INSTANCES, TableFormat.EMPTY_FORMAT);
  }

  public static FD_STORAGE_UNLINK_INSTANCES: FunctionDefinition;
  static __static_initializer_45() {
    StorageHelper.FD_STORAGE_UNLINK_INSTANCES = new FunctionDefinition(StorageHelper.F_STORAGE_UNLINK_INSTANCES, StorageHelper.FIFT_STORAGE_UNLINK_INSTANCES, TableFormat.EMPTY_FORMAT);
  }

  public static FD_STORAGE_LINKED_INSTANCES_FILTER: FunctionDefinition;
  static __static_initializer_46() {
    StorageHelper.FD_STORAGE_LINKED_INSTANCES_FILTER = new FunctionDefinition(StorageHelper.F_STORAGE_LINKED_INSTANCES_FILTER, StorageHelper.FIFT_STORAGE_LINKED_INSTANCES_FILTER, StorageHelper.FOFT_STORAGE_LINKED_INSTANCES_FILTER);
  }

  public static FD_STORAGE_GET_FORMAT: FunctionDefinition;
  static __static_initializer_47() {
    StorageHelper.FD_STORAGE_GET_FORMAT = new FunctionDefinition(StorageHelper.F_STORAGE_GET_FORMAT, StorageHelper.FIFT_STORAGE_GET_FORMAT, null, Cres.get().getString('storageGetFormat'), StorageHelper.GROUP_STORAGE);
  }
  private static readonly STORAGE_SESSION_ID_GENERATOR = Math.random();

  public static generateViewSessionId(): number {
    return Math.abs(StorageHelper.STORAGE_SESSION_ID_GENERATOR);
  }

  public static readonly E_CLASS_INSTANCE_CREATED: string = 'classInstanceCreated';
  public static readonly E_CLASS_INSTANCE_CHANGED: string = 'classInstanceChanged';
  public static readonly E_CLASS_INSTANCE_DELETED: string = 'classInstanceDeleted';
  public static readonly E_CLASS_INSTANCE_COMMENTED: string = 'classInstanceCommented';

  public static readonly FIELD_EVENT_INSTANCE_ID: string = 'instanceId';
  public static readonly FIELD_EVENT_INSTANCE_DESCRIPTION: string = 'instanceDescription';
  public static readonly FIELD_EVENT_INSTANCE: string = 'instance';
  public static readonly FIELD_EVENT_FIELD_NAME: string = 'fieldName';
  public static readonly FIELD_EVENT_FIELD_DESCRIPTION: string = 'fieldDescription';
  public static readonly FIELD_EVENT_OLD_VALUE: string = 'oldValue';
  public static readonly FIELD_EVENT_NEW_VALUE: string = 'newValue';
  public static readonly FIELD_EVENT_MODIFICATION_AUTHOR: string = 'modificationAuthor';
  public static readonly FIELD_EVENT_AUTHOR: string = 'author';
  public static readonly FIELD_EVENT_COMMENT: string = 'comment';

  public static readonly KEY_EVENT_INSTANCE_ID: string = 'instanceId';
  public static readonly KEY_EVENT_CLASS_NAME: string = 'class_name';

  public static readonly EFT_CLASS_INSTANCE_CREATED: TableFormat = new TableFormat();

  static __static_initializer_48() {
    StorageHelper.EFT_CLASS_INSTANCE_CREATED.addField(FieldFormatFactory.createType(StorageHelper.FIELD_EVENT_INSTANCE_ID, FieldConstants.STRING_FIELD));
    StorageHelper.EFT_CLASS_INSTANCE_CREATED.addField(FieldFormatFactory.createType(StorageHelper.FIELD_EVENT_INSTANCE_DESCRIPTION, FieldConstants.STRING_FIELD).setNullable(true));
    StorageHelper.EFT_CLASS_INSTANCE_CREATED.addField(FieldFormatFactory.createType(StorageHelper.FIELD_EVENT_MODIFICATION_AUTHOR, FieldConstants.STRING_FIELD).setNullable(true));
  }

  public static readonly EFT_CLASS_INSTANCE_DELETED: TableFormat = StorageHelper.EFT_CLASS_INSTANCE_CREATED.clone();

  static __static_initializer_49() {
    StorageHelper.EFT_CLASS_INSTANCE_DELETED.addField(FieldFormatFactory.createType(StorageHelper.FIELD_EVENT_INSTANCE, FieldConstants.DATATABLE_FIELD).setNullable(true));
  }

  public static readonly EFT_CLASS_INSTANCE_CHANGED: TableFormat = StorageHelper.EFT_CLASS_INSTANCE_CREATED.clone();

  static __static_initializer_50() {
    StorageHelper.EFT_CLASS_INSTANCE_CHANGED.addField(FieldFormatFactory.createType(StorageHelper.FIELD_EVENT_FIELD_NAME, FieldConstants.STRING_FIELD));
    StorageHelper.EFT_CLASS_INSTANCE_CHANGED.addField(FieldFormatFactory.createType(StorageHelper.FIELD_EVENT_FIELD_DESCRIPTION, FieldConstants.STRING_FIELD).setNullable(true));
    StorageHelper.EFT_CLASS_INSTANCE_CHANGED.addField(FieldFormatFactory.createType(StorageHelper.FIELD_EVENT_OLD_VALUE, FieldConstants.STRING_FIELD).setNullable(true));
    StorageHelper.EFT_CLASS_INSTANCE_CHANGED.addField(FieldFormatFactory.createType(StorageHelper.FIELD_EVENT_NEW_VALUE, FieldConstants.STRING_FIELD).setNullable(true));
  }

  public static readonly EFT_CLASS_INSTANCE_COMMENT: TableFormat = new TableFormat(1, 1);

  static __static_initializer_51() {
    StorageHelper.EFT_CLASS_INSTANCE_COMMENT.addField(
      FieldFormatFactory.createType(StorageHelper.FIELD_EVENT_INSTANCE_ID, FieldConstants.STRING_FIELD)
        .setNullable(true)
        .setHidden(true)
    );
    StorageHelper.EFT_CLASS_INSTANCE_COMMENT.addField(
      FieldFormatFactory.createType(StorageHelper.FIELD_EVENT_AUTHOR, FieldConstants.STRING_FIELD)
        .setNullable(true)
        .setHidden(true)
    );
    StorageHelper.EFT_CLASS_INSTANCE_COMMENT.addField(FieldFormatFactory.createType(StorageHelper.FIELD_EVENT_COMMENT, FieldConstants.STRING_FIELD));
    StorageHelper.EFT_CLASS_INSTANCE_COMMENT.addBinding(StorageHelper.FIELD_EVENT_INSTANCE_ID, this.makeExpression(StorageHelper.FIELD_EVENT_INSTANCE_ID));
    StorageHelper.EFT_CLASS_INSTANCE_COMMENT.addBinding(StorageHelper.FIELD_EVENT_AUTHOR, this.makeExpression(StorageHelper.FIELD_EVENT_AUTHOR));
  }

  public static makeExpression(field: string): string {
    return '{' + field + '} == null ? {env/' + field + '} : {' + field + '}';
  }

  public static async getPrimaryKeyName(storageContext: Context<Context<any, any>, ContextManager<any>>, caller: CallerController, storageTable: string): Promise<string | null> {
    let columns: DataTable | null = null;

    if (storageTable == null) {
      return null;
    }

    const inputFields: DataRecord = new DataRecord(StorageHelper.FIFT_STORAGE_COLUMNS);
    inputFields.setValue(StorageHelper.FIF_STORAGE_COLUMNS_TABLE, storageTable);

    try {
      columns = await storageContext.callFunction(StorageHelper.F_STORAGE_COLUMNS, inputFields.wrap(), caller, null);
    } catch (ex) {
      return null;
    }

    if (columns != null) {
      const rec: DataRecord | null = columns.select(StorageHelper.FIELD_COLUMNS_PRIMARY_KEY, true);
      if (rec != null && rec.hasField(StorageHelper.FIELD_COLUMNS_NAME)) {
        return rec.getString(StorageHelper.FIELD_COLUMNS_NAME);
      }
    }

    return null;
  }

  private static _init = false;

  public static initialize() {
    if (StorageHelper._init) return;
    StorageHelper.__static_initializer_0();
    StorageHelper.__static_initializer_1();
    StorageHelper.__static_initializer_2();
    StorageHelper.__static_initializer_3();
    StorageHelper.__static_initializer_4();
    StorageHelper.__static_initializer_5();
    StorageHelper.__static_initializer_6();
    StorageHelper.__static_initializer_7();
    StorageHelper.__static_initializer_8();
    StorageHelper.__static_initializer_9();
    StorageHelper.__static_initializer_10();
    StorageHelper.__static_initializer_11();
    StorageHelper.__static_initializer_12();
    StorageHelper.__static_initializer_13();
    StorageHelper.__static_initializer_14();
    StorageHelper.__static_initializer_15();
    StorageHelper.__static_initializer_16();
    StorageHelper.__static_initializer_17();
    StorageHelper.__static_initializer_18();
    StorageHelper.__static_initializer_19();
    StorageHelper.__static_initializer_20();
    StorageHelper.__static_initializer_21();
    StorageHelper.__static_initializer_22();
    StorageHelper.__static_initializer_23();
    StorageHelper.__static_initializer_24();
    StorageHelper.__static_initializer_25();
    StorageHelper.__static_initializer_26();
    StorageHelper.__static_initializer_27();
    StorageHelper.__static_initializer_28();
    StorageHelper.__static_initializer_29();
    StorageHelper.__static_initializer_30();
    StorageHelper.__static_initializer_31();
    StorageHelper.__static_initializer_32();
    StorageHelper.__static_initializer_33();
    StorageHelper.__static_initializer_34();
    StorageHelper.__static_initializer_35();
    StorageHelper.__static_initializer_36();
    StorageHelper.__static_initializer_37();
    StorageHelper.__static_initializer_38();
    StorageHelper.__static_initializer_39();
    StorageHelper.__static_initializer_40();
    StorageHelper.__static_initializer_41();
    StorageHelper.__static_initializer_42();
    StorageHelper.__static_initializer_43();
    StorageHelper.__static_initializer_44();
    StorageHelper.__static_initializer_45();
    StorageHelper.__static_initializer_46();
    StorageHelper.__static_initializer_47();
    StorageHelper.__static_initializer_48();
    StorageHelper.__static_initializer_49();
    StorageHelper.__static_initializer_50();
    StorageHelper.__static_initializer_51();

    StorageHelper._init = true;
  }
}
