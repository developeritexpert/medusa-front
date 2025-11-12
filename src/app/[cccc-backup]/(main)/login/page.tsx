"use client";

import { useState, useEffect } from "react";
import Medusa from "@medusajs/js-sdk";

// --- Medusa SDK setup ---
let MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
});

// Optional: Type for customer
type Customer = {
  id?: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  [key: string]: any;
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [customer, setCustomer] = useState<Customer | null>(null);

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem("medusa_auth_token");
    if (token) {
      setMessage("Already logged in ✅");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // --- Step 1: Login via SDK ---
      const result = await sdk.auth.login("customer", "emailpass", {
        email,
        password,
      });

      if (typeof result !== "string") {
        // Rare case: 2FA or redirect required
        setMessage("Authentication requires additional steps");
        console.warn("Redirect needed:", result);
        return;
      }

      const token = result;

      // --- Step 2: Retrieve customer details ---
      const { customer } = await sdk.store.customer.retrieve(undefined, {
        Authorization: `Bearer ${token}`,
      });

      if (!customer) {
        throw new Error("Failed to retrieve customer data");
      }

      // --- Step 3: Save token & customer info locally ---
      // localStorage.setItem("medusa_token", token);
      localStorage.setItem("medusa_customer", JSON.stringify(customer));
      setCustomer(customer);
      setMessage(`Login successful 🎉 Welcome ${customer.first_name || ""}`);
    } catch (err: any) {
      console.error("Login error:", err);
      setMessage(err.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 border rounded-lg"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-2 border rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}

        {customer && (
          <div className="mt-4 text-center text-sm text-green-700">
            Logged in as: {customer.email}
          </div>
        )}
      </div>
    </div>
  );
}
