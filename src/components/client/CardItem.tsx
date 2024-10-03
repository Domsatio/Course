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
          className="m-0 aspect-video relative"
        >
          <Image
            src={props.thumbnail}
            alt={`${props.title} thumbnail`}
            className="object-cover w-auto h-auto transform transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            fill
          />
        </CardHeader>
        <CardBody className="space-y-2 px-0 py-3">
          {category}
          <Typography
            variant="lead"
            color="black"
            className="group-hover:text-black/70 line-clamp-2 font-semibold"
          >
            {props.title}
          </Typography>
          <article
            className="prose font-light line-clamp-3 text-black group-hover:text-black/70 text-sm leading-6"
            dangerouslySetInnerHTML={{
              __html: props.body || props.description || "",
            }}
          ></article>
        </CardBody>
      </Card>
    </Link>
  );
};

export default CardItem;
