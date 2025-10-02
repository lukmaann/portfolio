'use client';

import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import PixelCat from './PixelCat';

const MENU_LINKS = [
    { name: 'Home', url: '/#home' },
    { name: 'About Me', url: '/#about-me' },
    { name: 'Skills', url: '/#skills' },
    { name: 'Experience', url: '/#experience' },
    { name: 'Projects', url: '/#projects' },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState('home');
    const router = useRouter();

    const handleNavigation = (url: string) => {
        if (url.startsWith('/#')) {
            const id = url.replace('/#', '');
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            router.push(url);
        }
        setIsMenuOpen(false);
    };

    // 🔥 Track section visibility
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setCurrentSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.2, // only 20% needs to be visible
                rootMargin: '0px 0px -20% 0px', // trigger a bit earlier
            }
        );

        sections.forEach((sec) => observer.observe(sec));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white border-b border-neutral-800">
                <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    {/* Cat */}
                    <PixelCat currentSection={currentSection} />

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex gap-10 font-anton uppercase text-sm tracking-wide">
                        {MENU_LINKS.map((link) => (
                            <li key={link.name}>
                                <button
                                    onClick={() => handleNavigation(link.url)}
                                    className={cn(
                                        'hover:text-primary transition-colors',
                                        currentSection === link.url.replace('/#', '') && 'text-primary'
                                    )}
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
        </>
    );
};

export default Navbar;
