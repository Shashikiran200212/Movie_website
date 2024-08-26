"use client";
import React, { useEffect, useRef } from 'react';
import Counter from './ui/TestTicker'; // Make sure this path is correct
import gsap from 'gsap';

const Loader = () => {
    const lRef = useRef<HTMLDivElement>(null);
    const cRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lRef.current) {
            gsap.fromTo(lRef.current, 
                {
                    x: "-100%",
                },
                {
                    x: 0,
                    duration: 5,
                    ease: "power2.Out",
                }
            );
        }
        
        if (lRef.current) {
            gsap.to(lRef.current, 
                {
                    height: "100vh",
                    delay: 5,
                    onComplete: () => {
                        gsap.to(lRef.current, {
                            height: "0%",
                            duration: 1,
                            delay: 1
                        });
                    }
                }
            );
        }

        if (cRef.current) {
            gsap.to(cRef.current, 
                {
                    opacity: 0,
                    y: 100,
                    delay: 5
                }
            );
        }
        
    }, []);

    return (
        <div className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* Center the Counter component */}
            <div ref={cRef} className='text-[100px]' style={{ fontFamily: 'New Amsterdam' }}>
                <Counter value={100} direction="up"  />
            </div>
            
            {/* Add some spacing between the Counter and the white bar */}
            <div
                ref={lRef}
                className="absolute top-0 left-0 w-full bg-white h-[5px] mt-4"
                style={{ zIndex: 10 }}
            />

            <div className='absolute bottom-3 left-[23%] md:left-[46%]'>
                <p className='text-neutral-500  md:text-[16px]' style={{ fontFamily: 'New Amsterdam' }}>Designed by Shashi Kiran Aug 2024 </p>
            </div>
        </div>
    );
};

export default Loader;
