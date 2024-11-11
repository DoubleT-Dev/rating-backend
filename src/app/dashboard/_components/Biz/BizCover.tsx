"use client"

import Image from "next/image";
import React from "react";
import { BeakerIcon, BuildingStorefrontIcon, PhoneArrowUpRightIcon, PhoneIcon, TagIcon } from '@heroicons/react/24/solid'

const BizCover = (props: any) => {

    const { biz } = props;

    return (
        
        <section className="relative w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
            <Image
                src="https://wallpapercave.com/wp/wp1874174.jpg"
                width={1920}
                height={600}
                alt="Restaurant Hero Image"
                className="w-full h-full object-cover rounded-none md:rounded-3xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:py-10 bg-gradient-to-t from-black/90 to-black/70 rounded-none md:rounded-b-3xl">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-5">{biz?.name_en}</h1>
                        <div className="flex gap-2 text-white flex-col text-sm font-semibold">
                            <span>{biz?.description}</span>
                            <div className="flex items-center">
                                <BuildingStorefrontIcon className="w-4 h-4 mr-2" />
                                <p>{biz.addresses[0].address_1}</p>
                            </div>
                            <div className="flex items-center">
                                <PhoneArrowUpRightIcon className="w-4 h-4 mr-2" />
                                <p>{biz.addresses[0].contact}</p>
                            </div>
                            <div className="flex items-center">
                                <TagIcon className="w-4 h-4 mr-2" />
                                <p>{biz.addresses[0].township} , {biz.addresses[0].region}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BizCover;