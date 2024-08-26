"use client";
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import { videos } from './videos';

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Slider: React.FC = () => {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState<number | null>(null);
    const [originalPosition, setOriginalPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const [visibleCardInfo, setVisibleCardInfo] = useState<number | null>(null);
    const [isTextVisible, setIsTextVisible] = useState(true); // New state for text visibility
    const lRef = useRef(null);
    const rRef = useRef(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && sliderRef.current) {
            initializeCards();
        }
    }, [isClient]);

    const initializeCards = () => {
        const cards = Array.from(sliderRef.current?.querySelectorAll(".card") || []);
        const totalCards = cards.length;
        const baseY = 10; // Adjust this value to control vertical spacing between cards
        const baseZ = 50; // Adjust this value to control depth between cards

        gsap.to(cards, {
            y: (i) => `${baseY * i}%`,
            z: (i) => baseZ * (totalCards - i - 1), // Decrease z-index as you move up the stack
            duration: 1,
            ease: "power3.out",
            stagger: -0.1,
        });
    };

    const handleClick = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        const slider = sliderRef.current;
        if (!slider) return;

        const cards = Array.from(slider.querySelectorAll(".card"));
        const lastCard = cards.pop();

        if (lastCard) {
            gsap.to(lastCard, {
                y: "+=150%",
                duration: 1,
                ease: "power3.inout",
                onStart: () => {
                    setTimeout(() => {
                        slider.prepend(lastCard);
                        initializeCards();
                        setTimeout(() => {
                            setIsAnimating(false);
                        }, 1000);
                    }, 300);
                }
            });
        }
    };

    const handleClick1 = (index: number) => {
        if (isAnimating) return;
        setIsAnimating(true);
    
        const slider = sliderRef.current;
        if (!slider) return;
    
        const cards = Array.from(slider.querySelectorAll(".card"));
        const lastCard = cards.pop() as HTMLElement;
    
        if (lastCard) {
            if (isFullscreen !== null && isFullscreen === index) {
                setVisibleCardInfo(null); // Make card-info visible again
                if (originalPosition) {
                    gsap.to(lastCard, {
                        scaleX: 1,
                        scaleY: 1,
                        x: 0,
                        y: "140%",
                        duration: 2,
                        ease: "power3.inOut",
                        onComplete: () => {
                            setIsFullscreen(null);
                            setIsAnimating(false);
                            gsap.to(".vertical-text", { x: 0, duration: 1, ease: "power3.inOut" }); // Show vertical text
                        }
                    });
                } else {
                    gsap.to(lastCard, {
                        scaleX: 1,
                        scaleY: 1,
                        x: 0,
                        y: 0,
                        duration: 2,
                        ease: "power3.inOut",
                        onComplete: () => {
                            setIsFullscreen(null);
                            setIsAnimating(false);
                            gsap.to(".vertical-text", { x: 0, duration: 1, ease: "power3.inOut" }); // Show vertical text
                        }
                    });
                }
            } else {
                const rect = lastCard.getBoundingClientRect();
                setOriginalPosition({
                    x: rect.left + window.scrollX,
                    y: rect.top + window.scrollY,
                    width: lastCard.offsetWidth,
                    height: lastCard.offsetHeight
                });
    
                setVisibleCardInfo(index); // Hide card-info
                gsap.to(lRef.current, { x: "-100%", duration: 1, ease: "power3.inOut" }); // Hide vertical text
                gsap.to(rRef.current, { x: "200%", duration: 1, ease: "power3.inOut" });
    
                gsap.to(lastCard, {
                    scaleX: window.innerWidth / lastCard.offsetWidth,
                    scaleY: window.innerHeight / lastCard.offsetHeight,
                    x: (window.innerWidth - lastCard.offsetWidth * (window.innerWidth / lastCard.offsetWidth)) / 2,
                    y: "120%",
                    duration: 1,
                    ease: "power3.inOut",
                    onComplete: () => {
                        setIsFullscreen(index);
                        setIsAnimating(false);
                    }
                });
            }
        }
    };

    const handleReady = (player: any, index: number) => {
        const internalPlayer = player.getInternalPlayer();
        if (internalPlayer && typeof internalPlayer.setPlaybackQuality === "function") {
            internalPlayer.setPlaybackQuality('hd1080'); // Set to the desired quality
        }
    };

    return (
        <div className="relative w-screen h-[100vh] bg-black overflow-hidden">
            <div className="absolute top-0 w-screen h-[100vh] perspective-[200px] perspective-origin-[50%_100%]" ref={sliderRef}>
                {videos.map((video, index) => (
                    <div
                        className="card absolute lg:-top-[50%] left-1/2 transform translate-x-[-50%] 
                                   w-[90%] sm:w-[75%] md:w-[65%] lg:w-[50%] xl:w-[40%] 
                                   h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] 
                                   bg-black rounded-lg flex flex-col"
                        key={video.id}
                    >
                        <div className={`card-info w-full py-2 px-3 flex items-center justify-center bg-black z-10 ${visibleCardInfo === index ? 'invisible' : 'visible'}`}>
                            <div className="card-item">
                                <p className="text-sm sm:text-base md:text-sm font-normal text-neutral-600 hover:text-neutral-100 hover:scale-105 transition-all duration-300 cursor-pointer" onClick={handleClick}>{video.title}</p>
                            </div>
                        </div>

                        <div className="video-player w-full h-full overflow-hidden" style={{ position: 'relative' }}>
                                <ReactPlayer
                                    url={`https://www.youtube.com/watch?v=${video.id}`}
                                    controls={false}
                                    playing={true}
                                    loop={true}
                                    muted={isFullscreen !== index}
                                    width="100%"
                                    height="100%"
                                    style={{ transform: 'scale(1.5)', userSelect: "none", pointerEvents: 'none' }}
                                    onReady={(player) => handleReady(player, index)}
                                    config={{
                                        youtube: {
                                            playerVars: {
                                                controls: 0, // Hides controls
                                                modestbranding: 1, // Reduces YouTube branding
                                                rel: 0, // Disables related videos
                                                showinfo: 0, // Hides video info (deprecated, but still safe to include)
                                                iv_load_policy: 4, // Disables annotations
                                                disablekb: 1, // Disables keyboard controls
                                                fs: 0, // Disables the fullscreen button
                                                playsinline: 1, // Plays video inline on mobile browsers
                                                cc_load_policy: 0, // Hides closed captions
                                                autoplay: 1, // Auto-plays the video
                                            }
                                        }
                                    }}
                                />
                                <div style={{ 
                                    position: 'absolute', 
                                    top: 0, 
                                    left: 0, 
                                    width: '100%', 
                                    height: '100%', 
                                    zIndex: 1, 
                                    pointerEvents: 'none' 
                                }}></div>
                            </div>


                        <div className="w-full py-2 px-3 flex items-center bg-black z-10 ">
                            <div className="card-item ml-auto">
                                <div
                                    className="text-xs sm:text-sm md:text-base text-[#6a6a6a] hover:text-neutral-500 hover:scale-95 transition-all duration-300 cursor-pointer p-2"
                                    onClick={() => handleClick1(index)}
                                >
                                    <img src="fullscreen.png" alt="Fullscreen" className='w-[10px] h-[10px] md:w-[20px] md:h-[20px]' />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Vertical text on the left side */}
            <div className={`vertical-text absolute top-0 left-0 p-32 h-full flex items-center justify-center  ${isTextVisible ? '' : 'invisible'}`} ref={lRef}>
                <div className="text-white text-[20px] md:text-[50px] lg:text-[200px] md:block hidden font-bold" style={{ 
                    writingMode: 'vertical-lr', 
                    fontFamily: "New Amsterdam", 
                    transform: 'rotate(180deg)'  // Rotate 90 degrees
                }}>
                    CINEMA
                </div>
            </div>

            {/* Vertical text on the right side */}
            <div className={`vertical-text absolute top-0 right-0 p-32 h-full flex items-center justify-center ${isTextVisible ? '' : 'invisible'}`} ref={rRef}>
                <div className="text-white text-[20px] md:text-[50px] lg:text-[200px] md:block hidden font-bold" style={{ 
                    writingMode: 'vertical-lr', 
                    fontFamily: "New Amsterdam", 
                    transform: 'rotate(-360deg)'  // Rotate -90 degrees
                }}>
                    CINEMA
                </div>
            </div>
        </div>
    );
};

export default Slider;
