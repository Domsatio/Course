import React from "react";
import { StringDecoder } from "string_decoder";

type FormInputTypeProps =
  | 'input'
  | 'select'
  | 'multicheckbox'
  | 'datalist'
  | 'textarea'
  | 'label'
  | 'component'
  | 'csv'
  | 'date'

  interface InputListOptionProps {
    type: 'select' | 'multicheckbox' | 'datalist' | 'csv'
    id: string
    api?: string
    data?: any[]
    value?: string
    watch?: string
  }


  interface InputListProps {
    className?: string
    name: string
    label: string
    protect?: string[]
    type: FormInputTypeProps
    hide?: boolean
    removeOnSubmit?: boolean
    disabled?: boolean
    lockData?: boolean
    validator: any
    value?: string | number | any[]
    listData?: {
      title: string
      value: number | string
    }[]
    onChange?: (e: any) => void
    error?: string
    option?: InputListOptionProps
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
    urlData?: string;
    tableHeader: any;
    dummyData?: any;
    onSuccess?: (e: any) => void;
    isActionAdd?: boolean;
    filter?: InputListProps[] | undefined;
    children?: React.ReactNode;
}

interface PaginationProps {
  disabled?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  handleLimit: (limit: number) => void;
  maxButtons: number;
  limit: number;
}

interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  status?: string;
  category?: string;
  account: string;
  rating: number;
  stock?: number;
  date?: string;
  createdAt: string;
}

interface OrderProps {
  id: number;
  quantity: number;
  total_price: number;
  status?: string;
  account?: string;
  createdAt: string;
}
interface CategoryProps  {
  id: string;
  name: string;
};

interface PostProps {
  id: string;
  userId: string;
  title: string;
  body: string;
  categories?: CategoryProps[];
};


export type {
  InputListProps,
  ProductProps,
  OrderProps,
  MenuItemProps,
  ProfileMenuItemProps,
  RouteItemsProps,
  PaginationProps,
  TableDataProps,
  CategoryProps,
  PostProps
};
