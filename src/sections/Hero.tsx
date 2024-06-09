"use client"

import React from 'react';
import Image from 'next/image';
import AnimatedBackground from '../../public/icons/cash-payment-animate.svg';
import Link from 'next/link';
import { AnimatePresence, motion } from "framer-motion";

const Hero = () => {
    return (
        <section
            className='w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container'
        >
            <div className='relative xl:w-2/5 flex flex-col justify-center items-start w-full'>

                <h1 className='font-palanquin text-8xl max-sm:text-[52px] max-sm:leading-[82px] font-bold max-sm:mt-10'>
                    <span className='relative'>
                        Seamless Secure
                    </span>
                    <br />
                    <span className='text-blue-800 inline-block mt-3 overflow-hidden h-[calc(theme(fontSize.8xl)*theme(lineHeight.tight))] max-sm:h-[calc(52px*theme(lineHeight.tight))]'>
                        <ul className="block animate-text-slide text-left leading-tight [&_li]:block">
                            <li>Payments</li>
                            <li>Payouts</li>
                            <li aria-hidden="true">Payments</li>
                        </ul>
                    </span>

                </h1>

                <p className='font-montserrat font-medium text-slate-gray text-lg leading-6 mt-2 mb-5 sm:max-w-md'>
                    Welcome to ChiPay, where simplicity meets security. Say goodbye to complex transactions and hello to seamless payments and payouts.
                </p>

                <div className="flex flex-col space-y-5 sm:flex-row justify-start items-center sm:space-x-3 sm:space-y-0 mt-3">
                    <Link className='primary-button group w-fit' href="/sign-up">
                        <p className='primary-button-text'>Create an account</p>
                    </Link>

                    {/* <Link href="sign-in" className="link text-blue-800 text-start lg:hidden">Sign In</Link> */}
                </div>



            </div>

            <div className='relative flex-1 flex justify-center items-center'>
                <Image
                    src={AnimatedBackground}
                    alt='Hero Image'
                    width={610}
                    height={502}
                    className='object-contain relative w-full'
                />
            </div>
        </section>
    )
}

export default Hero