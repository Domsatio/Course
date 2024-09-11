import { useRouter } from "next/router";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

interface DetailPageProps {
  service: any
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
        <CardHeader color="blue" className="p-5">
          <h2 className="text-2xl">Detail {title}</h2>
        </CardHeader>
        <CardBody>{children}</CardBody>
        <CardFooter>
            <Button
                size="md"
                onClick={() => router.back()}
            >
                Back
            </Button>
        </CardFooter>
      </Card>
    );
  };
  
  export const LabelDetailPage = ({
      label,
    children,
    position,
  }: {
      label?: string;
    children?: any;
    position: "horizontal" | "vertikal";
  }) => {
      return (
          <div
          className={`flex flex-wrap mb-1 ${
              position === "horizontal" ? "flex-row gap-2" : "flex-col"
            }`}
      >
        <div>
          <h3 className="font-bold">
            {label}
            {position === "horizontal" ? ":" : ""}
          </h3>
        </div>
        <div>{children}</div>
      </div>
    );
  };

  const DataDetailPage = ({ service}: DetailPageProps) => {
    const {query: {id}} = useRouter();
    const [data, setData] = useState<any>({});
    const fetchData = async () => {
        try {
            const response = await service.getItem({id});
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        if (id) fetchData();
    }, [id]);

    console.log(data);
    
    
    return {data}
  };


export default DataDetailPage;
