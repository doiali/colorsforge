import type { Metadata } from "next"
import "./globals.css"
import { ColorProvider } from '@/components/color-provider'
import Layout from '@/components/layout'
import { ThemeProvider } from '@/components/theme-provider'
import { geistMono, geistSans } from '@/fonts'


export const metadata: Metadata = {
  title: "ColorsForge - Craft  Modern Colors",
  description: "Craft colors with love! RGB, HSL, OKLCH, OKLab, forge in modern CSS color spaces.",
  keywords: [
    "Colors Forge",
    "ColorsForge",
    "color picker",
    "color converter",
    "color selector",
    "color generator",
    "color spaces"
  ],
  authors: [{ name: "Alireza Bagheri", url: "https://x.com/doiali" }],
  openGraph: {
    title: "ColorsForge - Craft Modern Colors",
    description: "Craft colors with love! RGB, HSL, OKLCH, OKLab, forge in modern CSS color spaces.",
    url: "https://colorsforge.com",
    siteName: "ColorsForge",
    images: [
      {
        url: "/colorsforge.png",
        width: 1200,
        height: 630,
        alt: "ColorsForge - Craft Modern Colors",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ColorsForge - Craft Modern Colors",
    description: "Craft colors with love! RGB, HSL, OKLCH, OKLab, forge in modern CSS color spaces.",
    images: ["/colorsforge.png"],
  },
  viewport: "width=device-width, initial-scale=1.0",
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ColorProvider>
            <Layout>
              {children}
            </Layout>
          </ColorProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
