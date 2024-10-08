import {
  Workbook,
  CellStyle,
  BorderStyle,
  createWorkbook,
} from "@/helpers/excelJs";
import { NullProof } from "@/helpers/appFunction";
import { ConvertCurrency } from "@/helpers/appFunction";
import { cn } from "@/libs/cn";
import { text } from "node:stream/consumers";

const WorksheetRinci = (wb: Workbook, data: any) => {
  // More Info: https://www.npmjs.com/package/exceljs
  // Init ExcelJS
  const { worksheet, setupWidth, column, cell } = wb.createWorksheet({
    title: "Products", options: {views:[ {state: 'frozen', xSplit: 0, ySplit:7, activeCell: 'A1', showGridLines:false} ]}
  });

  // Init Template Theme
  const themeColor = {
    ungu: "60497A", // Format Color: HEX without #
    kuning: "ffff00",
  };
  type themeStyleProps = {
    style: CellStyle;
    border: BorderStyle;
  };
  const themeStyle: themeStyleProps = {
    style: {
      backgroundColor: themeColor.ungu,
      color: themeColor.kuning,
      fontConfig: {
        wrap: true,
        alignment: {
          h: "center",
        },
      },
    },
    border: {
      color: themeColor.kuning,
    },
  };

  // Init Column Width
  const columnWidths: any = {
    A: 7,
    B: 30,
    C: 45,
    D: 10,
    E: 10,
    F: 15,
  };
  setupWidth(columnWidths);
  // const imageId = wb.workbook.addImage({
  //   filename: data.perusahaan.logo, // Replace with the path to your image file
  //   extension: 'png',
  // });

  // // Add the image to a cell
  // worksheet.addImage(imageId, {
  //   ext: {height: 50, width: 50},
  //   tl: {col: 2, row: 3},
  // })

  type styleColumnProps = {
    size?: number;
    isMerge?: boolean;
    textCenter?:
      | true
      | {
          v?: "top" | "middle" | "bottom" | "justify";
          h?: "left" | "center" | "right" | "justify";
        };
    isBold?: boolean;
    backgroundColor?: string;
    isBorder?: boolean;
  };

  const styleColumn = ({
    size = 10,
    isMerge = false,
    textCenter = true,
    isBold = false,
    backgroundColor = "ffffff",
    isBorder = true,
  }: styleColumnProps) => {
    const initialStyle: {
      style: CellStyle;
      options?: { isMerged: boolean };
      border?: BorderStyle;
    } = {
      style: {
        backgroundColor: backgroundColor,
        fontConfig: {
          size: size,
          name: "Arial",
          wrap: true,
          alignment: {
            h: `${
              textCenter && textCenter !== true && textCenter.h
                ? textCenter.h
                : "left"
            }`,
            v: `${
              textCenter && textCenter !== true && textCenter.v
                ? textCenter.v
                : "middle"
            }`,
          },
          style: !isBold ? "normal" : "bold",
        },
      },
    };
    if (textCenter === true)
      initialStyle.style.fontConfig = {
        alignment: { h: "center", v: "middle" },
        size: size,
        name: "Arial",
        style: !isBold ? "normal" : "bold",
      };
    if (isMerge) initialStyle.options = { isMerged: true };
    if (isBorder)
      initialStyle.border = {
        color: "000000",
        style: "thin",
        borderTop: true,
        borderBottom: true,
        borderLeft: true,
        borderRight: true,
      };

    return initialStyle;
  };

  worksheet.mergeCells('A1:C1');
    cell({id: 'A1', style:{fontConfig:{size:16}}}).value = 'List Products';
    worksheet.mergeCells('A2:D2');
    cell({id: 'A2', style:{fontConfig:{size:16}}}).value = 'DOMSAT PRODUCT';
    worksheet.mergeCells('A3:C3');
    cell({id: 'A3', style:{fontConfig:{size:16}}}).value = 'TAHUN 2024';
    
    cell({id: 'A6:A7', ...styleColumn({isMerge:true, size:11, backgroundColor:'ffff00', isBold:true})}).value = 'No';
    cell({id: 'B6:B7',...styleColumn({isMerge:true, size:11, backgroundColor:'ffff00', isBold:true})}).value = 'Nama';
    cell({id: 'C6:C7',...styleColumn({isMerge:true, size:11, backgroundColor:'ffff00', isBold:true})}).value = 'Description';
    cell({id: 'D6:D7',...styleColumn({isMerge:true, size:11, backgroundColor:'ffff00', isBold:true})}).value = 'Quantity';
    cell({id: 'E6:E7',...styleColumn({isMerge:true, size:11, backgroundColor:'ffff00', isBold:true})}).value = 'Discount';
    cell({id: 'F6:F7',...styleColumn({isMerge:true, size:11, backgroundColor:'ffff00', isBold:true})}).value = 'Price';
  
    let rowIndex = 8

    data.map((item: any, index: number) => {
      cell({id: `A${rowIndex}`, ...styleColumn({isBorder:true})}).value = index + 1 + '.'
      cell({id: `B${rowIndex}`, ...styleColumn({isBorder:true, textCenter: {h:'left', v:'middle'}})}).value = item.name
      cell({id: `C${rowIndex}`, ...styleColumn({isBorder:true, textCenter: {h:'left', v:'middle'}})}).value = item.description
      cell({id: `D${rowIndex}`, ...styleColumn({textCenter: {h:'right', v:'middle'}})}).value = item.quantity 
      cell({id: `E${rowIndex}`, ...styleColumn({textCenter: {h:'right', v:'middle'}})}).value = item.discount + '%'
      cell({id: `F${rowIndex}`, ...styleColumn({textCenter: {h:'right', v:'middle'}})}).value = ConvertCurrency(item.price)
      rowIndex ++
      })
    }

const excelLayout = (data: any) => {
  const downloadExcel = async () => {
    const wb = createWorkbook();
    WorksheetRinci(wb, data);
    wb.download('products domsat');
  };
  return downloadExcel();
};

export { excelLayout };
