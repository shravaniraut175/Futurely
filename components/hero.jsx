"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useRef } from "react";

const HeroSection = () => {
    const imageRef = useRef(null);
  return (
    <section className="relative w-full pt-36 md:pt-48 pb-10 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl animate-pulse"></div>
      <div className="absolute top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-3xl animate-pulse delay-700"></div>

      <div className="relative space-y-6 text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient"
        >
          Smart AI Career Mentor
          <br />
          to Shape Your Future
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mx-auto max-w-[600px] text-muted-foreground md:text-xl"
        >
          Navigate your career with confidence using AI-driven insights,
          personalized guidance, and smart tools designed for your growth.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex justify-center space-x-4"
        >
          <Link href="/dashboard">
            <Button size="lg" className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:scale-105 transition-transform">
              Start with Futurely
            </Button>
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
          className="hero-image-wrapper mt-10"
          >
            <div ref={imageRef} className="hero-image">

          <Image
            src="/hero.png"
            width={700}
            height={1200}
            alt="AI Career Assistant Dashboard"
            className="rounded-lg shadow-2xl border mx-auto"
            priority
            />
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;