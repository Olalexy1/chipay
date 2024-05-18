import HeaderBox from '@/components/HeaderBox'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getAllUserWallets } from '@/lib/actions/chimoney.actions';
import React from 'react'
import TotalBalanceBox from '@/components/TotalBalanceBox';
import Link from 'next/link'

export const dynamic = "force-dynamic"

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) return;
  
  const subAccountId = await loggedIn.chiMoneyUserId
  const userWallets = await getAllUserWallets(subAccountId)

  const userWalletsData = userWallets?.data;

  return (
    <section className='flex scrollbar-thumb-blue-800 scrollbar-track-gray-100 scrollbar-thin overflow-y-scroll min-h-screen'>
      <div className="my-wallets pb-5">
        <HeaderBox
          title="My Wallets"
          subtext="Effortlessly manage your transactions."
        />

        <div className="space-y-4">
          <h2 className="header-2">
            Your Wallets
          </h2>

          <div className="flex flex-col gap-3 pb-5">
            {userWalletsData.map((subAccount: Wallets) => (
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
        </div>
      </div>
    </section>
  )
}

export default MyBanks