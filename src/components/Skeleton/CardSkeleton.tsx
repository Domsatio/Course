import { memo } from "react";
import {
    Card,
    CardHeader,
    CardBody,
  } from "@material-tailwind/react";
  
function CardSkeleton() {
    return (
      <Card className="w-full max-w-[27rem] overflow-hidden animate-pulse">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <div className="bg-gray-300 h-48 w-full rounded-b-xl"></div>
        </CardHeader>
        <CardBody>
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        </CardBody>
      </Card>
    );
  }
  
  export default memo(CardSkeleton);