import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { memo } from "react";

const StoreSkeletonCard = () => {
  return (
    <Card placeholder='' className="w-full h-full animate-pulse">
      <CardHeader
        shadow={false}
        floated={false}
        className="h-80 bg-gray-200 relative grid place-items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-12 w-12 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </CardHeader>
      <CardBody className="space-y-2">
        <Typography
          as='div'
          variant="lead"
          className="bg-gray-200 h-4 w-40 mb-4 rounded-full"
        >
          &nbsp;
        </Typography>
        <Typography
          as='div'
          variant="paragraph"
          className="bg-gray-200 h-10 w-1/2 rounded"
        >
          &nbsp;
        </Typography>
      </CardBody>
    </Card>
  );
};

export default memo(StoreSkeletonCard);
