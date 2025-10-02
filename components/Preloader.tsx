'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
import ParticleBackground from './ParticleBackground';

gsap.registerPlugin(useGSAP);

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const name = "LUKMAAN";

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

            // PHASE 1: Letters slide up from behind a mask
            // This creates a clean, shutter-like reveal effect.
            tl.to('.letter', {
                y: 0,
                stagger: 0.08, // A slightly faster stagger for a crisp feel
                duration: 1.4,
            });

            // PHASE 2: Exit animation
            // The letters slide back down before the final transition.
            tl.to('.letter', {
                y: '-110%', // Move letters completely out of view
                stagger: 0.05,
                duration: 0.7,
                delay: 0.75, // Hold the name on screen
                ease: 'expo.in',
            });

            // PHASE 3: Background panels retract like curtains
            tl.to('.preloader-item', {
                scaleY: 0,
                transformOrigin: 'top',
                duration: 1.2,
                stagger: 0.07,
                ease: 'expo.inOut',
            }, '<0.2'); // Overlap for a smooth transition

            // PHASE 4: Hide the preloader container
            tl.to(preloaderRef.current, {
                autoAlpha: 0,
                pointerEvents: 'none',
            }, '-=0.6');
        },
        { scope: preloaderRef }
    );

    return (
        <div

            ref={preloaderRef}
            className="fixed inset-0 z-[9999] flex bg-black"
        >
            <ParticleBackground />
            {/* Panels for the curtain effect */}
            {Array.from({ length: 10 }).map((_, i) => (
                <div
                    key={i}
                    className="preloader-item h-full w-[10%] bg-black"
                />
            ))}

            {/* Name Container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1
                    className="font-anton text-white text-5xl sm:text-7xl md:text-9xl lg:text-[10vw] leading-none flex gap-1 tracking-wide"
                >
                    {name.split('').map((char, i) => (
                        // Each letter is wrapped in a div that acts as a mask
                        <div key={i} className="letter-mask overflow-hidden">
                            <span className="letter inline-block translate-y-full">
                                {char}
                            </span>
                        </div>
                    ))}
                </h1>
            </div>
        </div>
    );
};

export default Preloader;