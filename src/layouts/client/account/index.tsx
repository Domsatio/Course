import { accountRoutes } from '@/constants/client/accountRoutes'
import { cn } from '@/libs/cn'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <section className="flex container flex-col justify-center gap-7 py-10 lg:px-40 xl:px-60 2xl:px-72">
        <Typography variant="h4" color="black" placeholder='Blog Page' className='text-center lg:text-left'>
          Account Page
        </Typography>
        <Card className='shadow-none md:shadow-md'>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none p-5 overflow-x-auto pr-6 lg:pr-0"
          >
            <ul className='flex gap-10'>
              {accountRoutes.map(({ label, href }, index) =>
                <li key={label} className={cn('hover:text-black',
                  pathname === href ? 'text-black' : 'text-gray-500',
                  index === accountRoutes.length - 1 && 'pr-5 lg:pr-0'
                )}>
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