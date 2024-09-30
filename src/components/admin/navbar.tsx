import React, { FC, SetStateAction, useState } from "react";
import { useRouter as topLoader } from 'nextjs-toploader/app';
import { adminRoutes } from "@/constants/admin/adminRoutes";
import { MenuItemProps, RouteItemsProps } from "@/helpers/typeProps";
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
  Drawer,
  Card,
  Button,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ProfileMenu } from "../ProfileMenu";
import Link from "next/link";
import { useRouter } from "next/router";

<ProfileMenu />

const AdminNavbar: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const routeLoader = topLoader();
  const { pathname } = useRouter();

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const onClickMenuItem = (href: string) => {
    closeDrawer();
    routeLoader.push(href);
  };

  const RouteItems: FC<RouteItemsProps> = ({
    routeList = [],
    parentRoute = "",
    padding = 0,
  }) => {
    const [open, setOpen] = useState("");
    const handleOpen = (value: SetStateAction<string>) => {
      setOpen(open === value ? "nothing" : value);
    };

    return (
      <div className={`ps-${padding}`}>
        {routeList?.map(
          ({
            isheader = false,
            href = "",
            label,
            icon,
            children,
          }: MenuItemProps) => {
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
                      className={`h-4 w-4 transition-transform ${open === label && "rotate-180"}`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={open === label}>
                    <AccordionHeader
                      onClick={() => handleOpen(label)}
                      className="border-b-0 p-3 h-11"
                    >
                      <ListItemPrefix>
                        {React.createElement(icon, {
                          className: "h-5 w-5",
                        })}
                      </ListItemPrefix>
                      <Typography className="mr-auto font-normal">
                        {label}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0">
                      <RouteItems
                        routeList={children}
                        padding={childrenPadding}
                        parentRoute={currentRoute}
                      />
                    </List>
                  </AccordionBody>
                </Accordion>
              );
            } else {
              return (
                <ListItem
                  key={label}
                  onClick={() => onClickMenuItem(currentRoute ?? "")}
                  className={`${pathname === currentRoute && "bg-gray-200"}`}
                >
                  {icon &&
                    React.createElement(icon, {
                      className: "h-5 w-5 mr-4",
                    })}
                  {label}
                </ListItem>
              );
            }
          }
        )}
      </div>
    );
  };

  const SideItem = ({ className = "" }: { className?: string }) => {
    return (
      <Card
        color="transparent"
        shadow={false}
        className={`h-[calc(100vh-2rem)] w-full rounded-none p-4 ${className}`}
      >
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Admin Panel
          </Typography>
        </div>
        <List className="relative">
          <RouteItems routeList={adminRoutes} padding={0} parentRoute="/admin" />
        </List>
      </Card>
    );
  };

  return (
    <div className="flex relative">
      <SideItem className="w-[300px] min-h-screen hidden lg:block bg-white fixed" />
      <div className="w-full min-h-screen lg:pl-[300px]">
        <Navbar className="rounded-none flex items-center justify-between lg:justify-end mx-auto max-w-full px-4 py-2 lg:px-8 lg:py-4">
          <IconButton
            variant="text"
            size="lg"
            onClick={openDrawer}
            className="lg:hidden"
          >
            {isDrawerOpen ? (
              <XMarkIcon className="h-8 w-8 stroke-2" />
            ) : (
              <Bars3Icon className="h-8 w-8 stroke-2" />
            )}
          </IconButton>
          <div className="flex items-center gap-5">
            <Link href="/">
              <Button variant="outlined" className='flex items-center gap-3 py-2 px-4 border-gray-600 rounded-full capitalize'>
                Client
              </Button>
            </Link>
            <ProfileMenu />
          </div>
        </Navbar>
        <Drawer open={isDrawerOpen} onClose={closeDrawer} className="lg:hidden">
          <SideItem />
        </Drawer>
        <div className="p-4 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

export default AdminNavbar;
