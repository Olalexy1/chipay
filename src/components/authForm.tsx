'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Button from './Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import CustomInput from './customInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';
// import PlaidLink from './PlaidLink';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      // Sign up with Appwrite & create plaid token

      if (type === 'sign-up') {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password
        }

        // const newUser = await signUp(userData);

        // setUser(newUser);
      }

      if (type === 'sign-in') {
        // const response = await signIn({
        //   email: data.email,
        //   password: data.password,
        // })

        // if(response) router.push('/')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-form h-screen pb-5">
      <header className='flex flex-col sticky top-0 mb-8 bg-white py-3 mr-5'>
        <div className='flex justify-between items-center'>
          <Link href="/" className="cursor-pointer flex items-center gap-2">
            <Image
              src="/images/chiPayLogo.png"
              width={40}
              height={40}
              alt="ChiPay Logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-blue-800">ChiPay</h1>
          </Link>

          <div className='flex item-center space-x-2'>
            <p className="text-14 font-normal text-gray-600 hidden md:flex">
              {type === 'sign-in'
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="font-semibold font-montserrat text-14 text-blue-800 no-underline outline-none transition-colors">
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </div>

        </div>
      </header>

      <div className='flex relative flex-col h-full justify-center items-center scrollbar-none scrollbar-thumb-blue-800 scrollbar-track-white md:scrollbar-thin scrollbar-thumb-rounded-2xl mb-5 pr-5 overflow-y-auto md:px-[10%] lg:px-[12%]'>
        {user ? (
          <div className="flex flex-col gap-4">
            {/* do something with user if logged in */}
          </div>
        ) : (
          <div className='w-full h-full flex-1'>
            <div className={`flex flex-col h-full ${type === 'sign-in' ? 'justify-center' : ''}`}>
              <div className="flex flex-col mt-5 gap-1 md:gap-3">
                <h1 className="font-montserrat text-24 lg:text-36 font-semibold text-gray-900 mb-5">
                  {user
                    ? 'Link Account'
                    : type === 'sign-in'
                      ? 'Sign into your account'
                      : 'Sign up a new account'
                  }
                  <p className="text-16 font-normal text-gray-600">
                    {user
                      ? 'Link your account to get started'
                      : 'Please enter your details'
                    }
                  </p>
                </h1>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {type === 'sign-up' && (
                    <>
                      <div className="flex gap-4">
                        <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' />
                        <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your last name' />
                      </div>

                      <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' type="email" />

                      <CustomInput control={form.control} name='address1' label="Address" placeholder='Enter your specific address' />

                      <CustomInput control={form.control} name='city' label="City" placeholder='Enter your city' />
                      <div className="flex gap-4">

                        <CustomInput control={form.control} name='state' label="State" placeholder='Example: Lagos State' />

                        <CustomInput control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' />

                      </div>
                      {/* <div className="flex gap-4">
                      <CustomInput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
                      <CustomInput control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
                    </div> */}
                    </>
                  )}

                  <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' type="password" />

                  <CustomInput control={form.control} name='confirmPassword' label="Confirm Password" placeholder='Confirm your password' type="password" />

                  <div className="pb-10">
                    <Button type="submit" isDisabled={isLoading} className="py-3">
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" /> &nbsp;
                          <span>Loading...</span>
                        </>
                      ) : type === 'sign-in'
                        ? 'Sign In' : 'Sign Up'}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        )}
      </div>

      <div className='flex w-full justify-between pr-5'>
          <Link className='text-[14px] text-slate-500 font-normal hover:text-blue-800 duration-500 leading-none' href='#'>Privacy Policy</Link>
          <Link className='text-[14px] text-slate-500 font-normal hover:text-blue-800 duration-500 leading-none' href='#'>Terms Of Service</Link>
      </div>

    </section>
  )
}

export default AuthForm