import { Cog6ToothIcon, PowerIcon, UserCircleIcon } from "@heroicons/react/24/solid";

type ProfileMenuItemProps = {
  label: string;
  icon: React.ReactElement;
  href?: string;
}

export const getProfileMenuItems = (pathname: string): ProfileMenuItemProps[] => {
  const isAdmin = pathname.startsWith("/admin");

  return [
    {
      label: "My Account",
      icon: <UserCircleIcon className="h-4 w-4" />,
      href: isAdmin ? "/admin/profile" : "/account/orders",
    },
    {
      label: "Edit Account",
      icon: <Cog6ToothIcon className="h-4 w-4" />,
      href: isAdmin ? "/admin/settings" : "/account/settings",
    },
    {
      label: "Sign Out",
      icon: <PowerIcon color="red" className="h-4 w-4" />,
    },
  ];
};
