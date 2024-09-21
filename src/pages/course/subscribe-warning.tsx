import React from "react";
import ContentWrapper from "@/layouts/client/contentWrapper";
import { Button } from "@material-tailwind/react";
export default function SubscribeWarning() {
  return (
    <ContentWrapper>
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-bold text-center">Subscription</h1>
        <p className="text-center">
          You need to subscribe to access this page. Please subscribe to access
          this page.
        </p>
        <Button color="blue" ripple={true} className="rounded-full px-10">
          Subscribe
        </Button>
      </div>
    </ContentWrapper>
  );
}
