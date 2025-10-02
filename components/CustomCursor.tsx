'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(useGSAP);

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return; // Disable on mobile

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power3.out',
      });

      gsap.to(ringRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power3.out',
      });
    };

    const handleHover = () => {
      gsap.to(ringRef.current, {
        scale: 1.8,
        borderColor: 'rgba(0,255,255,1)', // bright cyan glow
        duration: 0.3,
        ease: 'power3.out',
        boxShadow: '0 0 25px rgba(0,255,255,0.7)',
      });
      gsap.to(dotRef.current, { scale: 0.6, duration: 0.3 });
    };

    const handleHoverOut = () => {
      gsap.to(ringRef.current, {
        scale: 1,
        borderColor: 'rgba(0,255,255,0.6)',
        duration: 0.3,
        ease: 'power3.out',
        boxShadow: '0 0 15px rgba(0,255,255,0.5)',
      });
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
    };

    // Idle breathing
    gsap.to(ringRef.current, {
      scale: 1.1,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    window.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleHoverOut);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.querySelectorAll('a, button').forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleHoverOut);
      });
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="hidden md:block fixed top-0 left-0 w-12 h-12 rounded-full border-2 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          borderColor: 'rgba(0,255,255,0.6)',
          boxShadow: '0 0 15px rgba(0,255,255,0.5)',
        }}
      ></div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          background: 'white',
          boxShadow: '0 0 10px rgba(255,255,255,0.8)',
        }}
      ></div>
    </>
  );
};

export default CustomCursor;
