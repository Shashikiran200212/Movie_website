"use client";
import { useState, useEffect } from 'react';
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
      sessionStorage.setItem('hasVisited', 'true');
      const timer = setTimeout(() => {
        setLoading(false);
      }, 7500); // Adjust the timeout duration as needed

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <main className="">
      {loading ? <Loader /> : <>
        <Hero />
      </>}
    </main>
  );
}
