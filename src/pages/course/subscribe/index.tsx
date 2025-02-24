import React, { Fragment, useState } from "react";
import ContentWrapper from "@/layouts/client/contentWrapper";
import { ConvertCurrency } from "@/helpers/appFunction";
import GenerateMetaData from "@/components/GenerateMetaData";
import {
  Button,
  Card,
  CardBody,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Drawer,
} from "@material-tailwind/react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { FormInput } from "@/components/admin/FormInput";
import { orderServices } from "@/services/serviceGenerator";
import { InputList } from "@/constants/client/InputLists/subscription.InpurList";
import { useMediaQuery } from "usehooks-ts";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { se } from "date-fns/locale";
import { log } from "console";

type PricingPlans = {
  label: string;
  plan: string;
  price: number;
};

const pricingPlans: PricingPlans[] = [
  {
    label: "Monthly",
    plan: "monthly",
    price: 49999,
  },
  {
    label: "Annually",
    plan: "annually",
    price: 529999,
  },
];

const SubscribePage = () => {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState<string>("monthly");

  const handleSubscribe = async (paymentMethod: string, payload:any) => {
    const res = await fetch("/api/course/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan: plan,
        paymentMethod: paymentMethod,
        payload: payload,
      }),
    });

    const { status, data } = await res.json();
    if (status) {
      console.log(data);
    } else {
      toast.error("Failed to subscribe");
    }
  };

  return (
    <ContentWrapper className="items-center ">
      <GenerateMetaData title="Pricing Plans" desc="Pricing Plans Page" />
      <div className="space-y-3 items-center flex flex-col text-center">
        <Typography variant="h3">Pricing Plans</Typography>
        <Typography>
          Get access to all the courses with our subscription plans
        </Typography>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        {pricingPlans.map(({ label, plan, price }) => (
          <Card key={label} className="border border-gray-300 shadow-sm w-80">
            <CardBody className="space-y-5 flex flex-col">
              <Typography variant="h5" color="black">
                {label}
              </Typography>
              {label === "Annually" && (
                <Typography
                  variant="small"
                  className="uppercase flex gap-1 items-center py-1 px-2 bg-yellow-900 text-white absolute top-0 right-0"
                >
                  <SparklesIcon className="h-4 w-4" />
                  Best Offer
                </Typography>
              )}
              <Typography variant="h2" color="black">
                {ConvertCurrency(price)}
              </Typography>
              {label === "Annually" && (
                <Typography
                  variant="small"
                  className="uppercase py-1 px-2 bg-gray-300 absolute top-16 right-0"
                >
                  Save 11%
                </Typography>
              )}
              {/* <Link href={`/course/subscribe/checkout?plan=${plan}`}> */}
              <Button
                color="blue"
                fullWidth
                onClick={() => {
                  setPlan(plan);
                  setOpen(true);
                }}
              >
                Subscribe
              </Button>
              {/* </Link> */}
            </CardBody>
          </Card>
        ))}
      </div>
      <ModalChoosePaymentMethod
        open={open}
        onClose={setOpen}
        onSubmit={handleSubscribe}
      />
    </ContentWrapper>
  );
};

type ModalChoosePaymentMethodProps = {
  open: boolean;
  onClose: (value: boolean) => void;
  onSubmit: (paymentMethod: string, payload: any) => void;
};
const ModalChoosePaymentMethod = ({
  open,
  onClose,
  onSubmit,
}: ModalChoosePaymentMethodProps) => {
  const [payloadGopay, setPayloadGopay] = useState<any>({});
  const [payloadCreditCard, setPayloadCreditCard] = useState<any>({});
  
  const data = [
    {
      label: "GoPay",
      value: "gopay",
    },
    {
      label: "Credit Card",
      value: "credit_card",
    },
  ];
  const isMobile = useMediaQuery("(max-width: 640px)");

  const Content = () => (
    <div>
      <Tabs value="gopay">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ label, value }) => {
            return (
              <TabPanel key={value} value={value}>
              {value === "gopay" ? (
                label
              ) : (
                <FormInput
                  method="POST"
                  inputList={InputList}
                  service={orderServices}
                  customCard={(child) => <div>{child}</div>}
                  isUseCancelButton={false}
                  customButtonSubmit={(child) => <></>}
                  toastMessage={{
                    success: "Success",
                    error: "Error",
                  }}
                  onChange={(e) => {
                    setPayloadCreditCard(e.values);
                  }}
                />
              )}
            <Button color="blue" className="w-full" onClick={() => onSubmit(value, value === 'gopay' ? payloadGopay : payloadCreditCard)}>
              Subscribe
            </Button>
            </TabPanel>
          )})}
        </TabsBody>
      </Tabs>
    </div>
  );
  return isMobile ? (
    <Drawer
      size={375}
      placement="right"
      open={open}
      onClose={() => onClose(false)}
      className="relative p-4"
    >
      <XMarkIcon
        className="h-6 w-6 text-black absolute top-0 right-0 lg:top-3 lg:right-3 cursor-pointer hover:scale-110"
        onClick={() => onClose(false)}
      />
      <Typography variant="h5" className="text-center mb-5">
        Choose Payment Method
      </Typography>
      {Content()}
    </Drawer>
  ) : (
    <Dialog open={open} handler={() => onClose(true)} className="relative">
      <XMarkIcon
        className="h-6 w-6 text-black absolute top-0 right-0 lg:top-3 lg:right-3 cursor-pointer hover:scale-110"
        onClick={() => onClose(false)}
      />
      <DialogHeader>Choose Payment Method</DialogHeader>
      <DialogBody>
      {Content()}
      </DialogBody>
      {/* <DialogFooter>
        <Button
          color="blue"
          onClick={() => onSubmit("gopay", { plan: "monthly" })}
        >
          GoPay
        </Button>
      </DialogFooter> */}
    </Dialog>
  );
};

export default SubscribePage;
