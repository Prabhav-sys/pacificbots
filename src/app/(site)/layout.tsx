import "@/styles/site.css";
import "@/styles/components.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="site-content">{children}</main>
      <Footer />
    </>
  );
}
