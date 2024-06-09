import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getAllUserTransactions, getAllUserWallets, getSubAccountDetails } from '@/lib/actions/chimoney.actions';
import Button from '@/components/Button';
import Link from 'next/link';
import Image from 'next/image';
import EmptyData from '../../../public/icons/no-data-animate-min.svg';

export const dynamic = "force-dynamic"

const Dashboard = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) return;

  const subAccountId = await loggedIn?.chiMoneyUserId

  // const subAccount = await getSubAccountDetails(subAccountId);

  const transactions = await getAllUserTransactions(subAccountId);

  const userWallets = await getAllUserWallets(subAccountId)

  if (!userWallets) return;

  const userWalletsData = userWallets?.data;

  const transactionData = transactions?.data;

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

          <div className='flex flex-row gap-3 w-full md:hidden'>
            <Link href={'/dashboard/transfer-funds'} className='flex-1'>
              <Button fullWidth>
                <p className='text-16 font-semibold'>Transfer Funds</p>
              </Button>
            </Link>

            <Link href={'/dashboard/receive-funds'} className='flex-1'>
              <Button fullWidth>
                <p className='text-16 font-semibold'>Receive Funds</p>
              </Button>
            </Link>
          </div>
        </header>

        {transactionData && transactionData.length > 0

          ?
          <>
            <RecentTransactions
              transactions={transactionData}
              page={currentPage}
            />
          </>

          :

          <div className='relative flex-1 flex-col justify-center items-center'>
            <header className="flex items-center justify-between">
              <h2 className="recent-transactions-label">No Recent Transactions to Display</h2>
            </header>
            <div className='flex justify-center items-center border-[1px] border-gray-200 mt-3 rounded-lg'>
              <Image
              src={EmptyData}
              alt='Empty Table State'
              width={500}
              height={500}
              className='object-contain relative'
            />
            </div>
          </div>
        }



      </div>
    </section>
  )
}

export default Dashboard