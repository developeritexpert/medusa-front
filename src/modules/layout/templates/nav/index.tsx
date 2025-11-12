"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <button
      aria-label="previous"
      className="absolute !left-0 text-white text-[24px] z-[1] top-1/2 -translate-y-1/2 bg-none border-none"
      onClick={onClick}
    >
      <svg
        width="9"
        height="14"
        viewBox="0 0 9 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.88668 0.424035L7.85776 1.39855L2.35316 6.88045L7.8667 12.5831L6.87843 13.5391L0.421324 6.86257L6.88668 0.424035Z"
          fill="white"
          stroke="white"
          strokeWidth="0.6"
        />
      </svg>
    </button>
  );
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <button
      aria-label="next"
      className="absolute !right-0 text-white text-[24px] z-[1] top-1/2 -translate-y-1/2 bg-none border-none"
      onClick={onClick}
    >
      <svg
        width="9"
        height="14"
        viewBox="0 0 9 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.40433 13.5389L0.433257 12.5643L5.93786 7.08244L0.424316 1.37977L1.41259 0.423828L7.86969 7.10032L1.40433 13.5389Z"
          fill="white"
          stroke="white"
          strokeWidth="0.6"
        />
      </svg>
    </button>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const topbarItems = [
    "סייל חיסול – עד 30% הנחה על דגמים נבחרים!",
    "20% הנחה לסטודנטים - יש לאמת כדי לתבוע",
    "מוצרים חדשים: אולטרה בוסט 2025 זמינים כעת!",
  ];

  const topbarSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: false,
    rtl: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const navLinks = [
    { label: "צרו איתנו קשר", href: "/contact" },
    { label: "הסניפים שלנו", href: "/our-branches" },
    { label: "אודותינו", href: "" },
    { label: "אביזרים", href: "" },
    { label: "שולחנות עבודה", href: "" },
    { label: "מחשבים ניידים", href: "" },
    { label: "יבואן מְכִירָה", href: "" },
  ]

  return (
    <header className="w-full">
      <div className="relative flex items-center justify-center bg-black text-white py-[12px] px-4 overflow-hidden">
        <div className="w-full max-w-[800px]">
          <Slider {...topbarSettings}>
            {topbarItems.map((text, i) => (
              <div key={i} className="text-center h-full">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis text-[12px] md:text-[14px] leading-[28px]">
                  {text}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 p-[12px_20px] bg-white max-w-[1800px] mx-auto sm:flex-row flex-col">
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link href="/">
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={200}
              height={200}
              className="w-[120px]"
            />
          </Link>
        </div>

        <div className="hidden lg:flex flex-1 md:min-w-[180px] md:min-w-[180px] max-w-full">
          <div className="relative flex items-center rounded-full py-[6px] px-[8px] bg-[#0A90C805] border border-[#0A90C814] shadow-[inset_0_1px_0_rgba(0,0,0,0.02)]">
            <input
              type="search"
              placeholder="חפש מוצר, קטגוריה או מותג"
              className="flex-1 border-none outline-none bg-transparent py-[8px] px-[10px] text-[14px] text-right pr-[30px]"
            />
            <Image
              src="/img/search.png"
              alt="Search"
              width={15}
              height={15}
              className="absolute right-[15px] w-[15px]"
            />
          </div>
        </div>

        <div className="flex items-center sm:gap-[20px] gap-[10px] flex-shrink-0 sm:w-auto w-full sm:justify-start justify-around">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              className="sr-only peer"
            />
            <div
              className="
                relative w-12 h-6 rounded-full
              bg-[#1921610D] dark:bg-[#1921610D]
              peer-checked:bg-[#0A90C8] dark:peer-checked:bg-[#0A90C8]
                transition-colors duration-300
                after:content-[''] after:absolute after:top-[3px] after:left-[2px]
                after:bg-white after:rounded-full after:h-[18px] after:w-[18px] after:shadow-sm
                after:border after:border-[#1921610D] dark:after:border-[#1921610D]
                after:transition-transform after:duration-300
                peer-checked:after:translate-x-[24px]
              "
                >
            </div>
          </label>

          <div className="flex items-center gap-1 lg:py-1 text-[14px] font-semibold text-black cursor-pointer hover:!text-[#0A90C8] duration-400">
            <Image src="/img/dive.png" alt="Eilat" width={20} height={20} />
            <span className="hidden lg:inline">
              להזמנה באילת
            </span>
          </div>

          <Link href="/login" className="flex items-center gap-1 lg-py-1 text-[14px] text-black font-semibold cursor-pointer group hover:!text-[#0A90C8] duration-400">
            <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-[20px] max-h-[20px] object-contain">
              <path d="M3.65911 14.2246H18.1406C19.0374 14.2246 19.8525 14.5876 20.4436 15.171C21.0337 15.7553 21.3999 16.5611 21.3999 17.4476C21.3999 21.2879 18.6471 23.7351 15.1234 24.7951C13.7838 25.1979 12.3383 25.4004 10.8999 25.4004C9.46151 25.4004 8.01486 25.199 6.6764 24.7951C3.15196 23.734 0.399902 21.2869 0.399902 17.4476C0.399902 16.5611 0.766085 15.7553 1.35619 15.171C1.94732 14.5876 2.76232 14.2246 3.65911 14.2246ZM10.8999 11.8492C12.3353 11.8492 13.6357 11.2738 14.5757 10.3444C15.5158 9.41403 16.0978 8.1296 16.0978 6.71066C16.0978 5.29171 15.5158 4.00613 14.5757 3.07688C13.6355 2.14763 12.3352 1.57209 10.8999 1.57209C9.46453 1.57209 8.16409 2.14748 7.2241 3.07688C6.28411 4.00629 5.70191 5.29171 5.70191 6.71066C5.70191 8.1296 6.28396 9.41518 7.2241 10.3444C8.16425 11.2737 9.46453 11.8492 10.8999 11.8492ZM15.4139 11.1731C14.2589 12.315 12.6621 13.022 10.8999 13.022C9.13659 13.022 7.5407 12.3159 6.38586 11.1731C5.23083 10.0313 4.51564 8.45379 4.51564 6.71068C4.51564 4.96854 5.22983 3.39091 6.38586 2.24824C7.54088 1.10642 9.13662 0.400391 10.8999 0.400391C12.6622 0.400391 14.2591 1.10642 15.4139 2.24824C16.5689 3.39007 17.2841 4.9686 17.2841 6.71068C17.2841 8.45382 16.5699 10.0315 15.4139 11.1731ZM18.1406 15.3974H3.65911C3.08918 15.3974 2.57069 15.6287 2.19441 15.9997C1.81815 16.3717 1.58512 16.8842 1.58512 17.4477C1.58512 20.6806 3.96879 22.76 7.02027 23.6793C8.23782 24.0462 9.56636 24.2297 10.9019 24.2297C12.2375 24.2297 13.5659 24.0462 14.7835 23.6793C17.8338 22.7598 20.2186 20.6806 20.2186 17.4477C20.2186 16.8843 19.9846 16.3717 19.6093 15.9997C19.2331 15.6277 18.7146 15.3974 18.1446 15.3974H18.1406Z" 
              fill="black" stroke="black" strokeWidth="0.8" className="group-hover:fill-[#0A90C8] group-hover:stroke-[#0A90C8] duration-400"/>
            </svg>
            <span className="hidden lg:inline">
              התחברות
            </span>
          </Link>

          <Link href="" className="group">
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-[17px] max-h-[17px] object-contain">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.9919 3.63666C10.5926 0.753269 6.59171 -0.0223651 3.58563 2.61796C0.579568 5.25829 0.156364 9.67275 2.51704 12.7955C4.47979 15.3919 10.4197 20.8677 12.3665 22.64C12.5843 22.8383 12.6933 22.9375 12.8203 22.9764C12.9311 23.0105 13.0525 23.0105 13.1633 22.9764C13.2903 22.9375 13.3993 22.8383 13.6171 22.64C15.5638 20.8677 21.5038 15.3919 23.4665 12.7955C25.8272 9.67275 25.4557 5.23052 22.3979 2.61796C19.3402 0.00541586 15.391 0.753269 12.9919 3.63666Z" 
               stroke="#0A90C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-[#3EE8F029] group-hover:fill-[#0A90C8] duration-400"/>
            </svg>
          </Link>

          <button className="lg:bg-gradient-to-r lg:from-[#3EE8F0] lg:to-[#0A90C8] text-white lg:py-[10px] lg:px-[16px] rounded-[76px] text-[14px] flex items-center gap-2 cursor-pointer">
            <svg width="23" height="27" viewBox="0 0 23 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-[15px] max-h-[15px] object-contain">
              <path d="M6.21805 9.72061H16.2828V6.66324C16.2828 5.31962 15.7166 4.09699 14.8039 3.21106C13.8911 2.32433 12.6334 1.77431 11.2504 1.77431C9.86737 1.77431 8.60887 2.32433 7.69695 3.21106C6.78503 4.09699 6.21805 5.31962 6.21805 6.66324V9.72061ZM17.851 9.723C19.0439 9.76041 20.1238 10.2491 20.9145 11.0181C21.7387 11.8188 22.25 12.9229 22.25 14.1383V21.8315C22.25 23.0478 21.7387 24.1518 20.9145 24.9525C20.0902 25.7533 18.953 26.25 17.7019 26.25H4.79732C3.54619 26.25 2.40895 25.7533 1.58552 24.9525C0.761266 24.1518 0.25 23.0478 0.25 21.8315V14.1383C0.25 12.9229 0.761266 11.818 1.58552 11.0181C2.37618 10.2491 3.45606 9.76041 4.64902 9.723V6.66324C4.64902 4.89854 5.39134 3.29543 6.58757 2.1333C7.78298 0.971161 9.43394 0.25 11.2496 0.25C13.0652 0.25 14.7162 0.971161 15.9124 2.1333C17.1078 3.29464 17.851 4.89854 17.851 6.66324V9.723ZM17.7027 11.2441H17.0669H5.43394H4.79814C3.97962 11.2441 3.23484 11.5697 2.69408 12.095C2.15414 12.6196 1.81821 13.3439 1.81821 14.1383V21.8315C1.81821 22.6267 2.15332 23.3502 2.69408 23.8756C3.23402 24.4001 3.97962 24.7265 4.79814 24.7265H17.7027C18.5212 24.7265 19.266 24.4009 19.8067 23.8756C20.3467 23.351 20.6826 22.6267 20.6826 21.8315V14.1383C20.6826 13.3431 20.3475 12.6196 19.8067 12.095C19.2668 11.5697 18.5212 11.2441 17.7027 11.2441Z"
                className="lg:fill-[#fff] lg:stroke-[#fff] fill-[#0A90C8] stroke-[#0A90C8]" />
            </svg>
            <span className="hidden lg:inline font-semibold">
              הסל שלי(0)
            </span>
          </button>

          <button
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span
              className={`block h-[2px] w-6 bg-black rounded transition-all ${menuOpen ? "rotate-45 translate-y-[6px]" : ""
                }`}
            ></span>
            <span
              className={`block h-[2px] w-6 bg-black rounded transition-all ${menuOpen ? "opacity-0" : ""
                }`}
            ></span>
            <span
              className={`block h-[2px] w-6 bg-black rounded transition-all ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                }`}
            ></span>
          </button>
        </div>
      </div>

      <nav
        className={`md:px-[20px] border-y border-[rgba(25,33,97,0.05)] bg-white transition-all duration-300 ${menuOpen ? "max-h-auto opacity-100" : "max-h-0 opacity-0"
          } lg:max-h-none lg:opacity-100 lg:block overflow-hidden`}
      >
        <div className="max-w-[1000px] mx-auto lg:flex justify-between items-center">
          <ul className="flex flex-col md:flex-row-reverse justify-center items-center gap-5 list-none m-0 py-[12px]">
            {navLinks.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="no-underline text-[#111] text-[15px] font-medium py-1 hover:!text-[#0A90C8] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex lg:justify-start lg:p-0 p-[10px] justify-center lg:gap-[10px] gap-[5px] flex-row-reverse">
            <div className="flex items-center justify-center w-[22px] h-[22px] md:w-[25px] md:h-[25px] bg-[#00215E] rounded-full">
              <Image src="/icons/facebook3.png" alt="Facebook" width={12} height={12} className="max-w-[12px] max-h-[12px] object-contain cursor-pointer" />
            </div>
            <div className="flex items-center justify-center w-[22px] h-[22px] md:w-[25px] md:h-[25px] bg-[#00215E] rounded-full">
              <Image src="/icons/insta2.png" alt="Insta" width={12} height={12} className="max-w-[12px] max-h-[12px] object-contain cursor-pointer" />
            </div>
          </div>
          <div className="lg:hidden flex items-center justify-center pb-[20px] px-[15px] w-full">
            <div className="relative flex items-center max-w-[300px] rounded-full py-[6px] px-[8px] bg-[#0A90C805] border border-[#0A90C814] shadow-[inset_0_1px_0_rgba(0,0,0,0.02)]">
              <input
                type="search"
                placeholder="חפש מוצר, קטגוריה או מותג"
                className="flex-1 border-none outline-none bg-transparent py-[8px] px-[10px] text-[14px] text-right pr-[30px] w-full"
              />
              <Image
                src="/img/search.png"
                alt="Search"
                width={15}
                height={15}
                className="absolute right-[15px] w-[15px]"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
