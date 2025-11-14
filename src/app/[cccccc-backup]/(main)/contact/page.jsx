"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Breadcrumb from "@modules/layout/components/breadcrumb/breadcrumb";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        phone: "",
        orderNo: "",
        notes: "",
    })

    const handleChange = (e) => {
        const { name, value, type } = e.target

        // Only allow digits for order number and phone
        if ((name === "orderNo" || name === "phone") && type === "tel") {
            const numericValue = value.replace(/\D/g, "")
            setFormData((prev) => ({ ...prev, [name]: numericValue }))
        } else if (name === "orderNo") {
            // Also restrict number input (for browsers supporting numeric type)
            setFormData((prev) => ({ ...prev, [name]: value.replace(/\D/g, "") }))
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("[v1] Form submitted:", formData)
    }

    const breadcrumbItems = [{ label: "צור קשר", href: "/contact" }]

    return (
        <>
            {/* <Header /> */}
            <Breadcrumb items={breadcrumbItems} className="mb-4" />
            <section className="py-[50px] px-[20px] md:px-[30px] lg:px-[50px]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">בואו להתחבר</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4">
                        <Link
                            href="mailto:contact@KempseyOutdoors.com"
                            className="flex flex-col items-center text-center rounded-[20px] p-[20px] md:p-[25px] duration-400 contact-shadow-custom cursor-pointer "
                        >
                            <Image src="/icons/email2.png" alt="Email" width={50} height={50} className="max-w-[70px] max-h-[70px] object-contain mb-[10px]" />
                            <h3 className="text-xl font-semibold mb-3">אלקטרוני</h3>
                            <p className="text-sm">contact@KempseyOutdoors.com</p>
                        </Link>

                        <Link
                            href="tel:01234567890"
                            className="flex flex-col items-center text-center rounded-[20px] p-[20px] md:p-[25px] duration-400 contact-shadow-custom cursor-pointer"
                        >
                            <Image src="/icons/phone.png" alt="Phone" width={50} height={50} className="max-w-[70px] max-h-[70px] object-contain mb-[10px]" />
                            <h3 className="text-xl font-semibold mb-3">טלפון</h3>
                            <p className="text-sm">0 123 4567 890</p>
                        </Link>

                        <div className="flex flex-col items-center text-center rounded-[20px] p-[20px] md:p-[25px] duration-400 contact-shadow-custom cursor-pointer">
                            <Image src="/icons/location.png" alt="Location" width={50} height={50} className="max-w-[70px] max-h-[70px] object-contain mb-[10px]" />
                            <h3 className="text-xl font-semibold mb-3">כתובת</h3>
                            <p className="text-sm leading-relaxed">
                                8975 שדרות צ'רלסטון מערב, סוויטה
                                <br />
                                190, לאס וגאס, נבדה 89117
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-[50px] px-[20px] md:px-[30px] lg:px-[50px]">
                <div className="max-w-[700px] mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">צרו איתנו קשר</h2>
                    <p className="text-center text-sm mb-8 leading-relaxed">
                        אל החנות שלנו בכל צורה שתתגוררות אתכם ישווקו כמו פלופונו כדי להתקשר.
                        <br />
                        אלכם בחדרים הקופפיה.
                    </p>

                    <div>
                        <form onSubmit={handleSubmit} className="w-full">
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

                            <div className="flex sm:flex-row flex-col sm:gap-[20px]">
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
                                <div className="text-right mb-[15px] md:mb-[20px] basis-[50%]">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        className="w-full text-right border border-[#1921610D] text-sm py-[12px] px-[20px] rounded-[5px] hover:border-slate-300 focus-visible:border-slate-300 focus-visible:border focus-visible:!outline-none placeholder-[#919191]"
                                        placeholder="מספר טלפון"
                                    />
                                </div>
                            </div>

                            <div className="text-right mb-[15px] md:mb-[20px]">
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full border border-[#1921610D] text-sm py-[12px] px-[20px] rounded-[5px] hover:border-slate-300 focus-visible:border-slate-300 focus-visible:border focus-visible:!outline-none placeholder-[#919191]"
                                    placeholder="נושא הבירור"
                                />
                            </div>

                            <div className="text-right mb-[15px] md:mb-[20px]">
                                <input
                                    type="number"
                                    name="orderNo"
                                    required
                                    value={formData.orderNo}
                                    onChange={handleChange}
                                    min="0"
                                    inputMode="numeric"
                                    className="w-full border border-[#1921610D] text-sm py-[12px] px-[20px] rounded-[5px] hover:border-slate-300 focus-visible:border-slate-300 focus-visible:border focus-visible:!outline-none placeholder-[#919191]"
                                    placeholder="מספר הזמנה*"
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
                                <label htmlFor="remember" className="text-[#919191] text-xs cursor-pointer">
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
                                className="w-full mt-[25px] bg-gradient-to-r from-[#3EE8F0] to-[#0A90C8] text-white font-semibold py-3 px-6 rounded-[76px] transition-colors"
                            >
                                שלחו הודעה
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            {/* <Footer /> */}
        </>
    )
}
