import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'
import PaymentRequestForm from '@/components/PaymentRequestForm';

export const dynamic = "force-dynamic"

const Receive = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) return;
  const subAccountId = await loggedIn.chiMoneyUserId;

  return (
    <section className="payment-transfer min-h-screen">
      <HeaderBox
        title="Receive Funds"
        subtext="Initiate a payment request to receive funds"
      />

      <section className="size-full py-5">
        <PaymentRequestForm type='receive' subAccountId={subAccountId}/>
      </section>
    </section>
  )
}

export default Receive