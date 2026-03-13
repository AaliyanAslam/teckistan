import WhatsAppModal from "./components/layout/WhatsappModel";
import "./globals.css";

export const metadata = {
  title: "Teckistan Solutions | Professional Website Development",
  description:
    "Teckistan Solutions builds modern, fast and high-converting websites for businesses. Landing pages starting at $99 and full websites from $200-$500.",
  keywords: [
    "web development",
    "landing page development",
    "business website",
    "website design agency",
    "Teckistan Solutions",
  ],
  authors: [{ name: "Teckistan Solutions" }],
  creator: "Teckistan Solutions",
  metadataBase: new URL("https://teckistan.vercel.app"),
  openGraph: {
    title: "Teckistan Solutions | Professional Website Development",
    description:
      "Launch your business online with a professional website. Landing pages from $99.",
    url: "https://teckistan.vercel.app",
    siteName: "Teckistan Solutions",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning = {true}>
      <body>
        {children}
        <WhatsAppModal />
      </body>
    </html>
  );
}
