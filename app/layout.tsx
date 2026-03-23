import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://playadepineland.com"),
  title: "Playa de Pineland",
  description:
    "Playa de Pineland — Your Backyard Beach Volleyball Experience. Private coaching and small group training on a private sand court in Fairfax, VA.",
  keywords: [
    "beach volleyball",
    "Fairfax VA",
    "volleyball coaching",
    "sand volleyball",
    "private court",
    "group clinics",
    "volleyball lessons",
    "Playa de Pineland",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Playa de Pineland",
    description:
      "Your Backyard Beach Volleyball Experience. Private coaching and small group training on a private sand court in Fairfax, VA.",
    siteName: "Playa de Pineland",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Playa de Pineland",
    description:
      "Your Backyard Beach Volleyball Experience. Private coaching and small group training on a private sand court in Fairfax, VA.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.setAttribute("data-theme","light")}else{document.documentElement.setAttribute("data-theme","dark")}}catch(e){}})()`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
