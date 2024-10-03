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

const StoreCard: FC<Omit<GetProduct, 'createdAt' | 'updatedAt' | 'quantity' | 'description'>> = ({ name, slug, price, finalPrice, discount, thumbnail }) => {
  return (
    <Link href={`/store/${slug}`} className="h-full w-full">
      <Card placeholder='' className="w-full max-w-[357px] h-full">
        <CardHeader shadow={false} floated={false} className="h-80">
          <Image
            src={thumbnail}
            alt={name + " thumbnail"}
            className="h-full w-full object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            fill
          />
        </CardHeader>
        <CardBody className="space-y-2">
          <Typography color="black" className="font-medium">
            {name}
          </Typography>
          <div className="flex gap-3">
            <Typography color="blue-gray" className="text-xl font-bold text-black">
              {ConvertCurrency(finalPrice)}
            </Typography>
            {discount > 0 && (
              <Typography color="gray" className="line-through text-base self-start">
                {ConvertCurrency(price)}
              </Typography>
            )}
            {discount > 0 && (
              <Typography className="text-sm py-1 px-2 bg-black text-white rounded-lg self-start">
                -{discount}% Off
              </Typography>
            )}
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}

export default StoreCard