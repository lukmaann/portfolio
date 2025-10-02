'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import { MY_STACK } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.from('.slide-up', {
                opacity: 0,
                y: 60,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom bottom',
                    scrub: 0.5,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="skills"
            ref={containerRef}
            className="relative bg-[#f4f4f4] text-black py-24"
        >
            {/* Pixel Divider */}
            <div className="absolute top-0 left-0 right-0 w-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 50"
                    className="w-full h-12"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 25 L30 15 L60 35 L90 15 L120 35 L150 15 L180 35 L210 15 L240 35 L270 15 L300 35 
               L330 15 L360 35 L390 15 L420 35 L450 15 L480 35 L510 15 L540 35 L570 15 L600 35 
               L630 15 L660 35 L690 15 L720 35 L750 15 L780 35 L810 15 L840 35 L870 15 L900 35 
               L930 15 L960 35 L990 15 L1020 35 L1050 15 L1080 35 L1110 15 L1140 35 L1170 15 L1200 35 
               L1230 15 L1260 35 L1290 15 L1320 35 L1350 15 L1380 35 L1410 15 L1440 25"
                        stroke="black"
                        fill="transparent"
                        strokeWidth="2"
                    />
                </svg>
            </div>

            <div className="container relative z-10">
                {/* Section Title */}
                <h2 className="text-center text-4xl md:text-6xl font-black uppercase mb-20 slide-up">
                    My Stack
                </h2>

                {/* Skills Grid */}
                <div className="space-y-24">
                    {Object.entries(MY_STACK).map(([category, items]) => (
                        <div
                            key={category}
                            className="grid sm:grid-cols-12 items-start gap-y-10"
                        >
                            {/* Category Name */}
                            <div className="sm:col-span-4">
                                <p className="slide-up text-4xl md:text-5xl font-anton uppercase leading-tight">
                                    {category}
                                </p>
                            </div>

                            {/* Skills List */}
                            <div className="sm:col-span-8 flex flex-wrap gap-x-12 gap-y-8">
                                {items.map((item) => (
                                    <div
                                        key={item.name}
                                        className="slide-up flex items-center gap-3"
                                    >
                                        <Image
                                            src={item.icon}
                                            alt={item.name}
                                            width={40}
                                            height={40}
                                            className="h-10 w-10"
                                        />
                                        <span className="text-2xl font-medium">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
