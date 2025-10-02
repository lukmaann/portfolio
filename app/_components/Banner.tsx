'use client';
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import ArrowAnimation from "@/components/ArrowAnimation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            ".slide-up",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out" }
        );
    }, { scope: containerRef });

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-[100dvh] flex items-center justify-center text-white bg-black banner-bg overflow-hidden px-4 sm:px-6"
        >
            {/* Top Links */}
            <div className="absolute top-4 left-4 text-[10px] xs:text-xs sm:text-sm slide-up">
                <a href="https://github.com/lukmaann" className="underline break-all">
                    GITHUB.COM/LUKMAANN
                </a>
            </div>
            <div className="absolute top-4 right-4 text-[10px] xs:text-xs sm:text-sm slide-up max-w-[45%] text-right">
                <a
                    href="https://linkedin.com/in/lukmaann"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline break-all"
                >
                    LINKEDIN.COM/IN/LUKMAANN
                </a>
            </div>

            {/* Center Name + Resume */}
            <div className="flex flex-col items-center justify-center text-center px-2">
                <h1 className="font-anton slide-up text-5xl sm:text-7xl md:text-9xl lg:text-[10vw] leading-none">
                    LUKMAAN
                </h1>

                <Link
                    href="/Lukmaan_Nadaf_Resume.pdf"
                    target="_blank"
                    className="bg-white text-black mt-6 px-6 py-3 sm:px-8 sm:py-4 font-anton uppercase tracking-wide text-sm sm:text-base md:text-lg hover:bg-transparent hover:text-white border border-white transition-colors duration-300 slide-up"
                >
                    View Resume
                </Link>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-6 left-4 text-[10px] xs:text-xs sm:text-sm slide-up">
                FULL-STACK DEVELOPER · INDIA
            </div>
            <div className="absolute bottom-6 right-4 text-[10px] xs:text-xs sm:text-sm slide-up text-right max-w-[50%]">
                Next.js · TypeScript · MongoDB
            </div>
            <ArrowAnimation></ArrowAnimation>
        </section>
    );
};

export default Banner;
