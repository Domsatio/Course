import { AdminProfileMenuItems } from "@/constants/admin/ProfileMenuItems";
import { ClientProfileMenuItems } from "@/constants/client/ProfileMenuItems";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useRouter();
  const { data: session } = useSession();

  const closeMenu = () => setIsMenuOpen(false);

  if (session?.user.role === "ADMIN" && !pathname.startsWith("/admin")) {
    return (
        <Link href="/admin/dashboard">
          <Button size="sm" variant="outlined" className="rounded-full">
              Admin Panel
          </Button>
        </Link>
    )
  }

  const ProfileMenuItems = pathname.startsWith("/admin") ? AdminProfileMenuItems : ClientProfileMenuItems;

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button variant="outlined" className={`flex items-center gap-3 py-2 px-4 rounded-full capitalize ${pathname.startsWith('/admin') && 'lg:ml-auto'}`}>
          {session?.user.name}
          <ChevronDownIcon className="h-3 w-3" />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {ProfileMenuItems.map(({ label, icon, href }) =>
          <MenuItem
            key={label}
            onClick={closeMenu}
            className={`flex items-center gap-2 rounded ${label === "Sign Out" && "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"}`}
          >
            {icon}
            {label !== "Sign Out" && href ? (
              <Link href={href}>
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color="inherit"
                >
                  {label}
                </Typography>
              </Link>
            ) : (
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color='red'
                onClick={() => signOut()}
              >
                {label}
              </Typography>
            )}
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}