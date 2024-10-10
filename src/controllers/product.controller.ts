import prisma from "@/libs/prisma/db";
import { Product, UpdateProduct } from "@/types/product.type";
import { generateOrderBy } from "@/helpers/appFunction";

export const getProducts = async (
  skip: number = 0,
  take: number | 'all' = 5,
  search: string = "",
  orderByParam: any = { createdAt: "desc" }
) => {

  let whereCondition: any = {
    OR: [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  };

  const searchNumber = Number(search);
  if (!isNaN(searchNumber)) {
    whereCondition.OR.push(
      {
        price: {
          equals: searchNumber,
        },
      },
      {
        quantity: {
          equals: searchNumber,
        },
      }
    );
  }

  return prisma.$transaction(
    async (tx) => {
      const totalData = await tx.product.count({
        where: whereCondition,
      });

      const res = await tx.product.findMany({
        where: whereCondition,
        skip,
        take: take === "all" ? totalData : take,
        orderBy: generateOrderBy(orderByParam),
      });

      const data = res.map((item) => ({
        ...item,
        finalPrice: item.discount
          ? item.price - (item.price * item.discount) / 100
          : item.price,
      }));

      return { totalData, data };
    },
    { maxWait: 5000, timeout: 20000 }
  );
};

export const getProduct = async (param: string) => {
  const res = await prisma.product.findFirst({
    where: {
      OR: [{ id: param }, { slug: param }],
    },
  });

  if (!res) return null;

  const data = {
    ...res,
    finalPrice: res.discount
      ? res.price - (res.price * res.discount) / 100
      : res.price,
  };

  return data;
};

export const createProduct = async (data: Product) => {
  return prisma.product.create({ data });
};

export const updateProduct = async (id: string, data: UpdateProduct) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};
