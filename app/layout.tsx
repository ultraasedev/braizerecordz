// app/layout.tsx
import { Inter } from "next/font/google"
import { MotionConfig } from "framer-motion"
import "./globals.css"
import CookieConsent from "./components/layout/Cookieconsent"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BraizeRecords - Production & Management",
  description: "Label de musique 360° spécialisé en rap, pop urbaine et shatta",
  keywords: "braizerecords, musique, rap, pop urbaine, shatta, production, management",
  authors: [{ name: "BraizeRecords" }],
  openGraph: {
    title: "BraizeRecords",
    description: "Label de musique 360° spécialisé en rap, pop urbaine et shatta",
    url: "https://braizerecords.com",
    siteName: "BraizeRecords",
    locale: "fr_FR",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <MotionConfig reducedMotion="user">
          <div className="flex min-h-screen flex-col bg-black text-white">
            {children}
            <Toaster position="bottom-center" />
            <CookieConsent/>
          </div>
        </MotionConfig>
      </body>
    </html>
  )
}