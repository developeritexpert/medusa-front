"use client";

import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import ProductCard from "./product-card";

export default function ProductCarousel({ title, category , products }) {
    const sliderRef = useRef(null);
    const [slidesToShow, setSlidesToShow] = useState(4);
    const [windowWidth, setWindowWidth] = useState(0);

     useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);
            
            if (width < 480) {
                setSlidesToShow(2);
            } else if (width < 768) {
                setSlidesToShow(3);
            } else if (width < 1024) {
                setSlidesToShow(4);
            } else {
                setSlidesToShow(4);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        if (sliderRef.current) {
            setTimeout(() => {
                sliderRef.current.slickGoTo(0);
            }, 100);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [slidesToShow]);

     const NextArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="group cursor-pointer absolute lg:left-[-50px] left-auto md:right-auto right-[40px] md:top-1/2 top-[100%] md:-translate-y-1/2 z-10 bg-[#F2F2F2] rounded-full p-2 transition flex items-center justify-center h-[30px] w-[30px] md:h-[40px] md:w-[40px] hover:bg-gradient-to-r hover:from-[#0A90C8] hover:to-[#3EE8F0]"
        >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="fill-black group-hover:fill-white transition"
            >
                <path d="M6.46536 0.000206862L7.43643 0.974722L1.93183 6.45662L7.44537 12.1593L6.4571 13.1152L1.0684e-07 6.43874L6.46536 0.000206862Z"/>
            </svg>
        </button>
    );

    const PrevArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="group cursor-pointer absolute lg:right-[-50px] right-0 md:top-1/2 top-[100%] md:-translate-y-1/2 z-10 bg-[#F2F2F2] rounded-full p-2 transition flex items-center justify-center h-[30px] w-[30px] md:h-[40px] md:w-[40px] hover:bg-gradient-to-r hover:from-[#0A90C8] hover:to-[#3EE8F0]"
        >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="fill-black group-hover:fill-white transition rotate-180"
            >
                <path d="M6.46536 0.000206862L7.43643 0.974722L1.93183 6.45662L7.44537 12.1593L6.4571 13.1152L1.0684e-07 6.43874L6.46536 0.000206862Z"/>
            </svg>
        </button>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
            <>
                 <div className="flex items-center justify-between md:mb-8 mb-4 gap-[20px] px-[10px]">
                    <h2 className="text-lg md:text-2xl lg:text-4xl font-bold text-right">
                        {title}
                    </h2>
                    <div className="text-sm text-right">
                        <span>--הצע את הסחורות</span>
                    </div>
                </div>

                <div className="relative md:pb-0 pb-[40px]">
                    <Slider ref={sliderRef} {...settings}>
                        {products.map((product) => (
                            <div key={product.id} className="px-2">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </Slider>
                </div>
           </>
    );
}
