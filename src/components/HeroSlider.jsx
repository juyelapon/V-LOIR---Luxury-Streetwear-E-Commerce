import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 'slide-01',
    eyebrow: 'VÉLOIR // ARCHIVE 04',
    season: 'AW26 RELEASE',
    headlineLine1: 'REDEFINE',
    headlineLine2: 'STREET',
    headlineAccent: 'WEAR.',
    description:
      'Heavyweight 600 GSM French terry, raw-edge Japanese selvedge, and sculpted court footwear built for architectural silhouettes.',
    ctaLabel: 'Shop Now',
    ctaTo: '/shop',
    secondaryLabel: 'Lookbook',
    secondaryTo: '/lookbook',
    image:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85',
    badgeTitle: 'Monolith Archive Series',
    badgeSubtitle: 'FEATURED SILHOUETTE',
    badgeLink: '/product/vlr-001',
  },
  {
    id: 'slide-02',
    eyebrow: 'ATELIER OUTERWEAR // DROP 04',
    season: 'MILAN — PARIS',
    headlineLine1: 'BRUTALIST',
    headlineLine2: 'ARMOR',
    headlineAccent: 'FORM.',
    description:
      'Drum-dyed full-grain calfskin leather, brushed gunmetal Riri hardware, and technical storm-flap proportions tailored for concrete.',
    ctaLabel: 'Explore Outerwear',
    ctaTo: '/shop',
    secondaryLabel: 'View Moto Jacket',
    secondaryTo: '/product/vlr-005',
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1400&q=85',
    badgeTitle: 'Monolith Leather Moto',
    badgeSubtitle: 'ATELIER EDITION',
    badgeLink: '/product/vlr-005',
  },
  {
    id: 'slide-03',
    eyebrow: 'FOOTWEAR ARCHIVE // NOIR',
    season: 'LIMITED EDITION',
    headlineLine1: 'SCULPTED',
    headlineLine2: 'COURT',
    headlineAccent: 'SOLES.',
    description:
      'Matte Italian nubuck meets speckled concrete midsoles and Vibram® tread engineering across our AW26 footwear drop.',
    ctaLabel: 'Shop Footwear',
    ctaTo: '/shop',
    secondaryLabel: 'Retro 4 Noir',
    secondaryTo: '/product/vlr-003',
    image:
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1400&q=85',
    badgeTitle: 'Retro 4 "Noir Concrete"',
    badgeSubtitle: 'LIMITED ARCHIVE',
    badgeLink: '/product/vlr-003',
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentIndex];

  return (
    <section
      className="relative border-b border-zinc-800/80 bg-zinc-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Collection Slider"
    >
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1440px] grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Animated Typography & Controls */}
        <div className="flex flex-col justify-between border-b border-zinc-800/80 px-4 py-10 sm:px-8 lg:col-span-6 lg:border-r lg:border-b-0 lg:px-12 lg:py-14">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-zinc-400 uppercase">
            <span>{slide.eyebrow}</span>
            <span>{slide.season}</span>
          </div>

          <div className="my-10 lg:my-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900/70 px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-zinc-300 uppercase">
                  <Sparkles className="h-3 w-3" /> Luxury Brutalist Form
                </span>

                <h1 className="mt-6 font-display text-5xl leading-[0.9] font-extrabold tracking-tighter text-zinc-50 uppercase sm:text-7xl xl:text-[5.25rem]">
                  {slide.headlineLine1}
                  <br />
                  {slide.headlineLine2}
                  <br />
                  <span className="text-zinc-500">{slide.headlineAccent}</span>
                </h1>

                <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400">
                  {slide.description}
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    to={slide.ctaTo}
                    className="group inline-flex items-center gap-3 bg-zinc-50 px-8 py-4 text-xs font-bold tracking-[0.22em] text-zinc-950 uppercase transition-all hover:bg-zinc-200"
                  >
                    <span>{slide.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to={slide.secondaryTo}
                    className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-7 py-4 text-xs font-semibold tracking-[0.22em] text-zinc-300 uppercase transition-colors hover:border-zinc-500 hover:text-zinc-50"
                  >
                    <span>{slide.secondaryLabel}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Navigation Controls */}
          <div className="flex items-center justify-between border-t border-zinc-900 pt-6">
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="group flex items-center gap-1.5 py-1"
                >
                  <span
                    className={`h-[2px] transition-all duration-300 ${
                      idx === currentIndex
                        ? 'w-10 bg-zinc-50'
                        : 'w-4 bg-zinc-700 group-hover:bg-zinc-500'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-3 font-mono text-[11px] tracking-[0.2em] text-zinc-500">
                0{currentIndex + 1} / 0{HERO_SLIDES.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                className="flex h-9 w-9 items-center justify-center border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-50"
                aria-label="Previous slide"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="flex h-9 w-9 items-center justify-center border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-50"
                aria-label="Next slide"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Full-Height Animated Image */}
        <div className="relative min-h-[460px] overflow-hidden bg-zinc-900 lg:col-span-6 lg:min-h-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={slide.id}
              src={slide.image}
              alt={slide.badgeTitle}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover object-center grayscale contrast-125"
            />
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

          {/* Floating Editorial Tag */}
          <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between border border-zinc-800/80 bg-zinc-950/80 p-5 backdrop-blur-md">
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
                {slide.badgeSubtitle}
              </p>
              <p className="mt-1 font-display text-lg font-bold tracking-tight text-zinc-50 uppercase">
                {slide.badgeTitle}
              </p>
            </div>
            <Link
              to={slide.badgeLink}
              className="flex h-10 w-10 items-center justify-center border border-zinc-700 text-zinc-50 transition-colors hover:border-zinc-50 hover:bg-zinc-50 hover:text-zinc-950"
              aria-label={`View ${slide.badgeTitle}`}
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
