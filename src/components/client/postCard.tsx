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
  img?: string;
  description?: string;
  href: string;
};

type typeCard = {
  props: typeProps
  category?: React.ReactNode;
};

interface PostCardProps<T> {
  props: T;
  category: React.ReactNode;
}

// const PostCard: FC<Omit<GetPost, "id" | "published" | "createdAt"> > = ({ title, slug, body, categories}) => {
const PostCard = ({props, category}: typeCard) => {
  return (
    // <Link href={`/club/${slug}`} className="group cursor-pointer">
    <Link href={props.href||""} className="group cursor-pointer">
      <Card className="max-w-[357px] overflow-hidden shadow-none">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 aspect-video"
        >
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="Post image"
            width={500}
            height={300}
            className="transform transition-transform duration-500 group-hover:scale-110"
            priority
          />
        </CardHeader>
        <CardBody className="space-y-2 px-0 py-3">
          {category}
          {/* <div className="flex flex-wrap gap-2">
            {categories.map(({ category }, i) => (
              <Fragment key={category.id}>
                <Typography
                  variant="small"
                  className="text-[#c28833] flex capitalize group-hover:text-[#c28833]/80"
                >
                  {category.name}
                </Typography>
                {i !== categories.length - 1 && (
                  <span className="text-[#c28833] group-hover:[#c28833]/80">
                    •
                  </span>
                )}
              </Fragment>
            ))}
          </div> */}
          <Typography
            variant="h5"
            color="black"
            className="group-hover:text-black/70"
          >
            {props.title}
          </Typography>
          <p className="line-clamp-3 text-black hover:text-black/70 text-sm leading-6">
            {props.body ? props.body : props.description}
          </p>
        </CardBody>
      </Card>
    </Link>
  );
};

export default PostCard;
