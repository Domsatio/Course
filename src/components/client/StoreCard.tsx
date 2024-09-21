import { GetProduct } from "@/types/product.type";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { FC } from "react";
import { ConvertCurrency } from "@/helpers/appFunction";
import Link from "next/link";

const FinalPrice = ({ price, discount }: { price: number, discount: number }) => {
  const discountedPrice = discount !== undefined ? price - (price * discount) / 100 : price;

  return (
    <div className="mt-7">
      <Typography color="blue-gray" className="text-xl font-bold">
        {ConvertCurrency(discountedPrice)}
      </Typography>
      {discount > 0 && (
        <div className='flex gap-2 mt-2'>
          <Typography className="text-sm py-1 px-2 bg-green-200 text-green-900 font-semibold rounded-lg">
            -{discount}%
          </Typography>
          <Typography color="gray" className="line-through text-base">
            {ConvertCurrency(price)}
          </Typography>
        </div>
      )}
    </div>
  );
}

const StoreCard: FC<Omit<GetProduct, 'createdAt' | 'updatedAt' | 'quantity' | 'description'>> = ({ name, slug, price, discount, thumbnail }) => {
  return (
    <Link href={`/store/${slug}`}>
      <Card className="w-full">
        <CardHeader shadow={false} floated={false} className="h-80">
          <Image
            src={thumbnail}
            width={300}
            height={300}
            alt="card-image"
            className="h-full w-full object-cover"
            priority
          />
        </CardHeader>
        <CardBody className="space-y-2">
          <Typography color="black" className="font-medium">
            {name}
          </Typography>
          <FinalPrice price={price} discount={discount} />
        </CardBody>
      </Card>
    </Link>
  )
}

export default StoreCard