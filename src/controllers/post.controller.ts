import prisma from "@/libs/prisma/db";
import { Post, UpdatePost } from "@/types/post.type";
import { convertStringToBoolean } from "@/helpers/appFunction";
// Removed import for QueryMode as it is not exported by @prisma/client

export const getPosts = async (
  skip: number = 0,
  take: number = 5,
  search: string = "",
  category: string = "",
  published: boolean|string|undefined = undefined
) => {
  let whereCondition: any = {
    OR: [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        body: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  };
  const unjoinedCategory = category.split(",");
  console.log("unjoinedCategory", unjoinedCategory);
  
  if (category !== "") {
    whereCondition = {
      categories: {
        some: {
          category: {
            name: {
              in: unjoinedCategory, 
            },
          },
        },
      },
    };
  }
  if (published) {
    whereCondition.published = convertStringToBoolean(published as string);
  }

  return prisma.$transaction(async (tx) => {
    const totalData = await tx.post.count({
      where: whereCondition,
    });

    const data = await tx.post.findMany({
      where: whereCondition,
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { totalData, data };
  }, { maxWait: 5000, timeout: 20000 });
};

export const getPublishedPosts = async (
  skip: number,
  take: number,
  categoryId: string
) => {
  return prisma.$transaction(async (tx) => {
    const totalData = await tx.post.count({
      where: {
        published: true,
        categories: {
          some: {
            category: {
              id: categoryId,
            },
          },
        },
      },
    });

    const data = await tx.post.findMany({
      where: {
        published: true,
        categories: {
          some: {
            category: {
              id: categoryId,
            },
          },
        },
      },
      skip,
      take,
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { totalData, data };
  });
};

export const getPost = async (param: string) => {
  return prisma.post.findFirst({
    where: {
      OR: [{ id: param }, { slug: param }],
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
};

export const createPost = async ({
  id,
  userId,
  title,
  slug,
  body,
  categories,
  published,
}: Post) => {
  return prisma.post.create({
    data: {
      id,
      userId,
      title,
      slug,
      body,
      published,
      categories: {
        create: categories?.map((id) => ({
          category: {
            connect: { id },
          },
        })),
      },
    },
  });
};

export const updatePost = async (
  id: string,
  { title, slug, body, categories, published }: UpdatePost
) => {
  return prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      body,
      published,
      categories: {
        deleteMany: {},
        create: categories?.map((id) => ({
          category: {
            connect: { id },
          },
        })),
      },
    },
  });
};

export const deletePost = async (id: string) => {
  return prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { id },
      data: {
        categories: {
          deleteMany: {},
        },
      },
    });

    return tx.post.delete({
      where: { id },
    });
  });
};
