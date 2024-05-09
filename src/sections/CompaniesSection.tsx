import React from 'react'
import Marquee from "react-fast-marquee";
import Image from 'next/image';
import { MarqueImages } from '@/constants';

const CompaniesSection = () => {
  return (
    <section className='w-full flex'>
      <Marquee
        speed={30}
        direction='left'
        pauseOnClick
        gradient
        gradientColor='white'
        gradientWidth={'100px'}
        className=''
      >
        {
          MarqueImages.map((item) => (
            <Image
              key={item.id}
              src={item.src}
              alt={item.name}
              width={150}
              height={200}
              className='mx-5'
            />
          ))
        }


      </Marquee>
    </section>
  )
}

export default CompaniesSection