import prisma from "@/libs/prisma/db";
import { generateOrderBy } from "@/helpers/appFunction";
import { log } from "console";

export const getOrders = async ({
  skip = 0,
  take = 5,
  search = "",
  status = "",
  date = "",
  orderBy = { transactionTime: "desc" },
}: {
  skip: number;
  take: number;
  search?: string;
  status?: string;
  date?: string;
  orderBy: any;
}) => {
  let whereCondition: any = {
    OR: [
      {
        user: {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        user: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ],
  };

  // Apply search condition
  if (search !== "") {
    const ordersWithProducts: any = await prisma.$queryRaw`
      SELECT *
      FROM "Order",
      unnest("products") as product
      WHERE product->>'name' ILIKE ${"%" + search + "%"}
    `;

    whereCondition.OR.push({
      id: {
        in: ordersWithProducts.map((order: any) => order.id),
      },
    });
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

  const generateOrderBy1 = (orderBy: { [key: string]: "asc" | "desc" }) => {
    const key = Object.keys(orderBy)[0];
    const value = orderBy[key];
    return `"${key}" ${value}`;
  };

  let baseQuery = `
    SELECT o.*,
           u.name, 
           u.email,
           (SELECT COALESCE(SUM((p->>'quantity')::int), 0)::integer
            FROM unnest(o.products) AS p) AS "totalQuantityProduct"
    FROM "Order" o
    JOIN "User" u ON o."userId" = u.id 
    WHERE 1=1
`;

  const queryParams: any = [];
  let paramCounter = 1;

  if (search !== "") {
    baseQuery += `
    AND (
        EXISTS (
            SELECT 1 
            FROM unnest(o.products) as product
            WHERE product->>'name' ILIKE $${paramCounter}
        )
        OR u.email ILIKE $${paramCounter}
        OR u.name ILIKE $${paramCounter}
    )
    `;
    queryParams.push(`%${search}%`);
    paramCounter++;
  }

  if (status) {
    baseQuery += ` AND o."transactionStatus" = $${paramCounter} `;
    queryParams.push(status);
    paramCounter++;
  }

  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1); // Adds 1 day

    baseQuery += `
    AND o."transactionTime" >= $${paramCounter}
    AND o."transactionTime" < $${paramCounter + 1}
    `;
    queryParams.push(startDate.toISOString(), endDate.toISOString());
    paramCounter += 2;
  }

  baseQuery += `
      ORDER BY ${generateOrderBy1(generateOrderBy(orderBy))}
      OFFSET $${paramCounter}
      LIMIT $${paramCounter + 1}
    `;

  queryParams.push(skip, take);

  let countQuery: any = `
  SELECT COUNT(*)
  FROM "Order" o
  JOIN "User" u ON o."userId" = u.id
  WHERE 1=1
`;

  // Transaction to fetch total data count and paginated data
  return prisma.$transaction(
    async (tx) => {
      const totalData = await tx.order.count({
        where: whereCondition,
      });

      // const data = await tx.order.findMany({
      //   where: whereCondition,
      //   include: {
      //     user: true,
      //   },
      //   skip,
      //   take,
      //   orderBy: generateOrderBy(orderBy),
      // });
      // countQuery += baseQuery.split('WHERE 1=1')[1];
      // const totalData = await prisma.$queryRawUnsafe(countQuery, ...queryParams);

      const data = await prisma.$queryRawUnsafe(baseQuery, ...queryParams);

      return { totalData, data };
    },
    { maxWait: 5000, timeout: 20000 }
  );
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
  date = "",
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
    const ordersWithProducts: any = await prisma.$queryRaw`
      SELECT *
      FROM "Order",
      unnest("products") as product
      WHERE product->>'name' ILIKE ${"%" + search + "%"}
    `;

    whereCondition.id = {
      in: ordersWithProducts.map((order: any) => order.id),
    };
  }

  if (status) {
    whereCondition.transactionStatus = status;
  }

  if (date) {
    whereCondition.transactionTime = {
      gte: new Date(date).toISOString(),
      lt: new Date(
        new Date(date).setDate(new Date(date).getDate() + 1)
      ).toISOString(),
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
