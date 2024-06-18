"use client"
import React, { useCallback, useEffect, useMemo } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { showToast } from '@/lib/utils';
import Verification from '@/components/Verification';
import Modal from '@/components/Modal';

const VerificationChecker = ({ emailVerified, userId }: VerificationChecker) => {

    const verificationDisplayed = sessionStorage.getItem("verificationCheckerDisplayed");

    console.log(verificationDisplayed, 'see verification displayed')

    // const url = document.referrer
    // console.log(url, ": see url")

    const handleRouteChange = useCallback(() => {

        if (document.referrer.includes("verify-email") && emailVerified && userId) {
            console.log("Email verification complete");
            showToast("success", "Account verification successful");
            return;
        }

        // if (emailVerified && userId) {
        //     console.log("Email verification complete");
        //     showToast("success", "Account verification successful");
        //     return;
        // }

        if (userId && !emailVerified && !verificationDisplayed) {
            console.log("Email not verified");
            setTimeout(() => {
                showToast("warning", "Account is not yet verified");
                sessionStorage.setItem("verificationCheckerDisplayed", "true");
            }, 5000)
            return;
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emailVerified, userId])

    // handleRouteChange();

    useEffect(() => {
        handleRouteChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return null;


    return (
        <div>
            <Modal type='Dialog'>
                <Verification type='OldUser' userId={userId} />
            </Modal>
        </div>
    )
}

export default React.memo(VerificationChecker)
