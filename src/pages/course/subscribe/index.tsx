import React, { Fragment } from "react";
import ContentWrapper from "@/layouts/client/contentWrapper";
import { ConvertCurrency } from "@/helpers/appFunction";
import GenerateMetaData from "@/components/GenerateMetaData";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

type PricingPlans = {
  label: string;
  plan: string;
  price: number;
};

const pricingPlans: PricingPlans[] = [
  {
    label: "Monthly",
    plan: 'monthly',
    price: 49999,
  },
  {
    label: "Annually",
    plan: 'annually',
    price: 529999,
  },
];

const handleSubscribe = async (plan:string, paymentMethod:string) => {
  const res = await fetch('/api/course/subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      plan: plan,
      paymentMethod: paymentMethod
    }),
  });

  const {status, data} = await res.json();
  if (status) {
    console.log(data);
  } else {
    toast.error("Failed to subscribe")
  }
}

const SubscribePage = () => {
  return (
    <ContentWrapper className="items-center ">
      <GenerateMetaData title="Pricing Plans" desc="Pricing Plans Page" />
      <div className="space-y-3 items-center flex flex-col text-center">
        <Typography variant="h3">
          Pricing Plans
        </Typography>
        <Typography>
          Get access to all the courses with our subscription plans
        </Typography>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        {pricingPlans.map(({ label, plan, price }) =>
          <Card key={label} className="border border-gray-300 shadow-sm w-80">
            <CardBody className="space-y-5 flex flex-col">
              <Typography variant="h5" color="black">
                {label}
              </Typography>
              {label === "Annually" &&
                <Typography variant="small" className="uppercase flex gap-1 items-center py-1 px-2 bg-yellow-900 text-white absolute top-0 right-0">
                  <SparklesIcon className="h-4 w-4" />
                  Best Offer
                </Typography>
              }
              <Typography variant="h2" color="black">
                {ConvertCurrency(price)}
              </Typography>
              {label === "Annually" &&
                <Typography variant="small" className="uppercase py-1 px-2 bg-gray-300 absolute top-16 right-0">
                  Save 11%
                </Typography>
              }
              {/* <Link href={`/course/subscribe/checkout?plan=${plan}`}> */}
                <Button color="blue" fullWidth onClick={() => handleSubscribe(plan,'gopay')}>
                  Subscribe
                </Button>
              {/* </Link> */}
            </CardBody>
          </Card>
        )}
      </div>
    </ContentWrapper>
  );
}

export default SubscribePage;
