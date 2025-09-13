"use client";

import { useState } from "react";
import { useLocalization } from "../../context/LocalizationContext";

export default function NewsletterSignup() {
  const { newsletter } = useLocalization().homepage;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setStatus("error");
    }
  };

  return (
    <section className="py-16 bg-primary-light">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-foreground">{newsletter.title}</h2>
        <p className="text-gray-700 mt-2">{newsletter.description}</p>

        <form onSubmit={handleSubmit} className="mt-6 flex justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={newsletter.placeholder}
            required
            className="px-4 py-3 w-40 sm:w-72 border border-primary bg-background rounded-l-md focus:outline-none focus:ring-2 focus:ring-wine-red"
          />
          <button
            type="submit"
            className="px-3 sm:px-6 py-1 sm:py-3 bg-wine-red text-background font-bold rounded-r-md hover:bg-wine-dark transition-colors"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Processing..." : newsletter.buttonText}
          </button>
        </form>

        {status === "success" && <p className="mt-3 text-gray-700">Ďakujeme za prihlásenie!</p>}
        {status === "error" && <p className="mt-3 text-gray-700">Prihlásenie zlyhalo. Skúste znovu.</p>}
      </div>
    </section>
  );
}
