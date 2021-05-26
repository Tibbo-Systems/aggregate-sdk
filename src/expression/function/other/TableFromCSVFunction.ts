import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import ExpressionUtils from '../../ExpressionUtils';
import MessageFormat from '../../../util/java/MessageFormat';
import SimpleDataTable from '../../../datatable/SimpleDataTable';
import TableFormat from '../../../datatable/TableFormat';
import ClassicEncodingSettings from '../../../datatable/encoding/ClassicEncodingSettings';
import CsvImportExportUtils from '../../../util/CsvImportExportUtils';
import CsvReader from '../../../util/java/CsvReader';
export default class TableFromCSVFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_OTHER, 'String csv, String header, String delimiter [, String format]', 'DataTable', Cres.get().getString('fDescTableFromCSV'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(3, false, parameters);
    try {
      const text = parameters[0].toString();

      const headerType = parameters[1].toString();
      const header = this.getHeaderNumber(headerType);

      const param2 = parameters[2].toString();
      const delimiter = this.getDelimiter(param2);
      const reader = new CsvReader(text, delimiter);

      if (header == CsvImportExportUtils.HEADER_SKIP) {
        reader.skipRecord();
      } else if (header == CsvImportExportUtils.HEADER_NAMES || header == CsvImportExportUtils.HEADER_DESCRIPTIONS) {
        reader.readHeaders();
      }

      let format;
      if (parameters.length >= 4) {
        this.checkHeader(header, true);

        if (parameters[3] == null) {
          throw new Error(MessageFormat.format(Cres.get().getString('exprParamCantBeNull'), 3));
        }
        const formatString = parameters[3].toString();

        format = TableFormat.createWithFormatAndSettings(formatString, new ClassicEncodingSettings(ExpressionUtils.useVisibleSeparators(formatString)));
      } else {
        this.checkHeader(header, false);

        format = CsvImportExportUtils.readFormat(null, reader, header);
      }

      if (header != CsvImportExportUtils.HEADER_NONE) {
        this.checkNumberOfColumns(format, reader);
      }

      const loaded = new SimpleDataTable(format);

      const hasMoreRecords = reader.readRecord();

      CsvImportExportUtils.readCsvRecords(loaded, reader, header, hasMoreRecords);

      reader.clear();

      return loaded;
    } catch (ex) {
      throw new Error(ex.message);
    }
  }

  private getDelimiter(str: string) {
    if (str.length != 1) {
      throw Error('The delimeter must be a one-character string.');
    }
    return str.charAt(0);
  }

  private getHeaderNumber(headerType: string) {
    let header = 0;
    switch (headerType) {
      case 'none':
        header = CsvImportExportUtils.HEADER_NONE;
        break;

      case 'names':
        header = CsvImportExportUtils.HEADER_NAMES;
        break;

      case 'descriptions':
        header = CsvImportExportUtils.HEADER_DESCRIPTIONS;
        break;

      case 'skip':
        header = CsvImportExportUtils.HEADER_SKIP;
        break;

      default:
        throw new Error('Header of type "' + headerType + '" is not supported.');
    }
    return header;
  }

  private checkHeader(header: number, isFormatProvided: boolean) {
    if (isFormatProvided) {
      if (header == CsvImportExportUtils.HEADER_NAMES || header == CsvImportExportUtils.HEADER_DESCRIPTIONS) {
        throw new Error('If format is specified the header type must be either "none" or "skip" and cannot be "names" or "descriptions".');
      }
    } else {
      if (header == CsvImportExportUtils.HEADER_NONE) {
        throw new Error('If the header type is "none" the table format must be specified using the format parameter.');
      }
    }
  }
  private checkNumberOfColumns(format: TableFormat, reader: any) {
    const actualNumberOfColumns = reader.getHeaders() != null ? reader.getHeaderCount() : reader.getColumnCount();
    const numberOfColumnsInFormat = format.getFieldCount();

    if (actualNumberOfColumns != numberOfColumnsInFormat) {
      throw new Error('The number of columns in the specified format does not match the number of columns in the csv file content.');
    }
  }
}
