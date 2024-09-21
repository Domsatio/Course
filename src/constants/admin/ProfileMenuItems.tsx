import { ProfileMenuItemProps } from "@/helpers/typeProps";
import { Cog6ToothIcon, PowerIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export const AdminProfileMenuItems: ProfileMenuItemProps[] = [
  {
    label: "My Account",
    icon: <UserCircleIcon className="h-4 w-4" />,
    href: "/admin/profile",
  },
  {
    label: "Edit Account",
    icon: <Cog6ToothIcon className="h-4 w-4" />,
    href: "/admin/settings",
  },
  {
    label: "Sign Out",
    icon: <PowerIcon color="red" className="h-4 w-4" />,
  },
];
