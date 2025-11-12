"use client";

import { useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";

export default function ProductCarousel({ title, category }) {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 8,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 6 },
            },
            {
                breakpoint: 767,
                settings: { slidesToShow: 4 },
            },
            {
                breakpoint: 575,
                settings: { slidesToShow: 3 },
            },
        ],
    };

    return (
            <>
                <div className="relative">
                    <Slider ref={sliderRef} {...settings}>
                        <div className="flex justify-center items-center">
                            <Image src="/icons/apple.png" alt="Logo" height={100} width={100} className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] md:min-w-[100px] md:min-h-[100px] md:max-w-[100px] md:max-h-[100px] object-contain"/>
                        </div>
                        <div className="flex justify-center items-center">
                            <Image src="/icons/acer.png" alt="Logo" height={100} width={100} className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] md:min-w-[100px] md:min-h-[100px] md:max-w-[100px] md:max-h-[100px] object-contain"/>
                        </div>
                        <div className="flex justify-center items-center">
                            <Image src="/icons/fujitsu.png" alt="Logo" height={100} width={100} className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] md:min-w-[100px] md:min-h-[100px] md:max-w-[100px] md:max-h-[100px] object-contain"/>
                        </div>
                        <div className="flex justify-center items-center">
                            <Image src="/icons/compaq.png" alt="Logo" height={100} width={100} className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] md:min-w-[100px] md:min-h-[100px] md:max-w-[100px] md:max-h-[100px] object-contain"/>
                        </div>
                        <div className="flex justify-center items-center">
                            <Image src="/icons/dell.png" alt="Logo" height={100} width={100} className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] md:min-w-[100px] md:min-h-[100px] md:max-w-[100px] md:max-h-[100px] object-contain"/>
                        </div>
                        <div className="flex justify-center items-center">
                            <Image src="/icons/toshiba.png" alt="Logo" height={100} width={100} className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] md:min-w-[100px] md:min-h-[100px] md:max-w-[100px] md:max-h-[100px] object-contain"/>
                        </div>
                        <div className="flex justify-center items-center">
                            <Image src="/icons/hp.png" alt="Logo" height={100} width={100} className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] md:min-w-[100px] md:min-h-[100px] md:max-w-[100px] md:max-h-[100px] object-contain"/>
                        </div>
                        <div className="flex justify-center items-center">
                            <Image src="/icons/ibm.png" alt="Logo" height={100} width={100} className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] md:min-w-[100px] md:min-h-[100px] md:max-w-[100px] md:max-h-[100px] object-contain"/>
                        </div>
                        <div className="flex justify-center items-center">
                            <Image src="/icons/acer.png" alt="Logo" height={100} width={100} className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] md:min-w-[100px] md:min-h-[100px] md:max-w-[100px] md:max-h-[100px] object-contain"/>
                        </div>
                        <div className="flex justify-center items-center">
                            <Image src="/icons/compaq.png" alt="Logo" height={100} width={100} className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] md:min-w-[100px] md:min-h-[100px] md:max-w-[100px] md:max-h-[100px] object-contain"/>
                        </div>
                    </Slider>
                </div>
           </>
    );
}
