import prisma from "@/libs/prisma/db";

export const getOrders = async ({
  skip = 0,
  take = 5,
  search = "",
  status = "",
  date = ""
}: {
  skip: number;
  take: number;
  search?: string;
  status?: string;
  date?: string;
}) => {
  let whereCondition: any = {};

  // Apply search condition
  if (search) {
    const ordersWithProducts:any = await prisma.$queryRaw`
      SELECT *
      FROM "Order"
      WHERE EXISTS (
        SELECT 1
        FROM jsonb_array_elements("products") as product
        WHERE product->>'name' ILIKE ${'%' + search + '%'}
      )
    `;

    whereCondition.id = { in: ordersWithProducts.map((order: any) => order.id) };
  }

  // Apply status condition
  if (status) {
    whereCondition.transactionStatus = status;
  }

  // Apply date condition
  if (date) {
    whereCondition.transactionTime = {
      gte: new Date(date),
      lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)), // Adds 1 day for comparison
    };
  }

  // Transaction to fetch total data count and paginated data
  return prisma.$transaction(async (tx) => {
    const totalData = await tx.order.count({
      where: whereCondition,
    });

    const data = await tx.order.findMany({
      where: whereCondition,
      include: {
        user: true,
      },
      skip,
      take,
      orderBy: {
        transactionTime: "desc",
      },
    });

    return { totalData, data };
  });
};


export const getOrder = async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
};

export const getOrderByUserId = async ({
  userId = "",
  search = "",
  status = "",
  date = ""
}: {
  userId: string;
  search?: string;
  status?: string;
  date?: string;
}) => {
  let whereCondition: any = {
    userId,
  };

  if (search !== "") {
    const ordersWithProducts:any = await prisma.$queryRaw`
      SELECT *
      FROM "Order",
      unnest("products") as product
      WHERE product->>'name' ILIKE ${'%' + search + '%'}
    `;

    whereCondition.id = { in: ordersWithProducts.map((order: any) => order.id) };
  }

  if (status) {
    whereCondition.transactionStatus = status;
  }

  if (date) {
    whereCondition.transactionTime = {
      gte: new Date(date).toISOString(),
      lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toISOString(),
    };
  }

  return prisma.order.findMany({
    where: whereCondition,
    include: {
      user: true,
    },
    orderBy: {
      transactionTime: "desc",
    },
  });
};

export const createOrder = async (data: any) => {
  return prisma.order.create({ data });
};

export const updateOrder = async ({
  id,
  transactionStatus,
  transactionTime,
  settlementTime,
}: {
  id: string;
  transactionStatus: string;
  transactionTime: string;
  settlementTime?: string;
}) => {
  const checkTransactionStatus = await prisma.order.findUnique({
    where: { id },
  });

  if (checkTransactionStatus?.transactionStatus === "settlement") return;

  return prisma.order.update({
    where: { id },
    data: {
      transactionStatus,
      settlementTime,
      transactionTime,
    },
  });
};

export const deleteOrder = async (id: string) => {
  return prisma.order.delete({
    where: { id },
  });
};
