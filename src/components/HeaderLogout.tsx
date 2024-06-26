"use client"
import React from 'react'
import HeaderBox from './HeaderBox'
import { startHolyLoader, stopHolyLoader } from 'holy-loader';
import { showToast } from '@/lib/utils';
import { useRouter } from 'next/navigation'
import { logoutAccount } from '@/lib/actions/user.actions';
import { LogOut } from "lucide-react"

const HeaderLogout = () => {

    const router = useRouter();

    const handleLogOut = async () => {
        startHolyLoader();
        try {
            const loggedOut = await logoutAccount();

            sessionStorage.removeItem("verificationCheckerDisplayed");

            if (loggedOut) {
                router.push('/sign-in')
            }

        } catch (error) {
            showToast("error", `Logout failed: ${error}`);

        } finally {
            stopHolyLoader();
        }

    }


    return (
        <HeaderBox
            title="Account Settings"
            subtext="Modify your account details here."
            variant="outline"
            buttonTitle='Log Out'
            icon={<LogOut className="mr-2 h-4 w-4" />}
            buttonClassName='text-red-600 font-semibold border-red-600 border hover:bg-red-600 hover:text-white'
            isButton
            onClick={handleLogOut}
        />
    )
}

export default HeaderLogout