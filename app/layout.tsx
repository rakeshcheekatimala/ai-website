import './globals.css'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Home — Web Developer & Educator',
  description: 'In-depth guides on testing, web development, and building better tools for developers.',
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
