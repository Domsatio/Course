import React from "react";

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

interface TableDataProps {
    title: string;
    description?: string;
    urlData?: string;
    tableProperties?: [];
    tableHeader: any;
    dummyData?: any;
    onSuccess?: (e: any) => void;
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

export type {
  ProductProps,
  OrderProps,
  MenuItemProps,
  ProfileMenuItemProps,
  RouteItemsProps,
  PaginationProps,
  TableDataProps
};
