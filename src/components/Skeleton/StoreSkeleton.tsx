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
      <CardHeader shadow={false} floated={false} className="h-72 bg-gray-200">
        <div className="h-full w-full bg-gray-300"></div>
      </CardHeader>
      <CardBody className="space-y-2">
        <div className="bg-gray-200 h-4 w-full mb-4 rounded-full"></div>
        <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
      </CardBody>
    </Card>
  );
};

export default memo(StoreSkeletonCard);
