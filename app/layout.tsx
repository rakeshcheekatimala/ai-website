import './globals.css'
import React from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'

export const metadata = {
  title: 'Rakesh Cheekatimala — AI & Full-Stack Developer',
  description: 'Portfolio and insights on AI, fullstack engineering.',
  icons: {
    icon: '/images/mascot.png',
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
