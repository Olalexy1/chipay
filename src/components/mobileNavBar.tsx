import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { navLinks } from '@/constants';


export default function MobileNavBa() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div onClick={() => setOpen(!open)} className="md:hidden cursor-pointer group flex h-20 w-20 items-center justify-center rounded-3xl p-2">
                <div className="space-y-2">
                    <span className="block h-1 w-10 origin-center rounded-full bg-blue-800 transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
                    <span className="block h-1 w-8 origin-center rounded-full bg-blue-800 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
                </div>
            </div>

            <ul className={`-z-[1] md:hidden min-h-screen flex flex-col justify-between absolute bg-blue-50 w-full pt-[120px] px-9 transition-all duration-700 ease-in left-0 rounded-br-xl ${open ? 'top-0' : '-top-[1000px]'}`}>
                {
                    navLinks.categories.map((link) => (
                        <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                            <Link href={'#'} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</Link>
                        </li>
                    ))
                }
                <Button>
                    Get Started
                </Button>

                <div className='flex'>

                </div>
            </ul>
        </>
    )
}

// export default function MobileNavBar() {
//     const [open, setOpen] = useState(false);

//     return (
//         <Sheet open={open} onOpenChange={setOpen}>

//             {/* This button will trigger open the mobile sheet menu */}
//             <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="md:hidden">
//                     <MenuIcon />
//                 </Button>
//             </SheetTrigger>

//             <SheetContent side="left" className='bg-white w-full'>
//                 <div className="flex flex-col items-start border-2 border-red-500 size-full">
//                     {mobileItems.map((item, index) => (
//                         <Link
//                             key={index}
//                             onClick={() => {
//                                 setOpen(false);
//                             }}
//                             href="#"
//                         >
//                             {item}
//                         </Link>
//                     ))}
//                 </div>
//             </SheetContent>

//         </Sheet>
//     );
// }