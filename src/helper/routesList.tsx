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

  interface menuItemProps {
    isheader?: boolean;
    isPage?: boolean;
    href?: string;
    label: string;
    icon?: any;
    children?: menuItemProps[];
  }
  
  
const routeList: menuItemProps[] = [
    {
      isheader: true,
      label: "Dashboard",
      icon: PresentationChartBarIcon,
      children: [
        {
          isPage: true,
          href: "/admin/dashboard",
          label: "Analytics",
        },
        {
          isPage: true,
          href: "/admin/dashboard",
          label: "Reporting",
        },
        {
          isPage: true,
          href: "/admin/dashboard",
          label: "Projects",
        },
      ],
    },
    {
      isheader: true,
      label: "Ecommerce",
      icon: ShoppingBagIcon,
      children: [
        {
          isPage: true,
          href: "/admin/ecommerce/orders",
          label: "Orders",
        },
        {
          isPage: true,
          href: "/admin/ecommerce/products",
          label: "Products",
        },
        {
          isheader: true,
          label: "Finance",
          icon: CurrencyDollarIcon,
          children: [
            {
              isPage: true,
              href: "/admin/ecommerce/finance/sales",
              label: "Sales",
            },
            {
              isPage: true,
              href: "/admin/ecommerce/finance/expenses",
              label: "Expenses",
            },
          ],
        },
        {
          isheader: true,
          label: "users",
          icon: UserCircleIcon,
          children: [
            {
              isPage: true,
              href: "/admin/ecommerce/users",
              label: "Users",
            },
            {
              isPage: true,
              href: "/admin/ecommerce/users/roles",
              label: "Roles",
            },
          ],
        },
      ],
    },
  ];

export { routeList };
export type { menuItemProps };
