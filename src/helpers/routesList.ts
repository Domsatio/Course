import {
  ChartPieIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import { MenuItemProps } from "./typeProps";

export const routeList: MenuItemProps[] = [
  {
    isheader: true,
    label: "Dashboard",
    href: "/dashboard",
    icon: ChartPieIcon,
    children: [
      {
        isPage: true,
        href: "/analytics",
        label: "Analytics",
      },
      {
        isPage: true,
        href: "/reporting",
        label: "Reporting",
      },
      {
        isPage: true,
        href: "/projects",
        label: "Projects",
      },
    ],
  },
  {
    isPage: true,
    href: "/course",
    label: "Courses",
    icon: VideoCameraIcon,
  },
  {
    isheader: true,
    label: "Ecommerce",
    href: "/ecommerce",
    icon: ShoppingCartIcon,
    children: [
      {
        isPage: true,
        href: "/orders",
        label: "Orders",
      },
      {
        isPage: true,
        href: "/products",
        label: "Products",
      },
      {
        isheader: true,
        label: "Finance",
        href: "/finance",
        icon: CurrencyDollarIcon,
        children: [
          {
            isPage: true,
            href: "/sales",
            label: "Sales",
          },
          {
            isPage: true,
            href: "/expenses",
            label: "Expenses",
          },
        ],
      },
    ],
  },
  {
    isheader: true,
    label: "Blog",
    href: "/blog",
    icon: DocumentTextIcon,
    children: [
      {
        isPage: true,
        href: "/post",
        label: "Post",
      },
      {
        isPage: true,
        href: "/category",
        label: "Category",
      },
    ],
  },
];
