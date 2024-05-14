'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from './Footer'
import PlaidLink from './PlaidLink'
import {
  HomeIcon,
  TransactionIcon,
  TransferIcon,
  MoneyIcon
} from "../../public/icons";

// const SidebarItem = ({ item, isActive }: any) => {
//   const IconComponent = () => {
//     switch (item.label) {
//       case 'Home':
//         return <HomeIcon className={cn('size-[24px]', { 'text-white': isActive })} />
//       case 'My Banks':
//         return <MoneyIcon className={cn('size-[24px]', { 'text-white': isActive })} />
//       case 'Transaction History':
//         return <TransactionIcon className={cn('size-[24px]', { 'text-white': isActive })} />
//       case 'Transfer Funds':
//         return <TransferIcon className={cn('size-[24px]', { 'text-white': isActive })} />
//       default:
//         return null;
//     }
//   }

//   return (
//     <Link href={item.route} key={item.label}
//       className={cn('sidebar-link group', { 'bg-blue-800': isActive })}
//     >
//       <div className="relative size-6">
//         <IconComponent />
//       </div>
//       <p className={cn("sidebar-label text-nowrap group-hover:text-white", { "!text-white": isActive })}>
//         {item.label}
//       </p>
//     </Link>
//   )
// }

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar z-40">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/images/chiPayLogo.png"
            width={40}
            height={40}
            alt="chiPay logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">ChiPay</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/dashboard`)

          return (
            <Link href={item.route} key={item.label}
              className={cn('sidebar-link group', { 'bg-blue-800': isActive })}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn('group-hover:!brightness-[3] group-hover:!invert-0', {
                    'brightness-[3] invert-0': isActive
                  })}
                />

              </div>
              <p className={cn("sidebar-label text-nowrap group-hover:text-white", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          )
        })}

        <PlaidLink user={user} />
      </nav>

      <Footer user={user} />
    </section>
  )
}

export default Sidebar