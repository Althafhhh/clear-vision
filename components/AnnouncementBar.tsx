"use client";

import content from "@/content";
import { useCopyList } from "@/components/Copy";

export default function AnnouncementBar() {
  const messages = useCopyList("announcements", content.announcements);
  // Repeat the message set a few times so the marquee loop has no visible seam
  const track = [...messages, ...messages, ...messages];

  return (
    <div className="announcement-bar">
      <div className="announcement-track">
        {track.map((msg, i) => (
          <span key={i} className="announcement-item">
            {msg}
            <span className="announcement-dot">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
