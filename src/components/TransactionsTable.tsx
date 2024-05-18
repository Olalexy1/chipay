import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { transactionCategoryStyles } from "@/constants"
import { cn, formatAmount } from "@/lib/utils"
import { getPublicProfile } from "@/lib/actions/chimoney.actions"

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const {
    borderColor,
    backgroundColor,
    textColor,
    chipBackgroundColor,
  } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default

  return (
    <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
      <div className={cn('size-2 rounded-full', backgroundColor)} />
      <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
    </div>
  )
}

const TransactionsTable = async ({ transactions, recipientIds }: TransactionTableProps) => {
  let ids = recipientIds!

  const getProfiles = async (ids: string[]) => {
    let profiles = [];
    for (let id of ids) {
      if (id) {
        let profile = await getPublicProfile(id);
        let eachProfile = await profile.data.data
        profiles.push(eachProfile);
      }
    }
    return profiles;
  }

  const profiles = await getProfiles(ids)

  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Transaction Id</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Transaction Type</TableHead>
          <TableHead className="px-2 max-md:hidden">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Receiver/Sender</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(transactions) && transactions.map((t: Transaction) => {

          const amount = formatAmount(t.valueInUSD);
          const date = new Date(t.paymentDate);
          const dateString = date.toDateString();

          const matchingProfile = profiles.find((profile) => profile.id === t.receiver);

          return (
            <TableRow key={t.id}
            >
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-14 truncate font-semibold text-[#344054]">
                    {t.t_id}
                  </h1>
                </div>
              </TableCell>

              <TableCell className={`pl-2 pr-10 font-semibold `}>
                {amount}
              </TableCell>

              <TableCell className="pl-2 pr-10">
                <CategoryBadge category={t.deliveryStatus || 'pending'} />
              </TableCell>

              <TableCell className="min-w-32 pl-2 pr-10 capitalize">
                {t.type}
              </TableCell>

              <TableCell className="pl-2 pr-10 capitalize">
                {dateString}
              </TableCell>

              <TableCell className="pl-2 pr-10 max-md:hidden">
                {matchingProfile ? matchingProfile.name : "not available"}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TransactionsTable