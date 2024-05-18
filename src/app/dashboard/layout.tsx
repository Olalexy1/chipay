import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from 'next/link';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = await getLoggedInUser();

  if (!loggedIn) redirect('/sign-in')

  return (
    <main className="flex h-screen w-full font-inter overflow-y-hidden">
      <Sidebar user={loggedIn} />
      <div className="flex size-full flex-col">
        <div className="root-layout bg-white">
          <Link href={"/"}>
            <Image src="/images/chiPayLogo.png" width={40} height={40} alt="logo" />
          </Link>
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}