import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'
import { getAllSubAccountAssociatedWithUser } from '@/lib/actions/chimoney.actions';
import { encryptId } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    <section className="payment-transfer min-h-screen">
      <HeaderBox
        title="Transfer Funds"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />

      <Tabs defaultValue="to-chimoney-users" className="w-full mt-2">
        <TabsList className='w-full bg-blue-100 rounded-lg p-2 gap-2'>
          <TabsTrigger className='w-full data-[state=active]:bg-blue-800' value="to-chimoney-users">To ChiMoney Users</TabsTrigger>
          <TabsTrigger className='w-full data-[state=active]:bg-blue-800' value="to-other-users">To Other Users</TabsTrigger>
        </TabsList>
        <TabsContent value="to-chimoney-users">
          <section className="size-full pt-5">
            <PaymentTransferForm type='transfer' subAccountId={subAccountId} allSubAccounts={allSubAccountsDropDown!} />
          </section>
        </TabsContent>
        <TabsContent value="to-other-users">
        <section className="size-full pt-5">
            <PaymentTransferForm type='transferToOtherUsers' subAccountId={subAccountId} />
          </section>
        </TabsContent>
      </Tabs>


    </section>
  )
}

export default Transfer