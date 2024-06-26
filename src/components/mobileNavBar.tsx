import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { navLinks } from '@/constants';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image";


export default function MobileNavBar({ user }: { user: User | null }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div onClick={() => setOpen(!open)} className="md:hidden cursor-pointer group flex h-20 w-20 items-center justify-center rounded-3xl p-2">
                <div className="space-y-2">
                    <span className={`block h-1 w-10 origin-center rounded-full bg-blue-800 transition-transform ease-in-out ${open ? 'translate-y-1.5 rotate-45' : ''}`}></span>
                    <span className={`block h-1 origin-center rounded-full bg-blue-800 transition-transform ease-in-out ${open ? '-translate-y-1.5 -rotate-45 w-10' : 'w-8'}`}></span>
                    <span className={`block h-1 w-6 origin-center rounded-full bg-blue-800 transition-transform ease-in-out ${open ? 'hidden' : ''}`}></span>
                </div>
            </div>

            <ul className={`-z-[1] md:hidden h-screen flex flex-col absolute bg-blue-50 w-full pt-[120px] px-9 transition-all duration-400 ease-in left-0 rounded-br-xl overflow-y-auto scrollbar-none ${open ? 'top-0' : '-top-[3000px]'}`}>
                <div className="flex-grow">

                    {
                        navLinks.categories.map((link) => (
                            <Accordion key={link.id} type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-gray-800 hover:text-blue-800 duration-300 ease-in-out font-semibold ibm-plex-serif">{link.name}</AccordionTrigger>
                                    <AccordionContent className='flex flex-col space-y-3'>
                                        {link.pages.map((items) => (
                                            <>
                                                <Link key={items.id} href={items.href} className='text-gray-800 hover:text-blue-800 text-base font-medium duration-300 ease-in-out'>{items.name}</Link>

                                                {items.content &&
                                                    <div className="w-10/12 flex-col space-y-4 rounded-lg p-4 bg-white">

                                                        {items.content?.map((contentItem) => (

                                                            <Link key={contentItem.id} className="flex flex-row group/item" href={contentItem.href}>

                                                                <div className="flex mr-3">
                                                                    <span className="w-[45px] h-[45px] bg-blue-100 rounded-lg flex items-center justify-center">
                                                                        <Image
                                                                            src={contentItem.iconUrl}
                                                                            alt='logo'
                                                                            width={35}
                                                                            height={35}
                                                                            className='w-[35px] h-[35px]'
                                                                            priority
                                                                        />
                                                                    </span>
                                                                </div>

                                                                <div>
                                                                    <p className="font-montserrat font-semibold text-blue-800 text-base group-hover/item:text-blue-500 duration-300 ease-in-out">{contentItem.title}</p>
                                                                    <p className="font-montserrat font-normal text-slate-800 text-sm">{contentItem.description}</p>
                                                                </div>

                                                            </Link>
                                                        ))}
                                                    </div>
                                                }


                                            </>
                                        ))}

                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))
                    }
                </div>


                {user === null ?
                    <>
                        <div className="flex flex-col gap-y-5 justify-end items-center mb-5 pb-10">
                            <Link className='primary-button group w-full' href="/sign-up">
                                <p className='primary-button-text'>Sign Up</p>
                            </Link>
                            <Link href="sign-in" className="link text-blue-800 w-full text-center rounded-2xl hover:-translate-y-2 active:-translate-y-2 bg-blue-100 py-4 px-6 shadow-lg space-y-3 duration-300"
                            >Sign In
                            </Link>
                        </div>
                    </> :
                    <>
                        <div className="flex items-center mb-5">
                            <Link className='primary-button group w-fit' href="/dashboard">
                                <p className='primary-button-text'>Dashboard</p>
                            </Link>
                        </div>
                    </>
                }
            </ul>
        </>
    )
}