import GenerateMetaData from '@/components/GenerateMetaData'
import ContentWrapper from '@/layouts/client/contentWrapper'
import { useRouter } from 'next/router'
import React from 'react'

const CheckoutSubscription = () => {
  const { query: { plan } } = useRouter()

  return (
    <ContentWrapper>
      <GenerateMetaData title='Subscribe Checkout' desc='Subscribe Checkout Page' />
      {plan}
    </ContentWrapper>
  )
}

export default CheckoutSubscription