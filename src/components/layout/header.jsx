"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PrevArrow({ onClick }) {
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

function NextArrow({ onClick }) {
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
    "יבואן מְכִירָה",
    "מחשבים ניידים",
    "שולחנות עבודה",
    "אביזרים",
    "אודותינו",
    "הסניפים שלנו",
    "צורו איתנו קשר",
  ];

  return (
    <header className="w-full rtl">
      {/* === TOPBAR === */}
      <div className="relative flex items-center justify-center bg-black text-white py-[12px] px-4 overflow-hidden">
        <div className="w-full max-w-[800px]">
          <Slider {...topbarSettings}>
            {topbarItems.map((text, i) => (
              <div key={i} className="text-center">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis text-[12px] md:text-[14px] leading-[28px]">
                  {text}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* === MIDDLE HEADER === */}
      <div className="flex items-center justify-between gap-4 p-[12px_20px] bg-white rtl">
        {/* Logo */}
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

        {/* Search */}
        <div className="hidden md:flex flex-1 md:min-w-[180px] md:min-w-[180px] max-w-full">
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

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-2 py-2 px-3 text-[14px] text-black cursor-pointer">
            <Image src="/img/dive.png" alt="Eilat" width={20} height={20} />
            להזמנה באילת
          </div>

          <div className="flex items-center gap-2 py-2 px-3 text-[14px] text-black cursor-pointer">
            <Image src="/img/account.png" alt="Account" width={15} height={15} />
            התחברות
          </div>

          <Image src="/img/like.png" alt="Like" width={15} height={15} />

          <button className="bg-gradient-to-r from-[#3EE8F0] to-[#0A90C8] text-white py-[10px] px-[16px] rounded-[76px] text-[14px] flex items-center gap-2 cursor-pointer">
            שלח לנו הודעה
          </button>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <span
            className={`block h-[2px] w-6 bg-black rounded transition-all ${
              menuOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          ></span>
          <span
            className={`block h-[2px] w-6 bg-black rounded transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-[2px] w-6 bg-black rounded transition-all ${
              menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* === NAVBAR === */}
      <nav
        className={`border-y border-[rgba(25,33,97,0.05)] bg-white rtl transition-all duration-300 ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        } md:max-h-none md:opacity-100 md:block overflow-hidden`}
      >
        <ul className="flex flex-col md:flex-row justify-center items-center gap-5 list-none m-0 p-[12px_20px]">
          {navLinks.map((link, i) => (
            <li key={i}>
              <Link
                href={`#${link}`}
                className="no-underline text-[#111] text-[15px] font-medium py-1 hover:text-[#0A90C8] transition-colors"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
