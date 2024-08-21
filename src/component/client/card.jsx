import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";


export default function CardItem() {
    return (
        <Card className="max-w-[24rem] overflow-hidden">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
            >
                <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                    alt="ui/ux review check"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h4" color="blue-gray">
                    Lamborgini Aventador
                </Typography>
                <Typography color="black" className="font-semibold">
                    Price:
                </Typography>
                <Typography>
                    Rp. 1.000.000 / 12 jam
                </Typography>
                <Typography color="black" className="font-semibold">
                    Include:
                </Typography>
                <Typography>
                    Driver & Fuel
                </Typography>
            </CardBody>
            <CardFooter className="">
                <Button size="lg" fullWidth={true}>
                    Rent
                </Button>
            </CardFooter>
        </Card>
    );
}