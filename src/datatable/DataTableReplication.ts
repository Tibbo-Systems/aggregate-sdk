import DataTable from './DataTable';
import Cres from '../Cres';
import DataRecord from './DataRecord';
import FieldFormat from './FieldFormat';
import Util from '../util/Util';
import CloneUtils from '../util/CloneUtils';
import Log from '../Log';
import MessageFormat from '../util/java/MessageFormat';
import JObject from '../util/java/JObject';
import DataTableQuery from './DataTableQuery';
import QueryCondition from './QueryCondition';
import FieldConstants from './field/FieldConstants';

export default class DataTableReplication {
  /* static copy(value: DataTable, newValue: DataTable, b: boolean, b2: boolean, b3: boolean, b4: boolean, b5: boolean) { */
  static copy(
    source: DataTable,
    target: DataTable,
    copyReadOnlyFields = false,
    copyNonReplicatableFields = false,
    removeRecordsFromTarget = true,
    addRecordsToTarget = true,
    ignoreUnresizable = false,
    fields: Array<string> | null = null
  ): Set<string> {
    if (target.getFormat().getKeyFields().length == 0) {
      return this.copyWithoutKeyFields(source, target, copyReadOnlyFields, copyNonReplicatableFields, removeRecordsFromTarget, addRecordsToTarget, ignoreUnresizable, fields);
    } else {
      return this.copyWithKeyFields(source, target, copyReadOnlyFields, copyNonReplicatableFields, removeRecordsFromTarget, addRecordsToTarget, ignoreUnresizable, fields);
    }
  }

  public static copyWithKeyFields(
    source: DataTable,
    target: DataTable,
    copyReadOnlyFields: boolean,
    copyNonReplicatableFields: boolean,
    removeRecordsFromTarget: boolean,
    addRecordsToTarget: boolean,
    ignoreUnresizable: boolean,
    fields: Array<string> | null
  ): Set<string> {
    const errors: Set<string> = new Set<string>();

    const keyFields: Array<string> = target.getFormat().getKeyFields();

    for (const fieldName of keyFields) {
      if (!source.getFormat().hasField(fieldName)) {
        return this.copyWithoutKeyFields(source, target, copyReadOnlyFields, copyNonReplicatableFields, removeRecordsFromTarget, addRecordsToTarget, ignoreUnresizable, fields);
      }
    }

    let singleKeyField: string | null = null;
    //    TODO Object cannot be used as a key
    let sourceLookup: Map<any, DataRecord> | null = null;
    let targetLookup: Map<any, DataRecord> | null = null;

    if (keyFields.length === 1) {
      singleKeyField = keyFields[0];

      sourceLookup = new Map<any, DataRecord>();

      for (const cur of source) {
        sourceLookup.set(cur.getValue(singleKeyField), cur);
      }

      targetLookup = new Map<any, DataRecord>();

      for (const cur of target) {
        targetLookup.set(cur.getValue(singleKeyField), cur);
      }
    }

    for (let i = target.getRecordCount() - 1; i >= 0; i--) {
      const targetRec: DataRecord = target.getRecord(i);

      let sourceRec: DataRecord | null = null;

      if (singleKeyField != null && sourceLookup != null) {
        const sourceRecFromMap = sourceLookup.get(targetRec.getValue(singleKeyField));
        if (sourceRecFromMap) sourceRec = sourceRecFromMap;
      } else {
        const query: DataTableQuery = new DataTableQuery();

        for (const keyField of keyFields) {
          query.addCondition(new QueryCondition(keyField, targetRec.getValue(keyField)));
        }

        sourceRec = source.selectByQuery(query);
      }

      if (removeRecordsFromTarget && sourceRec == null && (ignoreUnresizable || !target.getFormat().isUnresizable())) {
        if (target.getRecordCount() > target.getFormat().getMinRecords()) {
          target.getRecords().splice(i, 1);
        } else {
          if (source.getFormat().getMinRecords() !== source.getFormat().getMaxRecords()) {
            errors.add(Cres.get().getString('dtTargetTableMinRecordsReached'));
          }
          break;
        }
      }
    }

    for (const sourceRec of source) {
      let targetRec: DataRecord | null = null;

      if (singleKeyField != null && targetLookup != null) {
        const targetRecFromMap = targetLookup.get(sourceRec.getValue(singleKeyField));
        if (targetRecFromMap) {
          const targetRecFromMap = targetLookup.get(sourceRec.getValue(singleKeyField));
          if (targetRecFromMap) targetRec = targetRecFromMap;
        }
      } else {
        const query: DataTableQuery = new DataTableQuery();

        for (const keyField of keyFields) {
          query.addCondition(new QueryCondition(keyField, sourceRec.getValue(keyField)));
        }

        targetRec = target.selectByQuery(query);
      }

      if (targetRec == null) {
        if (addRecordsToTarget && (ignoreUnresizable || !target.getFormat().isUnresizable())) {
          if (target.getRecordCount() < target.getFormat().getMaxRecords()) {
            const newRec: DataRecord = new DataRecord(target.getFormat());

            this.copyRecord(sourceRec, newRec, copyReadOnlyFields, copyNonReplicatableFields, removeRecordsFromTarget, addRecordsToTarget, fields).forEach((element) => {
              errors.add(element);
            });

            try {
              target.addRecordFromRecord(newRec);
            } catch (ex) {
              errors.add(Cres.get().getString('dtCannotAddRecord') + (ex.message != null ? ex.message : ex.toString()));
            }
          } else {
            if (source.getFormat().getMinRecords() != source.getFormat().getMaxRecords()) {
              errors.add(Cres.get().getString('dtTargetTableMaxRecordsReached'));
            }
          }
        }
      } else {
        this.copyRecord(sourceRec, targetRec, copyReadOnlyFields, copyNonReplicatableFields, removeRecordsFromTarget, addRecordsToTarget, fields).forEach((element) => {
          errors.add(element);
        });
      }
    }

    this.copyTimestampAndQuality(source, target);

    return errors;
  }

  public static copyWithoutKeyFields(
    source: DataTable,
    target: DataTable,
    copyReadOnlyFields: boolean,
    copyNonReplicatableFields: boolean,
    removeRecordsFromTarget: boolean,
    addRecordsToTarget: boolean,
    ignoreUnresizable: boolean,
    fields: Array<string> | null
  ): Set<string> {
    const errors: Set<string> = new Set<string>();

    if (removeRecordsFromTarget && (ignoreUnresizable || !target.getFormat().isUnresizable())) {
      while (target.getRecordCount() > source.getRecordCount()) {
        if (target.getRecordCount() > target.getFormat().getMinRecords()) {
          target.removeRecord(target.getRecordCount() - 1);
        } else {
          if (source.getFormat().getMinRecords() != source.getFormat().getMaxRecords()) {
            errors.add(Cres.get().getString('dtTargetTableMinRecordsReached'));
          }
          break;
        }
      }
    }

    for (let i = 0; i < Math.min(source.getRecordCount(), target.getRecordCount()); i++) {
      const srcRec: DataRecord = source.getRecord(i);
      const tgtRec: DataRecord = target.getRecord(i);

      this.copyRecord(srcRec, tgtRec, copyReadOnlyFields, copyNonReplicatableFields, removeRecordsFromTarget, addRecordsToTarget, fields).forEach((element) => {
        errors.add(element);
      });
    }

    if (addRecordsToTarget && (ignoreUnresizable || !target.getFormat().isUnresizable())) {
      if (source.getRecordCount() > target.getRecordCount()) {
        for (let i = target.getRecordCount(); i < Math.min(target.getFormat().getMaxRecords(), source.getRecordCount()); i++) {
          this.copyRecord(source.getRecord(i), target.addRecord(), copyReadOnlyFields, copyNonReplicatableFields, removeRecordsFromTarget, addRecordsToTarget, fields).forEach((element) => {
            errors.add(element);
          });
        }
      }
    }

    if (source.getRecordCount() > target.getFormat().getMaxRecords()) {
      if (source.getFormat().getMinRecords() != source.getFormat().getMaxRecords()) {
        errors.add(Cres.get().getString('dtTargetTableMaxRecordsReached'));
      }
    }

    this.copyTimestampAndQuality(source, target);

    return errors;
  }

  public static copyTimestampAndQuality(source: DataTable, target: DataTable): void {
    const timestamp = source.getTimestamp();
    if (timestamp != null) target.setTimestamp(timestamp);

    const quality = source.getQuality();

    if (quality) target.setQuality(quality);
  }

  public static copyRecord(source: DataRecord, target: DataRecord, copyReadOnlyFields = false, copyNonReplicatableFields = false, removeRecordsFromTarget = true, addRecordsToTarget = true, fields: Array<string> | null = null): Set<string> {
    const errors: Set<string> = new Set<string>();

    for (const tgtFf of target.getFormat()) {
      const fieldName: string = tgtFf.getName();

      let srcFf: FieldFormat<any> | null = null;

      srcFf = source.getFormat().getField(fieldName);

      if (fields != null && fields.findIndex((el) => el === tgtFf.getName()) === -1) {
        continue;
      }

      if (srcFf == null) {
        continue;
      }

      if (tgtFf.isReadonly() && !copyReadOnlyFields) {
        continue;
      }

      if (!copyNonReplicatableFields) {
        if (tgtFf.isNotReplicated() || srcFf.isNotReplicated()) {
          continue;
        }
      }

      const AbstractDataTable = require('./AbstractDataTable').default;
      try {
        if (srcFf.getType() == FieldConstants.DATATABLE_FIELD && tgtFf.getType() == FieldConstants.DATATABLE_FIELD) {
          const sourceTable: DataTable = source.getDataTable(fieldName);
          const targetTable: DataTable = target.getDataTable(fieldName);
          if (sourceTable != null && targetTable != null) {
            if (Util.equals(targetTable.getFormat(), AbstractDataTable.DEFAULT_FORMAT)) {
              target.setValue(fieldName, sourceTable.clone());
            } else {
              this.copy(sourceTable, targetTable, copyReadOnlyFields, copyNonReplicatableFields, removeRecordsFromTarget, addRecordsToTarget).forEach((element) => {
                errors.add(element);
              });
              target.setValue(fieldName, targetTable);
            }
            continue;
          }
        }

        if (srcFf.getType() === tgtFf.getType()) {
          target.setValue(fieldName, CloneUtils.genericClone(source.getValue(fieldName)));
        } else {
          target.setValue(fieldName, tgtFf.valueFromString(srcFf.valueToString(source.getValue(fieldName))));
        }
      } catch (ex2) {
        const msg: string = MessageFormat.format(Cres.get().getString('dtErrCopyingField'), fieldName);
        Log.DATATABLE.debug(msg, ex2);
        errors.add(msg + ': ' + ex2.message);
        continue;
      }
    }

    return errors;
  }
}
