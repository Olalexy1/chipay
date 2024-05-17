import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';

const TotalBalanceBox = ({
  wallets = [], balance, type, id, className
}: TotalBalanceBoxProps) => {

  console.log(wallets, ': see wallets')
  return (
    <div className={`total-balance ${className}`} key={id}>

      {
        wallets && wallets.length > 0 && (
          <div className="total-balance-chart">
            <DoughnutChart wallets={wallets} />
          </div>
        )
      }

      <div className="flex flex-col gap-6">
        <h2 className="header-2 capitalize">
          {type} Wallet
        </h2>

        <div className="flex flex-col gap-2">
          <p className="total-balance-label">
            Current Wallet Balance
          </p>

          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={balance || 0} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalBalanceBox