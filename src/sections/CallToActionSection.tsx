import React from 'react';
import Link from 'next/link';

const CallToActionSection = () => {
  return (
    <section className='w-full flex flex-col lg:flex-row justify-between space-y-4'>

      <div>
        <h1 className='font-palanquin font-bold text-blue-800 text-4xl'>
          Ready to get started?
        </h1>

        <p className="font-montserrat  text-lg text-slate-800">
          Create an account and instantly start accepting payments
        </p>
      </div>


      <Link className='primary-button group' href="/sign-up">
        <p className='primary-button-text'>Create an Account</p>
      </Link>

    </section>
  )
}

export default CallToActionSection