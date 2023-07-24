import Navbar from '@/components/Navbar'
 
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black">
      {/* <Toaster
  position="top-center"
  reverseOrder={false}
/> */}
        <Navbar />
       
        {children}
      </body>
    </html>
  )
}
