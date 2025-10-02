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
      gsap.from('.slide-up-and-fade', {
        y: 80,
        opacity: 0,
        stagger: 0.05,
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
      id="about-me"
      ref={containerRef}
      className="relative bg-[#f4f4f4] text-black py-24 md:py-32 px-6"
    >
      {/* Top Links (flex for responsiveness) */}
      <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-6 text-xs md:text-sm underline slide-up-and-fade">
        <a href="https://github.com/lukmaann" className="truncate">
          GITHUB
        </a>
        <a
          href="https://linkedin.com/in/lukmaan"
          target="_blank"
          rel="noopener noreferrer"
          className="truncate"
        >
          LINKEDIN.COM/IN/LUKMAAN
        </a>
      </div>

      {/* Big Centered Text */}
      <div className="flex flex-col items-center justify-center min-h-[70vh] mt-20 text-center">
        <h2 className="slide-up-and-fade text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-tight max-w-4xl">
          I BUILD FAST, SCALABLE WEB APPLICATIONS THAT TURN IDEAS INTO IMPACT —
          BLENDING CLEAN CODE WITH ENGAGING, USER-FIRST EXPERIENCES.
        </h2>
      </div>
    </section>
  );
};

export default AboutMe;
