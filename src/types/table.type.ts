import { InputListProps } from "./form.type";

export type TableDataProps = {
  title: string;
  description?: string;
  tableHeader: string[];
  onSuccess?: (e: any) => void;
  isActionAdd?: boolean;
  filter?: InputListProps[];
  service: any;
  realtimeTable?: string;
  exportExcel?: (data: any) => void;
  // children?: React.ReactNode;
};
