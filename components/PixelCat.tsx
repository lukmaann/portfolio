'use client';
import React, { useEffect, useRef, useState } from 'react';

interface PixelCatProps {
    currentSection?: string;
}

const PixelCat: React.FC<PixelCatProps> = ({ currentSection = 'home' }) => {
    // ==================== STATE MANAGEMENT ====================

    // Horizontal position as percentage of viewport width (0-100%)
    const [xPct, setXPct] = useState(50);

    // Direction the cat is facing
    const [direction, setDirection] = useState<'right' | 'left'>('right');

    // Current action/animation state - now includes 'run' for fast movement
    const [action, setAction] = useState<'walk' | 'idle' | 'sit' | 'run'>('walk');

    // Whether the cat is paused (on hover)
    const [isPaused, setIsPaused] = useState(false);

    // Speech bubble message text
    const [message, setMessage] = useState('');

    // Whether to show the speech bubble
    const [showMessage, setShowMessage] = useState(false);

    // Array of heart particles that float up when cat is clicked
    const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

    // Cat color scheme based on background (for speech bubble contrast)
    const [catColor, setCatColor] = useState<'black' | 'white'>('white');

    // Cumulative distance traveled (not currently displayed but tracked)
    const [, setDistancePx] = useState(0);

    // Reference to track previous X position for distance calculations
    const prevXpxRef = useRef<number | null>(null);

    // Timer reference for behavior changes (sitting, idling, etc.)
    const behaviorTimerRef = useRef<NodeJS.Timeout | null>(null);

    // ==================== CONFIGURATION CONSTANTS ====================

    // Visual size of the cat in pixels
    const CAT_SIZE = 100;

    // Distance from the bottom of the viewport (keeps cat grounded)
    const BOTTOM_OFFSET_PX = 1;

    // Speed configurations for different movement states (pixels per second)
    const SPEED_WALK_PX_PER_SEC = 50;  // Slow walking speed
    const SPEED_RUN_PX_PER_SEC = 150;  // Fast running speed

    // How often to update position (milliseconds)
    const MOVE_TICK_MS = 1000;

    // Image sources for different cat states
    const WALK_SRC = '/cat1.gif';  // Walking animation
    const IDLE_SRC = '/cat.gif';  // Idle animation (reuses walk for now)
    const SIT_SRC = '/cat.png';   // Sitting static image
    const RUN_SRC = '/cat.gif';   // Running animation (reuses walk but moves faster)

    // Messages to display when entering different sections
    const sectionMessages: Record<string, string> = {
        home: "I'm Leo 🐾, Lukmaan's cat!",
        'about-me': "Here's something about Lukmaan ⚡",
        skills: "These are Lukmaan's skills 💡",
        experience: "Look at his experience 👨‍💻",
        projects: "Check out Lukmaan's projects 🚀",
    };

    // ==================== BACKGROUND COLOR DETECTION ====================

    // Detect if the page background is dark or light to adjust speech bubble colors
    useEffect(() => {
        const computeBackgroundColor = () => {
            try {
                // Get the computed background color of the body element
                const bg = window.getComputedStyle(document.body).backgroundColor;
                const rgb = bg.match(/\d+/g);
                if (!rgb) return;

                // Parse RGB values and calculate perceived brightness
                const [r, g, b] = rgb.map(Number);
                const brightness = (r * 299 + g * 587 + b * 114) / 1000;

                // Set color scheme: white text on dark bg, black text on light bg
                setCatColor(brightness < 128 ? 'white' : 'black');
            } catch {
                // Silently fail if color detection doesn't work
            }
        };

        // Run initially
        computeBackgroundColor();

        // Re-run on window resize
        window.addEventListener('resize', computeBackgroundColor);

        // Watch for changes to body style/class attributes
        const observer = new MutationObserver(computeBackgroundColor);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });

        // Cleanup listeners
        return () => {
            window.removeEventListener('resize', computeBackgroundColor);
            observer.disconnect();
        };
    }, []);

    // ==================== SECTION CHANGE MESSAGES ====================

    // Show a message when the current section changes
    useEffect(() => {
        // Only show message if section has an associated message
        if (!sectionMessages[currentSection]) return;

        // Delay slightly before showing message
        const showTimer = setTimeout(() => {
            setMessage(sectionMessages[currentSection]);
            setShowMessage(true);

            // Hide message after 3 seconds
            const hideTimer = setTimeout(() => setShowMessage(false), 3000);
            return () => clearTimeout(hideTimer);
        }, 500);

        return () => clearTimeout(showTimer);
    }, [currentSection]);

    // ==================== MOVEMENT & BEHAVIOR LOGIC ====================

    // Handle horizontal movement and random behavior changes
    useEffect(() => {
        // Don't move if paused (e.g., on hover)
        if (isPaused) return;

        const movementTick = () => {
            // Get viewport width for calculations
            const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            const halfCatPx = CAT_SIZE / 2;

            // Convert percentage position to actual pixels (center of cat)
            const curXpx = (xPct / 100) * vw;

            // Determine speed based on current action
            const currentSpeed = action === 'run' ? SPEED_RUN_PX_PER_SEC : SPEED_WALK_PX_PER_SEC;

            // Calculate how far to move this tick
            const movementPx = currentSpeed * (MOVE_TICK_MS / 1000);

            // Define screen boundaries (with 8px margin to prevent clipping)
            const leftLimit = halfCatPx + 8;
            const rightLimit = vw - halfCatPx - 8;

            // Calculate next position based on direction
            let nextXpx = curXpx + (direction === 'right' ? movementPx : -movementPx);

            // -------- BOUNDARY CHECKING --------

            // Hit right edge - turn around and pause
            if (nextXpx > rightLimit) {
                nextXpx = rightLimit;
                setDirection('left');
                setAction('idle');

                // Schedule next behavior change after idling
                scheduleBehaviorChange();
            }
            // Hit left edge - turn around and pause
            else if (nextXpx < leftLimit) {
                nextXpx = leftLimit;
                setDirection('right');
                setAction('idle');

                // Schedule next behavior change after idling
                scheduleBehaviorChange();
            }
            // Normal movement - occasionally change behavior randomly
            else {
                const rand = Math.random();

                // 0.5% chance to start sitting (sits for a while)
                if (rand < 0.005) {
                    setAction('sit');
                    scheduleBehaviorChange(3000, 5000); // Sit for 3-5 seconds
                }
                // 2% chance to go idle (brief pause)
                else if (rand < 0.02) {
                    setAction('idle');
                    scheduleBehaviorChange(1000, 2000); // Idle for 1-2 seconds
                }
                // 5% chance to start running (bursts of speed)
                else if (rand < 0.07) {
                    setAction('run');
                    scheduleBehaviorChange(2000, 4000); // Run for 2-4 seconds
                }
                // Otherwise continue walking
                else if (action === 'idle' || action === 'sit') {
                    // If currently idle/sitting, resume walking
                    setAction('walk');
                }
            }

            // -------- UPDATE POSITION --------

            // Convert new pixel position back to percentage
            const nextXPct = (nextXpx / vw) * 100;
            setXPct(nextXPct);

            // -------- DISTANCE TRACKING --------

            // Track cumulative distance traveled (for potential future features)
            const prev = prevXpxRef.current;
            if (prev == null) {
                // First tick - just store position
                prevXpxRef.current = nextXpx;
            } else {
                // Add absolute distance moved to total
                setDistancePx((d) => d + Math.abs(nextXpx - prev));
                prevXpxRef.current = nextXpx;
            }
        };

        // Run movement tick at regular intervals
        const intervalId = setInterval(movementTick, MOVE_TICK_MS);

        // Cleanup on unmount or dependency change
        return () => clearInterval(intervalId);
    }, [direction, isPaused, xPct, action]);

    // ==================== BEHAVIOR SCHEDULING ====================

    // Schedule a future behavior change (e.g., return to walking after sitting)
    const scheduleBehaviorChange = (minMs: number = 1500, maxMs: number = 3000) => {
        // Clear any existing scheduled behavior change
        if (behaviorTimerRef.current) {
            clearTimeout(behaviorTimerRef.current);
        }

        // Schedule new behavior change at random time within range
        const delayMs = minMs + Math.random() * (maxMs - minMs);
        behaviorTimerRef.current = setTimeout(() => {
            setAction('walk'); // Return to default walking behavior
        }, delayMs);
    };

    // Cleanup behavior timer on unmount
    useEffect(() => {
        return () => {
            if (behaviorTimerRef.current) {
                clearTimeout(behaviorTimerRef.current);
            }
        };
    }, []);

    // ==================== VIEWPORT RESIZE HANDLER ====================

    // Reset position tracking on resize to prevent distance calculation errors
    useEffect(() => {
        const handleResize = () => {
            prevXpxRef.current = null;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ==================== INTERACTION HANDLERS ====================

    // Handle click on cat - spawn floating hearts
    const handleClick = () => {
        // Create 5 hearts at random positions around the cat
        const newHearts = Array.from({ length: 5 }, (_, i) => ({
            id: Date.now() + i,
            x: Math.random() * 30 - 15, // Random X offset between -15 and 15
            y: -5, // Start slightly above cat
        }));

        setHearts((prev) => [...prev, ...newHearts]);

        // Remove hearts after animation completes (1.2 seconds)
        setTimeout(() => {
            setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
        }, 1200);
    };

    // ==================== IMAGE SOURCE SELECTION ====================

    // Choose the correct image based on current action
    const getCatSrc = () => {
        if (action === 'sit') return SIT_SRC;
        if (action === 'idle') return IDLE_SRC || WALK_SRC;
        if (action === 'run') return RUN_SRC || WALK_SRC; // Running uses same GIF but moves faster
        return WALK_SRC;
    };

    // ==================== POSITIONING CALCULATIONS ====================

    // Calculate left position (centered on xPct)
    const leftCalc = `calc(${xPct}% - ${CAT_SIZE / 2}px)`;

    // Calculate top position (anchored to bottom with offset)
    const topCalc = `calc(100% - ${BOTTOM_OFFSET_PX + CAT_SIZE}px)`;

    // ==================== RENDER ====================

    return (
        // Full-screen container with highest z-index, pointer events disabled except on cat
        <div
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{
                imageRendering: 'pixelated', // Keeps pixel art crisp
                fontFamily: 'monospace'
            }}
        >
            {/* Cat container with interaction handlers */}
            <div
                className="absolute pointer-events-auto cursor-pointer"
                onMouseEnter={() => {
                    // Pause and sit when mouse hovers
                    setIsPaused(true);
                    setAction('sit');
                }}
                onMouseLeave={() => {
                    // Resume walking when mouse leaves
                    setIsPaused(false);
                    setAction('walk');
                }}
                onClick={handleClick}
                style={{
                    left: leftCalc,
                    top: topCalc,
                    width: CAT_SIZE,
                    height: CAT_SIZE,
                    // Smooth transitions between positions
                    transition: `left ${MOVE_TICK_MS}ms linear, top ${MOVE_TICK_MS}ms linear, transform ${MOVE_TICK_MS}ms linear`,
                }}
            >
                {/* Floating hearts animation */}
                {hearts.map((heart) => (
                    <div
                        key={heart.id}
                        className="absolute text-red-500 text-sm pointer-events-none"
                        style={{
                            left: `${heart.x}px`,
                            top: `${heart.y}px`,
                            animation: 'pixelcatFloatUp 1.2s ease-out forwards',
                            willChange: 'transform, opacity' // Performance optimization
                        }}
                    >
                        ♥
                    </div>
                ))}

                {/* Speech bubble */}
                <div
                    className={`absolute -top-12 left-1/2 -translate-x-1/2 transition-all duration-300 ease-out ${showMessage
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                        }`}
                    style={{ transformOrigin: '50% 100%' }}
                >
                    {/* Speech bubble content with adaptive colors */}
                    <div
                        style={{
                            position: 'relative',
                            border: '2px solid',
                            padding: '6px 10px',
                            borderRadius: 8,
                            fontFamily: 'monospace',
                            fontSize: 12,
                            background: catColor === 'white' ? '#111827' : '#fff',
                            color: catColor === 'white' ? '#fff' : '#000',
                            borderColor: catColor === 'white' ? '#fff' : '#000',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {message}

                        {/* Speech bubble pointer/tail */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '50%',
                                bottom: -8,
                                transform: 'translateX(-50%)',
                                width: 0,
                                height: 0,
                                borderLeft: '6px solid transparent',
                                borderRight: '6px solid transparent',
                                borderTop: `8px solid ${catColor === 'white' ? '#111827' : '#fff'}`
                            }}
                        />
                    </div>
                </div>

                {/* Shadow under cat (more visible when sitting) */}
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        bottom: -8,
                        transform: 'translateX(-50%)',
                        width: 56,
                        height: 6,
                        background: 'rgba(0,0,0,0.18)',
                        borderRadius: 9999,
                        filter: 'blur(2px)',
                        opacity: action === 'sit' ? 0.3 : 0.15
                    }}
                />

                {/* Cat image - flips horizontally based on direction */}
                <img
                    src={getCatSrc()}
                    alt="pixel cat"
                    width={CAT_SIZE}
                    height={CAT_SIZE}
                    style={{
                        imageRendering: 'pixelated', // Keeps pixels sharp
                        display: 'block',
                        userSelect: 'none', // Prevent selection
                        pointerEvents: 'none', // Let parent handle clicks
                        transform: direction === 'left' ? 'scaleX(-1)' : undefined, // Flip when going left
                        transformOrigin: 'center',
                        willChange: 'transform' // Performance hint
                    }}
                />
            </div>

            {/* Keyframe animation for floating hearts */}
            <style jsx>{`
                @keyframes pixelcatFloatUp {
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