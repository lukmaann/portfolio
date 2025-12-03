'use client';

// import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
// import PixelCat from '@/components/PixelCat';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import ParticleBackground from '@/components/ParticleBackground';
import StickyEmail from './StickyEmail';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    // const [currentSection, setCurrentSection] = useState('home');



    return (
        <>
            <Navbar />
            {/* <PixelCat currentSection={currentSection} /> */}
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
