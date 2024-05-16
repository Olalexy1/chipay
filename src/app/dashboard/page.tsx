import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { useGetAllUserTransactions, getSubAccountDetails } from '@/lib/actions/chimoney.actions';

export const dynamic = "force-dynamic"

const Dashboard = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const subAccountId = await loggedIn.chiMoneyUserId
  const subAccount = await getSubAccountDetails(subAccountId);
  const transactionData = await useGetAllUserTransactions(subAccountId);

  // console.log('Sub Account Id: ', subAccountId)

  console.log('see sub account details: ', transactionData)

  if (!subAccount) return;

  const subAccountData = subAccount?.data;

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your wallets and transactions efficiently."
          />

          <div className="flex flex-row flex-wrap gap-2">
            {subAccountData.wallets.map((subAccount: Wallets) => (
              <TotalBalanceBox
                key={subAccount.id}
                balance={subAccount.balance}
                type={subAccount.type}
              />
            ))}
          </div>
        </header>

        {/* <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        /> */}
      </div>

      {/* <RightSidebar
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      /> */}
    </section>
  )
}

export default Dashboard