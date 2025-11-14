"use client";

import { useEffect, useState } from "react";
import Medusa from "@medusajs/js-sdk";

// --- Medusa SDK setup ---
let MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
});

export default function LogoutPage() {
  const [message, setMessage] = useState("Logging out...");

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // --- Step 1: Call Medusa logout API ---
        await sdk.auth.logout();

        // --- Step 2: Clear stored data ---
        localStorage.removeItem("medusa_token");
        localStorage.removeItem("medusa_customer");

        // --- Step 3: Update message or redirect ---
        setMessage("You have been logged out successfully ✅");

        // Optionally redirect to login or home
        // setTimeout(() => {
        //   window.location.href = "/login";
        // }, 1500);
      } catch (error: any) {
        console.error("Logout failed:", error);
        setMessage(error.message || "❌ Logout failed. Please try again.");
      }
    };

    logoutUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold mb-4">Logout</h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}
