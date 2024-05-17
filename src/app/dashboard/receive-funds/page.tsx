import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

export const dynamic = "force-dynamic"

const Receive = async () => {
  const loggedIn = await getLoggedInUser();
  const subAccountId = await loggedIn.chiMoneyUserId;

  return (
    <section className="payment-transfer min-h-screen">
      <HeaderBox
        title="Receive Funds"
        subtext="Initiate a payment request to receive funds"
      />

      <section className="size-full pt-5">

      </section>
    </section>
  )
}

export default Receive