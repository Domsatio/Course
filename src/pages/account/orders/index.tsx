import { useEffect, useState } from "react";
import AccountLayout from "@/layouts/client/account";
import { Button, Input, Typography } from "@material-tailwind/react";
import GenerateMetaData from "@/components/GenerateMetaData";
import DatePickerComponent from "@/components/DatePicker";
import OrderItem from "@/components/client/OrderItem";
import { orderServices } from "@/services/serviceGenerator";
import { useSession } from "next-auth/react";
import { Order } from "@/types/order.type";
import Link from "next/link";
import toast from "react-hot-toast";
import { SearchHook } from "@/hooks/searchHook";
import { cn } from "@/libs/cn";

type filterParamProps = {
  status: string;
  date: string;
};

const OrderTab = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Completed",
    value: "settlement",
  },
];

const ClientAccountOrdersPage = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[] | []>([]);
  const [filterParam, setFilterParam] = useState<filterParamProps>({
    status: "",
    date: "",
  });
  const { debounceValue, searchQuery, setSearchQuery } = SearchHook({
    delay: 800,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const {
        data: { data },
      } = await orderServices.getItem({
        userId,
        search: debounceValue ?? "",
        status: filterParam.status === "all" ? "" : filterParam.status,
        date: filterParam.date,
      });
      setOrders(data);
    } catch (error) {
      console.error("Error getting orders data:", error);
    }
    setLoading(false);
  };

  const handleCancelOrder = async (id: string) => {
    const data = await fetch(`/api/checkout?id=${id}`, {
      method: "DELETE",
    });
    const { success } = await data.json();
    if (success) {
      setOrders((prev) => prev.filter((order) => order.id !== id));
      toast.success("Order cenceled successfully");
    } else {
      toast.error("Failed to cancel order");
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (userId && loading !== true) {
      fetchData();
    }
  }, [debounceValue, filterParam]);

  return (
    <AccountLayout>
      <GenerateMetaData title="Orders | Account" desc="Orders Page" />
      <div className="space-y-3">
        <div className="flex gap-2 justify-between">
          <Input
            crossOrigin={"anonymous"}
            name="search"
            type="text"
            label="Search Orders"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <DatePickerComponent onChangeDate={(value) => setFilterParam((prev) => ({ ...prev, date: value }))} />
        </div>
        <div className="flex items-center gap-2">
          {OrderTab.map(({ label, value }) => (
            <Button
              key={label}
              variant="outlined"
              size="sm"
              className={cn("border-gray-600 capitalize font-semibold", {
                "bg-black text-white": filterParam.status === value,
              })}
              onClick={() => setFilterParam((prev) => ({ ...prev, status: value }))}
              ripple={false}
            >
              {label}
            </Button>
          ))}
          <Button
            variant='text'
            size='sm'
            className='capitalize font-semibold'
            ripple={false}
            onClick={() => setFilterParam({ status: "", date: "" })}
          >
            Reset
          </Button>
        </div>
        <div className="space-y-5">
          {orders.length > 0 ? (
            orders.map((order, index: number) => (
              <OrderItem
                key={index}
                order={order}
                cancelTransaction={() => handleCancelOrder(order.id)}
              />
            ))
          ) : loading ? (
            <div className="h-32 flex items-center justify-center">
              <Typography variant="lead">Loading...</Typography>
            </div>
          ) : (
            <div className="h-32 flex flex-col gap-3 items-center justify-center">
              <Typography variant="lead">No orders found</Typography>
              <Link href="/store">
                <Button>Shop Now</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
};

export default ClientAccountOrdersPage;
