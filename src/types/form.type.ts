export type FormInputTypeProps =
  | "input"
  | "number"
  | "url"
  | "select"
  | "checkbox"
  | "multicheckbox"
  | "datalist"
  | "textarea"
  | "texteditor"
  | "label"
  | "component"
  | "csv"
  | "date"
  | "currency"
  | "image"
  | "multipleImage"
  | "multipleInput"
  | "checkbox"
  | "file"

export type InputListOptionProps = {
  type: "select" | "checkbox" | "multicheckbox" | "datalist" | "csv";
  params?: string;
  query?: string;
  id: string;
  api?: string;
  data?: any[];
  value?: string;
  watch?: string;
};

export type InputListProps = {
  className?: string;
  name: string;
  label: string;
  protect?: string[];
  type: FormInputTypeProps;
  hide?: boolean;
  removeOnSubmit?: boolean;
  disabled?: boolean;
  lockData?: boolean;
  validator: any;
  value?: string | number | string[] | boolean;
  valueID?: string;
  listData?: {
    title: string;
    value: number | string | boolean;
  }[];
  onChange?: (e: any) => void;
  error?: string;
  option?: InputListOptionProps;
  component?: InputListProps[];
  useRiset?: boolean;
  watch?: string;
};
