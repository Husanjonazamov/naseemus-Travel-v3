import type { Metadata } from 'next'
import './globals.css'
import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
  title: 'Naseemus Travel',
  description: 'Naseemus Travel',
  generator: 'v0.app',
  icons: {
    icon: '/images/green.png', // bu favicon uchun yo‘l
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Museo Sans link */}
        <link rel="stylesheet" href="https://use.typekit.net/abcd123.css" />
        {/* Favicon */}
        <link rel="icon" href="/images/green.png" />
        <style>{`
          html {
            font-family: 'Museo Sans', sans-serif;
          }
        `}</style>
      </head>

      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
