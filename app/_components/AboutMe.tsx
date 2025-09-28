'use client';

import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const AboutMe: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate In
      const tlIn = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });

      tlIn.from('.slide-up-and-fade', {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        ease: 'power3.out',
      });

      // Animate Out
      const tlOut = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'bottom 50%',
          end: 'bottom 10%',
          scrub: 0.5,
        },
      });

      tlOut.to('.slide-up-and-fade', {
        y: -100,
        opacity: 0,
        stagger: 0.02,
        ease: 'power3.in',
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section id="about-me" className="pb-section">
      <div ref={containerRef} className="container">
        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-light mb-16 slide-up-and-fade">
          Crafting seamless user experiences with scalable code.
        </h2>

        {/* Section Title */}
        <p className="pb-3 border-b text-muted-foreground uppercase tracking-wide text-sm font-medium slide-up-and-fade">
          About Me
        </p>

        <div className="grid md:grid-cols-12 gap-6 mt-9">
          {/* Left Column */}
          <div className="md:col-span-5">
            <p className="text-5xl font-semibold slide-up-and-fade">
              Hi, I&apos;m <span className="text-primary">Lukmaan</span>.
            </p>
          </div>

          {/* Right Column */}
          <div className="md:col-span-7 text-lg text-muted-foreground max-w-[500px] space-y-4">
            <p className="slide-up-and-fade">
              👋 I’m a Full-Stack Developer who loves turning ideas into polished,
              scalable applications. I believe good code should feel invisible —
              letting the user enjoy a seamless experience.
            </p>

            <p className="slide-up-and-fade">
              🚀 I’ve built tools and apps that make real impact — like reducing
              a manufacturing firm’s processing time from an hour to just minutes.
              I enjoy solving problems that save time, cut costs, and help
              businesses run smarter.
            </p>

            <p className="slide-up-and-fade">
              🧑‍💻 I work with modern web technologies: Next.js, React, TypeScript,
              Prisma, Node.js, MongoDB, PostgreSQL, and Tailwind CSS. From
              pixel-perfect UIs to efficient backends, I handle the full journey
              from concept to deployment.
            </p>

            <p className="slide-up-and-fade">
              🎓 Currently pursuing my MCA at{' '}
              <a
                href="https://pes.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
              >
                PES University
              </a>
              , I’m constantly learning, experimenting, and building.
            </p>

            <p className="slide-up-and-fade">
              💬 Open to internships, freelance work, and collaborations. If you
              have an idea worth building, let’s bring it to life!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
