import type { Metadata } from 'next';
import { Anton, Roboto_Flex } from 'next/font/google';
import { ReactLenis } from 'lenis/react';

import 'lenis/dist/lenis.css';
import './globals.css';

import Footer from '@/components/Footer';
import ClientWrapper from './_components/ClientWrapper'; // 👈 Handles Navbar, Cursor, Cat, etc.

// 🧠 Load fonts
const antonFont = Anton({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-anton',
});

const robotoFlex = Roboto_Flex({
    weight: ['100', '400', '500', '600', '700', '800'],
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-roboto-flex',
});

// 🪪 Metadata for SEO
export const metadata: Metadata = {
    title: 'Portfolio - Lukmaan',
    description: "Personal portfolio of Lukmaan — Developer, Designer, and Cat Enthusiast 🐾",
};

// 🧱 Root layout
export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body
                className={`${antonFont.variable} ${robotoFlex.variable} antialiased bg-black text-white`}
            >
                {/* 🚀 Lenis Smooth Scroll Wrapper */}
                <ReactLenis
                    root
                    options={{
                        lerp: 0.1,
                        duration: 1.4,
                    }}
                >
                    {/* 💡 Client-side stuff lives here */}
                    <ClientWrapper>{children}</ClientWrapper>

                    {/* ⚙️ Footer stays outside client-only context (SSR safe) */}
                    <Footer />
                </ReactLenis>
            </body>
        </html>
    );
}
