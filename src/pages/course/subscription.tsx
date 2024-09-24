import React from "react";
import ContentWrapper from "@/layouts/client/contentWrapper";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
} from "@material-tailwind/react";
import { ConvertCurrency } from "@/helpers/appFunction";
import GenerateMetaData from "@/components/GenerateMetaData";

type SubscriptionProps = {
    label: string;
    value: string;
    desc: string;
    price: number;
};

export default function Subscription() {
  const data: SubscriptionProps[] = [
    {
      label: "Monthly",
      value: "monthly",
      desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people 
          who are like offended by it, it doesn't matter.`,
          price: 50000,  
        },
    {
      label: "Annual",
      value: "annual",
      desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
          price: 500000,
    },
  ];

  const benefits = [
    {
      label: "Access to exclusive courses",
      value: "exclusive",
      desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people 
          who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Engage with the community",
      value: "community",
      desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
    },
  ];

  return (
    <ContentWrapper>
      <GenerateMetaData title="Subscription" desc="Subscription Page" />
      <div>
        <p className="font-black text-xl lg:text-3xl xl:text-6xl mb-5 lg:mb-10">
          This community is not for normies.
        </p>
        <p className="text-md lg:text-xl">
          Become a supporter and get access to exclusive courses and the ability
          to engage with the community
        </p>
      </div>
      
      {/* <hr className="my-5 h-[2px]" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <p></p>
      </div>
      <hr className="my-5 h-[2px]" /> */}
      
      <div className="flex justify-center">
        <Tabs value="html">
          <TabsHeader className="min-w-[300px] lg:w-96">
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody className="min-w-[300px] lg:w-96">
            {data.map(({ value, desc, price }: SubscriptionProps) => (
              <TabPanel key={value} value={value} className="flex flex-col gap-6">
                <p className="font-bold text-xl lg:text-2xl">{ConvertCurrency(price)}</p>
                <Button color="blue" ripple={true} className="rounded-full px-10">
                  Subscribe
                </Button>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </ContentWrapper>
  );
}
