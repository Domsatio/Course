import { InputListProps } from "./form.type";

export type tableHeaderProps = {
  label: string;
  style?: string;
  orderBy?: string;
  visible?: boolean;
};

export type TableDataProps = {
  title: string;
  description?: string;
  tableHeader: tableHeaderProps[];
  onSuccess?: (e: any) => void;
  isActionAdd?: boolean;
  filter?: InputListProps[];
  service: any;
  realtimeTable?: string;
  exportExcel?: (data: any) => void;
};
