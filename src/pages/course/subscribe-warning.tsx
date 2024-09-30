import React from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import Link from "next/link";

const SubscribersOnly = () => {
  return (
    <div className="flex justify-center">
      <Card className="overflow-hidden border border-gray-300 shadow-sm w-96 items-center">
        <CardBody className="space-y-5 flex flex-col items-center">
          <Typography variant="h5" color="black">
            For Subscribers Only
          </Typography>
          <Typography variant="paragraph">
            You need to subscribe to access this course
          </Typography>
          <Link href='/course/subscribe'>
            <Button color="blue">
              Subscribe Now
            </Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}

export default SubscribersOnly;