import React from "react"
import type { Metadata, Viewport } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import { WishlistProvider } from '@/lib/wishlist-context'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ["latin", "latin-ext"],
  variable: '--font-heading'
});
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'SportGear Pro | Premium Sport Accessories',
  description: 'Quality gear for every athlete. Fast delivery and trusted store for fitness, football, basketball, running, and outdoor sports accessories.',
  keywords: ['sport accessories', 'fitness gear', 'gym equipment', 'athletic wear', 'sports store'],
}

export const viewport: Viewport = {
  themeColor: '#f97316',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable} font-sans antialiased`}>
        <LanguageProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
