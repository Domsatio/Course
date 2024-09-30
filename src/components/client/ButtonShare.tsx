import { ShareIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import React from "react";
import { cn } from "@/libs/cn";

type ButtonShareProps = {
  className?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ButtonShare({
  className = '',
  setIsOpen,
}: ButtonShareProps) {
  return (
    <IconButton
      variant="outlined"
      className={cn(
        "rounded-full",
        className
      )}
      onClick={() => setIsOpen(true)}
    >
      <ShareIcon className="h-4 w-4" />
    </IconButton>
  );
}
