import HeaderBox from '@/components/HeaderBox'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { useGetAllUserWallets } from '@/lib/actions/chimoney.actions';
import React from 'react'
import TotalBalanceBox from '@/components/TotalBalanceBox';
import Link from 'next/link'

export const dynamic = "force-dynamic"

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  const subAccountId = await loggedIn.chiMoneyUserId
  const userWallets = await useGetAllUserWallets(subAccountId)

  const userWalletsData = userWallets?.data;

  return (
    <section className='flex'>
      <div className="my-banks">
        <HeaderBox
          title="My Wallets"
          subtext="Effortlessly manage your transactions."
        />

        <div className="space-y-4">
          <h2 className="header-2">
            Your Wallets
          </h2>

          <div className="flex flex-col gap-2">
            {userWalletsData.map((subAccount: Wallets) => (
              <Link key={subAccount.id}
                href='#'
              // href={`/transaction-history/?id=${account.appwriteItemId}`}
              >
                <TotalBalanceBox
                  key={subAccount.id}
                  balance={subAccount.balance}
                  type={subAccount.type}
                // className='bg-bank-gradient shadow-creditCard backdrop-blur-[6px]'
                />
              </Link>

            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks