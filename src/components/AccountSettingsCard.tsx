import React from 'react'

const AccountSettingsCard = ({ children, title, description }: AccountSettingsCardProps) => {
    return (
        <div className='flex flex-col md:flex-row w-full border border-blue-300 rounded-md p-4 gap-4 md:gap-0'>
            <div className='flex flex-col md:w-4/12'>
                <h1 className='font-semibold text-base'>
                    {title}
                </h1>
                <p className='text-[14px] text-slate-500 font-normal'>
                    {description}
                </p>
            </div>

            <div className='flex w-full flex-1 bg-blue-50 rounded-md p-4'>
                {children}
            </div>

        </div>
    )
}

export default AccountSettingsCard