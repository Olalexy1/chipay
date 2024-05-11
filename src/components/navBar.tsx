"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image";
import Logo from '../../public/images/chipayLogo.png';
import MobileNavBar from "./mobileNavBar";
import { Button } from '@/components/ui/button';

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
import { useState } from "react";

const NavBar = () => {
  const [activeContent, setActiveContent] = React.useState('why')
  const [open, setOpen] = useState(false);

  const handleActiveContent = (id: string) => {
    setActiveContent(id)
    console.log('see logged id: ', id)
  }

  return (
    <header className='w-full z-50 bg-white sticky top-0 md:relative'>
      <nav className='max-container flex justify-between z-50 bg-white padding-x py-5'>
        <a href='/' className="flex items-center">
          <Image
            src={Logo}
            alt='logo'
            width={500}
            height={500}
            className='m-0 w-[40px] h-[40px] p-0 mr-3'
          />
          <p className="font-bold text-xl font-montserrat text-blue-800">ChiPay</p>
        </a>
        <NavigationMenu className="mx-auto hidden md:flex">
          <NavigationMenuList>

            {
              navLinks.categories.slice(0, 1).map((items) => (
                <NavigationMenuItem key={items.id}>
                  <NavigationMenuTrigger className="link text-slate-600">{items.name}</NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-3 rounded-2xl">
                    <ul className="flex flex-row md:w-[550px] lg:w-[600px] bg-white">
                      <li className="basis-2/4 bg-blue-50 p-4 space-y-2">
                        {items.pages.map((pages) => (
                          <NavigationMenuLink onMouseEnter={() => handleActiveContent(pages.id)} asChild key={pages.id}>
                            <Link href={pages.href} className={`flex w-full rounded-lg hover:bg-blue-800 hover:text-white text-slate-600 py-4 px-5 ${pages.id === activeContent && ' bg-blue-800 text-white'}`}>
                              <p className="font-montserrat text-base font-semibold">{pages.name}</p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </li>
                      <div className="basis-2/4 flex grow p-4">

                        {items.pages.map((pages) => (

                          activeContent === pages.id &&

                          <div key={pages.id} className="">
                            <p className="font-montserrat text-slate-600 text-base font-semibold">{pages.content?.title}</p>
                          </div>

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

        <div className="space-x-3 hidden lg:flex items-center">
          <Link className='primary-button group w-fit' href="/sign-up">
            <p className='primary-button-text'>Sign Up</p>
          </Link>
          <Link href="sign-in" className="link text-blue-800">Sign In</Link>
        </div>

        <div onClick={() => setOpen(!open)} className="md:hidden cursor-pointer group flex h-20 w-20 items-center justify-center rounded-3xl p-2">
          <div className="space-y-2">
            <span className={`block h-1 w-10 origin-center rounded-full bg-blue-800 transition-transform ease-in-out ${open ? 'translate-y-1.5 rotate-45' : ''}`}></span>
            <span className={`block h-1 origin-center rounded-full bg-blue-800 transition-transform ease-in-out ${open ? '-translate-y-1.5 -rotate-45 w-10' : 'w-8'}`}></span>
            <span className={`block h-1 w-6 origin-center rounded-full bg-blue-800 transition-transform ease-in-out ${open ? 'hidden' : ''}`}></span>
          </div>
        </div>

        <ul className={`-z-[1] md:hidden min-h-screen flex flex-col absolute bg-blue-50 w-full pt-[120px] px-9 transition-all duration-400 ease-in left-0 rounded-br-xl ${open ? 'top-0' : '-top-[3000px]'}`}>
          <div className="flex-grow">
            {
              navLinks.categories.map((link) => (
                <li key={link.name} className='md:ml-8 text-xl md:my-0 my-3'>
                  <Link href={'#'} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</Link>
                </li>
              ))
            }
          </div>


          <div className="flex flex-col gap-y-6 justify-end items-center mb-5">
            <Link className='primary-button group w-full' href="/sign-up">
              <p className='primary-button-text'>Sign Up</p>
            </Link>
            <Link href="sign-in" className="link text-blue-800 w-full text-center rounded-2xl hover:-translate-y-2 active:-translate-y-2 bg-blue-100 py-4 px-6 shadow-lg space-y-3 duration-300"
            >Sign In
            </Link>
          </div>
        </ul>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-slate-600 hover:text-blue-800",
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
