"use client";

import { useState } from "react";
import Medusa from "@medusajs/js-sdk";

// ✅ Backend base URL (your Medusa server URL)
const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

// ✅ Initialize SDK once
const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
});

// ✅ Define TypeScript type (optional, for better clarity)
type Customer = {
  id?: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  [key: string]: any;
};

export default function RegisterPage() {
  // --- Form States ---
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  // --- UI States ---
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [customer, setCustomer] = useState<Customer | null>(null);

  // --- Handle Form Submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = await sdk.auth.register("customer", "emailpass", {
        email,
        password,
      });
      const { customer } = await sdk.store.customer.create(
        {
          email,
          first_name: firstName,
          last_name: lastName,
        },
        {},
        { Authorization: `Bearer ${token}` }
      );

      console.log(token);
      console.log(customer);
      setCustomer(customer);
      localStorage.setItem("medusa_customer", JSON.stringify(customer));
      setMessage("🎉 Registration successful!");
    } catch (error: any) {
      console.error("Registration failed:", error);
      setMessage("❌ Registration failed. " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full p-2 border rounded-lg"
            required
          />

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full p-2 border rounded-lg"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full p-2 border rounded-lg"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}

        {customer && (
          <div className="mt-4 text-sm text-center text-green-700">
            Logged in as: {customer.email}
          </div>
        )}
      </div>
    </div>
  );
}
