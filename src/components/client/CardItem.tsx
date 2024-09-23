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
      <Card placeholder='' className="max-w-[357px] overflow-hidden shadow-none">
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
            className="transform transition-transform duration-500 group-hover:scale-110 h-full"
            // loading="lazy"
            priority
          />
        </CardHeader>
        <CardBody className="space-y-2 px-0 py-3">
          {category}
          <Typography
            variant="h5"
            color="black"
            className="group-hover:text-black/70 line-clamp-2"
          >
            {props.title}
          </Typography>
            <article
              className="prose font-normal line-clamp-3 text-black group-hover:text-black/70 text-sm leading-6"
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
