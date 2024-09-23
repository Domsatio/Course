import DashboardCard from "@/components/admin/DashboardCard";
import { dashboardServices } from "@/services/serviceGenerator";
import { GetServerSideProps } from "next";
import cookie from "cookie";
import { NullProof } from "@/helpers/appFunction";
import GenerateMetaData from "@/components/GenerateMetaData";


export default function index({ data }: { data: any }) {
  const DataWrapper = ({  data, param, titleValue, }: { data:any, param:string, titleValue:string}) => {
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
        <DashboardCard title="course">
          <DataWrapper titleValue='Courses' param='totalCourses' data={data} />
        </DashboardCard>
        <DashboardCard title="Ecommerce">
          <DataWrapper titleValue='Orders' param='totalOrders' data={data} />
          <DataWrapper titleValue='Products' param='totalProducts' data={data} />
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
    const res = await dashboardServices.getDashboard(sessionToken);
    return {
      props: {
        data: res.data.data,
      },
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
