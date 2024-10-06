import { getProfileMenuItems } from "@/constants/ProfileMenuItems";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname, push } = useRouter();
  const { data: session } = useSession();

  const closeMenu = () => setIsMenuOpen(false);

  if (session?.user.role === "ADMIN" && !pathname.startsWith("/admin")) {
    return (
      // <Link href="/admin/dashboard">
        <Button size="sm" variant="outlined" className="rounded-full border-gray-600" onClick={() => push('/admin/dashboard')}>
          Admin Panel
        </Button>
      // </Link>
    )
  }

  const ProfileMenuItems = getProfileMenuItems(pathname);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button variant="outlined" className={`flex border-gray-600 items-center gap-3 py-2 px-4 rounded-full capitalize ${pathname.startsWith('/admin') && 'lg:ml-auto'}`}>
          {session?.user.name}
          <ChevronDownIcon className="h-3 w-3" />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {ProfileMenuItems.map(({ label, icon, href }) =>
          <MenuItem
            key={label}
            onClick={closeMenu}
            className={`flex items-center p-0 rounded ${label === "Sign Out" && "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"}`}
          >
            {label !== "Sign Out" && href ? (
              <Link href={href} className="w-full">
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal flex items-center gap-2 p-2"
                  color="inherit"
                >
                  {icon}
                  {label}
                </Typography>
              </Link>
            ) : (
              <Typography
                as="span"
                variant="small"
                className="font-normal w-full flex items-center gap-2 p-2"
                color='red'
                onClick={() => signOut()}
              >
                {icon}
                {label}
              </Typography>
            )}
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}