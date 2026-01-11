"use client";

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import TrendingBooks from "@/components/home/TrendingBooks";
import ReadingChallenge from "@/components/home/ReadingChallenge";
import Testimonials from "@/components/home/Testimonials";
import Cta from "@/components/home/Cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100 overflow-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <TrendingBooks />
      <ReadingChallenge />
      <Testimonials />
      <Cta />
    </div>
  );
}
