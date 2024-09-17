import { Typography } from '@material-tailwind/react'
import React from 'react'

const Course = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <section className="flex container flex-col justify-center flex-wrap gap-10 py-10 px-24">
        <Typography variant="h2" color="black" placeholder='Blog Page'>
          Course Page
        </Typography>
      </section>
    </main>
  )
}

export default Course