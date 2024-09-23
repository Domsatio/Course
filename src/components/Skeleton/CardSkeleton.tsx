import { Card, CardBody } from "@material-tailwind/react";
import { memo } from "react";

function CardSkeleton() {
  return (
    <Card placeholder='' className="max-w-[357px] overflow-hidden shadow-none animate-pulse">
      <CardBody className="space-y-2 px-0 py-3">
        <div className="h-48 bg-gray-300 rounded-xl w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-2/4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </CardBody>
    </Card>
  );
}


export default memo(CardSkeleton);