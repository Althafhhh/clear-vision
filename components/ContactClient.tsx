"use client";

import { useState } from "react";
import Link from "next/link";
import content from "@/content";
import Copy from "@/components/Copy";

export default function ContactClient() {
  const { contact, business } = content;

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Get In Touch</span>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
            <Copy path="contact.title" fallback={contact.title} />
          </h1>
          <p style={{ maxWidth: 480, marginTop: 10 }}>
            <Copy path="contact.subtitle" fallback={contact.subtitle} />
          </p>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / Contact
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="wrap contact-grid">
          {/* ---------- INFO ---------- */}
          <div>
            <h2>Visit or Reach Us</h2>

            <div className="info-card">
              <div className="info-icon">📍</div>
              <div>
                <h3 style={{ fontSize: 15 }}>Address</h3>
                <p>{business.address}</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <div>
                <h3 style={{ fontSize: 15 }}>Phone</h3>
                <p>
                  <a href={`tel:${business.phoneRaw1}`}>{business.phone1}</a>
                  <br />
                  <a href={`tel:${business.phoneRaw2}`}>{business.phone2}</a>
                </p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">✉️</div>
              <div>
                <h3 style={{ fontSize: 15 }}>Email</h3>
                <p>
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">🕘</div>
              <div>
                <h3 style={{ fontSize: 15 }}>Hours</h3>
                <p>{business.hours}</p>
              </div>
            </div>

            <div className="map-frame">
              <iframe
                src={business.mapEmbed}
                loading="lazy"
                title="Clear Vision location"
              />
            </div>
          </div>

          {/* ---------- FORM ---------- */}
          <div>
            <h2>Send a Message</h2>

            {status === "sent" ? (
              <div className="form-success">
                Thanks. Your message has been sent. We&apos;ll get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" type="text" required />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" />
                </div>
                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} required />
                </div>

                {status === "error" && (
                  <div className="form-error" style={{ marginBottom: 16 }}>
                    Something went wrong. Please try again or call us directly.
                  </div>
                )}

                <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
                <p className="form-note">
                  <Copy path="contact.formNote" fallback={contact.formNote} />
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
