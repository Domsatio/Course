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
  thumbnail: string;
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
    <Link href={props.href} className="group cursor-pointer">
      <Card className="max-w-[357px] overflow-hidden shadow-none">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 aspect-video"
        >
          <Image
            src={props.thumbnail}
            alt={props.title + " thumbnail"}
            className="transform transition-transform duration-500 group-hover:scale-110"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            fill
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
