import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'
import { getAllSubAccountAssociatedWithUser } from '@/lib/actions/chimoney.actions';
import { encryptId } from '@/lib/utils';

export const dynamic = "force-dynamic"

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) return;
  const subAccountId = await loggedIn.chiMoneyUserId;
  const allSubAccounts = await getAllSubAccountAssociatedWithUser();

  const allSubAccountData = await allSubAccounts.data.data

  const allSubAccountsDropDown = await allSubAccountData.map((subAccount: { id: string; value: string; name: string }) => {
    return {
      id: encryptId(subAccount.id!),
      value: encryptId(subAccount.id!),
      name: subAccount.name!,
    };
  });

  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Transfer Funds"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />

      <section className="size-full pt-5">
        <PaymentTransferForm type='transfer' subAccountId={subAccountId} allSubAccounts={allSubAccountsDropDown!} />
      </section>
    </section>
  )
}

export default Transfer