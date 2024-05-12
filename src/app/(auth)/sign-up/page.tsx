import React from 'react';
import AuthForm from '@/components/authForm';
import Image from 'next/image';
import LoginImg from '../../../../public/icons/secure-login-animate.svg'

const SignUp = () => {
  return (
    <section
      className='w-full flex h-screen overflow-hidden'
    >
        <AuthForm type="sign-up" />
 
      <div className='hidden lg:flex w-full bg-blue-50 justify-center items-center'>
        <Image
          src={LoginImg}
          alt='Hero Image'
          width={500}
          height={500}
          className='object-contain relative w-full'
        />
      </div>

    </section>
  )
}

export default SignUp