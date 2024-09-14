import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRouter as topLoader } from 'nextjs-toploader/app';
import { routeList } from "@/helpers/routesList";
import { MenuItemProps, ProfileMenuItemProps, RouteItemsProps } from "@/helpers/typeProps";
import {
  Navbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Drawer,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  Button,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const profileMenuItems: ProfileMenuItemProps[] = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    href: "/profile",
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    href: "/profile/edit",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const closeMenu = () => setIsMenuOpen(false);

  const profilePicture =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80";

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center justify-center gap-1 rounded-full p-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="md"
            alt={session?.user?.name}
            className="border border-gray-900 "
            src={session?.user?.image ? session?.user?.image : profilePicture}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, href }, key) => {
          const isLastItem = label === "Sign Out";
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
                onClick={
                  isLastItem
                    ? async () =>
                      await signOut({
                        redirect: true,
                        callbackUrl: "localhost:3000/admin/sign-in",
                      })
                    : () => router.push(href || "")
                }
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default function AdminNavbar({ children }: { children: React.ReactNode }) {
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const router = useRouter();
  const routeLoader = topLoader();

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const onClickMenuItem = (href: string) => {
    closeDrawer();
    routeLoader.push(href);
    // router.push(href);
  }

  const RouteItems: React.FC<RouteItemsProps> = ({
    routeList = [],
    parentRoute = "",
    padding = 0,
  }) => {
    const [open, setOpen] = React.useState("");
    const handleOpen = (value: React.SetStateAction<string>) => {
      setOpen(open === value ? 'nothing' : value);
    };
    return (
      <div className={`ps-${padding}`}>
        {routeList?.map(({ isheader = false, href = '', label, icon, children }: MenuItemProps) => {
          const childrenPadding = padding + 2;
          const currentRoute = parentRoute + href;
          if (isheader) {
            return (
              <Accordion
                key={label}
                open={open === label}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === label ? "rotate-180" : ""
                      }`}
                  />
                }
              >
                <ListItem className="p-0" selected={open === label}>
                  <AccordionHeader
                    onClick={() => handleOpen(label)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      {React.createElement(icon, {
                        className: "h-5 w-5",
                      })}
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal">
                      {label}
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">
                    <>
                      <RouteItems routeList={children} padding={childrenPadding} parentRoute={currentRoute} />
                    </>
                  </List>
                </AccordionBody>
              </Accordion>
            );
          } else {
            return (
              <ListItem key={label} onClick={() => onClickMenuItem(currentRoute ?? '')}>
                {icon && React.createElement(icon, {
                  className: "h-5 w-5 mr-4",
                })}
                {label}
              </ListItem>
            );
          }
        })}
      </div>
    );
  };

  const SideItem = ({
    className = "",
  }: {className?: string}) => {
    return (
      <Card
          color="transparent"
          shadow={false}
          className={`h-[calc(100vh-2rem)] w-full p-4 ${className}`}
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              Sidebar
            </Typography>
          </div>
          <List className="relative">
            <RouteItems routeList={routeList} padding={0} parentRoute="/admin" />
          </List>
        </Card>
    )
  }
  return (
    <div className="flex relative">
      <SideItem className="w-64 min-h-screen hidden lg:block bg-white fixed" />
      <div className="w-full min-h-screen lg:pl-64">
        <Navbar className="rounded-none flex items-center justify-between mx-auto max-w-full px-4 py-2 lg:px-8 lg:py-4">
          <IconButton variant="text" size="lg" onClick={openDrawer} className="lg:hidden">
            {isDrawerOpen ? (
              <XMarkIcon className="h-8 w-8 stroke-2" />
            ) : (
              <Bars3Icon className="h-8 w-8 stroke-2" />
            )}
          </IconButton>
          <ProfileMenu />
        </Navbar>
          <Drawer open={isDrawerOpen} onClose={closeDrawer} className="lg:hidden">
            <SideItem />
          </Drawer>
          <div className="p-4 overflow-auto">
            {children}
          </div>
      </div>
    </div>
  );
}
