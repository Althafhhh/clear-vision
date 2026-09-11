import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";

export default function SiteHeader() {
  return (
    <div className="site-header">
      <AnnouncementBar />
      <Navbar />
    </div>
  );
}
