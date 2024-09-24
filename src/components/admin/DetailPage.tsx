import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import {
  ArrowLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { ModalConfirmation } from "./ModalConfirmation";

interface DetailPageProps {
  service: any;
}

export const DetailPage = ({
  title = "",
  service,
  children,
}: {
  title: string;
  service?: any;
  children?: React.ReactNode;
}) => {
  const { back } = useRouter();

  return (
    <Card className="mt-6">
      <CardHeader
        color="blue"
        className="p-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <IconButton variant="text" onClick={() => back()}>
            <ArrowLeftIcon className="h-5 w-5 text-white" />
          </IconButton>
          <h1>Detail {title}</h1>
        </div>
        {service && <ActionDetailPage service={service} />}
      </CardHeader>
      <CardBody className="relative pt-10 lg:pt-4">{children}</CardBody>
    </Card>
  );
};

export const LabelDetailPage = ({
  label,
  children,
  position = "vertical",
  className = "",
}: {
  label?: string;
  children?: any;
  position?: "horizontal" | "vertical";
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

const ActionDetailPage = ({ service }: { service: any }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    pathname,
    push,
    query: { id },
  } = useRouter();
  const updateHref = pathname.split("/view")[0] + "/update/" + id;

  const handleDelete = async (id: string, service: any, redirect: string) => {
    try {
      await service.deleteItem({ id: id });
      push(redirect);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex gap-2">
      <Tooltip content="Edit">
        <Link href={updateHref}>
          <IconButton variant="text" color="white">
            <PencilSquareIcon className="h-5 w-5" />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip content="Delete">
        <IconButton color="red" onClick={() => setIsOpen(true)}>
          <TrashIcon className="h-5 w-5" />
        </IconButton>
      </Tooltip>
      <ModalConfirmation
        isOpen={isOpen}
        handler={setIsOpen}
        onConfirm={async () => {
          await handleDelete(id as string, service, pathname.split("/view")[0]);
          setIsOpen(false);
        }}
      />
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
      const {
        data: { data },
      } = await service.getItem({ id });
      setData(data);
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
