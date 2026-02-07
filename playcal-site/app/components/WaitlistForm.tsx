"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [parentType, setParentType] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Replace with your Formspree form ID
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          parentType,
          source: "play-cal-homepage",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setParentType("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">You're on the list!</h3>
        <p className="text-gray-600">
          Thanks for joining. We'll be in touch with early access details soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900"
        />
        
        <select
          value={parentType}
          onChange={(e) => setParentType(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900"
        >
          <option value="">I'm a...</option>
          <option value="married">Married parent</option>
          <option value="coparent">Co-parent</option>
          <option value="single">Single parent</option>
          <option value="caregiver">Caregiver</option>
        </select>
        
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-gradient-to-r from-accent to-teal-600 text-white font-semibold py-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Joining..." : "Join the Waitlist"}
        </button>
      </div>
      
      {status === "error" && (
        <p className="mt-4 text-red-500 text-sm">
          Something went wrong. Please try again.
        </p>
      )}
      
      <p className="mt-4 text-gray-500 text-sm">
        No spam. Unsubscribe anytime. We respect your privacy.
      </p>
    </form>
  );
}
