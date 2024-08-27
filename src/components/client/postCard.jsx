import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default function PostCard() {
  return (
    <Link href="#" className="group cursor-pointer">
      <Card className="max-w-[24rem] overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="Post image"
            width={500}
            height={500}
            style={{ objectFit: "contain" }}
            priority
          />
        </CardHeader>
        <CardBody className="space-y-1">
          <div className="flex flex-row gap-2">
            {[...Array(3)].map((_, i) => (
              <Fragment key={i}>
                <Typography
                  variant="small"
                  className="group-hover:text-black/70 transition-colors"
                >
                  Blog Tag
                </Typography>
                {i !== [...Array(3)].length - 1 && "•"}
              </Fragment>
            ))}
          </div>
          <Typography
            variant="h4"
            color="black"
            className="group-hover:text-black/70 transition-colors"
          >
            Blog Title
          </Typography>
          <Typography
            variant="paragraph"
            color="black"
            className="group-hover:text-black/70 transition-colors"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque quo
            aperiam velit quidem, fugit dicta delectus eum adipisci saepe quasi
            expedita totam commodi itaque dolor sunt, voluptates facere nobis!
            Nostrum excepturi neque explicabo incidunt asperiores cupiditate
            culpa quasi mollitia voluptatibus? Obcaecati consequatur
            perferendis, veritatis consequuntur sunt nisi est assumenda fuga!
          </Typography>
        </CardBody>
      </Card>
    </Link>
  );
}
