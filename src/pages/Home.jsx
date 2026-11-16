import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Heart } from 'lucide-react';
import { products } from '../data/products';
import { useGlobal } from '../context/GlobalContext';
import HeroSlider from '../components/HeroSlider';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  const { isWishlisted, toggleWishlist } = useGlobal();
  const trendingProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-zinc-950 text-zinc-50"
    >
      {/* 3-Slide Auto-Playing Brutalist Hero */}
      <HeroSlider />

      {/* Brutalist Marquee Banner */}
      <div className="overflow-hidden border-b border-zinc-800/80 bg-zinc-900/40 py-3.5">
        <div className="animate-veloir-marquee font-mono text-xs tracking-[0.3em] text-zinc-400 uppercase">
          <span className="mx-8">VÉLOIR AW26 // ARCHITECTURAL STREETWEAR</span>
          <span className="mx-8 text-zinc-600">✦</span>
          <span className="mx-8">PARIS — TOKYO — NEW YORK</span>
          <span className="mx-8 text-zinc-600">✦</span>
          <span className="mx-8">USE CODE VELOIR15 FOR 15% OFF ARCHIVE ORDERS</span>
          <span className="mx-8 text-zinc-600">✦</span>
          <span className="mx-8">VÉLOIR AW26 // ARCHITECTURAL STREETWEAR</span>
          <span className="mx-8 text-zinc-600">✦</span>
          <span className="mx-8">PARIS — TOKYO — NEW YORK</span>
          <span className="mx-8 text-zinc-600">✦</span>
          <span className="mx-8">USE CODE VELOIR15 FOR 15% OFF ARCHIVE ORDERS</span>
          <span className="mx-8 text-zinc-600">✦</span>
        </div>
      </div>

      {/* Trending Now Section */}
      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-zinc-800 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] text-zinc-500 uppercase">
              01 // CURATED SELECTION
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-zinc-50 uppercase sm:text-5xl">
              Trending Now
            </h2>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-zinc-300 uppercase transition-colors hover:text-zinc-50"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {trendingProducts.map((product) => {
            const saved = isWishlisted(product.id);
            return (
              <motion.div key={product.id} variants={itemVariants} className="group relative">
                <Link
                  to={`/product/${product.id}`}
                  className="block border border-zinc-800/80 bg-zinc-900/30 transition-colors hover:border-zinc-600"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 border border-zinc-800 bg-zinc-950/85 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-zinc-300 uppercase backdrop-blur-md">
                      {product.tag}
                    </div>
                    <div className="absolute right-3 bottom-3 flex h-9 w-9 translate-y-2 items-center justify-center border border-zinc-700 bg-zinc-950/90 text-zinc-50 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.18em] text-zinc-500 uppercase">
                      <span>{product.category}</span>
                      <span>S — XL</span>
                    </div>
                    <h3 className="mt-2 truncate font-display text-base font-bold tracking-tight text-zinc-50 uppercase">
                      {product.name}
                    </h3>
                    <p className="mt-2 font-mono text-sm font-semibold text-zinc-300">
                      ${product.price} USD
                    </p>
                  </div>
                </Link>

                {/* Wishlist Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
                  className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center border border-zinc-800 bg-zinc-950/85 text-zinc-300 backdrop-blur-md transition-colors hover:border-zinc-500 hover:text-zinc-50"
                >
                  <Heart className={`h-3.5 w-3.5 ${saved ? 'fill-zinc-50 text-zinc-50' : ''}`} />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Brand Story Section */}
      <section className="border-t border-zinc-800/80 bg-zinc-900/20">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-4 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-28">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden border border-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85"
                  alt="VÉLOIR Brand Story Atelier 01"
                  className="h-full w-full object-cover grayscale transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="mt-8 aspect-[3/4] overflow-hidden border border-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85"
                  alt="VÉLOIR Brand Story Atelier 02"
                  className="h-full w-full object-cover grayscale transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.25em] text-zinc-500 uppercase">
              02 // BRAND STORY
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] font-extrabold tracking-tight text-zinc-50 uppercase sm:text-5xl">
              CONSTRUCTED FOR CONCRETE.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-400">
              Founded between Paris and Tokyo in 2022, VÉLOIR bridges industrial brutalist architecture with artisanal textile engineering. Every garment rejects seasonal disposability in favor of 600 GSM organic loopback terry, 15oz Japanese Kurabo selvedge, and sculpted Italian leather.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-y border-zinc-800 py-5 font-mono text-xs uppercase">
              <div>
                <p className="text-lg font-bold text-zinc-50">600</p>
                <p className="mt-1 text-[10px] tracking-wider text-zinc-500">GSM Terry</p>
              </div>
              <div>
                <p className="text-lg font-bold text-zinc-50">15 OZ</p>
                <p className="mt-1 text-[10px] tracking-wider text-zinc-500">Japanese Denim</p>
              </div>
              <div>
                <p className="text-lg font-bold text-zinc-50">04</p>
                <p className="mt-1 text-[10px] tracking-wider text-zinc-500">Global Ateliers</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/lookbook"
                className="inline-flex items-center gap-3 border border-zinc-50 px-7 py-3.5 text-xs font-bold tracking-[0.22em] text-zinc-50 uppercase transition-colors hover:bg-zinc-50 hover:text-zinc-950"
              >
                <span>Explore AW26 Lookbook</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
