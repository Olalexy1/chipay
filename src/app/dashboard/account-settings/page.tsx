import React from 'react'
import AccountSettingsCard from '@/components/AccountSettingsCard'
import { getLoggedInUser, logoutAccount } from '@/lib/actions/user.actions';
import PersonalForm from '@/components/personalForm';
import PasswordForm from '@/components/passwordForm';
import HeaderLogout from '@/components/HeaderLogout';

const AccountSettings = async () => {

  const user: LoggedInUserProps = await getLoggedInUser();

  if (!user) return;

  return (
    <div className="transactions scrollbar-thumb-blue-800 scrollbar-track-gray-100 scrollbar-thin overflow-y-scroll min-h-screen bg-blue-50 pb-20">
      <div className="transactions-header">
        <HeaderLogout/>
      </div>

      <AccountSettingsCard title={'Personal Information'} description={'Update your personal details here'}>
        <PersonalForm user={user} />
      </AccountSettingsCard>

      <AccountSettingsCard title={'Password'} description={'Enter your current password to make update'} className='mb-20 md:mb-0'>
        <PasswordForm user={user} />
      </AccountSettingsCard>

    </div>
  )
}

export default AccountSettings
