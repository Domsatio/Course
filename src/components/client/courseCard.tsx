import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";

type CourseCardProps = {
  title: string;
  description: string;
  date: string;
  img: string;
};

export default function CourseCard() {
  return (
    <Card className="max-w-[24rem] overflow-hidden cursor-pointer">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <div className="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="ui/ux review check"
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray">
          UI/UX Review Check
        </Typography>
        <Typography
          variant="lead"
          color="gray"
          className="mt-3 text-lg font-normal"
        >
          Because it&apos;s about motivating the doers. Because I&apos;m here to
          follow my dreams and inspire others.
        </Typography>
      </CardBody>
    </Card>
  );
}
