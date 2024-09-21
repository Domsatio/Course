import {
  ChartPieIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  VideoCameraIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { MenuItemProps } from "@/helpers/typeProps";

export const adminRoutes: MenuItemProps[] = [
  {
    isPage: true,
    label: "Dashboard",
    href: "/dashboard",
    icon: ChartPieIcon,
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
  {
    isPage: true,
    href: "/user",
    label: "Users",
    icon: VideoCameraIcon,
  },
];
