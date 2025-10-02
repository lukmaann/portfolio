'use client';

import { PROJECTS } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Animate projects on scroll
    useGSAP(() => {
        gsap.from('.project-row', {
            y: 60,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
            },
        });
    }, []);

    const toggleProject = (index: number) => {
        if (window.innerWidth < 768) {
            setActiveIndex(activeIndex === index ? null : index);
        }
    };

    return (
        <section
            ref={containerRef}
            id="projects"
            className="relative bg-white text-black min-h-screen py-24"
        >
            {/* Section Heading */}
            <header className="text-center mb-24">
                <h1 className="text-[14vw] md:text-[8vw] font-anton uppercase leading-none text-black tracking-wide">
                    Recent Work
                </h1>
            </header>

            {/* Project List */}
            <div className="container max-w-6xl mx-auto space-y-20">
                {PROJECTS.map((project, index) => {
                    const isOpen = activeIndex === index;

                    return (
                        <article
                            key={project.slug}
                            className="project-row pb-12 cursor-pointer group transition-colors"
                            onMouseEnter={() => {
                                if (window.innerWidth >= 768) setActiveIndex(index);
                            }}
                            onMouseLeave={() => {
                                if (window.innerWidth >= 768) setActiveIndex(null);
                            }}
                            onClick={() => toggleProject(index)}
                        >
                            {/* Project Header */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-4xl md:text-6xl font-anton uppercase group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h2>
                                    <p className="text-neutral-600 mt-2">{project.year}</p>
                                </div>
                            </div>

                            {/* Expandable Content */}
                            <div
                                className={`transition-all duration-700 overflow-hidden ${isOpen ? 'max-h-[2000px] mt-8 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                {/* Description */}
                                <div
                                    className="prose max-w-none text-neutral-700 prose-li:marker:text-primary prose-strong:text-black"
                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                />

                                {/* Role */}
                                {project.role && (
                                    <div
                                        className="mt-6 text-neutral-700 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: project.role }}
                                    />
                                )}

                                {/* Tech Stack */}
                                {project.techStack && (
                                    <div className="flex flex-wrap gap-3 mt-6">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 border border-neutral-400 rounded-full text-sm text-neutral-700 bg-neutral-100 hover:border-primary hover:text-primary transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Visit Site Button */}
                                {project.liveUrl && (
                                    <div className="mt-8">
                                        <Link
                                            href={project.liveUrl}
                                            target="_blank"
                                            className="inline-block px-6 py-3 font-anton uppercase border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-300"
                                        >
                                            Visit Site
                                        </Link>
                                    </div>
                                )}

                                {/* Images */}
                                {project.images && project.images.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                                        {project.images.map((img, i) => (
                                            <div
                                                key={i}
                                                className="relative w-full rounded-lg overflow-hidden"
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`${project.title} screenshot ${i + 1}`}
                                                    width={1920}
                                                    height={1080}
                                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Smooth Gradient Fade into Footer */}
            {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-white to-black pointer-events-none" /> */}
        </section>
    );
};

export default Projects;
