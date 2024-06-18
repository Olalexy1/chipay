'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from './Button';
import {
  Form,
} from "@/components/ui/form";
import CustomInput from './customInput';
import { authFormSchema, showToast, encryptId } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';
import { FaEye, FaEyeSlash, FaCalendarAlt } from 'react-icons/fa';
import Verification from './Verification';
import { startHolyLoader, stopHolyLoader } from 'holy-loader';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const handleClick = () => setShow(!show);
  const handleClickTwo = () => setShowTwo(!showTwo);

  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleShowPicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

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
      // Sign up with Appwrite
      startHolyLoader();

      if (type === 'sign-up') {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          email: data.email!,
          password: encryptId(data.password!)
        }

        const newUser = await signUp(userData);

        // console.log(newUser, 'See New Data')

        setUser(newUser?.data);

        if (newUser.error) {
          showToast("error", `Sign Up failed: ${newUser.error || newUser.error.error}`);
        } else {
          showToast("success", "Sign up successful");
          // router.push('/dashboard');
          showToast("info", "Verification email sent");
        }
      }

      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email!,
          password: encryptId(data.password!),
        })

        if (response?.error) {
          showToast("error", `Sign in failed: ${response.error}`);
        }
        else {
          router.push('/dashboard');
        }
      }
    } catch (error) {
      console.log(error);
      showToast("error", `${type === 'sign-in' ? 'Sign in failed' : 'Sign up failed'} ${error}`);
      stopHolyLoader();
    } finally {
      setIsLoading(false);
      stopHolyLoader();
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
            <Verification userId={user.userId} type='NewUser' />
          </div>
        ) : (
          <div className='w-full h-full flex-1'>
            <div className={`flex flex-col h-full ${type === 'sign-in' ? 'justify-center' : ''}`}>
              <div className="flex flex-col mt-5 gap-1 md:gap-3">
                <h1 className="font-montserrat text-24 lg:text-36 font-semibold text-gray-900 mb-5">
                  {user
                    ? 'Verify your Account'
                    : type === 'sign-in'
                      ? 'Sign into your account'
                      : 'Sign up a new account'
                  }
                  <p className="text-16 font-normal text-gray-600">
                    {user
                      ? 'Verify your account to get started'
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
                        <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' inputType='text' autoComplete="given-name" id="firsName" />
                        <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your last name' inputType='text' autoComplete="family-name" id='lastName' />
                      </div>

                      <CustomInput control={form.control} name='address1' label="Address" placeholder='Enter your specific address' autoComplete='street-address' id='address1' />

                      <CustomInput control={form.control} name='city' label="City" placeholder='Enter your city' autoComplete='on' id='city' />
                      <div className="flex gap-4">

                        <CustomInput control={form.control} name='state' label="State" placeholder='Enter your state' autoComplete='on' id='state' />

                        <CustomInput control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' autoComplete='section-user1 billing postal-code' id='postalCode' />

                      </div>
                      <div className="flex gap-4">
                        <CustomInput control={form.control}
                          name='dateOfBirth'
                          label="Date of Birth"
                          placeholder='YYYY-MM-DD'
                          inputType="date" id='dateOfBirth'
                          className='datepicker-input'
                          rightIcon={<FaCalendarAlt />}
                          onRightIconClick={handleShowPicker}
                          ref={dateInputRef}
                        />
                      </div>
                    </>
                  )}

                  <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' inputType="email" autoComplete='email' id='email' />

                  <CustomInput control={form.control}
                    name='password' label="Password"
                    placeholder='Enter your password'
                    inputType={show ? 'text' : 'password'}
                    id='password'
                    rightIcon={show ? <FaEye /> : <FaEyeSlash />}
                    onRightIconClick={handleClick}
                  />

                  {type === 'sign-up' && (

                    <CustomInput control={form.control}
                      name='confirmPassword' label="Confirm Password" placeholder='Confirm your password'
                      inputType={showTwo ? 'text' : 'password'}
                      id='confirmPassword'
                      rightIcon={showTwo ? <FaEye /> : <FaEyeSlash />}
                      onRightIconClick={handleClickTwo}
                    />

                  )}

                  <div className="pb-10">
                    <Button type="submit" isDisabled={isLoading} className="py-3">
                      {isLoading ? (
                        <div className='flex items-center space-x-1'>
                          <Loader2 size={20} className="animate-spin" />
                          <p className='text-[14px]'>Loading...</p>
                        </div>
                      ) : type === 'sign-in'
                        ? 'Sign In' : 'Sign Up'}
                    </Button>
                  </div>

                  {/* <div className="pb-10">
                    
                  </div> */}

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