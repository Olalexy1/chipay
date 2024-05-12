"use client"
import React, { useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay"
import reviewImg from "../../public/images/ajayi-Olalekan.jpg";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";

const ReviewsSection = () => {

    return (
        <section className='w-full max-container'>

            <h1 className="font-montserrat font-semibold text-2xl mb-3 text-slate-800">
                What Our <span className='text-blue-800'>Users</span> are Saying?
            </h1>

            <Carousel
                opts={{
                    align: "start",
                    loop: true
                }}
                className="w-full"
                plugins={[
                    Autoplay({
                        delay: 4500,
                        // stopOnInteraction: true
                    }),
                ]}
            >

                <div className='flex justify-between items-center mb-5'>
                    <p className="flex-grow font-montserrat text-base text-slate-400 leading-none break-normal text-balance">
                        Hear genuine stories from our satisfied users about their exceptional experiences with us.
                    </p>

                    <div className='flex space-x-2'>
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </div>

                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className='rounded-2xl'>
                                    <CardContent className="flex aspect-auto items-center justify-center p-6 relative isolate overflow-hidden bg-white rounded-2xl">
                                        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
                                        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
                                        <figure className="">
                                            <blockquote className="text-center text-sm lg:text-lg font-semibold leading-8 text-gray-900 sm:text-xl sm:leading-9">
                                                <p>
                                                    “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias
                                                    molestiae. Numquam corrupti in laborum sed rerum et corporis.”
                                                </p>
                                            </blockquote>
                                            <figcaption className="mt-10">
                                                <Image
                                                    className="mx-auto h-10 w-10 rounded-full object-cover"
                                                    src={reviewImg}
                                                    alt=""
                                                    height={100}
                                                    width={100}
                                                    priority
                                                />
                                                <div className="mt-4 flex items-center flex-col justify-center space-x-3 text-base">
                                                    <p className="font-semibold text-blue-800">Ajayi Olalekan</p>
                                                    <p className="text-gray-600">CEO of Lorem</p>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    )
}

export default ReviewsSection