import { Typography } from "@material-tailwind/react";
import React from "react";
import ContentWrapper from "@/layouts/client/contentWrapper";

const HomeView = () => {
  return (
    <ContentWrapper>
      <Typography variant="h2" color="black" placeholder="Blog Page">
        Home Page
      </Typography>
    </ContentWrapper>
  );
};

export default HomeView;
