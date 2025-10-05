'use client';
import { useEffect, useState } from 'react';

interface PixelCatProps {
    currentSection: string;
}

const PixelCat = ({ currentSection }: PixelCatProps) => {
    const [pos, setPos] = useState({ x: 50, y: 80 });
    const [direction, setDirection] = useState<'right' | 'left'>('right');
    const [frame, setFrame] = useState(0);
    const [action, setAction] = useState<'walk' | 'idle' | 'sit'>('walk');
    const [isPaused, setIsPaused] = useState(false);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

    const sectionMessages: Record<string, string> = {
        home: "I'm Leo 🐾, Lukmaan's cat!",
        'about-me': "Here's something about Lukmaan ⚡",
        skills: "These are Lukmaan's skills 💡",
        experience: "Look at his experience 👨‍💻",
        projects: "Check out Lukmaan's projects 🚀",
    };

    // 🗨️ Section message logic
    useEffect(() => {
        if (!sectionMessages[currentSection]) return;
        const timer = setTimeout(() => {
            setMessage(sectionMessages[currentSection]);
            setShowMessage(true);
            const hide = setTimeout(() => setShowMessage(false), 3000);
            return () => clearTimeout(hide);
        }, 600);
        return () => clearTimeout(timer);
    }, [currentSection]);

    // 🧍‍♂️ Frame animation
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => setFrame((f) => (f + 1) % 4), 200);
        return () => clearInterval(interval);
    }, [isPaused]);

    // 🐾 Random wandering movement
    useEffect(() => {
        if (isPaused) return;

        const moveInterval = setInterval(() => {
            setPos((prev) => {
                let newX = prev.x + (direction === 'right' ? 0.5 : -0.5) * Math.random();
                let newY = prev.y + (Math.random() - 0.5) * 0.8;

                if (newX > 95) {
                    newX = 95;
                    setDirection('left');
                    setAction('idle');
                }
                if (newX < 5) {
                    newX = 5;
                    setDirection('right');
                    setAction('idle');
                }
                if (newY > 90) newY = 90;
                if (newY < 60) newY = 60;

                if (Math.random() < 0.002) setAction('sit');
                else if (Math.random() < 0.01) setAction('idle');
                else setAction('walk');

                return { x: newX, y: newY };
            });
        }, 100);

        return () => clearInterval(moveInterval);
    }, [direction, isPaused]);

    // 🖱️ Interactions
    const handleMouseEnter = () => {
        setIsPaused(true);
        setAction('sit');
    };
    const handleMouseLeave = () => {
        setIsPaused(false);
        setAction('walk');
    };
    const handleClick = () => {
        const newHearts = Array.from({ length: 5 }, (_, i) => ({
            id: Date.now() + i,
            x: Math.random() * 30 - 15,
            y: -5,
        }));
        setHearts((prev) => [...prev, ...newHearts]);
        setTimeout(() => {
            setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
        }, 1200);
    };

    // 🎨 Cat frames
    const walkFrames = [
        [' ▲   ▲ ', '███████', '█ ● ● █', '█  ▼  █', ' █████ ', ' █▌ ▐█ '],
        [' ▲   ▲ ', '███████', '█ ● ● █', '█  ▼  █', ' █████ ', ' ▐█ █▌ '],
        [' ▲   ▲ ', '███████', '█ ● ● █', '█  ω  █', ' █████ ', ' █▌ ▐█ '],
        [' ▲   ▲ ', '███████', '█ ● ● █', '█  ▼  █', ' █████ ', '  ███  '],
    ];

    const idleFrames = [
        [' ▲   ▲ ', '███████', '█ ● ● █', '█  ω  █', ' █████ ', ' █▌ ▐█ '],
        [' ▲   ▲ ', '███████', '█ - - █', '█  ω  █', ' █████ ', ' █▌ ▐█ '],
    ];

    const sitFrame = [' ▲   ▲ ', '███████', '█ ● ● █', '█  ▼  █', ' █████ ', '███████'];

    const getCurrentFrame = () => {
        if (action === 'sit') return sitFrame;
        if (action === 'idle') return idleFrames[frame % 2];
        return walkFrames[frame];
    };

    return (
        <div className="fixed w-full h-full z-[9999] pointer-events-none" style={{ imageRendering: 'pixelated' }}>
            <div
                className="absolute pointer-events-auto cursor-pointer"
                style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transition: 'left 0.1s linear, top 0.1s linear',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                {/* ❤️ Floating Hearts */}
                {hearts.map((heart) => (
                    <div
                        key={heart.id}
                        className="absolute text-red-500 text-sm pointer-events-none"
                        style={{
                            left: `${heart.x}px`,
                            top: `${heart.y}px`,
                            animation: 'floatUp 1.2s ease-out forwards',
                        }}
                    >
                        ♥
                    </div>
                ))}

                {/* 🐾 Cat Sprite */}
                <div className="relative flex flex-col items-center">
                    {/* 💬 Speech Bubble ABOVE HEAD */}
                    <div
                        className={`absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 transition-all duration-300 ease-out ${showMessage
                                ? 'opacity-100 translate-y-0 scale-100'
                                : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                            }`}
                    >
                        <div className="relative bg-neutral-900 text-white border-2 border-white px-3 py-1.5 rounded-lg shadow-xl font-mono text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap">
                            {message}
                            {/* ▼ Pointer (facing downward) */}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white"></div>
                            <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-neutral-900"></div>
                        </div>
                    </div>

                    {/* Ground shadow */}
                    <div
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-black/20 rounded-full blur-[2px]"
                        style={{ opacity: action === 'sit' ? 0.3 : 0.15 }}
                    />
                    <div
                        className="text-white text-[10px] sm:text-xs md:text-sm leading-[0.85] whitespace-pre font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] relative z-10"
                        style={{
                            transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
                        }}
                    >
                        {getCurrentFrame().map((line, i) => (
                            <div key={i} className="leading-none tracking-[-0.12em]">
                                {line}
                            </div>
                        ))}
                    </div>

                    {/* Small animations */}
                    {action === 'idle' && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs animate-bounce">💤</div>
                    )}
                    {action === 'sit' && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs animate-pulse">❤️</div>
                    )}
                </div>
            </div>

            <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.6);
            opacity: 1;
          }
          50% {
            transform: translateY(-15px) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-35px) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
};

export default PixelCat;
