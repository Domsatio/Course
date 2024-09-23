import { useEffect, useState, memo } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface DetailPageProps {
  service: any;
}

export const DetailPage = ({
  title = "",
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  const router = useRouter();
  return (
    <Card className="mt-6">
      <CardHeader color="blue" className="p-3 lg:p-5">
        <h2 className="text-xl lg:text-2xl font-bold">Detail {title}</h2>
      </CardHeader>
      <CardBody className="relative pt-10 lg:pt-4">
        <div className="absolute top-3 right-4 cursor-pointer">
          <Button
            className="p-2"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="h-5 w-5 cursor-pointer" />
          </Button>
        </div>
        <div>{children}</div>
      </CardBody>
    </Card>
  );
};

export const LabelDetailPage = ({
  label,
  children,
  position = "vertikal",
  className = "",
}: {
  label?: string;
  children?: any;
  position?: "horizontal" | "vertikal";
  className?: string;
}) => {
  return (
    <div
      className={`flex mb-2 ${className} ${
        position === "horizontal" ? "flex-row gap-2" : "flex-col"
      }`}
    >
      <h3 className="font-bold">
        {label}
        {position === "horizontal" ? ":" : ""}
      </h3>
      <div className="flex flex-wrap">{children}</div>
    </div>
  );
};

const DataDetailPage = ({ service }: DetailPageProps) => {
  const {
    query: { id },
  } = useRouter();
  const [data, setData] = useState<any>({});
  const fetchData = async () => {
    try {
      const response = await service.getItem({ id });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (id) fetchData();
  }, [id]);
  return { data };
};

export default DataDetailPage;
