'use client';

import { MY_EXPERIENCE } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Experiences = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState<number | null>(null);

    // Animate rows in on scroll
    useGSAP(() => {
        gsap.from('.experience-row', {
            y: 80,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
            },
        });
    }, []);

    return (
        <section
            id="experience"
            ref={containerRef}
            className="relative bg-[#f4f4f4] text-black min-h-screen py-24"
        >
            {/* Section Title */}
            <div className="text-center mb-24">
                <h1 className="text-[14vw] md:text-[8vw] font-anton uppercase leading-none">
                    Experience
                </h1>
            </div>

            {/* Experience List */}
            <div className="container max-w-6xl mx-auto space-y-20">
                {MY_EXPERIENCE.map((exp, index) => (
                    <div
                        key={exp.title}
                        className="experience-row border-b border-neutral-300 pb-12 cursor-pointer group"
                        onMouseEnter={() => setHovered(index)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        {/* Top Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="text-4xl md:text-5xl font-anton uppercase group-hover:text-primary transition-colors">
                                {exp.title}
                            </h2>
                            <p className="text-neutral-500 mt-2 sm:mt-0 text-sm uppercase tracking-wide">
                                {exp.company} — {exp.duration}
                            </p>
                        </div>

                        {/* Expanded Content */}
                        <div
                            className={`transition-all duration-700 overflow-hidden ${hovered === index ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <p className="text-neutral-700 text-lg">{exp.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experiences;
