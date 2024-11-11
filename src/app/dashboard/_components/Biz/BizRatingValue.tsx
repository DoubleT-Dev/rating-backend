'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";

const BizRatingValue = ({ ratingValue }: any) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <section className="md:pt-6 w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-primary text-xl md:text-2xl font-bold">
                            {/* <span>{biz.review_count ?? 0} reviews</span> */}
                        </div>
                    </div>
                </div>
                <div className="highlights mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 justify-center contents-center mx-auto gap-4">
                        {
                            ratingValue.map((category: any) => (
                                <div key={category.rating_category_id} className="relative bg-blue-50 p-4 rounded-xl">
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=112791&format=png&color=000000"
                                        width={50}
                                        height={50}
                                        alt="User"
                                        className="mx-auto"
                                    />
                                    <p className="mt-1 text-sm font-medium text-gray-600 text-center">
                                        {category.rating_category_name}
                                    </p>
                                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {category.count}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BizRatingValue;