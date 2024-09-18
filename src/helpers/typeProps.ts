import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      role: string; // add any custom fields here
    };
  }
}

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//   }

//   interface User {
//     accessToken?: string;
//   }
// }

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

type FormInputTypeProps =
  | "input"
  | "password"
  | "number"
  | "url"
  | "select"
  | "checkbox"
  | "multicheckbox"
  | "datalist"
  | "textarea"
  | "label"
  | "component"
  | "csv"
  | "date"
  | "currency"
  | "image"
  | "file"
  | "multipleImage"
  | "multipleInput"
  | "checkbox";

interface InputListOptionProps {
  type: "select" | "checkbox" | "multicheckbox" | "datalist" | "csv";
  params?: string;
  query?: string;
  id: string;
  api?: string;
  data?: any[];
  value?: string;
  watch?: string;
}

interface InputListProps {
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
  valueID?: string
  useRiset?: boolean;
  listData?: {
    title: string;
    value: number | string | boolean;
  }[];
  onChange?: (e: any) => void;
  error?: string;
  option?: InputListOptionProps;
  component?: InputListProps[];
  watch?: string;
}

interface MenuItemProps {
  isheader?: boolean;
  isPage?: boolean;
  href: string;
  label: string;
  icon?: any;
  children?: MenuItemProps[];
}

interface ProfileMenuItemProps {
  label: string;
  icon: any;
  href?: string;
}

interface RouteItemsProps {
  routeList?: MenuItemProps[];
  parentRoute: string;
  padding?: number;
}

interface FilterProps {
  name: string;
  type: "text" | "number" | "date" | "select";
  placeholder?: string;
  options?: string[];
  value: string | number;
  onChange: (e: any) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  error?: string;
}

interface TableDataProps {
  title: string;
  description?: string;
  tableHeader: any;
  onSuccess?: (e: any) => void;
  isActionAdd?: boolean;
  filter?: InputListProps[] | undefined;
  service: any;
  realtimeTable?: string;
  // children?: React.ReactNode;
}

interface OrderProps {
  id: string;
  quantity: number;
  total_price: number;
  status?: string;
  account?: string;
  createdAt: string;
}

export type {
  InputListProps,
  OrderProps,
  MenuItemProps,
  ProfileMenuItemProps,
  RouteItemsProps,
  TableDataProps,
};
