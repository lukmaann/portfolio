'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import PixelCat from '@/components/PixelCat';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import ParticleBackground from '@/components/ParticleBackground';
import StickyEmail from './StickyEmail';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const [currentSection, setCurrentSection] = useState('home');

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setCurrentSection(entry.target.id);
                });
            },
            { threshold: 0.3 }
        );

        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Navbar />
            <PixelCat currentSection={currentSection} />
            <main>{children}</main>

            {/* UI Effects */}
            <CustomCursor />
            <Preloader />
            <ScrollProgressIndicator />
            <ParticleBackground />
            <StickyEmail />
        </>
    );
}
