import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import StringUtils from '../../../util/StringUtils';

export default class TableFromCSVFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_OTHER, 'String csv, String header, String delimiter [, String format]', 'DataTable', Cres.get().getString('fDescTableFromCSV'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(3, false, parameters);
    /*
        
                try
                {
                    const text = parameters[0].toString();
                    const data = text.getBytes(StringUtils.UTF8_CHARSET);
        
                    const headerType = parameters[1].toString();
                    const header = getHeaderNumber(headerType);
        
                    const param2 = parameters[2].toString();
                    const delimiter = this.getDelimiter(param2);
        
                    const reader = createCsvReader(data, delimiter);
        
                    if (header == CsvImportExportUtils.HEADER_SKIP)
                    {
                        reader.skipRecord();
                    }
                    else if (header == CsvImportExportUtils.HEADER_NAMES || header == CsvImportExportUtils.HEADER_DESCRIPTIONS)
                    {
                        reader.readHeaders();
                    }
        
                    final TableFormat format;
                    if (parameters.length >= 4)
                    {
                        checkHeader(header, true);
        
                        if (parameters[3] == null)
                        {
                            throw new EvaluationException(MessageFormat.format(Cres.get().getString("exprParamCantBeNull"), 3));
                        }
                        String formatString = parameters[3].toString();
        
                        format = ExpressionUtils.readFormat(formatString);
                    }
                    else
                    {
                        checkHeader(header, false);
        
                        format = CsvImportExportUtils.readFormat(null, reader, header);
                    }
        
                    if (header != CsvImportExportUtils.HEADER_NONE)
                    {
                        checkNumberOfColumns(format, reader);
                    }
        
                    final DataTable loaded = new SimpleDataTable(format);
        
                    final boolean hasMoreRecords = reader.readRecord();
        
                    CsvImportExportUtils.readCsvRecords(loaded, reader, header, hasMoreRecords);
        
                    reader.close();
        
                    return loaded;
                }
                catch (Exception ex)
                {
                    throw new EvaluationException(ex.getMessage(), ex);
                }
            }
        
            private getDelimiter(str: string) {
                if (str.length != 1) {
                    throw Error('The delimeter must be a one-character string.')
                }
                return str.charAt(0);
            }
        
            private getHeaderNumber(headerType: string) {
                let header = 0;
                switch (headerType)
                {
                    case "none":
                        header = CsvImportExportUtils.HEADER_NONE;
                        break;
        
                    case "names":
                        header = CsvImportExportUtils.HEADER_NAMES;
                        break;
        
                    case "descriptions":
                        header = CsvImportExportUtils.HEADER_DESCRIPTIONS;
                        break;
        
                    case "skip":
                        header = CsvImportExportUtils.HEADER_SKIP;
                        break;
        
                    default:
                        throw new Error("Header of type \"" + headerType + "\" is not supported.");
                }
                return header;
            }
        
            private createCsvReader(data: any, delimiter: string) {
                const reader = new CsvReader(new ByteArrayInputStream(data), delimiter, CHARSET);
                reader.setSkipEmptyRecords(true);
                reader.setUseTextQualifier(false);
                reader.setComment('#');
                reader.setEscapeMode(CsvReader.ESCAPE_MODE_BACKSLASH);
                return reader;
            }
        */
  }
}
