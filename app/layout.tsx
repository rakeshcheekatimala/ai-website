import './globals.css'
import React from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'

export const metadata = {
  title: 'Rakesh Cheekatimala - Senior Frontend Platform Engineer',
  description: 'Senior frontend engineer in Singapore building performance-focused web platforms, payments flows, eKYC systems, and developer tooling.',
  icons: {
    icon: '/images/profilepic.jpeg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
