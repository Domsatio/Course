import { postServices } from '@/services/serviceGenerator'
import { GetPost } from '@/types/post.type'
import { Typography } from '@material-tailwind/react'
import React, { FC } from 'react'
import { GetServerSideProps } from "next";
import { dateFormater } from '@/helpers/date';

const DetailClub: FC<{ data: Omit<GetPost, 'id' | 'published' | 'slug'> }> = ({ data: { title, body, categories, createdAt } }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <section className="flex container flex-col justify-center items-center flex-wrap gap-5 pt-10 pb-32 px-24">
        <div className='flex gap-3'>
          {categories.map(({ categoryId, category }) =>
            <Typography
              key={categoryId}
              variant="small"
              className="text-[#c28833] flex capitalize group-hover:text-[#c28833]/80"
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

  if (typeof slug !== 'string') {
    return {
      notFound: true
    };
  }

  try {
    const { data: { data } } = await postServices.getItem({ slug });
    return {
      props: {
        data: data
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

export default DetailClub