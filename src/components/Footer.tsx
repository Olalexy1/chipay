"use client"

import { logoutAccount } from '@/lib/actions/user.actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { MdLogout } from "react-icons/md";
import { startHolyLoader, stopHolyLoader } from 'holy-loader';
import { showToast } from '@/lib/utils';

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    startHolyLoader();
    try {
      const loggedOut = await logoutAccount();

      sessionStorage.removeItem("verificationCheckerDisplayed");
      // sessionStorage.clear();

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
    <footer className="footer">
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        <p className="text-xl font-bold text-gray-700">
          {user?.firstName[0]}
        </p>
      </div>

      <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
        <h1 className="text-14 truncate text-gray-700 font-semibold">
          {user?.firstName}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>

      <div className="footer_image" onClick={handleLogOut}>
        <MdLogout className='text-gray-600' />
      </div>
    </footer>
  )
}

export default Footer