"use client";

import { useState } from "react";
import Link from "next/link";
import content from "@/content";
import Copy, { useCopyText } from "@/components/Copy";

export default function AccountLoginClient() {
  const { account, business } = content;
  const [optIn, setOptIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/account/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, marketingOptIn: optIn }),
      });
      if (!res.ok) throw new Error("Signup failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="account-page">
      <div className="account-inner">
        <Link href="/" className="account-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/clear-vision-logo.png" alt={business.name} />
        </Link>

        <h1 className="account-title">
          <Copy path="account.title" fallback={account.title} />
        </h1>
        <p className="account-subtitle">
          <Copy path="account.subtitle" fallback={account.subtitle} />
        </p>

        {submitted ? (
          <div className="form-success" style={{ maxWidth: 420, margin: "0 auto" }}>
            Check your inbox. We&apos;ve sent a verification code to continue.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="account-form">
            <div className="account-email-field">
              <input
                type="email"
                name="email"
                placeholder={useCopyText("account.emailPlaceholder", account.emailPlaceholder)}
                required
              />
              <button type="submit" aria-label="Continue" disabled={submitting}>
                →
              </button>
            </div>

            <label className="account-checkbox">
              <input
                type="checkbox"
                checked={optIn}
                onChange={(e) => setOptIn(e.target.checked)}
              />
              <Copy path="account.optInLabel" fallback={account.optInLabel} />
            </label>

            {error && (
              <p className="form-error" style={{ marginTop: 12 }}>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}

        <p className="account-terms">
          <Copy path="account.termsText" fallback={account.termsText} />{" "}
          <Link href="/contact">
            <Copy path="account.termsLink" fallback={account.termsLink} />
          </Link>
        </p>
      </div>
    </section>
  );
}
