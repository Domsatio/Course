import { Card, CardHeader, CardBody } from '@material-tailwind/react'
import React, {memo} from 'react'

type DashboardCardProps = {
    title: string;
    color?: 'blue' | 'red' | 'green' | 'yellow' | "cyan"; // Adjust this to match the expected color types
    children: React.ReactNode;
    }
function DashboardCard({ title, color='blue', children }: DashboardCardProps) {

  return (
    <Card className='w-full max-w-md'>
        <CardHeader color={color} className='p-3 font-bold uppercase text-center lg:text-xl'>
            {title}
        </CardHeader>
        <CardBody>
            {children}
        </CardBody>
    </Card>
  )
}

export default memo(DashboardCard)