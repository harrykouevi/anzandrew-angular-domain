import { ArrayUtils } from '../types/array-utils';
import { ISerializableBuilder } from '../../built-value/contracts/serializers';
import { MomentUtils } from '../datetime/moment-utils';
import { isArray, isDefined } from '../types/type-utils';
import * as Excel from 'xlsx';

export class ExcelUtils {
  // tslint:disable-next-line: max-line-length
  public static readAsBufferedArray(buffer: ArrayBuffer, defaultDateFormat = 'dd/MM/YYYY', readFirstSheet?: boolean): Promise<object[]> {
    return new Promise((resolve, reject) => {
      try {
        const wb = Excel.read(buffer, { type: 'array', cellDates: true, dateNF: defaultDateFormat });
        if (readFirstSheet) {
          resolve(Excel.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: null }));
          return;
        }
        const data = wb.SheetNames.map((sh: string) => {
          return Excel.utils.sheet_to_json(wb.Sheets[sh], { defval: null });
        });
        resolve(ArrayUtils.flatten(data));
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * @description Generate and excel sheet from a js object
   * @param data List of enties to e saved to excel sheet
   * @param headers Data mapping of excel sheet headers and object properties
   * @param datefield List of field needed to be parsed as date
   */
  public static jsonToSheet(data: object[], headers: { [index: string]: string }, datefield: string[] = [], dateFormat: string = 'DD/MM/YYYY', inputDateFormat: string = 'YYYY-MM-DD') {
    const entries = ExcelUtils.entityToXlsEntries(data, headers, datefield, dateFormat, inputDateFormat);
    if (entries.length > 0) {
      return Excel.utils.json_to_sheet(entries, { header: Object.keys(headers), skipHeader: false });
    }
  }

  public static entityToXlsEntries(data: object[], headers: { [index: string]: string }, datefields: string[] = [], dateFormat: string = 'DD/MM/YYYY', inputDateFormat: string = 'YYYY-MM-DD') {
    if (data && isArray(data)) {
      return data.map((value: object) => {
        const headersPropertyMapping: { [index: string]: string } = Object.assign(headers);
        const mappingObj: any = {};
        const valueKeys = Object.keys(value);
        for (const [k, v] of Object.entries(headersPropertyMapping)) {
          if (valueKeys.indexOf(v) !== -1) {
            mappingObj[k] =
              // tslint:disable-next-line: max-line-length
              (datefields.length > 0) && (datefields.indexOf(v) !== -1) ? MomentUtils.parseDate(value[v], dateFormat, inputDateFormat) : value[v];
          }
        }
        return mappingObj;
      }).filter((i) => i !== {});
    }
    return [];
  }

  static writeWorkSheet(ws: Excel.WorkSheet, wsName: string, filename: string) {
    const wb = Excel.utils.book_new();
    /* Add worksheet to workbook */
    Excel.utils.book_append_sheet(wb, ws, wsName);
    Excel.writeFile(wb, filename);
  }

  /**
   * @description Parse the values of an excel sheet based on the specified headers and date fields
   * @param builder [[ISerializableBuilder]]
   * @param headers [[{ [index: string]: string }]]
   * @param records [[object[]]]
   * @param dateFields [[string]]
   */
  public static parseExcelRecords<T>(
    builder: ISerializableBuilder<T>,
    headers: { [index: string]: string },
    records: object[],
    dateFields: string[] = []
  ) {
    if (records && isArray(records)) {
      return records.map((value: object) => {
        // Checks if the headers of the books meet the requirement
        // Headers Mappings
        const headersPropertyMapping = headers;
        let isValidBook = true;
        const mappingValidObject: any = {};
        for (const [k, v] of Object.entries(headersPropertyMapping)) {
          if (Object.keys(value).indexOf(v) === -1) {
            isValidBook = false;
            break;
          }
          if ((dateFields.length > 0) && (dateFields.indexOf(k) !== -1)) {
            mappingValidObject[k] = MomentUtils.parseDate(value[v]);
            continue;
          }
          mappingValidObject[k] = value[v];
        }
        if (isValidBook) {
          return builder
            .fromSerialized(mappingValidObject);
        }
      }).filter((i) => isDefined(i));
    }
    return [];
  }
}
