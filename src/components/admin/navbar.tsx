"use client";
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
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
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
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
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

  const handleSignOut = async () => {
    const isSuccesSignOut = await signOut({
      redirect: true,
      callbackUrl: "/admin/sign-in",
    });
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          //   color="blue-gray"
          className="flex items-center justify-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="md"
            alt={session?.user?.name}
            className="border border-gray-900 "
            src={session?.user?.image ? session?.user?.image : profilePicture}
          />
          {/* <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            /> */}
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

export default function AdminNavbar() {
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

  return (
    <>
      <Navbar className="flex items-center justify-between mx-auto max-w-full px-4 py-2 lg:px-8 lg:py-4">
        <IconButton variant="text" size="lg" onClick={openDrawer}>
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2" />
          ) : (
            <Bars3Icon className="h-8 w-8 stroke-2" />
          )}
        </IconButton>
        <ProfileMenu />
      </Navbar>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
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
          <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>
          <List>
            <RouteItems routeList={routeList} padding={0} parentRoute="/admin" />
            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
          <Alert
            open={openAlert}
            className="mt-auto"
            onClose={() => setOpenAlert(false)}
          >
            <CubeTransparentIcon className="mb-4 h-12 w-12" />
            <Typography variant="h6" className="mb-1">
              Upgrade to PRO
            </Typography>
            <Typography variant="small" className="font-normal opacity-80">
              Upgrade to Material Tailwind PRO and get even more components,
              plugins, advanced features and premium.
            </Typography>
            <div className="mt-4 flex gap-3">
              <Typography
                as="a"
                href="#"
                variant="small"
                className="font-medium opacity-80"
                onClick={() => setOpenAlert(false)}
              >
                Dismiss
              </Typography>
              <Typography
                as="a"
                href="#"
                variant="small"
                className="font-medium"
              >
                Upgrade Now
              </Typography>
            </div>
          </Alert>
        </Card>
      </Drawer>
    </>
  );
}
