import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

type typeProps = {
  title: string;
  body?: string;
  thumbnail?: string;
  description?: string;
  href: string;
};

type typeCard = {
  props: typeProps
  category?: React.ReactNode;
};

// const PostCard: FC<Omit<GetPost, "id" | "published" | "createdAt"> > = ({ title, slug, body, categories}) => {
const CardItem = ({ props, category }: typeCard) => {
  return (
    <Link href={props.href || ""} className="group cursor-pointer">
      <Card className="max-w-[357px] overflow-hidden shadow-none">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 aspect-video"
        >
          <Image
            src={props.thumbnail || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"}
            alt="Post image"
            width={500}
            height={300}
            className="transform transition-transform duration-500 group-hover:scale-110"
            // loading="lazy"
            priority
          />
        </CardHeader>
        <CardBody className="space-y-2 px-0 py-3">
          {category}
          <Typography
            variant="h5"
            color="black"
            className="group-hover:text-black/70"
          >
            {props.title}
          </Typography>
          <p className="line-clamp-3 text-black group-hover:text-black/70 text-sm leading-6">
            {props.body ? props.body : props.description}
          </p>
        </CardBody>
      </Card>
    </Link>
  );
};

export default CardItem;
