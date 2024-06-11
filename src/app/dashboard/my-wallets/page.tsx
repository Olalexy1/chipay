import HeaderBox from '@/components/HeaderBox'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getAllUserWallets } from '@/lib/actions/chimoney.actions';
import React from 'react'
import TotalBalanceBox from '@/components/TotalBalanceBox';
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const dynamic = "force-dynamic"

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) return;

  const subAccountId = await loggedIn.chiMoneyUserId
  const userWallets = await getAllUserWallets(subAccountId)

  const userWalletsData: Wallets[] = userWallets?.data;

  const filteredUserWalletsData = userWalletsData.filter((wallet: Wallets) =>
    wallet.transactions && wallet.transactions[0] && wallet.transactions[0].balanceBefore != 0 && wallet.balance != 0)

  return (
    <section className='flex scrollbar-thumb-blue-800 scrollbar-track-gray-100 scrollbar-thin overflow-y-scroll min-h-screen'>
      <div className="my-wallets pb-5">
        <HeaderBox
          title="My Wallets"
          subtext="Effortlessly manage your transactions."
        />

        <Tabs defaultValue={`momo`} className="w-full mt-2">
          <TabsList className='w-full bg-blue-100 rounded-lg p-2 gap-2'>
            {filteredUserWalletsData.map((subAccount: Wallets) => (
              <TabsTrigger key={subAccount.id} className='w-full capitalize data-[state=active]:bg-blue-800' value={`${subAccount.type}`}>
                {`${subAccount.type}`}&nbsp;
                <span className="md:inline hidden">Wallet</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {filteredUserWalletsData.map((subAccount: Wallets) => (
            <TabsContent key={subAccount.id} value={`${subAccount.type}`}>
              <section className="size-full pt-5">
                <TotalBalanceBox
                  key={subAccount.id}
                  balance={subAccount.balance}
                  type={subAccount.type}
                  wallets={userWalletsData}
                />
              </section>
            </TabsContent>
          ))}
        </Tabs>

        {/* <div className="space-y-4 pb-4">
          <h2 className="header-2">
            Your Wallets
          </h2>

          <div className="flex flex-col gap-3 pb-5">
            {filteredUserWalletsData.map((subAccount: Wallets) => (
              <Link key={subAccount.id}
                href='#'
              >
                <TotalBalanceBox
                  key={subAccount.id}
                  balance={subAccount.balance}
                  type={subAccount.type}
                  wallets={userWalletsData}
                />
              </Link>

            ))}
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default MyBanks