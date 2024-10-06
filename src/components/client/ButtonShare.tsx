import { ShareIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import React from "react";

type ButtonShareProps = {
  className?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ButtonShare({
  setIsOpen,
}: ButtonShareProps) {
  return (
    <IconButton
      variant="text"
      className="rounded-full"
      onClick={() => setIsOpen(true)}
    >
      <ShareIcon className="h-4 w-4" />
    </IconButton>
  );
}
