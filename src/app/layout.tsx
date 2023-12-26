import type { Metadata } from 'next'
import { Jost }  from 'next/font/google'
import './globals.css'

const inter = Jost({ subsets: ['latin'] , weight: "400"})

export const metadata: Metadata = {
  title: 'ex-layer-demo',
  description: 'a demo of ex-layer functionalities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
