import AccountLayout from '@/layouts/client/account'
import { Typography } from '@material-tailwind/react'
import GenerateMetaData from '@/components/GenerateMetaData'

const ClientAccountSubscriptionsPage = () => {
  return (
    <AccountLayout>
      <GenerateMetaData title='Subscriptions' desc='Subscription Page' />
      <Typography variant="h4" color="black" placeholder='Blog Page'>
        Subscriptions
      </Typography>
    </AccountLayout>
  )
}

export default ClientAccountSubscriptionsPage