import React from 'react';
import Image from 'next/image';
import AnimatedBackground from '../../public/icons/cash-payment-animate.svg';
import Link from 'next/link';

const Hero = () => {
    return (
        <section
            className='w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container'
        >
            <div className='relative xl:w-2/5 flex flex-col justify-center items-start w-full  max-xl:padding-x'>

                <h1 className='mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[72px] font-bold'>
                    <span className='relative'>
                        Seamless Secure
                    </span>
                    <br />
                    <span className='text-blue-800 inline-block mt-3'>Payment</span>
                </h1>

                <p className='font-montserrat text-slate-gray text-lg leading-8 mt-3 mb-5 sm:max-w-sm'>
                    Welcome to ChiPay, where simplicity meets security. Say goodbye to complex transactions and hello to seamless payments.
                </p>

                <div className="flex flex-row justify-start items-center space-x-3">
                    <Link className='primary-button group' href="/sign-up">
                        <p className='primary-button-text'>Create an Account</p>
                    </Link>

                    <Link href="sign-in" className="link text-blue-800 lg:hidden">Sign In</Link>
                </div>



            </div>

            <div className='relative flex-1 flex justify-center items-center xl:min-h-screen'>
                <Image
                    src={AnimatedBackground}
                    alt='Hero Image'
                    width={610}
                    height={502}
                    className='object-contain relative size-full'
                />
            </div>
        </section>
    )
}

export default Hero