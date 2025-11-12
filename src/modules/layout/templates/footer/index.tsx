import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
// import { Text, clx } from "@medusajs/ui"

// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import MedusaCTA from "@modules/layout/components/medusa-cta"
import Image from "next/image"
import Link from "next/link"
export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-black text-white px-[30px]">
            <div className="max-w-[1200px] mx-auto border-b border-[#FFFFFF26]">
                <div className="flex md:flex-row flex-col md:gap-12">
                    <div className="md:basis-[60%] basis-[50%] md:pl-[50px] md:py-[80px] py-[60px]">
                        <div className="flex mb-[30px]">
                            <div className="basis-[50%]">
                                <h3 className="text-lg font-bold mb-6">קישורים מהירים</h3>
                                <ul className="space-y-3 text-sm text-[#919191]">
                                    <li>
                                        <Link href="#" className="hover:text-white transition">
                                            קבוצות מוצרים
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition">
                                            משלוחים בחינם
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition">
                                            מבחנות ותמונות
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition">
                                            אביזרים
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition">
                                            פחיות מדיה
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition">
                                            רץ אירוח לעבודה
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="basis-[50%]">
                                <h3 className="text-lg font-bold mb-6">תמשיך הלאה</h3>
                                <ul className="space-y-3 text-sm text-[#919191]">
                                    <li>
                                        <Link href="#" className="hover:text-white transition flex gap-[5px]">
                                            <Image src="/icons/facebook.png" alt="Facebook" height={20} width={20} className="max-w-[15px] max-h-[15px] object-contain"/> פייסבוק
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition flex gap-[5px]">
                                            <Image src="/icons/insta.png" alt="Insta" height={20} width={20} className="max-w-[15px] max-h-[15px] object-contain"/> אינסטגרם
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-white transition flex gap-[5px]">
                                            <Image src="/icons/twitter.png" alt="Twitter" height={20} width={20} className="max-w-[15px] max-h-[15px] object-contain"/> טוויטר
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-[#919191] leading-relaxed font-semibold">
                                ב-The Computer Importer הטכנולוגיה היא התשוקה שלנו. עם ניסיון של שנים בייבוא והפצה בינלאומיים, אנו מביאים לישראל את הציוד הממוחשב החדשני והאמין ביותר.
                            </p>
                        </div>
                    </div>
                    <div className="md:basis-[40%] basis-[50%] md:pr-[50px] md:py-[80px] pb-[60px] md:border-r border-[#FFFFFF26]">
                        <div className="space-y-4 text-sm text-gray-300">
                            <div className="flex gap-[30px]">
                                <p className="font-bold mb-1">כְּתוֹבֶת</p>
                                <p className="text-white text-right">8975 שדרות צ'רלסטון מערב, סוויטה 190, לאס וגאס, נבדה 89117</p>
                            </div>
                            <div className="flex gap-[30px]">
                                <p className="font-bold mb-1">טֵלֵפוֹן</p>
                                <p className="text-white break-all text-right">0 123 4567 890</p>
                            </div>
                             <div className="flex gap-[30px]">
                                <p className="font-bold mb-1">אלקטרו</p>
                                <p className="text-white break-all text-right">contact@KempseyOutdoors.com</p>
                            </div>
                            <div className="flex gap-[30px] justify-center mt-[60px]">  
                                <Image src="/img/cards.png" alt="Chat" height={400} width={400} className="w-[350px]"/>                                              
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <div className="mx-auto max-w-[1200px]">
                    <div className="flex md:flex-row flex-col-reverse gap-[20px] justify-between py-[30px]">
                        <div className="">
                            <p className="md:text-right text-center md:text-base text-sm">© 2025 יבואן המחשבים, כל הזכויות שמורות.</p>
                        </div>
                        <div className="md:text-right text-center md:text-base text-sm">
                            <Link href="">הצהרת פרטיות</Link> |     
                            <Link href="">תנאים והגבלות</Link>
                        </div>
                    </div>
                </div>
            </div>
            <button className="fixed md:bottom-6 bottom-4 md:right-6 right-2 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center hover:scale-[1.05] duration-400 cursor-pointer">
                <Image src="/icons/chat.png" alt="Chat" height={60} width={60} />
            </button>
        </footer>
  )
}
