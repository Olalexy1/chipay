"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image";
import Logo from '../../public/images/chiPayLogo.png';
import MobileNavBar from "./mobileNavBar";


import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { navLinks } from '@/constants'

const NavBar = ({ user }: { user: User | null }) => {
  const [activeContent, setActiveContent] = React.useState('why')

  const handleActiveContent = (id: string) => {
    setActiveContent(id)
  }

  const handleInactiveContent = (id: string) => {
    setTimeout(() => {
      setActiveContent(id)
    }, 1500)
  }

  return (
    <header className='w-full z-50 bg-blue-50 md:bg-white sticky top-0 md:relative padding-x'>
      <nav className='max-container flex justify-between z-50 py-5 bg-blue-50 md:bg-white'>
        <Link href='/' className="flex items-center">
          <Image
            src={Logo}
            alt='logo'
            width={500}
            height={500}
            className='m-0 w-[40px] h-[40px] p-0 mr-3'
          />
          <p className="font-bold text-xl font-montserrat text-blue-800">ChiPay</p>
        </Link>
        <NavigationMenu className="mx-auto hidden md:flex">
          <NavigationMenuList>

            {
              navLinks.categories.slice(0, 1).map((items) => (
                <NavigationMenuItem key={items.id}>
                  <NavigationMenuTrigger className="link text-slate-600">{items.name}</NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-3 rounded-2xl shadow-2xl">
                    <ul className="flex flex-row md:w-[550px] lg:w-[700px] bg-white">
                      <li className="w-5/12 bg-blue-50 p-4 space-y-2">
                        {items.pages.map((pages) => (
                          <NavigationMenuLink onMouseEnter={() => handleActiveContent(pages.id)} asChild key={pages.id}>
                            <Link href={pages.href} className={`flex w-full duration-300 ease-in-out text-lg rounded-lg hover:bg-blue-800 hover:text-white text-slate-800 py-4 px-5 ${pages.id === activeContent && ' bg-blue-800 text-white'}`}>
                              <p className="font-montserrat text-base font-semibold">{pages.name}</p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </li>
                      <div className="w-7/12 flex-col space-y-4 grow p-4">

                        {items.pages.map((page) => (

                          activeContent === page.id &&

                          page?.content?.map((contentItem) => (

                            <Link key={contentItem.id} className="flex flex-row group/item" href={contentItem.href}>

                              <div className="flex mr-3">
                                <span className="w-[45px] h-[45px] bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Image
                                    src={contentItem.iconUrl}
                                    alt='logo'
                                    width={35}
                                    height={35}
                                    className='w-[35px] h-[35px]'
                                  />
                                </span>
                              </div>

                              <div>
                                <p className="font-montserrat font-semibold text-blue-800 text-lg group-hover/item:text-blue-500 duration-300 ease-in-out">{contentItem.title}</p>
                                <p className="font-montserrat font-normal text-slate-800 text-base">{contentItem.description}</p>
                              </div>

                            </Link>
                          ))

                        ))}

                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

              ))
            }


            {
              navLinks.categories.slice(1).map((items) => (
                <NavigationMenuItem key={items.id}>
                  <NavigationMenuTrigger className="link text-slate-600">{items.name}</NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-3 rounded-2xl">
                    <ul className="py-3 px-1 bg-white w-full">
                      {items.pages.map((component) => (
                        <ListItem
                          key={component.name}
                          title={component.name}
                          href={component.href}
                        >
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))
            }

            {/* <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Support
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}

          </NavigationMenuList>
        </NavigationMenu>

        {user === null ?
          <>
            <div className="space-x-3 hidden lg:flex items-center">
              <Link className='primary-button group w-fit' href="/sign-up">
                <p className='primary-button-text'>Sign Up</p>
              </Link>
              <Link href="sign-in" className="link text-blue-800">Sign In</Link>
            </div>
          </> :
          <div className="hidden lg:flex">
            <Link className='primary-button group w-fit' href="/dashboard">
              <p className='primary-button-text'>Dashboard</p>
            </Link>
          </div>
        }
        <MobileNavBar user={user} />
      </nav>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="w-auto">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-slate-800 hover:text-blue-800 text-lg duration-300 ease-in-out",
            className
          )}
          {...props}
        >
          <p className="text-base font-medium leading-none text-nowrap">{title}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default NavBar
