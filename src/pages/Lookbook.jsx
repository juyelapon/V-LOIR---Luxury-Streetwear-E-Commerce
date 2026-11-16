import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const lookbookFrames = [
  {
    id: 'look-01',
    title: 'Look 01 // Concrete Monolith',
    caption: '600GSM Boxy Heavy Hoodie paired with Tactical Baggy Cargo Jeans.',
    image:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85',
    productId: 'vlr-001',
    span: 'lg:col-span-7',
  },
  {
    id: 'look-02',
    title: 'Look 02 // Obsidian Uniform',
    caption: 'Monolith Leather Moto Jacket with Distressed Selvedge Denim.',
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
    productId: 'vlr-005',
    span: 'lg:col-span-5',
  },
  {
    id: 'look-03',
    title: 'Look 03 // Kinetic Utility',
    caption: 'Nylon Parachute Trousers and Noir Concrete Court Sneakers.',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    productId: 'vlr-008',
    span: 'lg:col-span-5',
  },
  {
    id: 'look-04',
    title: 'Look 04 // Street Brutalism',
    caption: 'Acid-Wash Oversized Archive Tee styled with Aero-Sculpt Highs.',
    image:
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1400&q=85',
    productId: 'vlr-006',
    span: 'lg:col-span-7',
  },
];

export default function Lookbook() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-zinc-950 text-zinc-50"
    >
      <div className="border-b border-zinc-800/80">
        <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
          <p className="font-mono text-xs tracking-[0.25em] text-zinc-500 uppercase">
            VÉLOIR // EDITORIAL ARCHIVE
          </p>
          <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h1 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-6xl">
              AW26 Lookbook
            </h1>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 border border-zinc-700 px-6 py-3 font-mono text-xs tracking-[0.2em] text-zinc-200 uppercase transition-colors hover:border-zinc-50 hover:bg-zinc-50 hover:text-zinc-950"
            >
              <span>Shop Full Collection</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {lookbookFrames.map((frame) => (
            <Link
              key={frame.id}
              to={`/product/${frame.productId}`}
              className={`group relative overflow-hidden border border-zinc-800 bg-zinc-900 ${frame.span}`}
            >
              <div className="aspect-[4/3] w-full overflow-hidden lg:aspect-[16/11]">
                <img
                  src={frame.image}
                  alt={frame.title}
                  className="h-full w-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 border border-zinc-800/80 bg-zinc-950/85 p-5 backdrop-blur-md">
                <div>
                  <h2 className="font-display text-lg font-bold tracking-tight uppercase sm:text-xl">
                    {frame.title}
                  </h2>
                  <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                    {frame.caption}
                  </p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-zinc-700 text-zinc-50 transition-colors group-hover:border-zinc-50 group-hover:bg-zinc-50 group-hover:text-zinc-950">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
