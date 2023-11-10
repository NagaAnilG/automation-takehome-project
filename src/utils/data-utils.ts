import DataConstants from "@constants/data-constants";
import { Product } from "@interfaces/product";
import { Workbook, Column } from 'exceljs';
import excelToJson from 'convert-excel-to-json'

export default class DataUtil {
  public static getDataArray(sheet: string) {
    const result = excelToJson({
        sourceFile: DataConstants.SEARCH_DATA_PATH,
        columnToKey: {
            '*': '{{columnHeader}}',
        },
        sheetStubs: true,
        header: { rows: 1 },
        sheets: [sheet],
    });
    return result[sheet];
}

public static getData(sheet: string, scenarioID: string) {
  const dataArray = this.getDataArray(sheet);
  let data;
  for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].ScenarioID === scenarioID) {
          data = dataArray[i];
      }
  }
  return data;
}

  public static writeToCSV(
    scenarioID: string,
    products: Product[],
    header: string,
    searchTerm: string
  ): void {

    let workbook = new Workbook();
    var worksheet = workbook.addWorksheet(DataConstants.RESULT_SHEET);
    worksheet.columns = header.split(',').map((element) => <Column>{
      "header": element,
      "key": element,
      "width": 10
    });

    products.forEach((product) => {
      let data = [scenarioID, searchTerm, product.name, product.price, product.link];
      worksheet.addRow(data);
    })
    if (products.length == 0) {
      worksheet.addRow([`"No products are available for the search term: '${searchTerm}"`]);
    }
    // Writing to xlsx
    workbook.csv.writeFile(DataConstants.PATH);
    console.log(' written successfully to CSV file.');
  }
}