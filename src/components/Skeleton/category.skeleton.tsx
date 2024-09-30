import { memo } from "react";
import { Typography } from "@material-tailwind/react";

function CategorySkeleton() {
  return (
    <Typography
      variant="small"
      color="blue-gray"
      className="font-normal leading-none opacity-70"
    >
      <Typography as="div" className="w-14 lg:w-[75px] h-8 rounded-full bg-gray-300">
        {" "}
        &nbsp;
      </Typography>
    </Typography>
  );
}

export default memo(CategorySkeleton);