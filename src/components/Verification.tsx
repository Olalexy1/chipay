'use client';
import Button from '@/components/Button';
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { createUserEmailVerification } from '@/lib/actions/user.actions';
import { showToast } from '@/lib/utils';

const Verification = ({ user }: any) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleVerificationResend = async () => {
        setIsLoading(true);

        try {
            if (user) {
                const data = await createUserEmailVerification();

                if (data) {
                    showToast("success", "Verification email sent");
                }
            }
        } catch {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section
            className='w-full flex justify-center items-center'
        >
            <div className='flex flex-col justify-center items-center gap-y-3 w-11/12 md:w-9/12'>
                <h1 className='capitalize font-montserrat font-semibold text-xl text-center'>Please verify your email address</h1>

                <p className='text-center'>
                    In order to login into your account, verify ownership of the email address provided. Go to your email and click on the verification link sent.
                </p>

                <p className='text-center'>
                    If you did not receive an email and wish to have it sent again please click the resend verification email button below.
                </p>

                <div className="pt-10">
                    <form action={handleVerificationResend}>
                        <Button isDisabled={isLoading} className="py-3">
                            {isLoading ? (
                                <div className='flex items-center space-x-1'>
                                    <Loader2 size={20} className="animate-spin" />
                                    <p className='text-[14px]'>Resending Email...</p>
                                </div>
                            ) : 'Resend Verification Email'}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Verification