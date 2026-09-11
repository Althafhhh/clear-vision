import Link from "next/link";
import content from "@/content";
import Copy from "@/components/Copy";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h4>{content.business.name}</h4>
            <p>
              <Copy path="footer.blurb" fallback={content.footer.blurb} />
            </p>
            <p style={{ marginTop: 10 }}>{content.business.address}</p>
          </div>

          <div>
            <h4>Navigate</h4>
            {content.footerNav.map((item) => (
              <div key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </div>
            ))}
          </div>

          <div>
            <h4>Contact</h4>
            <p>
              <a href={`tel:${content.business.phoneRaw1}`}>{content.business.phone1}</a>
            </p>
            <p>
              <a href={`tel:${content.business.phoneRaw2}`}>{content.business.phone2}</a>
            </p>
            <p>
              <a href={`mailto:${content.business.email}`}>{content.business.email}</a>
            </p>
            <p>{content.business.hours}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {content.business.name} (Pvt) Ltd. All Rights Reserved.
          </span>
          <span>Demo site built by Srimath Solutions</span>
        </div>
      </div>
    </footer>
  );
}
