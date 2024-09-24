import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { ArrowLeftIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

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
  const { back } = useRouter();

  return (
    <Card className="mt-6">
      <CardHeader color="blue" className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <IconButton
            variant="text"
            onClick={() => back()}
          >
            <ArrowLeftIcon className="h-5 w-5 text-white" />
          </IconButton>
          <h1>Detail {title}</h1>
        </div>
        <ActionDetailPage />
      </CardHeader>
      <CardBody className="relative pt-10 lg:pt-4">
        {children}
      </CardBody>
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
    <div className={`flex mb-2 ${className} ${position === "horizontal" ? "flex-row gap-2" : "flex-col"}`}>
      <h3 className="font-bold">
        {label}
        {position === "horizontal" ? ":" : ""}
      </h3>
      <div className="flex flex-wrap">{children}</div>
    </div>
  );
};

const ActionDetailPage = () => {
  const { pathname, query: { id } } = useRouter()
  const [, admin, section, subSection] = pathname.split('/');
  const updateHref = `/${admin}/${section}${section === "ecommerce" && '/' + subSection}/update/${id}`;
  console.log("updateHref", updateHref);


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
        <IconButton color="red">
          <TrashIcon className="h-5 w-5" />
        </IconButton>
      </Tooltip>
      <DeleteModal id={id as string} />
    </div>
  );
}

const handleDelete = async (id: string) => {
  try {
    await service.deleteItem({ id: id });
  } catch (error) {
    console.log("error", error);
  }
};

const DeleteModal = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog size="xs" open={isOpen} handler={() => setIsOpen(true)}>
      <DialogHeader color="red">Delete Data</DialogHeader>
      <DialogBody>Are you sure you want to delete this data?</DialogBody>
      <DialogFooter>
        <Button
          variant="outlined"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          color="red"
          className="ml-2"
          onClick={() => handleDelete(id)}
        >
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

const DataDetailPage = ({ service }: DetailPageProps) => {
  const { query: { id } } = useRouter();
  const [data, setData] = useState<any>({});

  const fetchData = async () => {
    try {
      const { data: { data } } = await service.getItem({ id });
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
