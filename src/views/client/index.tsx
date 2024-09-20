import { Typography } from '@material-tailwind/react'
import React from 'react'

const HomeView = () => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f4f4f4] justify-between py-24">
      <section className="flex flex-col container 2xl:max-w-[75rem] justify-center flex-wrap gap-10 p-10 rounded-3xl bg-white">
        <Typography variant="h2" color="black" placeholder='Blog Page'>
          Home Page
        </Typography>
      </section>
    </main>
  )
}

export default HomeView