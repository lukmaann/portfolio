'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState } from 'react';

gsap.registerPlugin(useGSAP);

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const name = "LUKMAAN";

    useGSAP(
        () => {
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
                onUpdate: function () {
                    setProgress(Math.round(this.progress() * 100));
                }
            });

            // Letter reveal
            tl.to('.letter', {
                y: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 0.8,
                ease: 'power4.out',
            }, 0.3);

            // Underline draw
            tl.from('.underline', {
                scaleX: 0,
                duration: 0.6,
                ease: 'power2.inOut',
            }, '-=0.3');

            // Hold
            tl.to({}, { duration: 0.6 });

            // Exit - letters
            tl.to('.letter', {
                y: -20,
                opacity: 0,
                stagger: 0.04,
                duration: 0.5,
                ease: 'power2.in',
            });

            // Exit - underline
            tl.to('.underline', {
                scaleX: 0,
                duration: 0.4,
                ease: 'power2.in',
            }, '-=0.4');

            // Fade out preloader
            tl.to(preloaderRef.current, {
                opacity: 0,
                duration: 0.4,
                onComplete: () => {
                    if (preloaderRef.current) {
                        preloaderRef.current.style.pointerEvents = 'none';
                    }
                }
            }, '-=0.2');
        },
        { scope: preloaderRef }
    );

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
            {/* Name Container */}
            <div className="relative">
                <div className="flex gap-1">
                    {name.split('').map((char, i) => (
                        <span
                            key={i}
                            className="letter inline-block translate-y-12 opacity-0 text-white"
                            style={{ fontSize: '8rem', fontWeight: 400, fontFamily: 'var(--font-anton), sans-serif' }}
                        >
                            {char}
                        </span>
                    ))}
                </div>

                {/* Underline */}
                {/* <div className="underline absolute -bottom-2 left-0 right-0 h-0.5 bg-white origin-left" /> */}
            </div>

            {/* Progress Counter */}
            <div className="absolute bottom-8 text-white/60 text-sm font-light tracking-widest">
                {progress}%
            </div>
        </div>
    );
};

export default Preloader;