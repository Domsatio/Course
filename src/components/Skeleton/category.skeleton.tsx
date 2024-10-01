import { memo } from "react";
import { Typography } from "@material-tailwind/react";

function CategorySkeleton() {
  return (
    <Typography
      variant="small"
      color="blue-gray"
      className="font-normal leading-none opacity-70"
    >
      {" "}
      &nbsp;
    </Typography>
  );
}

export default memo(CategorySkeleton);