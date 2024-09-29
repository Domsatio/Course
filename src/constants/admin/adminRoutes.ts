import {
  ChartPieIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  VideoCameraIcon,
  UsersIcon,
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
    href: "/courses",
    label: "Courses",
    icon: VideoCameraIcon,
  },
  {
    isheader: true,
    label: "E-Commerce",
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
        href: "/finance",
        label: "Finance",
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
        href: "/posts",
        label: "Posts",
      },
      {
        isPage: true,
        href: "/categories",
        label: "Categories",
      },
    ],
  },
  {
    isPage: true,
    href: "/users",
    label: "Users",
    icon: UsersIcon,
  },
];
