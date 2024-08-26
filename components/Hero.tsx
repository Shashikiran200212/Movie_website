import React from 'react';
import Slider from './Slider';
import Link from 'next/link';


const Hero = () => {
  return (
    <div
      className="relative w-full h-screen bg-white text-white overflow-hidden"
      style={{ userSelect: 'none' }}
    >
      <div className="flex flex-col h-full">
        <nav className="bg-black relative">
          <img 
            src="icon.png" 
            alt="Icon" 
            className="absolute top-0.5 left-3 w-10 h-10 md:w-12 md:h-12 md:block hidden" 
          />
          <ul
            className="flex flex-row gap-6 md:gap-10 lg:gap-28 py-3 justify-center text-sm md:text-lg lg:text-[25px]"
            style={{ fontFamily: 'New Amsterdam' }}
          >
            <li className="hover:text-neutral-500 hover:scale-105 transition-all duration-300 cursor-pointer">
              Home
            </li>
            <li className="hover:text-neutral-500 hover:scale-105 transition-all duration-300 cursor-pointer">
              Gallery
            </li>
            <li className="hover:text-neutral-500 hover:scale-150 transition-all duration-300 cursor-pointer">
              <Link href="/Pages/Spotify">Spotify</Link>
            </li>
            <li className="hover:text-neutral-500 hover:scale-105 transition-all duration-300 cursor-pointer">
              TFI
            </li>
            <li className="hover:text-neutral-500 hover:scale-105 transition-all duration-300 cursor-pointer">
              <a href="https://shashikiranportfolio-shashi-kirans-projects.vercel.app/" target='blank'>Know Me</a>
            </li>
          </ul>
          <hr className="border-white mb-4" />
        </nav>
        <div className="flex-grow">
          <Slider />
        </div>
      </div>
      <div className='absolute bottom-3 left-[23%] md:left-[46%]'>
        <p className='text-neutral-500  md:text-[16px]' style={{ fontFamily: 'New Amsterdam' }}>Designed by Shashi Kiran Aug 2024 </p>
      </div>
    </div>
  );
};

export default Hero;
