import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ProfileMenu } from "../ProfileMenu";
import { NavRoutes } from "@/constants/client/NavRoutes";
import { useRouter } from "next/router";

const NavList = ({ onClick, pathname }: { onClick?: () => void, pathname: string }) => (
  <ul className="mt-2 mb-4 flex flex-col gap-2 border-black lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
    {NavRoutes.map(({ label, href }) => (
      <Link
        href={href}
        key={label}
        onClick={onClick}
        className={`text-black text-sm py-2 px-4 rounded-full transition-colors duration-100 hover:bg-gray-200 ${pathname === href && "bg-gray-300"}`}
      >
        {label}
      </Link>
    ))}
  </ul>
);

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const { data: session } = useSession();
  const { pathname } = useRouter();

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
      className={`fixed left-0 right-0 max-w-full lg:h-20 p-2 rounded-none transition-all duration-300 z-50 ${isScrollingUp || currentPosition < 68 ? "top-0" : "top-[-100px]"
        }`}
    >
      <div className="relative container mx-auto 2xl:max-w-[75rem] p-4 lg:px-10 h-full flex items-center justify-between lg:justify-between text-blue-gray-900">
        <Typography className="cursor-pointer py-1.5 font-medium">
          DomClub
        </Typography>
        <div className="hidden min-w-min lg:border-black lg:block ">
          <NavList pathname={pathname} />
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
        <NavList onClick={toggleIsNavOpen} pathname={pathname} />
      </Collapse>
    </Navbar>
  );
}
