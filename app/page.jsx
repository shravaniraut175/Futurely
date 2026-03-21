"use client";

import HeroSection from "@/components/hero";
import { features } from "@/data/features";
import { Card, CardContent } from "@/components/ui/card";
import { howItWorks } from "@/data/howItWorks";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Target, Sparkles, CheckCircle2, } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

export default function LandingPage() {
  return (
    <div>
      <div className="grid-background"></div>

      <HeroSection />

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            AI-Powered Features to Boost Your Career
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-colors duration-300"
              >
                <CardContent className="pt-6 text-center flex flex-col items-center">
                  <div className="flex flex-col items-center justify-center">
                    {feature.icon}
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works ?</h2>
            <p className="text-muted-foreground">
              Follow these four steps to supercharge your career growth
            </p>
            <div className="h-1 w-24 bg-primary mx-auto mt-2 rounded-full animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Explore answers to the most common inquiries about Futurely and how it can support your career growth.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto py-24 relative rounded-lg overflow-hidden bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10 animate-[pulse_20s_linear_infinite]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          />

          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto relative z-10">
            <motion.h2
              className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Propel Your Career with Intelligent Guidance
            </motion.h2>

            <motion.p
              className="mx-auto max-w-[600px] text-gray-300 md:text-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Leverage AI-powered insights to unlock new opportunities and achieve
              your professional goals faster than ever.
            </motion.p>

            <Link href="/dashboard" passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-11 mt-5 animate-bounce"
                >
                  Start Your Journey Today{" "}
                  <ArrowRight className="ml-2 h-4 w-4 text-white" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
