import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { PageStateProvider } from '@/contexts/PageStatesContext'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cloud - Creator Economy Platform',
  description: 'The ultimate platform for creators to manage, monetize, and grow their audience',
  generator: 'v0.app',
  icons: {
    icon: '/cloud-logo.png',
    apple: '/cloud-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased bg-background" style={{ fontFamily: 'var(--font-inter), var(--font-geist-sans), system-ui, sans-serif' }}>
        <AuthProvider>
          <PageStateProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
          </PageStateProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
