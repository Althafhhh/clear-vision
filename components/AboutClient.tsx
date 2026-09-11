"use client";

import Link from "next/link";
import content from "@/content";
import SmartImage from "@/components/SmartImage";
import Copy, { useCopyList } from "@/components/Copy";

export default function AboutClient() {
  const { about, business } = content;
  const services = useCopyList("about.services", about.services);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">About</span>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
            <Copy path="about.title" fallback={about.title} />
          </h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / About Us
          </div>
        </div>
      </section>

      {/* ---------- MISSION ---------- */}
      <section className="section reveal">
        <div className="wrap">
          <div className="split-row">
            {/* File: public/images/about-story.jpg, aspect ratio 4:3 */}
            <div className="split-photo">
              <SmartImage
                src="/images/about-story.jpg"
                alt="Our mission"
                fallbackLabel="Photo goes here"
              />
            </div>

            <div>
              <span className="eyebrow">
                <Copy path="about.missionEyebrow" fallback={about.missionEyebrow} />
              </span>
              <h2>Our Mission</h2>
              <p>
                <Copy path="about.missionText" fallback={about.missionText} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- STORY ---------- */}
      <section className="section section--alt reveal">
        <div className="wrap">
          <div className="split-row flip">
            {/* File: public/images/about-work.jpg, aspect ratio 4:3 */}
            <div className="split-photo">
              <SmartImage
                src="/images/about-work.jpg"
                alt="Our story"
                fallbackLabel="Photo goes here"
              />
            </div>

            <div>
              <span className="eyebrow">
                <Copy path="about.storyEyebrow" fallback={about.storyEyebrow} />
              </span>
              <h2>Ahead of the Curve</h2>
              <p>
                <Copy path="about.storyText" fallback={about.storyText} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SERVICES ---------- */}
      <section className="section reveal">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="eyebrow">Services</span>
          <h2>
            <Copy path="about.servicesTitle" fallback={about.servicesTitle} />
          </h2>
          <div className="services-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {services.map((service) => (
              <div key={service} className="service-pill">
                <span className="service-dot" />
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section section--dark reveal">
        <div className="wrap cta-band">
          <span className="eyebrow">Visit Our Boutique</span>
          <h2>{business.address}</h2>
          <p>Open {business.hours}</p>
          <Link href="/appointment" className="btn btn--primary">
            Book an Appointment
          </Link>
        </div>
      </section>
    </>
  );
}
