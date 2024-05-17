import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

export const dynamic = "force-dynamic"

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  const subAccountId = await loggedIn.chiMoneyUserId;

  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Transfer Funds"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />

      <section className="size-full pt-5">
        <PaymentTransferForm type='transfer' subAccountId={subAccountId} />
      </section>
    </section>
  )
}

export default Transfer