"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

const locations = [
  {
    id: 1,
    title: "מרכז העיר – קומפלקס טק האב",
    address: (
      <>
        שדרה ראשית 25, מרכז העיר {" "}
        <Link
          href=""
          target="_blank"
          className="!text-[#3EE8F0] underline"
        >
          מַפָּה
        </Link>
      </>
    ),
    hours: [
      "ימים שני עד שישי: 9:30–19:00",
      "יום שבת: 10:00–15:00",
      "יום ראשון: סגור",
    ],
    specification: [
      "חניית נכים: אין I לולאת השראה: קיימת I",
      "שירותי נכים: אין I חנות: נגישה",
    ],
    info: "בואו ליהנות משירות ידידותי ומיומן ממומחי הטכנולוגיה שלנו - היעד האידיאלי לפתרונות מחשב, מחשב נייד ומשחקים מעשיים.",
    features: ["טרייד אין", "איסוף עצמי להזמנות מקוונות", "החלפת מוצר/הזמנה", "תיקון ותמיכה במכשיר"],
  },
  {
    id: 2,
    title: "נורת' הילס – כיכר החדשנות",
    address: (
      <>
        שדרה ראשית 25, מרכז העיר {" "}
        <Link
          href=""
          target="_blank"
          className="!text-[#3EE8F0] underline"
        >
          מַפָּה
        </Link>
      </>
    ),
    hours: [
      "ימים שני עד שישי: 9:30–19:00",
      "יום שבת: 10:00–15:00",
      "יום ראשון: סגור",
    ],
    specification: [
      "חניית נכים: אין I לולאת השראה: קיימת I",
      "שירותי נכים: אין I חנות: נגישה",
    ],
    info: "בואו ליהנות משירות ידידותי ומיומן ממומחי הטכנולוגיה שלנו - היעד האידיאלי לפתרונות מחשב, מחשב נייד ומשחקים מעשיים.",
    features: ["טרייד אין", "איסוף עצמי להזמנות מקוונות", "החלפת מוצר/הזמנה", "תיקון ותמיכה במכשיר"],
  },
  {
    id: 3,
    title: "סניף ווסט אנד אאוטלט",
    address: (
      <>
        שדרה ראשית 25, מרכז העיר {" "}
        <Link
          href=""
          target="_blank"
          className="!text-[#3EE8F0] underline"
        >
          מַפָּה
        </Link>
      </>
    ),
    hours: [
      "ימים שני עד שישי: 9:30–19:00",
      "יום שבת: 10:00–15:00",
      "יום ראשון: סגור",
    ],
    specification: [
      "חניית נכים: אין I לולאת השראה: קיימת I",
      "שירותי נכים: אין I חנות: נגישה",
    ],
    info: "בואו ליהנות משירות ידידותי ומיומן ממומחי הטכנולוגיה שלנו - היעד האידיאלי לפתרונות מחשב, מחשב נייד ומשחקים מעשיים.",
    features: ["טרייד אין", "איסוף עצמי להזמנות מקוונות", "החלפת מוצר/הזמנה", "תיקון ותמיכה במכשיר"],
  },
  {
    id: 4,
    title: "סניף ווסט אנד אאוטלט",
    address: (
      <>
        שדרה ראשית 25, מרכז העיר {" "}
        <Link
          href=""
          target="_blank"
          className="!text-[#3EE8F0] underline"
        >
          מַפָּה
        </Link>
      </>
    ),
    hours: [
      "ימים שני עד שישי: 9:30–19:00",
      "יום שבת: 10:00–15:00",
      "יום ראשון: סגור",
    ],
    specification: [
      "חניית נכים: אין I לולאת השראה: קיימת I",
      "שירותי נכים: אין I חנות: נגישה",
    ],
    info: "בואו ליהנות משירות ידידותי ומיומן ממומחי הטכנולוגיה שלנו - היעד האידיאלי לפתרונות מחשב, מחשב נייד ומשחקים מעשיים.",
    features: ["טרייד אין", "איסוף עצמי להזמנות מקוונות", "החלפת מוצר/הזמנה", "תיקון ותמיכה במכשיר"],
  },
  {
    id: 5,
    title: "סניף האגם",
    address: (
      <>
        שדרה ראשית 25, מרכז העיר {" "}
        <Link
          href=""
          target="_blank"
          className="!text-[#3EE8F0] underline"
        >
          מַפָּה
        </Link>
      </>
    ),
    hours: [
      "ימים שני עד שישי: 9:30–19:00",
      "יום שבת: 10:00–15:00",
      "יום ראשון: סגור",
    ],
    specification: [
      "חניית נכים: אין I לולאת השראה: קיימת I",
      "שירותי נכים: אין I חנות: נגישה",
    ],
    info: "בואו ליהנות משירות ידידותי ומיומן ממומחי הטכנולוגיה שלנו - היעד האידיאלי לפתרונות מחשב, מחשב נייד ומשחקים מעשיים.",
    features: ["טרייד אין", "איסוף עצמי להזמנות מקוונות", "החלפת מוצר/הזמנה", "תיקון ותמיכה במכשיר"],
  },
  {
    id: 6,
    title: "פארק טכנולוגי – רובע עסקים",
    address: (
      <>
        שדרה ראשית 25, מרכז העיר {" "}
        <Link
          href=""
          target="_blank"
          className="!text-[#3EE8F0] underline"
        >
          מַפָּה
        </Link>
      </>
    ),
    hours: [
      "ימים שני עד שישי: 9:30–19:00",
      "יום שבת: 10:00–15:00",
      "יום ראשון: סגור",
    ],
    specification: [
      "חניית נכים: אין I לולאת השראה: קיימת I",
      "שירותי נכים: אין I חנות: נגישה",
    ],
    info: "בואו ליהנות משירות ידידותי ומיומן ממומחי הטכנולוגיה שלנו - היעד האידיאלי לפתרונות מחשב, מחשב נייד ומשחקים מעשיים.",
    features: ["טרייד אין", "איסוף עצמי להזמנות מקוונות", "החלפת מוצר/הזמנה", "תיקון ותמיכה במכשיר"],
  },
]

const ServiceLocationCard = ({ location }) => {
  return (
    <div className="group duration-400 bg-[#FFFFFF08] rounded-[20px] hover:shadow-[0px_25px_50px_0px_#0000001F] md:p-[30px] p-[20px] border border-[#1921610D]">
      <div className="mb-4">
        <h3 className="md:text-xl text-lg font-bold flex-1 text-center">{location.title}</h3>
        <div className="flex items-center gap-3 mr-4">
          <Link href="" className="p-[30px] rounded-[10px] bg-[#fff] flex items-center justify-center flex-col gap-[15px] shadow-[0px_50px_50px_0px_#0000000D]">
            <Image src="/icons/whatsapp.png" alt="Whatsapp" width={100} height={100} className="md:w-[50px] w-[40px]" />
            <span className="text-center text-sm">כתבו לנו</span>
          </Link>
          <Link href="" className="p-[30px] rounded-[10px] bg-[#fff] flex items-center justify-center flex-col gap-[15px] shadow-[0px_50px_50px_0px_#0000000D]">
            <Image src="/icons/direction.png" alt="Direction" width={100} height={100} className="md:w-[45px] w-[35px] " />
            <span className="text-center text-sm">נווט אל המקום</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-[15px] mb-[20px]  text-right">
        <li className="gap-[10px] text-sm flex items-start list-none transition">
          <Image src="/icons/map.png" alt="Tick" width={15} height={50} className="max-w-[15px] max-h-[15px] object-contain" />
          {location.address}
        </li>
        <li className="gap-[10px] flex items-start list-none transition">
          <Image src="/icons/clock.png" alt="Tick" width={15} height={15} className="max-w-[15px] max-h-[15px] object-contain" />
          <div className="flex flex-col gap-1 text-sm">
            {Array.isArray(location.hours)
              ? location.hours.map((time, i) => <div key={i}>{time}</div>)
              : <div>{location.hours}</div>}
          </div>
        </li>
        <li className="gap-[10px] text-sm flex items-start list-none transition">
          <Image src="/icons/sit.png" alt="Tick" width={15} height={15} className="max-w-[15px] max-h-[15px] object-contain" />
          <div className="flex flex-col gap-1 text-sm">
            {Array.isArray(location.specification)
              ? location.specification.map((line, i) => <div key={i}>{line}</div>)
              : <div>{location.specification}</div>}
          </div>
        </li>
      </div>

      <div className="bg-[#19216108] group-hover:bg-gradient-to-r group-hover:from-[#3EE8F0] group-hover:to-[#0A90C8] duration-400 group-hover:text-white text-black rounded-[5px] p-[20px] mb-[15px] text-sm text-right ">{location.info}</div>

      <div className="border-t border-[#1921610D] pt-4">
        <div className="space-y-[15px] space-x-[10px] text-right">
          {location.features.map((ftr, idx) => (
            <li key={idx} className="text-sm px-1 gap-[10px] inline-flex items-center list-none border border-[#0A90C814] rounded-[200px] transition">
              <Image src="/icons/tick.png" alt="Tick" width={50} height={50} className="w-[15px] h-[15px]" />
              {ftr}
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ServiceLocations() {
  return (
    <>

      <section className="px-[20px] md:px-[30px] lg:px-[50px] pb-[50px] pt-[20px] md:pt-[40px]">
        <div className="mx-auto max-w-[1600px]">
          <div className="bg-[url('/img/banner2.png')] bg-cover bg-center rounded-[30px] px-[20px] py-[120px] md:px-[30px] lg:px-[50px]">
            <h1 className="text-center text-[#00215E] text-[35px] md:text-[50px] font-bold">
              הסניפים שלנו
            </h1>
            <p className="text-center mx-auto max-w-[500px] font-semibold mt-[10px]">
              ביבואן המחשבים, אנו גאים לשרת לקוחות ברחבי ישראל עם סניפים פיזיים המציעים ייעוץ מקצועי, איסוף בחנות ותמיכה לאחר המכירה - והכל מגובה במוצרים מיובאים מקוריים במחירים ללא תחרות.
            </p>
            <div className="flex md:flex-row flex-col items-center gap-[20px] justify-center mt-[30px]">
              <button className="border border-[#000] rounded-[76px] py-[10px] px-[30px]">צור קשר עם התמיכה</button>
              <button className=" bg-gradient-to-r from-[#3EE8F0] to-[#0A90C8] text-white rounded-[76px] py-[12px] px-[30px]">מצא סניף בקרבתך</button>
            </div>
          </div>
        </div>
      </section>
      <section className="px-[20px] md:px-[30px] lg:px-[50px] py-[50px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="md:text-4xl sm:text-3xl text-2xl font-bold text-center mb-12 ">מיקומי השירות שלנו</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <ServiceLocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
