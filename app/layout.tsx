import './globals.css'
import React from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'

export const metadata = {
  title: 'Rakesh Cheekatimala - Senior Software Engineer — Platforms & Applied AI',
  description: 'Senior software engineer in Singapore building performance-focused web platforms, payments flows, eKYC systems, and developer tooling.',
  icons: {
    icon: '/images/profilepic.jpeg',
  },
}

const themeScript = `
(function () {
  try {
    var storageKey = 'portfolio-theme';
    var storedTheme = window.localStorage.getItem(storageKey);
    var theme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  } catch (_) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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
