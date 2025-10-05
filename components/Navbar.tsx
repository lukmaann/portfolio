'use client';

import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

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
    const [isScrolled, setIsScrolled] = useState(false);
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

    // Track scroll position for navbar styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Highlight current section
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setCurrentSection(entry.target.id);
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -20% 0px' }
        );

        sections.forEach((sec) => observer.observe(sec));
        return () => observer.disconnect();
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 w-full z-[1000] transition-all duration-300',
                isScrolled
                    ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-black/20'
                    : 'bg-black/90 backdrop-blur-sm',
                'border-b border-neutral-800'
            )}
        >
            <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
                {/* Logo / Name */}
                <button
                    onClick={() => handleNavigation('/#home')}
                    className="font-anton text-xl sm:text-2xl tracking-wide uppercase text-white hover:text-primary transition-colors duration-300 relative group z-50"
                >
                    Lukmaann<span className="text-primary">.</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 lg:gap-10 font-anton uppercase text-sm tracking-wide">
                    {MENU_LINKS.map((link) => {
                        const isActive = currentSection === link.url.replace('/#', '');
                        return (
                            <li key={link.name}>
                                <button
                                    onClick={() => handleNavigation(link.url)}
                                    className={cn(
                                        'relative hover:text-primary transition-colors duration-300 pb-1 group',
                                        isActive ? 'text-primary' : 'text-white'
                                    )}
                                >
                                    {link.name}
                                    <span
                                        className={cn(
                                            'absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300',
                                            isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                        )}
                                    ></span>
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-white hover:text-primary transition-colors duration-300 z-50 p-2 -mr-2"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    'fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden',
                    isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu Dropdown */}
            <div
                className={cn(
                    'fixed top-[73px] left-0 right-0 bg-black border-t border-neutral-800 md:hidden transition-all duration-300 ease-in-out overflow-hidden',
                    isMenuOpen
                        ? 'max-h-screen opacity-100'
                        : 'max-h-0 opacity-0 border-t-transparent'
                )}
            >
                <ul className="flex flex-col font-anton text-base uppercase">
                    {MENU_LINKS.map((link, index) => {
                        const isActive = currentSection === link.url.replace('/#', '');
                        return (
                            <li
                                key={link.name}
                                className={cn(
                                    'transform transition-all duration-300 border-b border-neutral-800/50 last:border-b-0',
                                    isMenuOpen
                                        ? 'translate-x-0 opacity-100'
                                        : '-translate-x-4 opacity-0'
                                )}
                                style={{
                                    transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                                }}
                            >
                                <button
                                    onClick={() => handleNavigation(link.url)}
                                    className={cn(
                                        'w-full text-left px-6 py-4 hover:bg-neutral-900/50 hover:text-primary transition-all duration-200 relative',
                                        isActive && 'text-primary bg-neutral-900/30'
                                    )}
                                >
                                    {link.name}
                                    {isActive && (
                                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></span>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;