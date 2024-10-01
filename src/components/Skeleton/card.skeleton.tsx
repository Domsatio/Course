import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { memo } from "react";

function CardSkeleton() {
  return (
    <Card placeholder='' className="max-w-[357px] overflow-hidden shadow-none animate-pulse">
      <CardHeader
        shadow={false}
        floated={false}
        className="relative m-0 h-[200px] grid aspect-video place-items-center bg-gray-300"
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
      <CardBody className="space-y-2 px-0 py-3">
        <div className="flex gap-3">
          {[...Array(3)].map((_, i) =>
            <Typography
              key={i}
              as='div'
              variant="small"
              className="h-4 bg-gray-300 rounded w-14"
            >
              &nbsp;
            </Typography>
          )}
        </div>
        <Typography
          as='div'
          variant="lead"
          className="bg-gray-300 rounded w-full"
        >
          &nbsp;
        </Typography>
        <Typography
          as='div'
          variant="lead"
          className="h-7 bg-gray-300 rounded w-3/4"
        >
          &nbsp;
        </Typography>
        <Typography
          as='div'
          variant="paragraph"
          className="h-4 bg-gray-300 rounded w-full"
        >
          &nbsp;
        </Typography>
        <Typography
          as='div'
          variant="paragraph"
          className="h-4 bg-gray-300 rounded w-full"
        >
          &nbsp;
        </Typography>
        <Typography
          as='div'
          variant="paragraph"
          className="h-4 bg-gray-300 rounded w-full"
        >
          &nbsp;
        </Typography>
      </CardBody>
    </Card>
  );
}


export default memo(CardSkeleton);