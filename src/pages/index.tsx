import HomeView from "@/views/client";
import GenerateMetaData from "@/components/GenerateMetaData";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <GenerateMetaData
        title="Home"
        desc="Home page"
      />
      <HomeView />
    </React.Fragment>
  );
}
