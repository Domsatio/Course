import { Button, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import React from 'react'

const ErrorPage = () => {
  return (
    <main className="flex min-h-screen pt-32 justify-center">
      <section className="flex h-full items-center container flex-col justify-center flex-wrap gap-10 py-10 px-72">
        <Typography variant="h2" color="black" placeholder='Blog Page'>
          Error sign in
        </Typography>
        <Typography variant='paragraph'>
          Error signing in. Please try again.
        </Typography>
        <Link href='/sign-in'>
          <Button>
            Sign In
          </Button>
        </Link>
      </section>
    </main>
  )
}

export default ErrorPage