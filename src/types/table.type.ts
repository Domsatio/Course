import { InputListProps } from "./form.type";

export type TableDataProps = {
  title: string;
  description?: string;
  tableHeader: any;
  onSuccess?: (e: any) => void;
  isActionAdd?: boolean;
  filter?: InputListProps[];
  service: any;
  realtimeTable?: string;
  // children?: React.ReactNode;
};
