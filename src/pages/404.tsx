import { Button, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/router'
import React from 'react'

const ErrorPage = () => {
  const { push } = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <section className="flex items-center container flex-col justify-center flex-wrap gap-10 py-10 px-72">
        <Typography variant="h2" color="black" placeholder='Blog Page'>
          Error 404: Page Not Found
        </Typography>
        <Typography variant='paragraph'>
          The page you are looking for does not exist.
        </Typography>
        <Button onClick={() => push('/')}>
          Back to Home
        </Button>
      </section>
    </main>
  )
}

export default ErrorPage