import React from 'react';
import Image from "next/image";
import ServicesImage from '../../public/icons/mobile-payments-services.svg'
import { CircleCheckBig } from 'lucide-react';
import { Services } from '@/constants'

const ServiceSection = () => {
  return (
    <section className="flex justify-between items-start  max-md:flex-col-reverse gap-10 max-container">

      <div className="flex flex-1 flex-col justify-start">
        <h1 className="font-montserrat font-semibold text-2xl mb-3 text-slate-800">
          Simple and Reliable Payment
        </h1>
        <p className="font-montserrat text-balance text-base text-slate-400 mb-5">
          Experience the freedom of effortless payments, anywhere you go.
        </p>

        <div className="bg-blue-50 rounded-2xl flex-1">
          <Image
            src={ServicesImage}
            alt='Hero Image'
            width={500}
            height={500}
            className='object-contain relative size-full'
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <h1 className="font-montserrat font-semibold text-2xl mb-3 text-slate-800">
          Our unique <br />
          Payment Services
        </h1>
        <p className="font-montserrat text-base text-slate-400 mb-5 w-10/12 text-balance">
          Discover convenience, security, and global reach with our payment services. From seamless transactions to robust security features, we offer a comprehensive platform for all your financial needs. Experience peace of mind knowing your transactions are handled with care and efficiency.
        </p>

        <ul className="flex flex-wrap mb-5">
          {
            Services.map((item) => (
              <li key={item.id} className="flex flex-grow w-1/2 justify-start items-center space-x-2 mb-3">
                <CircleCheckBig className="stroke-blue-800 stroke-2" />
                <p className="font-montserrat text-base font-semibold text-slate-800">{item.name}</p>
              </li>
            ))
          }

        </ul>

        <h1 className="font-montserrat font-semibold text-2xl mb-3 text-slate-800">
          Enjoy Phenomenal <br />
          Transaction Success Rates
        </h1>
        <p className="font-montserrat text-base text-slate-400 w-10/12 text-balance mb-10">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur omnis repellat sit, corrupti doloremque commodi atque doloribus perspiciatis quas ullam itaque error dignissimos reprehenderit nulla nihil nam aspernatur explicabo debitis!
        </p>

        <p className="font-montserrat text-base text-slate-400 w-10/12 text-balance">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur omnis repellat sit, corrupti doloremque commodi atque doloribus perspiciatis quas ullam itaque error dignissimos reprehenderit nulla nihil nam aspernatur explicabo debitis!
        </p>
      </div>
    </section>
  )
}

export default ServiceSection