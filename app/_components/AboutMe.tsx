'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutMe = () => {
    const container = React.useRef<HTMLDivElement>(null);

    // Animate in
    useGSAP(
        () => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 70%',
                    end: 'bottom bottom',
                    scrub: 0.5,
                },
            }).from('.slide-up-and-fade', {
                y: 100,
                opacity: 0,
                stagger: 0.05,
            });
        },
        { scope: container },
    );

    // Animate out
    useGSAP(
        () => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    scrub: 0.5,
                },
            }).to('.slide-up-and-fade', {
                y: -100,
                opacity: 0,
                stagger: 0.02,
            });
        },
        { scope: container },
    );

    return (
        <section id="about-me" className="pb-section">
            <div className="container" ref={container}>
                <h2 className="text-4xl md:text-6xl font-thin mb-20 slide-up-and-fade">
                    Crafting seamless user experiences with scalable code.
                </h2>

                <p className="pb-3 border-b text-muted-foreground slide-up-and-fade">
                    About Me
                </p>

                <div className="grid md:grid-cols-12 mt-9">
                    <div className="md:col-span-5">
                        <p className="text-5xl slide-up-and-fade">
                            Hi, I&apos;m Lukmaan.
                        </p>
                    </div>
                    <div className="md:col-span-7 text-lg text-muted-foreground max-w-[450px]">
                        <p className="slide-up-and-fade">
                            🚀 Full-stack developer focused on building
                            scalable, maintainable apps using Next.js,
                            TypeScript, Prisma, and the MERN stack.
                        </p>
                        <p className="mt-3 slide-up-and-fade">
                            🛠 Built tools that saved 90% time for a
                            manufacturing firm. From frontend polish to backend
                            logic — I do it all.
                        </p>
                        <p className="mt-3 slide-up-and-fade">
                            🧠 Tech Stack: Next.js • React.js • Prisma •
                            TypeScript • Node.js • MongoDB • PostgreSQL •
                            Tailwind CSS
                        </p>
                        <p className="mt-3 slide-up-and-fade">
                            🎓 MCA @{' '}
                            <a
                                href="https://pes.edu/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline "
                            >
                                PES University
                            </a>{' '}
                            • Always learning • Always shipping.
                        </p>
                        <p className="mt-3 slide-up-and-fade">
                            💬 Open to internships, freelance work, and collabs.
                            Let’s build something impactful!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
