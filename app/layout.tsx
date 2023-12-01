import { ModalProvider } from '@/providers/ModalProviders'
import './globals.css'
import type { Metadata } from 'next'
import { Noto_Serif } from 'next/font/google'
import { NextAuthProvider } from '@/providers/nextAuthProvider'
import { ToasterProvider } from '@/providers/toastProvider'
import { ReactQueryProvider } from '@/providers/reactQueryProvider'

const inter = Noto_Serif({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Profiley',
  description: 'Build your online portfolio',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <NextAuthProvider />
          <ToasterProvider />
          <ModalProvider />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
