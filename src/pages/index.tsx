import HomeView from "@/views/client";
import GenerateMetaData from "@/components/GenerateMetaData";
import React, { Fragment } from "react";

const Home = () => {
  return (
    <Fragment>
      <GenerateMetaData
        title="Home"
        desc="Home page"
      />
      <HomeView />
    </Fragment>
  );
}

export default Home
