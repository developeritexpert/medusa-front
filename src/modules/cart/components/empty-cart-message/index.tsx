import Link from "next/link"
const EmptyCartMessage = () => {
  return (
    <div className="text-center py-20">
        <h2 className="text-xl md:text-3xl font-bold mb-4">העגלה שלך ריקה</h2>
        <p className=" mb-8">עדיין לא הוספת מוצרים לעגלת הקניות</p>
        <Link
            href="/store"
            className="bg-gradient-to-r from-[#3EE8F0] to-[#0A90C8] !text-white font-semibold py-3 px-6 rounded-full"
        >
            המשך לקניות
        </Link>
    </div>
  )
}

export default EmptyCartMessage
