import { accountRoutes } from '@/constants/client/accountRoutes'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <section className="flex container flex-col justify-center gap-7 py-10 lg:px-60 xl:px-72">
        <Typography variant="h4" color="black" placeholder='Blog Page'>
          Account Page
        </Typography>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none p-5"
          >
            <ul className='flex gap-10'>
              {accountRoutes.map(({ label, href }) =>
                <li key={label} className={`${pathname === href ? 'text-black' : 'text-gray-600'} hover:text-black`}>
                  <Link href={href}>
                    {label}
                  </Link>
                </li>
              )}
            </ul>
          </CardHeader>
          <CardBody className='border-t'>
            {children}
          </CardBody>
        </Card>
      </section>
    </main>
  )
}

export default AccountLayout