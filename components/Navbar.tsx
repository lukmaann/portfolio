'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';

const MENU_LINKS = [
    { name: 'Home', url: '/' },
    { name: 'About Me', url: '/#about-me' },
    { name: 'Experience', url: '/#experience' },
    { name: 'Projects', url: '/#projects' },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const handleNavigation = (url: string) => {
        if (url.startsWith('/#')) {
            // Use native scrolling for hash links
            window.location.href = url;
        } else {
            router.push(url);
        }
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* Top Fixed Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white border-b border-neutral-800">
                <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    {/* Logo / Name */}
                    {/* <button
                        onClick={() => router.push('/')}
                        className="font-anton text-xl uppercase tracking-widest hover:text-primary transition-colors"
                    >
                        LUKMAAN
                    </button> */}

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex gap-10 font-anton uppercase text-sm tracking-wide">
                        {MENU_LINKS.map((link) => (
                            <li key={link.name}>
                                <button
                                    onClick={() => handleNavigation(link.url)}
                                    className="hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Burger */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center gap-1.5"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span
                            className={cn(
                                'block w-6 h-0.5 bg-white transition-transform',
                                isMenuOpen && 'rotate-45 translate-y-[6px]'
                            )}
                        />
                        <span
                            className={cn(
                                'block w-6 h-0.5 bg-white transition-opacity',
                                isMenuOpen && 'opacity-0'
                            )}
                        />
                        <span
                            className={cn(
                                'block w-6 h-0.5 bg-white transition-transform',
                                isMenuOpen && '-rotate-45 -translate-y-[6px]'
                            )}
                        />
                    </button>
                </div>
            </nav>

            {/* Mobile Overlay Menu */}
            <div
                className={cn(
                    'fixed inset-0 bg-black text-white flex flex-col justify-center items-center gap-10 z-40 transition-all duration-500',
                    isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                )}
            >
                <ul className="flex flex-col gap-8 font-anton text-3xl uppercase text-center">
                    {MENU_LINKS.map((link) => (
                        <li key={link.name}>
                            <button
                                onClick={() => handleNavigation(link.url)}
                                className="hover:text-primary transition-colors"
                            >
                                {link.name}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Contact + Socials */}
                <div className="mt-10 text-sm text-neutral-400 text-center">
                    <p className="mb-2">GET IN TOUCH</p>
                    <a
                        href={`mailto:${GENERAL_INFO.email}`}
                        className="hover:text-primary transition-colors block"
                    >
                        {GENERAL_INFO.email}
                    </a>
                    <div className="flex gap-6 justify-center mt-4">
                        {SOCIAL_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-primary transition-colors uppercase text-xs"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
