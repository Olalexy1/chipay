"use client";

import React, { useEffect, useState } from 'react';
import {
    createUserEmailVerificationConfirmation,
    getLoggedInUser,
} from "@/lib/actions/user.actions";
import { showToast } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProcessingImg from '../../../../public/icons/processing-animate.svg';
import { startHolyLoader, stopHolyLoader } from 'holy-loader';
import VerificationChecker from '@/components/VerificationChecker';

const VerifyEmail = ({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) => {

    const router = useRouter();
    const [verifiedFailed, setVerifiedFailed] = useState(false);
    const [newUserId, setNewUserId] = useState<string>();
    const [userVerification, setUserVerification] = useState<boolean>();

    useEffect(() => {

        const handleVerification = async () => {

            startHolyLoader();

            try {

                const loggedIn = await getLoggedInUser();

                let emailVerification = loggedIn?.emailVerification

                if (searchParams) {
                    const userId = searchParams.userId!.toString();
                    const secret = searchParams.secret!.toString();

                    setNewUserId(userId)

                    const response = await createUserEmailVerificationConfirmation({
                        userId: userId,
                        secret: secret,
                    })

                    setUserVerification(emailVerification);

                    if (emailVerification) {
                        showToast("success", "Account already verified");
                        // console.log("Email already verified");
                        router.push('/dashboard');
                    } else if (response?.error && !emailVerification) {
                        showToast("error", `Verification failed: ${response.error}`);
                        // console.log("Email verification failed");
                        setVerifiedFailed(true);
                    }
                    else {
                        showToast("success", "Account verification successful");
                        // console.log("Email verified 1");
                        router.push('/dashboard');
                    }
                }
            } catch (error) {
                showToast("error", `Verification failed: ${error}`);
                setVerifiedFailed(true);
                // console.log("Email verification failed inside catch");
            } finally {
                stopHolyLoader();
            }
        }

        handleVerification();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section
            className='w-full flex flex-col h-screen overflow-hidden justify-center items-center'
        >
            <h1 className='font-semibold font-montserrat text-lg text-blue-800'>Account verification in progress...</h1>
            <Image
                src={ProcessingImg}
                alt='Processing Image'
                width={500}
                height={500}
                className='object-contain relative'
            />

            {
                verifiedFailed &&
                <VerificationChecker emailVerified={userVerification!} userId={newUserId!} type="NewUser" />
            }
        </section>
    )
}

export default VerifyEmail