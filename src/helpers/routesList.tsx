import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    InboxArrowDownIcon,
    CurrencyDollarIcon
  } from "@heroicons/react/24/solid";
  import {
    ChevronRightIcon,
    ChevronDownIcon,
    CubeTransparentIcon,
    MagnifyingGlassIcon,
    Bars3Icon,
    XMarkIcon,
    LifebuoyIcon,
  } from "@heroicons/react/24/outline";
  import { MenuItemProps } from "./typeProps";

const routeList: MenuItemProps[] = [
    {
      isheader: true,
      label: "Dashboard",
      href: "/dashboard",
      icon: PresentationChartBarIcon,
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
      isheader: true,
      label: "Ecommerce",
      href: "/ecommerce",
      icon: ShoppingBagIcon,
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
      icon: UserCircleIcon,
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
    }
  ];

export { routeList };

