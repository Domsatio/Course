import PostCard from '@/components/client/postCard'
import PostCategory from '@/components/client/postCategory'
import { Typography } from '@material-tailwind/react'
import React from 'react'

const ClientView = () => {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      <section className="flex flex-col justify-center items-center flex-wrap gap-10 p-10">
        <Typography variant="h2" color="black" placeholder='Blog Page'>
          Blog Page
        </Typography>

        <PostCategory />

        <div className="flex justify-center items-center flex-wrap gap-5">
          {[...Array(6)].map((_, index) => (
            <PostCard key={index} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default ClientView