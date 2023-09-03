import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { RootStyleRegistry } from '@/libs/root-style-registry'
import ThemeProvider from './themeProvider'
import Providers from './GlobalRedux/providers'
// import { authOptions } from "@/utils/authOptions";
// import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import HeaderPublic from './(public)/header/page'
import FooterPublic from './(public)/footer/page'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sell G1 Garlic | G1 Garlic Mandi | Buy and Sell',
  description: 'Buy and Sell G1 Garlic online',
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
  // icons: [
  //   {
  //     rel: 'icon',
  //     type: 'image/png',
  //     sizes: '32x32',
  //     url: `${process.env.NEXT_PUBLIC_SERVER_PATH}/favicon/favicon-32x32.png`,
  //   },
  //   {
  //     rel: 'icon',
  //     type: 'image/png',
  //     sizes: '32x32',
  //     url: `${process.env.NEXT_PUBLIC_SERVER_PATH}/favicon/favicon-32x32.png`,
  //   },
  //   {
  //     rel: 'icon',
  //     type: 'image/png',
  //     sizes: '16x16',
  //     url: `${process.env.NEXT_PUBLIC_SERVER_PATH}/favicon/favicon-16x16.png`,
  //   },
  //   {
  //     rel: 'apple-touch-icon',
  //     sizes: '180x180',
  //     url: `${process.env.NEXT_PUBLIC_SERVER_PATH}/favicon/apple-touch-icon.png`,
  //   },
  // ],
  openGraph: {
    images: `${process.env.NEXT_PUBLIC_SERVER_PATH}/images/g1-garlic-for-sale.jpg`,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <RootStyleRegistry>
            <ThemeProvider>
              <HeaderPublic params={{ session: session }} />
              {children}
              <FooterPublic />
            </ThemeProvider>
          </RootStyleRegistry>
        </Providers>
      </body>
    </html>
  )
}
