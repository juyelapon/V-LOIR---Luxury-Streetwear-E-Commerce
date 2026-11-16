import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

const SIZES = ['S', 'M', 'L', 'XL'];

export default function Wishlist() {
  const { wishlist, removeFromWishlist, moveToCart } = useGlobal();
  const [selectedSizes, setSelectedSizes] = useState({});

  const getSizeFor = (productId) => selectedSizes[productId] || 'M';

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-zinc-950 text-zinc-50"
    >
      {/* Header */}
      <div className="border-b border-zinc-800/80">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
          <p className="font-mono text-xs tracking-[0.25em] text-zinc-500 uppercase">
            VÉLOIR // SAVED ARCHIVE
          </p>
          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h1 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-6xl">
              Wishlist
            </h1>
            <p className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">
              [{wishlist.length}] SAVED {wishlist.length === 1 ? 'PIECE' : 'PIECES'}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        {wishlist.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center border border-zinc-800/80 bg-zinc-900/20 p-10 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center border border-zinc-800 bg-zinc-900">
              <Heart className="h-6 w-6 text-zinc-500" />
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight uppercase">
              Your Wishlist Is Empty
            </h2>
            <p className="mt-2 max-w-sm text-sm text-zinc-400">
              Curate your personal AW26 wardrobe by saving garments from the archive catalog.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-3 bg-zinc-50 px-8 py-4 text-xs font-bold tracking-[0.22em] text-zinc-950 uppercase transition-colors hover:bg-zinc-200"
            >
              <span>Explore Shop</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {wishlist.map((item) => {
                const chosenSize = getSizeFor(item.id);
                return (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col border border-zinc-800/80 bg-zinc-900/25"
                  >
                    <Link
                      to={`/product/${item.id}`}
                      className="group relative aspect-[4/5] overflow-hidden bg-zinc-900"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 border border-zinc-800 bg-zinc-950/85 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-zinc-300 uppercase backdrop-blur-md">
                        {item.category}
                      </div>
                      <div className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center border border-zinc-700 bg-zinc-950/90 text-zinc-50 opacity-0 transition-opacity group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </Link>

                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/product/${item.id}`}
                            className="font-display text-base font-bold tracking-tight text-zinc-50 uppercase hover:underline"
                          >
                            {item.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeFromWishlist(item.id)}
                            aria-label={`Remove ${item.name} from wishlist`}
                            className="p-1 text-zinc-500 transition-colors hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <p className="mt-2 font-mono text-sm font-semibold text-zinc-300">
                          ${item.price} USD
                        </p>

                        {/* Quick Size Selector */}
                        <div className="mt-4">
                          <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                            Size
                          </span>
                          <div className="mt-1.5 grid grid-cols-4 gap-1.5">
                            {SIZES.map((sz) => (
                              <button
                                key={sz}
                                type="button"
                                onClick={() => handleSizeSelect(item.id, sz)}
                                className={`border py-1.5 font-mono text-[11px] font-bold transition-colors ${
                                  chosenSize === sz
                                    ? 'border-zinc-50 bg-zinc-50 text-zinc-950'
                                    : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-500 hover:text-zinc-100'
                                }`}
                              >
                                {sz}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => moveToCart(item, chosenSize)}
                        className="mt-5 flex w-full items-center justify-center gap-2 bg-zinc-50 px-4 py-3 text-xs font-bold tracking-[0.2em] text-zinc-950 uppercase transition-colors hover:bg-zinc-200"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
