'use client';

import TransitionLink from '@/components/TransitionLink';
import { IProject } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

interface Props {
    index: number;
    project: IProject;
}

gsap.registerPlugin(useGSAP);

const Project = ({ index, project }: Props) => {
    const linkRef = useRef<HTMLAnchorElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Hover underline animation
            gsap.fromTo(
                linkRef.current,
                { '--underline-progress': 0 },
                {
                    '--underline-progress': 1,
                    ease: 'power3.out',
                    duration: 0.4,
                    paused: true,
                }
            );
        }, linkRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = () => {
        gsap.to(linkRef.current, {
            '--underline-progress': 1,
            duration: 0.4,
            ease: 'power3.out',
        });
    };

    const handleMouseLeave = () => {
        gsap.to(linkRef.current, {
            '--underline-progress': 0,
            duration: 0.3,
            ease: 'power3.in',
        });
    };

    return (
        <TransitionLink
            href={`/projects/${project.slug}`}
            ref={linkRef}
            className="project-item block relative overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex items-center gap-4">
                {/* Index */}
                <span className="font-anton text-neutral-500 text-xl">
                    _{(index + 1).toString().padStart(2, '0')}
                </span>

                <div>
                    {/* Title */}
                    <h3 className="font-anton text-4xl md:text-5xl uppercase text-white">
                        {project.title}
                    </h3>
                    {/* Date / Year */}
                    {/* <p className="mt-1 text-neutral-400 uppercase text-sm">
            {project.year ?? project.date}
          </p> */}
                </div>
            </div>

            {/* Underline (custom CSS) */}
            <span
                className="absolute left-0 bottom-0 h-[2px] bg-white origin-left"
                style={{
                    transform: 'scaleX(var(--underline-progress, 0))',
                }}
            />
        </TransitionLink>
    );
};

export default Project;
