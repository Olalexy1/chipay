import HeaderBox from '@/components/HeaderBox'
import React from 'react'

const AccountSettings = () => {
  return (
    <div className="transactions scrollbar-thumb-blue-800 scrollbar-track-gray-100 scrollbar-thin overflow-y-scroll min-h-screen">
      <div className="transactions-header">
        <HeaderBox
          title="Account Settings"
          subtext="Modify your account details here."
        />
      </div>
      
    </div>
  )
}

export default AccountSettings
