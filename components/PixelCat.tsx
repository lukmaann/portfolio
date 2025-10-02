import { useEffect, useState } from 'react';

interface PixelCatProps {
    currentSection: string;
}

const PixelCat = ({ currentSection }: PixelCatProps) => {
    const [position, setPosition] = useState(0);
    const [direction, setDirection] = useState<'right' | 'left'>('right');
    const [frame, setFrame] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    // 🔹 Section → Message Map
    const sectionMessages: Record<string, string> = {
        home: "I’m Leo 🐾, Lukmaan’s cat!",
        'about-me': "Here’s something about Lukmaan ⚡",
        skills: "These are the skills Lukmaan knows 💡",
        experience: "Check out Lukmaan’s experience 👨‍💻",
        projects: "Wanna see Lukmaan’s projects? 🚀",
    };

    // Show message when section changes
    useEffect(() => {
        if (!sectionMessages[currentSection]) return;

        const timer = setTimeout(() => {
            setMessage(sectionMessages[currentSection]);
            setShowMessage(true);

            // hide a bit quicker
            const hideTimer = setTimeout(() => {
                setShowMessage(false);
            }, 2000);

            return () => clearTimeout(hideTimer);
        }, 800); // wait 0.8s before showing

        return () => clearTimeout(timer);
    }, [currentSection]);

    // Animation loop
    useEffect(() => {
        if (isPaused) return;
        const frameInterval = setInterval(
            () => setFrame((prev) => (prev + 1) % 4),
            350
        );
        return () => clearInterval(frameInterval);
    }, [isPaused]);

    // Movement loop
    useEffect(() => {
        if (isPaused) return;
        const moveInterval = setInterval(() => {
            setPosition((prev) => {
                const newPos = direction === 'right' ? prev + 0.3 : prev - 0.3;
                if (newPos > 85) {
                    setDirection('left');
                    return 85;
                }
                if (newPos < 0) {
                    setDirection('right');
                    return 0;
                }
                return newPos;
            });
        }, 60);
        return () => clearInterval(moveInterval);
    }, [direction, isPaused]);

    const handleMouseEnter = () => {
        setIsPaused(true);
        setShowMessage(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    const catFrames = [
        [' /\\_/\\  ', '( o.o ) ', ' > ^ <  ', '/|   |\\'],
        [' /\\_/\\  ', '( o.o ) ', ' > ^ <  ', '|/   \\|'],
        [' /\\_/\\  ', '( o.o ) ', ' > ^ <  ', '\\|   |/'],
        [' /\\_/\\  ', '( o.o ) ', ' > ^ <  ', '/|   |\\'],
    ];

    return (
        <div
            className="absolute top-1 cursor-pointer"
            style={{ left: `${position}%`, transition: 'left 60ms linear' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Speech Bubble */}
            <div
                className={`absolute top-10 left-1/2 -translate-x-1/2 transform transition-all duration-400 ease-out ${showMessage
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-2 scale-90 pointer-events-none'
                    }`}
            >
                <div className="bg-neutral-900 text-white border-2 border-primary px-4 py-2 rounded-md relative whitespace-nowrap shadow-xl font-mono text-xs">
                    {message}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0">
                        <div className="w-3 h-3 bg-neutral-900 border-l-2 border-t-2 border-primary rotate-45"></div>
                    </div>
                </div>
            </div>

            {/* Cat */}
            <div
                className="text-primary text-[10px] leading-tight select-none whitespace-pre font-mono drop-shadow-lg"
                style={{ transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)' }}
            >
                {catFrames[frame].map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
            </div>
        </div>
    );
};

export default PixelCat;
