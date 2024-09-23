import AccountLayout from '@/layouts/client/account'
import { Typography } from '@material-tailwind/react'
import GenerateMetaData from '@/components/GenerateMetaData'

const ClientAccountOrdersPage = () => {
  return (
    <AccountLayout>
      <GenerateMetaData title='List Orders' desc='Orders Page'/>
      <Typography variant="h4" color="black" placeholder='Blog Page'>
        Orders
      </Typography>
    </AccountLayout>
  )
}

export default ClientAccountOrdersPage