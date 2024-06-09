import HeaderBox from '@/components/HeaderBox'
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getAllUserTransactions } from '@/lib/actions/chimoney.actions';
import React from 'react';
import Image from 'next/image';
import EmptyData from '../../../../public/icons/no-data-animate-min.svg';

export const dynamic = "force-dynamic"

const TransactionHistory = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) return;

  const subAccountId = await loggedIn.chiMoneyUserId
  const transactions = await getAllUserTransactions(subAccountId);

  if (!transactions) return;

  const transactionsData = transactions?.data;

  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactionsData.length / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactionsData?.slice(
    indexOfFirstTransaction, indexOfLastTransaction
  )

  let transactionsRecipientIds = currentTransactions.map((transaction: { receiver: any; }) => transaction.receiver);

  return (
    <div className="transactions scrollbar-thumb-blue-800 scrollbar-track-gray-100 scrollbar-thin overflow-y-scroll">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your transactions details here."
        />
      </div>

      {
        currentTransactions && currentTransactions.length > 0
          ?
          <div className="space-y-6">
            <section className="flex w-full flex-col gap-6">
              <TransactionsTable
                transactions={currentTransactions} recipientIds={transactionsRecipientIds}
              />
              {totalPages > 1 && (
                <div className="my-4 w-full">
                  <Pagination totalPages={totalPages} page={currentPage} />
                </div>
              )}
            </section>
          </div>
          :
          <div className='relative flex-1 flex-col justify-center items-center'>
            <header className="flex items-center justify-between">
              <p className="header-box-subtext !font-semibold">No Transactions to Display</p>
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
  )
}

export default TransactionHistory