"use client";

import { useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";

export default function ProductCarousel({ title, category }) {
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
    };

    return (
            <>
                <div className="relative">
                    <Slider ref={sliderRef} {...settings}>
                        <div className="flex justify-center items-center">
                            <Image src="/img/bimg-slider1.webp" alt="Logo" height={1500} width={1500} className="w-full md:h-auto h-[250px] object-cover object-left"/>
                        </div>
                        <div className="flex justify-center items-center">
                            <Image src="/img/bimg-slider1.webp" alt="Logo" height={1500} width={1500} className="w-full md:h-auto h-[250px] object-cover object-left"/>
                        </div>
                        <div className="flex justify-center items-center">
                            <Image src="/img/bimg-slider1.webp" alt="Logo" height={1500} width={1500} className="w-full md:h-auto h-[250px] object-cover object-left"/>
                        </div>
                    </Slider>
                </div>
           </>
    );
}
