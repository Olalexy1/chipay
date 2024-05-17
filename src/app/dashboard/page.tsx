import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getAllUserTransactions, getAllUserWallets, getSubAccountDetails } from '@/lib/actions/chimoney.actions';

export const dynamic = "force-dynamic"

const Dashboard = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const subAccountId = await loggedIn.chiMoneyUserId
  const subAccount = await getSubAccountDetails(subAccountId);
  const transactionData = await getAllUserTransactions(subAccountId);

  const userWallets = await getAllUserWallets(subAccountId)

  // console.log('Sub Account data: ', subAccount)

  console.log('see account transaction details: ', subAccountId, transactionData)

  if (!userWallets) return;

  const userWalletsData = userWallets?.data;

  return (
    <section className="home">
      <div className="home-content scrollbar-thumb-blue-800 scrollbar-track-gray-100 scrollbar-thin overflow-y-scroll">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your wallets and transactions efficiently."
          />

          <div className="flex flex-row flex-wrap gap-2">
            {userWalletsData.map((subAccount: Wallets) => (
              <TotalBalanceBox
                key={subAccount.id}
                balance={subAccount.balance}
                type={subAccount.type}
              />
            ))}
          </div>
        </header>

        <RecentTransactions
          transactions={transactionData?.data}
          page={currentPage}
        />

      </div>
    </section>
  )
}

export default Dashboard