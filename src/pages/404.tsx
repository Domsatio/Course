import { Button, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const ErrorPage = () => {
  const { push } = useRouter()

  return (
    <main className="flex min-h-screen pt-32 justify-center">
      <section className="flex h-full items-center container flex-col justify-center flex-wrap gap-10 py-10 px-72">
        <Typography variant="h2" color="black" placeholder='Blog Page'>
          Error 404: Page Not Found
        </Typography>
        <Typography variant='paragraph'>
          The page you are looking for does not exist.
        </Typography>
        <Link href='/'>
          <Button>
            Back to Home
          </Button>
        </Link>
      </section>
    </main>
  )
}

export default ErrorPage