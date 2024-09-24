import { ShareIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import React from "react";
import { cn } from "@/libs/cn";

type ButtonShareProps = {
  className?: string;
  name?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ButtonShare({
  className='',
  name = '',
  setIsOpen,
}: ButtonShareProps) {
  return (
    <Button
      className={cn(
        "rounded-full min-w-max flex items-center gap-2 text-black bg-transparent border-2 border-black",
        className
      )}
      onClick={() => setIsOpen(true)}
    >
      {name} <ShareIcon className="h-4 w-4" />
    </Button>
  );
}
