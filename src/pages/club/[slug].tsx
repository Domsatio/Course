import { postServices } from '@/services/serviceGenerator'
import { GetPost } from '@/types/post.type'
import { Typography } from '@material-tailwind/react'
import React, { FC } from 'react'
import { GetServerSideProps } from "next";
import { dateFormater } from '@/helpers/date';
import { useRouter } from 'next/router';

const DetailClubPage: FC<Omit<GetPost, 'id' | 'published' | 'slug'>> = ({ title, body, categories, createdAt }) => {
  const { push } = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f4f4f4] justify-between py-24">
      <section className="flex flex-col container 2xl:max-w-[75rem] justify-center items-center flex-wrap gap-10 p-10 rounded-3xl bg-white">
        <div className='flex gap-3'>
          {categories.map(({ categoryId, category }) =>
            <Typography
              key={categoryId}
              variant="small"
              className="text-[#c28833] flex capitalize cursor-pointer group-hover:text-[#c28833]/80"
              onClick={() => push({
                pathname: "/club",
                query: { category: category.name },
              })}
            >
              {category.name}
            </Typography>
          )}
        </div>
        <Typography variant="h2" color="black">
          {title}
        </Typography>
        <Typography variant='small' color='gray'>
          {dateFormater(createdAt, "long")}
        </Typography>
        <Typography variant='paragraph' className='px-56'>
          {body}
        </Typography>
      </section>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  try {
    const { data: { data } } = await postServices.getItem({ slug });
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

export default DetailClubPage