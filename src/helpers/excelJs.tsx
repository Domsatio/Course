import * as ExcelJS from 'exceljs'
import {saveAs} from 'file-saver'

interface CellProps {
  id: string
  endId?: string
  value?: string
  options?: {
    isMerged?: boolean
  }
  style?: CellStyle
  border?: BorderStyle
}

interface ColumnProps {
  id: string
}

interface OptionsWorkSheet {
  properties?: {
    tabColor?:{
      argb: string
    }
  },
  views?:[
    {
      state?: 'frozen' | 'split' | 'hidden' | 'collapsed' | 'selected'
      xSplit?: number
      ySplit?: number
      topLeftCell?: string
      activeCell?: string
      showGridLines?: boolean
    }
  ]
}

interface WorksheetProps {
  title: string
  options?: OptionsWorkSheet
}

interface Worksheet {
  cell(props: CellProps): ExcelJS.Cell
  column(props: CellProps): ExcelJS.Column
  worksheet: ExcelJS.Worksheet
  setupWidth(input: any): void
}

export interface Workbook {
  workbook: ExcelJS.Workbook
  createWorksheet({title}: WorksheetProps): Worksheet
  download(filename?: any): void
}

export interface CellStyle {
  backgroundColor?: string
  color?: string
  fontConfig?: {
    name?: string
    size?: number
    style?: 'normal' | 'italic' | 'bold'
    underline?: boolean
    strike?: boolean
    alignment?: {
      v?: 'top' | 'middle' | 'bottom' | 'justify'
      h?: 'left' | 'center' | 'right' | 'justify'
    }
    rotation?: number
    wrap?: boolean
  }
}

export interface BorderStyle {
  color?: string
  style?: ExcelJS.BorderStyle
  borderTop?: boolean
  borderBottom?: boolean
  borderLeft?: boolean
  borderRight?: boolean
}

const createWorkbook = (): Workbook => {
  const workbook = new ExcelJS.Workbook()

  const createWorksheet = ({title, options}: WorksheetProps): Worksheet => {
    const worksheet = workbook.addWorksheet(title, options as Partial<ExcelJS.AddWorksheetOptions>)

    const cell = ({id, endId, style, border, value, options}: CellProps): ExcelJS.Cell => {
      const data = worksheet.getCell(id, endId || undefined)
      if (value) {
        data.value = value
      }
      if (style) {
        data.style = createCellStyle(style)
      }
      if (border) {
        data.border = createBorderStyle(border)
      }
      options?.isMerged && worksheet.mergeCells(id)
      return data
    }

    const column = ({id}: ColumnProps): ExcelJS.Column => {
      const data = worksheet.getColumn(id)
      return data
    }

    const setupWidth = (input: any) => {
      for (const letter in input) {
        if (input.hasOwnProperty(letter)) {
          worksheet.getColumn(letter).width = input[letter]
        }
      }
    }

    return {
      cell,
      column,
      worksheet,
      setupWidth,
    }
  }

  const download = async (filename: string = 'document') => {
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Preview the file
    // const fileURL = URL.createObjectURL(blob);
    // console.log(fileURL);
    // window.open(fileURL, '_blank');

    saveAs(blob, `${filename}.xlsx`);
  }

  return {
    workbook,
    createWorksheet,
    download,
  }
}

const createCellStyle = ({backgroundColor, color, fontConfig}: CellStyle) => {
  type dataProps = Partial<ExcelJS.Style>
  const data: dataProps = {
    font: {
      color: {
        argb: color || '000000',
      },
      name: fontConfig?.name || 'Times New Roman',
      size: fontConfig?.size || 12,
      bold: fontConfig?.style === 'bold',
      italic: fontConfig?.style === 'italic',
      underline: fontConfig?.underline,
      strike: fontConfig?.strike,
    },
    fill: {
      type: 'pattern',
      pattern: backgroundColor ? 'solid' : 'none',
      fgColor: {argb: backgroundColor || undefined},
    },
    alignment: {
      horizontal: fontConfig?.alignment?.h || 'left',
      vertical: fontConfig?.alignment?.v || 'middle',
      textRotation: fontConfig?.rotation || 0,
      wrapText: fontConfig?.wrap,
    },
  }
  return data
}

const createBorderStyle = ({
  style,
  color,
  borderBottom = true,
  borderLeft = true,
  borderRight = true,
  borderTop = true,
}: BorderStyle) => {
  type dataProps = Partial<ExcelJS.Borders>
  const setupProps = {
    style: style || 'thin',
    color: {argb: color || '000000'},
  }
  const data: dataProps = {}
  if (borderBottom) {
    data.bottom = setupProps
  }
  if (borderLeft) {
    data.left = setupProps
  }
  if (borderRight) {
    data.right = setupProps
  }
  if (borderTop) {
    data.top = setupProps
  }
  return data
}

export {createWorkbook, createCellStyle, createBorderStyle}
