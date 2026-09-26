import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fazaliaowaisiaofficial.com"),
  title: "فضلیہ اویسیہ آفیشل | Fazalia Owaisia Official",
  description:
    "فضلیہ اویسیہ آفیشل ویب سائٹ - گاؤں کی روحانی، اسلامی، فلاحی سرگرمیاں، پروگرامز، تصویری گیلری اور سوشل میڈیا چینلز۔",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    title: "فضلیہ اویسیہ آفیشل | Fazalia Owaisia Official",
    description:
      "گاؤں کی دینی، فلاحی اور سماجی سرگرمیوں کا مستند و باوقار مرکز۔",
    images: ["/images/hero/shrine-main.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ur" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-navy-950 font-urdu selection:bg-gold-500 selection:text-navy-950 antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
