import Link from 'next/link'
import TransactionsTable from './TransactionsTable'
import { Pagination } from './Pagination'

const RecentTransactions = ({
  transactions = [],
  page = 1,
}: RecentTransactionsProps) => {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction, indexOfLastTransaction
  )

  let transactionsRecipientIds = currentTransactions.map(transaction => transaction.receiver);

  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link
          href={`/dashboard/transaction-history`}
          className="view-all-btn"
        >
          View all
        </Link>
      </header>
      <div>
        <TransactionsTable transactions={currentTransactions} recipientIds={transactionsRecipientIds}/>

        {totalPages > 1 && (
          <div className="my-4 w-full">
            <Pagination totalPages={totalPages} page={page} />
          </div>
        )}

      </div>
    </section>
  )
}

export default RecentTransactions