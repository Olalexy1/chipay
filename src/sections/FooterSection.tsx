import React from 'react';
import { navLinks } from '@/constants';
import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import Button from '@/components/Button';

const FooterSection = () => {
  return (
    <section className='w-full flex flex-col max-container'>
      <div className='w-full flex flex-col lg:flex-row pb-5'>

        <div className='flex flex-wrap lg:flex-nowrap lg:flex-row w-full lg:w-7/12'>
          {navLinks.categories.slice(1).map((items) => (
            <div key={items.id} className='flex flex-col w-6/12 mb-5'>
              <p className='text-base text-slate-900 font-semibold mb-3'>{items.name}</p>

              <ul className='space-y-3'>
                {items.pages.map((component) => (
                  <li key={component.id}>
                    <Link href={component.href} className='text-gray-500 hover:text-blue-800 duration-500 font-semibold'>{component.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='flex flex-col w-full lg:w-5/12'>
          <p className='text-base text-slate-900 font-semibold mb-1'>Stay up to date.</p>

          <div className='w-full flex my-5 flex-col md:flex-row space-y-3 md:space-y-0'>
            <input type='email' maxLength={256} placeholder='Enter email address' className='input py-5 -mr-5' />
            <Button label='Subscribe' className='w-full md:w-5/12 z-10 py-5 font-semibold' />
          </div>

          <p className='text-base text-slate-700 font-semibold my-3'>Nigeria Address</p>

          <p className='text-base text-slate-500 font-normal'>Alpha One Towers, Eko Atlantic City, Victoria Island, Lagos.</p>



          {/* <p className='text-base text-slate-500 font-normal'>08188394639, 07053755127</p> */}

        </div>


      </div>

      <div className='flex flex-col space-y-3 md:space-y-0 md:flex-row border-t-[1px] border-b-[1px] py-5 border-[#e4e4e4]'>
        <div className='flex flex-col md:flex-row justify-center gap-3'>

          <div className='justify-center flex space-x-3 text-[#767676]'>

            {/* come back to create map */}

            <Link href="#" className='hover:text-blue-800'>
              <FaTwitter />
            </Link>

            <Link href="#" className='hover:text-blue-800'>
              <RiInstagramFill />
            </Link>

            <Link href="#" className='hover:text-blue-800'>
              <FaFacebook />
            </Link>

            <Link href="#" className='hover:text-blue-800'>
              <FaLinkedin />
            </Link>
          </div>

          <div className='flex justify-center'>
            <Link className='text-base text-slate-500 leading-none font-normal hover:text-blue-800 duration-500' href='mailto:info@chimoney.com'>info@chimoney.com</Link>
          </div>

        </div>

        <div className='flex flex-1 justify-center md:justify-end space-x-5'>
          <Link className='text-base text-slate-500 font-normal hover:text-blue-800 duration-500 leading-none' href='#'>Privacy Policy</Link>
          <Link className='text-base text-slate-500 font-normal hover:text-blue-800 duration-500 leading-none' href='#'>Terms Of Service</Link>
        </div>

      </div >

      <div className='flex w-full justify-center'>
        <p className='text-base text-center text-slate-500 font-normal my-3'>ChiPay - Licensed by the central bank of Nigeria.</p>
      </div>

      <div className='flex w-full justify-between border-t-[1px] pt-5 border-[#e4e4e4] gap-2'>
        <Link href="https://storyset.com/people" className='text-xs text-slate-500 leading-none font-normal hover:text-blue-800 text-balance'>People illustrations by Storyset</Link>

        <Link href="https://storyset.com/app" className='text-xs text-slate-500 leading-none font-normal hover:text-blue-800 text-balance'>App illustrations by Storyset</Link>

        <Link href="https://storyset.com/online" className='text-xs text-slate-500 leading-none font-normal hover:text-blue-800 text-balance'>Online illustrations by Storyset</Link>

        {/* <Link href="https://storyset.com/data" className='text-xs text-slate-500 leading-none font-normal hover:text-blue-800 text-balance'>Data illustrations by Storyset</Link> */}
      </div>

    </section >
  )
}

export default FooterSection