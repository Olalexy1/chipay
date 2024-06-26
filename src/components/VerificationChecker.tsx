"use client"
import React, { useCallback, useEffect } from 'react'
// import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { showToast } from '@/lib/utils';
import Verification from '@/components/Verification';
import Modal from '@/components/Modal';
import { createUserEmailVerification } from '@/lib/actions/user.actions';
import Button from './Button';
import { Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

const VerificationChecker = ({ emailVerified, userId, type }: VerificationChecker) => {

    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const pathname = usePathname();

    const handleModalState = () => {
        setOpen(!open);
    };

    const handleVerificationResend = async () => {
        setIsLoading(true);

        try {
            if (userId) {
                const data = await createUserEmailVerification();

                if (data) {
                    showToast("info", "Verification email sent");
                }
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const verificationDisplayed = sessionStorage.getItem("verificationCheckerDisplayed");

    const handleRouteChange = useCallback(() => {

        if (pathname === '/verify-email' && emailVerified && userId) {
            showToast("success", "Account verification successful");
            // console.log("Email verified 2");
        }

        else if (userId && !emailVerified && !verificationDisplayed) {
            // console.log("Email not verified");
            setTimeout(() => {
                showToast("warning", "Account is not yet verified");
                sessionStorage.setItem("verificationCheckerDisplayed", "true");
                handleModalState()
            }, 3000)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emailVerified])

    useEffect(() => {
        handleRouteChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Modal type='AlertDialog' modalOpen={open} modalHandle={handleModalState}>
                <div>
                    <Verification type={type} userId={userId} />

                    <div className='flex flex-row justify-between mt-4'>

                        <form action={handleVerificationResend}>
                            <Button isDisabled={isLoading} className="py-3">
                                {isLoading ? (
                                    <div className='flex items-center space-x-1'>
                                        <Loader2 size={20} className="animate-spin" />
                                        <p className='text-[14px]'>Resending Email...</p>
                                    </div>
                                ) : (<p className='text-[14px]'>Resend <span className='hidden md:inline-flex'>Verification</span> Email</p>)}
                            </Button>
                        </form>

                        <Button onClick={handleModalState} className="py-3" backgroundColor='bg-red-600' borderColor='border-red-600' textColor='text-white'>
                            <div className='flex items-center'>
                                <p className='text-[14px]'>Close</p>
                            </div>
                        </Button>

                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default React.memo(VerificationChecker)
