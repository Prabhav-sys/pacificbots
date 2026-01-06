import "./globals.css";
import { Space_Grotesk, IBM_Plex_Mono, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
