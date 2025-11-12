"use client"
import LogoSlider from "@modules/layout/components/sliders/logos-slider";
import AboutSlider from "@modules/layout/components/sliders/about-slider";
import Counter from '@modules/layout/components/counter/counter'
import Breadcrumb from "@modules/layout/components/breadcrumb/breadcrumb";
import { useState } from "react"
import Image from 'next/image'
import Link from 'next/link'

function page() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        notes: "",
    })

    const handleChange = (e) => {
      
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }))
       
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("[v1] Form submitted:", formData)
    }

    const breadcrumbItems = [{ label: "אודותינו", href: "/about" }]
    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <section className='px-[20px] md:px-[30px] lg:px-[50px] pb-[50px]'>
                <div className='mx-auto max-w-[1600px]'>
                    <div className="bg-[url('/img/about-banner.png')] bg-cover bg-center rounded-[30px] flex p-[20px] md:p-[30px] lg:p-[50px]">
                        <div className='ml-auto max-w-[700px] pr-[20px] md:pr-[30px] pl-[20px] md:pl-[50px] lg:pl-[80px] md:pb-[90px] pb-[50px] pt-[50px] md:pt-[70px] bg-[#FFFFFF59] border border-[#FFFFFF4D] rounded-[20px] backdrop-blur-md'>
                            <h1 className='text-[#00215E] font-bold text-[30px] md:text-[50px] mb-[10px]'>טכנולוגיה אמיתית.<br /><span className='text-[#3EE8F0]'>ערך אמיתי. יבואן </span><br />אמיתי.</h1>
                            <p className='font-semibold md:text-base text-sm'>ב"יבואן המחשבים", אנו מאמינים שרכישת טכנולוגיה צריכה להיות פשוטה, בטוחה ושקופה.</p>
                            <p className='font-semibold md:text-base text-sm'>לכן אנו מייבאים את המחשבים, המחשבים הניידים והאביזרים האמינים ביותר בעולם ישירות ממותגים בינלאומיים מובילים - ומספקים לכם מוצרים מקוריים במחירים הוגנים ישירות מהמפעל.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='px-[20px] md:px-[30px] lg:px-[50px] py-[50px]'>
                <div className='mx-auto max-w-[1200px]'>
                    <h2 className='text-center text-[26px] md:text-[40px] font-bold mb-[30px]'>אודות יבואן המחשבים 🌟</h2>
                    <p className='text-center mb-[5px] max-w-[600px] mx-auto md:text-base text-sm'>ברוכים הבאים ליבואן המחשבים, המקור האמין שלכם למחשבים, מחשבים ניידים ואביזרים חדישים - כולם מיובאים ישירות מהמותגים המובילים בעולם.</p>
                    <p className='text-center mb-[5px] max-w-[600px] mx-auto md:text-base text-sm'>אנו משלבים טכנולוגיה מתקדמת, איכות אמיתית ומחירים ללא תחרות כדי להפוך את    המחשוב היוקרתי לנגיש לכולם.</p>
                    <p className='text-center mb-[5px] max-w-[600px] mx-auto md:text-base text-sm'>מהו המוצר הבא שתרצו לרכוש מהמותגים האהובים עליכם? 👇</p>
                </div>
            </section>
            <section className="px-[20px] md:px-[30px] lg:px-[50px] md:py-[50px] pb-[10px] pt-[60px]">
                <div className="mx-auto max-w-[1200px]">
                    <LogoSlider />
                </div>
            </section>
            <section className='px-[20px] md:px-[30px] lg:px-[50px] py-[50px]'>
                <div className='mx-auto max-w-[1200px]'>
                    <div className='flex flex-col md:flex-row items-center gap-[20px] md:gap-[40px] lg:gap-[80px]'>
                        <div className='basis-[50%]'>
                            <h3 className='text-[30px] md:text-[40px] font-bold mb-[15px]'>המשימה שלנו</h3>
                            <p className='mb-[20px] text-sm'>ב-The Computer-Importer, המשימה שלנו פשוטה אך עוצמתית - להפוך את הטכנולוגיה הטובה בעולם לנגישה, משתלמת ואמינה לכולם.</p>
                            <p className='mb-[20px] text-sm'>אנו מאמינים שכל לקוח ראוי ליותר מסתם מחשב; הוא ראוי לבהירות, ביטחון וערך מלא בכל רכישה. זו הסיבה שבנינו את העסק שלנו סביב שקיפות, אמון ומצוינות טכנית.</p>
                            <p className='text-sm'>מטרתנו היא להסיר את המחסומים שהופכים את קניית הטכנולוגיה למסובכת או יקרה. על ידי ייבוא ​​ישיר ממותגים גלובליים מובילים ושמירה על שליטה מלאה בכל שלב - החל ממקור, דרך בדיקות איכות ועד למשלוח - אנו מבטיחים שכל מוצר שאנו מוכרים עומד בסטנדרטים הגבוהים ביותר של ביצועים ואותנטיות.</p>
                        </div>
                        <div className='basis-[50%]'>
                            <Image src="/img/about1.png" alt="About1" height={500} width={500} className="w-full" />
                        </div>
                    </div>
                </div>
            </section>
            <section className='px-[20px] md:px-[30px] lg:px-[50px] md:py-[50px] py-[20px]'>
                <div className='mx-auto max-w-[1200px]'>
                    <div className='flex flex-col-reverse md:flex-row items-center gap-[20px] md:gap-[40px] lg:gap-[80px]'>
                        <div className='basis-[50%]'>
                            <Image src="/img/about2.png" alt="About2" height={500} width={500} className="w-full" />
                        </div>
                        <div className='basis-[50%]'>
                            <h3 className='text-[30px] md:text-[40px] font-bold mb-[15px]'>המשימה שלנו</h3>
                            <p className='mb-[20px] text-sm'>ב-The Computer-Importer, המשימה שלנו פשוטה אך עוצמתית - להפוך את הטכנולוגיה הטובה בעולם לנגישה, משתלמת ואמינה לכולם.</p>
                            <p className='mb-[20px] text-sm'>אנו מאמינים שכל לקוח ראוי ליותר מסתם מחשב; הוא ראוי לבהירות, ביטחון וערך מלא בכל רכישה. זו הסיבה שבנינו את העסק שלנו סביב שקיפות, אמון ומצוינות טכנית.</p>
                            <p className='text-sm'>מטרתנו היא להסיר את המחסומים שהופכים את קניית הטכנולוגיה למסובכת או יקרה. על ידי ייבוא ​​ישיר ממותגים גלובליים מובילים ושמירה על שליטה מלאה בכל שלב - החל ממקור, דרך בדיקות איכות ועד למשלוח - אנו מבטיחים שכל מוצר שאנו מוכרים עומד בסטנדרטים הגבוהים ביותר של ביצועים ואותנטיות.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-[20px] md:px-[30px] lg:px-[50px] md:py-[50px] pt-[50px]">
                <div className='bg-[#19216108] rounded-[35px] px-[20px]  md:px-[30px] lg:px-[50px] md:py-[80px] py-[50px]'>
                    <div className="mx-auto max-w-[1200px]">
                        <h3 className='md:text-[40px] text-[30px] font-bold text-center'>הערכים שלנו</h3>
                        <p className='text-center text-sm mb-[50px]'>העקרונות המנחים את כל מה שאנחנו עושים</p>
                        <AboutSlider />
                    </div>
                </div>
            </section>
            <section className="lg:px-[50px] md:px-[30px] px-[20px]">
                <div className="p-[20px] md:p-[30px] lg:p-[50px] rounded-[35px] md:h-[500px] h-[300px] flex items-end  bg-[url('/img/about-mid-banner.png')] bg-cover bg-center">
                    <div className="mx-auto max-w-[1200px] w-full">
                        <h3 className="text-[25px] md:text-[35px] lg:text-[50px] font-bold text-[#fff]">לא רק יבואנים -
                            <br /><span className="text-[#3EE8F0]">שותפי הטכנולוגיה</span>
                            <br />האמינים שלכם.</h3>
                    </div>
                </div>
            </section>
            <section className='px-[20px] md:px-[30px] lg:px-[50px] pb-[50px] pt-[90px]'>
                <div className='mx-auto max-w-[1200px]'>
                    <div className='flex flex-col items-center w-full'>
                        <h3 className='text-center text-[30px] md:text-[35px] font-bold mb-[10px]'>ההשפעה שלנו</h3>
                        <p className='text-center'>מספרים שמדברים בעד עצמם</p>
                        <div className='bg-[#FFFFFF08] rounded-[20px] px-[50px] py-[40px] gap-[30px] flex md:flex-row flex-col justify-around w-full shadow-[0px_25px_50px_0px_#0000001F] mt-[50px]'>
                            <div className='flex flex-col items-center gap-[5px] md:gap-[10px]'>
                                <h5 className='bg-gradient-to-r from-[#3EE8F0] to-[#0A90C8] bg-clip-text text-transparent text-[30px] md:text-[40px] font-bold'>
                                    <Counter target={4.8} decimals={1}/>
                                </h5>
                                <p>15,474 ביקורות בגוגל</p>
                            </div>
                            <div className='flex flex-col items-center gap-[5px] md:gap-[10px]'>
                                <h5 className='bg-gradient-to-r from-[#3EE8F0] to-[#0A90C8] bg-clip-text text-transparent text-[30px] md:text-[40px] font-bold'>
                                    <Counter target={15} />
                                </h5>
                                <p>סניפים</p>
                            </div>
                            <div className='flex flex-col items-center gap-[5px] md:gap-[10px]'>
                                <h5 className='bg-gradient-to-r from-[#3EE8F0] to-[#0A90C8] bg-clip-text text-transparent text-[30px] md:text-[40px] font-bold'>
                                    <Counter target={10} />K+
                                </h5>
                                <p>מוצרים זמינים</p>
                            </div>
                            <div className='flex flex-col items-center gap-[5px] md:gap-[10px]'>
                                <h5 className='bg-gradient-to-r from-[#3EE8F0] to-[#0A90C8] bg-clip-text text-transparent text-[30px] md:text-[40px] font-bold'>
                                    <Counter target={50} />K+
                                </h5>
                                <p>לקוחות מרוצים</p>
                            </div>
                        </div>
                        <Link href="" className='bg-gradient-to-r from-[#3EE8F0] to-[#0A90C8] py-[12px] px-[25px] rounded-[76px] !text-[#fff] mt-[40px] text-sm'>מצא את הסניף הקרוב</Link>
                    </div>
                </div>
            </section>
            <section className='px-[20px] md:px-[30px] lg:px-[50px] py-[50px]'>
                <div className='mx-auto max-w-[1200px]'>
                    <div className='flex md:flex-row flex-col items-center gap-[50px]'>
                        <div className='basis-[60%]'>
                            <h3 className='text-[30px] md:text-[40px] font-bold mb-[40px]'>צרו איתנו קשר</h3>
                            <form onSubmit={handleSubmit} className="w-full flex flex-col">
                                <div className="flex sm:flex-row flex-col sm:gap-[20px]">
                                    <div className="text-right mb-[15px] md:mb-[20px] basis-[50%]">
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full border border-[#1921610D] text-sm py-[12px] px-[20px] rounded-[5px] hover:border-slate-300 focus-visible:border-slate-300 focus-visible:border focus-visible:!outline-none placeholder-[#919191]"
                                            placeholder="שם פרטי"
                                        />
                                    </div>

                                    <div className="text-right mb-[15px] md:mb-[20px] basis-[50%]">
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full border border-[#1921610D] text-sm py-[12px] px-[20px] rounded-[5px] hover:border-slate-300 focus-visible:border-slate-300 focus-visible:border focus-visible:!outline-none placeholder-[#919191]"
                                            placeholder="שם משפחה"
                                        />
                                    </div>
                                </div>

                                <div className="text-right mb-[15px] md:mb-[20px] basis-[50%]">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        required
                                        onChange={handleChange}
                                        className="w-full border border-[#1921610D] text-sm py-[12px] px-[20px] rounded-[5px] hover:border-slate-300 focus-visible:border-slate-300 focus-visible:border focus-visible:!outline-none placeholder-[#919191]"
                                        placeholder="כתובת דואר אלקטרוני"
                                    />
                                </div>

                                <div className="text-right mb-[15px] md:mb-[20px]">
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-[#1921610D] text-sm py-[12px] px-[20px] rounded-[5px] hover:border-slate-300 focus-visible:border-slate-300 focus-visible:border focus-visible:!outline-none placeholder-[#919191]"
                                        placeholder="תוכן הפנייה *"
                                        rows={3}
                                    />
                                </div>

                                <div className="flex items-center flex-row-reverse justify-end gap-2">
                                    <label htmlFor="remember" className="text-sm cursor-pointer">
                                        קראתי ואני מסכים למדיניות הפרטיות של האתר, לקבלת מידע שיווקי, הטבות ומבצעים באמצעות דוא"ל, SMS וכו'. *
                                    </label>
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-[#1921610D] cursor-pointer"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-auto mt-[25px] self-end bg-gradient-to-r from-[#3EE8F0] to-[#0A90C8] text-white font-semibold py-3 px-[35px] rounded-[76px] transition-colors"
                                >
                                    שלח עכשיו
                                </button>
                            </form>
                        </div>
                        <div className='basis-[40%] flex justify-center'>
                            <Image src="/img/about3.png" alt="About1" height={500} width={500} className="w-full max-w-full sm:w-[400px]" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page