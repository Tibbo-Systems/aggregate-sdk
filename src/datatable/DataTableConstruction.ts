import TableFormat from './TableFormat';
import Evaluator from '../expression/Evaluator';
import EvaluationEnvironment from '../expression/EvaluationEnvironment';
import DataTable from './DataTable';
import Expression from '../expression/Expression';
import DataTableFactory from './DataTableFactory';
import StringUtils from '../util/StringUtils';
import DataTableConversion from './DataTableConversion';

export default class DataTableConstruction {
  public static constructTable(parameters: Array<any>, format: TableFormat | null, evaluator: Evaluator | null, environment: EvaluationEnvironment): DataTable {
    try {
      const params = DataTableConstruction.resolveParameters(parameters, evaluator, environment);

      let res;

      if (format == null) {
        if (params.length == 1 && params[0] instanceof DataTable) {
          res = params[0] as DataTable;
        } else {
          res = DataTableConversion.wrapToTable(params);
        }
      } else {
        res = DataTableConstruction.fillDataTable(format, params);
      }

      return res;
    } catch (ex) {
      throw new Error('Error constructing data table' + (format != null ? ' of format ' + format.encodeUseSeparator(true) : '') + " from parameters '" + StringUtils.print(parameters) + "': " + ex.getMessage());
    }
  }

  private static resolveParameters(parameters: Array<any>, evaluator: Evaluator | null, environment: EvaluationEnvironment): Array<any> {
    const params = new Array<any>();
    for (const param of parameters) {
      if (param instanceof Expression) {
        if (evaluator == null) {
          throw new Error('Evaluator not defined');
        }

        params.push(evaluator.evaluate(param, environment));
      } else {
        params.push(param);
      }
    }
    return params;
  }

  private static fillDataTable(format: TableFormat, params: Array<any>): DataTable {
    const table = DataTableFactory.of(format);
    if (params.length != 0) {
      const maxCells = format.getFieldCount() * format.getMaxRecords();
      if (params.length > maxCells) {
        throw new Error('Maximum number of cells in the table is ' + maxCells + ', but ' + params.length + ' parameters were received.');
      }

      let rec = table.addRecord();

      let fieldNum = 0;

      for (let i = 0; i < params.length; i++) {
        if (fieldNum >= format.getFieldCount()) {
          fieldNum = 0;
          rec = table.addRecord();
        }

        const ff = format.getField(fieldNum);

        const param = params[i];

        if (param == null || ff.isAssignableFrom(param)) {
          rec.addValue(param);
        } else {
          rec.addValue(ff.valueFromString(param.toString()));
        }
        fieldNum++;
      }
    }
    while (table.getRecordCount() < format.getMinRecords()) {
      table.addRecord();
    }

    return table;
  }
}
