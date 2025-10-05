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

            // PHASE 1: Refined letter reveal with subtle mask
            tl.to('.letter', {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 1,
                ease: 'power4.out',
            }, 0.3);

            // PHASE 2: Subtle line draw effect
            tl.from('.underline', {
                scaleX: 0,
                duration: 0.8,
                ease: 'power2.inOut',
            }, '-=0.4');

            // PHASE 3: Hold presence
            tl.to({}, { duration: 0.8 });

            // PHASE 4: Clean exit - letters fade and shift
            tl.to('.letter', {
                y: -30,
                opacity: 0,
                stagger: 0.03,
                duration: 0.6,
                ease: 'power2.in',
            });

            // PHASE 5: Elegant curtain close
            tl.to('.preloader-panel', {
                scaleY: 0,
                transformOrigin: 'top',
                duration: 1,
                stagger: {
                    each: 0.06,
                    from: 'edges',
                },
                ease: 'power3.inOut',
            }, '-=0.3');

            // PHASE 6: Final fade
            tl.to(preloaderRef.current, {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.5,
            }, '-=0.4');
        },
        { scope: preloaderRef }
    );

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-[9999] flex overflow-hidden bg-black"
        >
            {/* Clean panel grid */}
            <div className="absolute inset-0 flex">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="preloader-panel h-full flex-1 bg-black relative"
                        style={{
                            borderRight: i < 9 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                        }}
                    />
                ))}
            </div>

            {/* Name Container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                    <h1 className="font-anton text-white text-5xl sm:text-7xl md:text-9xl lg:text-[10vw] leading-none flex gap-1 tracking-wide">
                        {name.split('').map((char, i) => (
                            <div key={i} className="letter-mask overflow-hidden">
                                <span
                                    className="letter inline-block translate-y-full opacity-0"
                                >
                                    {char}
                                </span>
                            </div>
                        ))}
                    </h1>

                    {/* Minimal underline accent */}
                    <div
                        className="underline h-[2px] bg-white mt-4 origin-left"
                        style={{
                            width: '100%',
                        }}
                    />
                </div>

                {/* Minimal progress indicator */}
                <div className="mt-12 flex items-center justify-center gap-3">
                    <div className="w-32 h-[1px] bg-white/20 relative overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-white transition-all duration-200 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-white/50 text-xs font-light tracking-[0.2em] tabular-nums min-w-[3ch]">
                        {progress}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Preloader;