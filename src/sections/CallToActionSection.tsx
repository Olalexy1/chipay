import React from 'react';
import Link from 'next/link';

const CallToActionSection = () => {
  return (
    <section className='w-full flex flex-col lg:flex-row justify-between space-y-4 max-container'>

      <div>
        <h1 className='font-montserrat font-bold text-blue-800 text-4xl'>
          Ready to get started?
        </h1>

        <p className="font-montserrat text-lg text-slate-gray mt-3">
          Create an account and instantly start receiving <br/> and sending payments in some minutes.
        </p>
      </div>


      <Link className='primary-button group w-fit' href="/sign-up">
        <p className='primary-button-text'>Create an account</p>
      </Link>

    </section>
  )
}

export default CallToActionSection