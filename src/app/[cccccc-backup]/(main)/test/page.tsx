"use client"

import { useEffect, useState } from "react"
import Medusa from "@medusajs/js-sdk"

let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}

const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

export default function TestPage() {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products, count, offset, limit } = await sdk.store.product.list({
          limit: 8,
          order: "-created_at",
        })
        setResult({ products, count, offset, limit })
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching products.")
      }
    }

    fetchProducts()
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>Medusa Products Test newww</h1>
      {error && (
        <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>{error}</pre>
      )}
      {/* {result && <pre>{JSON.stringify(result, null, 2)}</pre>} */}
    </div>
  )
}

// "use client";

// import { useEffect, useState } from "react";
// import Medusa from "@medusajs/js-sdk";

// let MEDUSA_BACKEND_URL =
//   process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

// export const sdk = new Medusa({
//   baseUrl: MEDUSA_BACKEND_URL,
//   debug: process.env.NODE_ENV === "development",
//   publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
// });

// // Define your own minimal customer type
// type Customer = {
//   id?: string;
//   email: string;
//   [key: string]: any; // allows extra fields
// };

// export default function CustomerRegistration() {
//   const [customer, setCustomer] = useState<Customer | null>(null);

//   useEffect(() => {
//     const registerCustomer = async () => {
//       try {
//         // ✅ sdk.auth.register() returns a string (the token)
//         const token = await sdk.auth.register("customer", "emailpass", {
//           email: "customer@gmail.com",
//           password: "supersecret",
//         });

//         // ✅ Create customer with Bearer token
//         const { customer } = await sdk.store.customer.create(
//           { email: "customer@gmail.com" },
//           {},
//           { Authorization: `Bearer ${token}` }
//         );

//         console.log("Customer created:", customer);
//         setCustomer(customer);
//       } catch (error) {
//         console.error("Registration failed:", error);
//       }
//     };

//     registerCustomer();
//   }, []);

//   return (
//     <div>
//       {customer ? (
//         <p>Registered customer: {customer.email}</p>
//       ) : (
//         <p>Registering customer...</p>
//       )}
//     </div>
//   );
// }
