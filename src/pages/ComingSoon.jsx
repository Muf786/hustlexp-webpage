import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Hero from '../components/coming-soon/Hero';
import ImmersiveRail from '../components/coming-soon/ImmersiveRail';
import Features from '../components/coming-soon/Features';
import SocialProof from '../components/coming-soon/SocialProof';
import Footer from '../components/coming-soon/Footer';

export default function ComingSoon() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const socialRef = useRef(null);
  const footerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const glowDrift = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']);
  const glowRotate = useTransform(scrollYProgress, [0, 1], [0, 22]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.2, 0.04, 0.16]);
  const backgroundShift = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const liquidShift = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const liquidRotate = useTransform(scrollYProgress, [0, 1], [0, 18]);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroScale = useTransform(heroProgress, [0, 0.7, 1], [1, 0.94, 0.9]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75, 1], [1, 0.92, 0.65]);
  const heroY = useTransform(heroProgress, [0, 1], [0, -140]);
  const heroBlur = useTransform(heroProgress, [0.7, 1], ['0px', '4px']);

  const { scrollYProgress: featuresProgress } = useScroll({
    target: featuresRef,
    offset: ['start 0.85', 'end 0.2']
  });
  const { scrollYProgress: socialProgress } = useScroll({
    target: socialRef,
    offset: ['start 0.85', 'end 0.2']
  });
  const { scrollYProgress: footerProgress } = useScroll({
    target: footerRef,
    offset: ['start 0.85', 'end 0.2']
  });

  const featuresY = useTransform(featuresProgress, [0, 1], [80, -40]);
  const featuresOpacity = useTransform(featuresProgress, [0, 0.3, 1], [0, 1, 1]);
  const featuresScale = useTransform(featuresProgress, [0, 1], [0.98, 1]);
  const featuresBlur = useTransform(featuresProgress, [0, 0.5], ['12px', '0px']);

  const socialY = useTransform(socialProgress, [0, 1], [80, -40]);
  const socialOpacity = useTransform(socialProgress, [0, 0.3, 1], [0, 1, 1]);
  const socialScale = useTransform(socialProgress, [0, 1], [0.98, 1]);
  const socialBlur = useTransform(socialProgress, [0, 0.5], ['12px', '0px']);

  const footerY = useTransform(footerProgress, [0, 1], [80, -40]);
  const footerOpacity = useTransform(footerProgress, [0, 0.3, 1], [0, 1, 1]);
  const footerScale = useTransform(footerProgress, [0, 1], [0.98, 1]);
  const footerBlur = useTransform(footerProgress, [0, 0.5], ['12px', '0px']);

  return (
    <div className="relative min-h-screen bg-[#05030a] overflow-hidden">
      <motion.div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.25),transparent_55%),radial-gradient(circle_at_bottom,rgba(99,102,241,0.18),transparent_50%)]"
          style={reduceMotion ? undefined : { y: backgroundShift, scale: backgroundScale }}
        />
        <motion.div
          className="absolute inset-0 opacity-70"
          style={
            reduceMotion
              ? undefined
              : {
                  y: liquidShift,
                  rotate: liquidRotate,
                  backgroundImage:
                    'radial-gradient(circle at 20% 15%, rgba(167,139,250,0.22), transparent 40%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.28), transparent 42%), radial-gradient(circle at 30% 80%, rgba(99,102,241,0.22), transparent 46%)',
                  backgroundSize: '140% 140%'
                }
          }
        />
        <motion.div
          className="absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[160px]"
          style={reduceMotion ? undefined : { y: glowDrift, rotate: glowRotate }}
        />
        <motion.div
          className="absolute top-[45vh] right-[-10%] h-[420px] w-[420px] rounded-full bg-fuchsia-500/15 blur-[160px]"
          style={reduceMotion ? undefined : { y: glowDrift }}
        />
        <motion.div
          className="absolute bottom-[-15%] left-[-10%] h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-[180px]"
          style={reduceMotion ? undefined : { y: glowDrift }}
        />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:120px_120px]"
          style={reduceMotion ? { opacity: 0.08 } : { opacity: gridOpacity }}
        />
      </motion.div>

      <div className="relative z-10">
        <div id="hero" ref={heroRef} className="relative h-[180vh]">
          <motion.div
            className="sticky top-0 h-screen"
            style={
              reduceMotion
                ? undefined
                : { scale: heroScale, opacity: heroOpacity, y: heroY, filter: heroBlur }
            }
          >
            <Hero />
          </motion.div>
        </div>

        <ImmersiveRail />

        <motion.div
          ref={featuresRef}
          style={
            reduceMotion
              ? undefined
              : {
                  y: featuresY,
                  opacity: featuresOpacity,
                  scale: featuresScale,
                  filter: featuresBlur
                }
          }
        >
          <Features />
        </motion.div>
        <motion.div
          ref={socialRef}
          style={
            reduceMotion
              ? undefined
              : {
                  y: socialY,
                  opacity: socialOpacity,
                  scale: socialScale,
                  filter: socialBlur
                }
          }
        >
          <SocialProof />
        </motion.div>
        <motion.div
          ref={footerRef}
          style={
            reduceMotion
              ? undefined
              : {
                  y: footerY,
                  opacity: footerOpacity,
                  scale: footerScale,
                  filter: footerBlur
                }
          }
        >
          <Footer />
        </motion.div>
      </div>
    </div>
  );
}
