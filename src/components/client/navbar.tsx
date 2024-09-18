import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  Bars2Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const profileMenuItems: {
  label: string;
  icon: React.ReactElement;
  href: string;
}[] = [
    {
      label: "My Account",
      icon: <UserCircleIcon className="h-4 w-4" />,
      href: "/account/orders",
    },
    {
      label: "Edit Account",
      icon: <Cog6ToothIcon className="h-4 w-4" />,
      href: "/account/settings",
    },
    {
      label: "Sign Out",
      icon: <PowerIcon color="red" className="h-4 w-4" />,
      href: "#"
    },
  ];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { push } = useRouter();
  const { data: session } = useSession();

  const closeMenu = () => setIsMenuOpen(false);

  if (session?.user.role === "ADMIN") {
    return (
      <Button size="sm" variant="outlined" className="rounded-full">
        <Link href="/admin/dashboard">
          Admin Panel
        </Link>
      </Button>
    )
  }

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button variant="outlined" className="flex items-center gap-3 py-2 px-4 rounded-full capitalize">
          {session?.user.name}
          <ChevronDownIcon className="h-3 w-3" />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, href }) =>
          <MenuItem
            key={label}
            onClick={closeMenu}
            className={`flex items-center gap-2 rounded ${label === "Sign Out"
              ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
              : ""
              }`}
          >
            {icon}
            <Typography
              as="span"
              variant="small"
              className="font-normal"
              color={label === "Sign Out" ? "red" : "inherit"}
              onClick={label === "Sign Out" ? () => signOut() : () => push(href)}
            >
              {label}
            </Typography>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}

const navListItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Club",
    href: "/club",
  },
  {
    label: "Course",
    href: "/course",
  },
  {
    label: "Store",
    href: "/store",
  },
  {
    label: "About",
    href: "/about",
  },
];

function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 border-black lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, href }) => (
        <Link href={href} key={label} className="text-sm py-2 px-4 rounded-full transition-colors duration-100 hover:bg-gray-200">
          {label}
        </Link>
      ))}
    </ul>
  );
}

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const { data: session } = useSession();

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  useEffect(() => {
    setIsScrollingUp(false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const position = window.scrollY;

        if (position < 20) {
          setIsScrollingUp(false);
        } else if (position < currentPosition) {
          setIsScrollingUp(true);
        } else {
          setIsScrollingUp(false);
        }
        setCurrentPosition(position);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [currentPosition]);

  return (
    <Navbar
      className={`fixed mx-auto left-0 right-0 max-w-full lg:h-20 p-2 rounded-none transition-all duration-300 z-50 ${isScrollingUp || currentPosition < 68 ? "top-0" : "top-[-100px]"
        }`}
    >
      <div className="px-24 relative container mx-auto h-full flex items-center justify-between lg:justify-between text-blue-gray-900">
        <Typography className="cursor-pointer py-1.5 font-medium">
          DomClub
        </Typography>
        <div className="hidden min-w-min lg:border-black lg:block ">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        {session ? (
          <ProfileMenu />
        ) : (
          <Link href="/sign-in">
            <Button
              size="sm"
              variant="text"
              className="rounded-full outline outline-1"
            >
              Sign In
            </Button>
          </Link>
        )}
      </div>
      <Collapse open={isNavOpen} className="overflow-x-hidden">
        <NavList />
      </Collapse>
    </Navbar>
  );
}
