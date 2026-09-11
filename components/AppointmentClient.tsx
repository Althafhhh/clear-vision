"use client";

import { useState } from "react";
import Link from "next/link";
import content from "@/content";
import Copy from "@/components/Copy";

export default function AppointmentClient() {
  const { appointment, business } = content;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement)?.value;

    const message = `Appointment request\nPreferred date: ${get("date")}\nPreferred time: ${get(
      "time"
    )}\nReason: ${get("reason")}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("name"),
          email: get("email"),
          phone: get("phone"),
          message,
        }),
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
          <span className="eyebrow">Book Now</span>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
            <Copy path="appointment.title" fallback={appointment.title} />
          </h1>
          <p style={{ maxWidth: 480, marginTop: 10 }}>
            <Copy path="appointment.subtitle" fallback={appointment.subtitle} />
          </p>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / Make an Appointment
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="wrap" style={{ maxWidth: 640 }}>
          {status === "sent" ? (
            <div className="form-success">
              Thanks. Your appointment request has been sent. We&apos;ll call you on{" "}
              {business.phone2} to confirm a time.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" type="text" required />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" required />
                </div>
                <div className="form-field full">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required />
                </div>
                <div className="form-field">
                  <label htmlFor="date">Preferred Date</label>
                  <input id="date" name="date" type="date" required />
                </div>
                <div className="form-field">
                  <label htmlFor="time">Preferred Time</label>
                  <input id="time" name="time" type="time" required />
                </div>
                <div className="form-field full">
                  <label htmlFor="reason">Reason for Visit</label>
                  <select id="reason" name="reason" defaultValue="Eye Examination">
                    <option>Eye Examination</option>
                    <option>New Prescription</option>
                    <option>Frame / Lens Repair</option>
                    <option>Contact Lens Fitting</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {status === "error" && (
                <div className="form-error" style={{ marginBottom: 16 }}>
                  Something went wrong. Please try again or call us directly.
                </div>
              )}

              <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Request Appointment"}
              </button>
              <p className="form-note">
                <Copy path="appointment.formNote" fallback={appointment.formNote} />
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
