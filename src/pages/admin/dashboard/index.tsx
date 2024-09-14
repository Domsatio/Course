import DashboardCard from "@/components/admin/DashboardCard";
import { dashboardServices } from "@/services/serviceGenerator";
import { GetServerSideProps } from "next";
import cookie from 'cookie';
import { NullProof } from "@/helpers/appFunction";

export default function index({data}: any) {
  return (
    <div className='pt-6'>
      <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2 md:grid-cols-3 gap-y-10">
        <DashboardCard title="Blog">
          <div className="flex flex-wrap justify-between">
            <p>Posts</p>
            <p>{NullProof({input:data, params:"totalPosts"})}</p>
          </div>
          <div className="flex flex-wrap justify-between">
            <p>Categories</p>
            <p>{NullProof({input:data, params:"totalCategories"})}</p>
          </div>
        </DashboardCard>
        <DashboardCard title="course">
          <div className="flex flex-wrap justify-between">
            <p>Courses</p>
            <p>{NullProof({input:data, params:"totalCourses"})}</p>
          </div>
        </DashboardCard>
        <DashboardCard title="Ecommerce">
          <div className="flex flex-wrap justify-between">
            <p>Orders</p>
            <p>{NullProof({input:data, params:"totalOrders"})}</p>
          </div>
          <div className="flex flex-wrap justify-between">
            <p>Products</p>
            <p>{NullProof({input:data, params:"totalProducts"})}</p>
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}
  
  
  export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;
    const cookies = cookie.parse(req.headers.cookie || '');
    const sessionToken = cookies['next-auth.session-token'] || null;

    if (!sessionToken) {
      return {
        redirect: {
          destination: '/sign-in',
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


