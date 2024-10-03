import prisma from "@/libs/prisma/db";
import { Cart } from "@/types/cart.type";

export const getCarts = async (id: string) => {
  return prisma.$transaction(
    async (tx) => {
      const totalData = await tx.cart.count({
        where: {
          userId: id,
        },
      });

      const res = await tx.cart.findMany({
        where: {
          userId: id,
        },
        include: {
          product: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const data = res.map((item) => ({
        ...item,
        product: {
          ...item.product,
          finalPrice: item.product.discount
            ? item.product.price -
              (item.product.price * item.product.discount) / 100
            : item.product.price,
        },
      }));

      return { totalData, data };
    },
    { maxWait: 5000, timeout: 20000 }
  );
};

export const getCartChecked = async (userId: string) => {
  const res = await prisma.cart.findMany({
    where: {
      userId: userId,
      isChecked: true,
    },
    include: {
      product: true,
    },
  });

  const data = res.map((item) => ({
    ...item,
    product: {
      ...item.product,
      finalPrice: item.product.discount
        ? item.product.price -
          (item.product.price * item.product.discount) / 100
        : item.product.price,
    },
  }));

  return data;
};

export const createCart = async (data: Cart) => {
  const checkIsExist = await prisma.cart.findFirst({
    where: {
      userId: data.userId,
      productId: data.productId,
    },
  });

  if (checkIsExist) {
    return checkIsExist;
  } else {
    return prisma.cart.create({ data });
  }
};

export const updateCart = async (data: Omit<Cart, "productId">) => {
  return prisma.cart.update({
    where: {
      id: data.id,
      userId: data.userId,
    },
    data,
  });
};

export const updateIsCheckedAll = async (
  userId: string,
  isChecked: boolean
) => {
  return prisma.cart.updateMany({
    where: {
      userId: userId,
    },
    data: {
      isChecked: isChecked,
    },
  });
};

export const deleteCart = async (id: string, idCart: string[]) => {
  return prisma.cart.deleteMany({
    where: {
      id: {
        in: idCart,
      },
      userId: id,
    },
  });
};

export const createTemporaryCart = async (data: Cart) => {
  delete data.isChecked;
  const cartCheck = await prisma.temporaryCart.findFirst({
    where: {
      userId: data.userId,
    },
  });

  if (!cartCheck) {
    return prisma.temporaryCart.create({ data });
  } else if (cartCheck && cartCheck.productId !== data.productId) {
    return prisma.temporaryCart.update({
      where: {
        userId: data.userId,
      },
      data: {
        productId: data.productId,
        quantity: 1,
      },
    });
  } else {
    return prisma.temporaryCart.update({
      where: {
        userId: data.userId,
      },
      data,
    });
  }
};

export const getTemporaryCart = async (id: string, idProduct: string) => {
  const res = await prisma.temporaryCart.findFirst({
    where: {
      userId: id,
      productId: idProduct,
    },
    include: {
      product: true,
    },
  });

  if (!res) {
    return prisma.temporaryCart.create({
      data: {
        userId: id,
        productId: idProduct,
        quantity: 1,
      },
      include: {
        product: true,
      },
    });
  } else {
    const data = {
      ...res,
      product: {
        ...res.product,
        finalPrice: res.product.discount
          ? res.product.price - (res.product.price * res.product.discount) / 100
          : res.product.price,
      },
    };

    return data;
  }
};

export const deleteTemporaryCart = async (userId: string) => {
  return prisma.temporaryCart.deleteMany({
    where: {
      userId: userId,
    },
  });
};

export const updateQuantityTemporaryCart = async (
  data: Omit<Cart, "productId" | "isChecked">
) => {
  return prisma.temporaryCart.update({
    where: {
      id: data.id,
      userId: data.userId,
    },
    data: {
      quantity: data.quantity,
    },
  });
};
