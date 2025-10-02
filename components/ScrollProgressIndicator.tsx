'use client';
import React, { useEffect, useRef } from 'react';

const ScrollProgressIndicator = () => {
    const scrollBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollBarRef.current) {
                const { scrollHeight, clientHeight } = document.documentElement;
                const scrollableHeight = scrollHeight - clientHeight;
                const scrollY = window.scrollY;
                const scrollProgress = (scrollY / scrollableHeight) * 100;

                scrollBarRef.current.style.transform = `translateY(-${100 - scrollProgress
                    }%)`;
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="
        fixed top-1/2 right-6 -translate-y-1/2
        w-1.5 h-[120px] rounded-full
        bg-neutral-800/40 backdrop-blur-sm
        overflow-hidden border border-neutral-700/50
        shadow-[0_0_10px_rgba(255,255,255,0.1)]
      "
        >
            <div
                ref={scrollBarRef}
                className="
          w-full h-full rounded-full
          bg-white
          shadow-[0_0_12px_rgba(255,255,255,0.8),0_0_24px_rgba(255,255,255,0.6)]
          transition-transform duration-200 ease-out
        "
            ></div>
        </div>
    );
};

export default ScrollProgressIndicator;
