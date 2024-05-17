'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from './Footer'
import {
  HomeIcon,
  TransactionIcon,
  TransferIcon,
  MoneyIcon
} from "../../public/icons";


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
                  className={cn(`group-hover:!brightness-[3] group-hover:!invert-0 ${item.label === 'Receive Funds' ? 'rotate-180' : ''}`, {
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
      </nav>

      <Footer user={user} />
    </section>
  )
}

export default Sidebar