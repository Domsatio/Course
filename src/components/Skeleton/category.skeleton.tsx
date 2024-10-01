import { memo } from "react";
import { Typography } from "@material-tailwind/react";

function CategorySkeleton() {
  return (
    <Typography
      as='div'
      variant="small"
      className="h-8 w-14 lg:w-[75px] rounded-full bg-gray-300"
    >
      &nbsp;
    </Typography>
  );
}

export default memo(CategorySkeleton);