import DashboardCard from "@/components/admin/DashboardCard";
import { dashboardServices } from "@/services/serviceGenerator";
import { GetServerSideProps } from "next";
import cookie from "cookie";
import { NullProof } from "@/helpers/appFunction";
import GenerateMetaData from "@/components/GenerateMetaData";
import { FC } from "react";

type DataProps = {
  totalPosts: number;
  totalCategories: number;
  totalCourses: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
}

const Index: FC<DataProps> = (data) => {
  const DataWrapper = ({ data, param, titleValue, }: { data: any, param: string, titleValue: string }) => {
    return (
      <div className="flex flex-wrap justify-between transform transition-transform duration-300 p-3 rounded-lg mb-2 shadow-lg cursor-pointer">
        <p>{titleValue}</p>
        <p>{NullProof({ input: data, params: param })}</p>
      </div>)
  }
  return (
    <div className="pt-6">
      <GenerateMetaData title="Admin | Dashboard" />
      <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2 md:grid-cols-3 gap-y-10">
        <DashboardCard title="Blog">
          <DataWrapper titleValue='Posts' param='totalPosts' data={data} />
          <DataWrapper titleValue='Categories' param='totalCategories' data={data} />
        </DashboardCard>
        <DashboardCard title="Course">
          <DataWrapper titleValue='Courses' param='totalCourses' data={data} />
        </DashboardCard>
        <DashboardCard title="Ecommerce">
          <DataWrapper titleValue='Orders' param='totalOrders' data={data} />
          <DataWrapper titleValue='Products' param='totalProducts' data={data} />
        </DashboardCard>
        <DashboardCard title="User">
          <DataWrapper titleValue='Users' param='totalUsers' data={data} />
        </DashboardCard>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = cookie.parse(req.headers.cookie || "");
  const sessionToken = cookies["next-auth.session-token"] || null;

  if (!sessionToken) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }
  try {
    const { data: { data } } = await dashboardServices.getDashboard(sessionToken);
    return {
      props: data
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: {},
      },
    };
  }
};

export default Index;
