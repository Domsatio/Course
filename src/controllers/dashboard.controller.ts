import prisma from "@/libs/prisma/db";

export const getDashboard = async () => {
  return prisma.$transaction(
    async (tx) => {
      const totalCourses = await tx.course.count();
      const totalOrders = await tx.order.count();
      const totalProducts = await tx.product.count();
      const totalPosts = await tx.post.count();
      const totalCategories = await tx.category.count();
      const totalUsers = await tx.user.count();

      return {
        totalCourses,
        totalOrders,
        totalProducts,
        totalPosts,
        totalCategories,
        totalUsers,
      };
    },
    { maxWait: 5000, timeout: 20000 }
  );
};
