import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Heart,
  Check,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react';
import { products } from '../data/products';
import { useGlobal } from '../context/GlobalContext';

const SIZES = ['S', 'M', 'L', 'XL'];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-zinc-950 px-4 text-center text-zinc-50">
        <p className="font-mono text-xs tracking-[0.25em] text-zinc-500 uppercase">
          404 // PIECE NOT FOUND
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight uppercase">
          Archive Item Unavailable
        </h1>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 border border-zinc-700 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase transition-colors hover:border-zinc-50 hover:bg-zinc-50 hover:text-zinc-950"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  return <ProductDetailContent key={product.id} product={product} />;
}

function ProductDetailContent({ product }) {
  const { addToCart, isWishlisted, toggleWishlist } = useGlobal();

  const galleryImages =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image, product.secondaryImage].filter(Boolean);

  const [selectedSize, setSelectedSize] = useState('M');
  const [slideIndex, setSlideIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('architecture');

  const saved = isWishlisted(product.id);

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handlePrevImage = () => {
    setSlideIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const handleNextImage = () => {
    setSlideIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, 1, true);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const accordionItems = [
    {
      id: 'architecture',
      title: 'Garment Architecture & Description',
      content: product.description,
    },
    {
      id: 'fabrication',
      title: 'Fabrication & Care',
      content: `${product.fabric}. ${product.care || 'Follow garment care label instructions.'}`,
    },
    {
      id: 'fit',
      title: 'Fit & Sizing Matrix',
      content: `${product.fit}. Available in S, M, L, and XL. Model is 187cm / 6'1" wearing size L for an exaggerated brutalist drape.`,
    },
    {
      id: 'shipping',
      title: 'Shipping & Atelier Returns',
      content:
        'Complimentary insured DHL Express delivery worldwide within 2–4 business days. Returns accepted within 14 days in unworn condition with archive tags intact.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-zinc-950 text-zinc-50"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center justify-between border-b border-zinc-900 pb-5">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase transition-colors hover:text-zinc-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Archive
          </Link>
          <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
            {product.category} // {product.id.toUpperCase()}
          </span>
        </div>

        {/* Product Detail Two-Column Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: Interactive Image Gallery Slider */}
          <div className="space-y-4 lg:col-span-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-zinc-800 bg-zinc-900">
              <AnimatePresence mode="wait">
                <motion.img
                  key={galleryImages[slideIndex]}
                  src={galleryImages[slideIndex]}
                  alt={`${product.name} angle ${slideIndex + 1}`}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Tag Badge */}
              <div className="absolute top-4 left-4 border border-zinc-800 bg-zinc-950/85 px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-zinc-200 uppercase backdrop-blur-md">
                {product.tag}
              </div>

              {/* Slide Counter */}
              <div className="absolute top-4 right-4 border border-zinc-800 bg-zinc-950/85 px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-zinc-300 backdrop-blur-md">
                0{slideIndex + 1} / 0{galleryImages.length}
              </div>

              {/* Slider Prev / Next Controls */}
              {galleryImages.length > 1 && (
                <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous product angle"
                    className="flex h-10 w-10 items-center justify-center border border-zinc-700 bg-zinc-950/85 text-zinc-100 backdrop-blur-md transition-colors hover:border-zinc-50 hover:bg-zinc-50 hover:text-zinc-950"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next product angle"
                    className="flex h-10 w-10 items-center justify-center border border-zinc-700 bg-zinc-950/85 text-zinc-100 backdrop-blur-md transition-colors hover:border-zinc-50 hover:bg-zinc-50 hover:text-zinc-950"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Clickable Thumbnail Strip */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={`${imgUrl}-${idx}`}
                    type="button"
                    onClick={() => setSlideIndex(idx)}
                    className={`aspect-square overflow-hidden border transition-all ${
                      slideIndex === idx
                        ? 'border-zinc-50 opacity-100'
                        : 'border-zinc-800 opacity-50 hover:opacity-85'
                    }`}
                    aria-label={`Select angle ${idx + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Title, Price, Size Selector, Add to Cart, Wishlist, Accordion */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <p className="font-mono text-xs tracking-[0.25em] text-zinc-400 uppercase">
                VÉLOIR AW26 // {product.category}
              </p>

              <h1 className="mt-3 font-display text-3xl leading-[1.02] font-extrabold tracking-tight text-zinc-50 uppercase sm:text-5xl">
                {product.name}
              </h1>

              <div className="mt-5 flex items-baseline gap-4 border-b border-zinc-800 pb-6">
                <span className="font-mono text-2xl font-bold text-zinc-50">
                  ${product.price} USD
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] text-emerald-400 uppercase">
                  ● In Stock — Ready to Ship
                </span>
              </div>

              {/* Size Selector (S, M, L, XL) */}
              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-200 uppercase">
                    Select Size
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.15em] text-zinc-500 uppercase">
                    {product.fit}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-4 gap-2.5">
                  {SIZES.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`border py-3.5 font-mono text-sm font-bold tracking-widest uppercase transition-all ${
                          isSelected
                            ? 'border-zinc-50 bg-zinc-50 text-zinc-950'
                            : 'border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-zinc-500 hover:text-zinc-50'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons: Add to Cart + Save to Wishlist */}
              <div className="mt-7 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="group flex w-full items-center justify-center gap-3 bg-zinc-50 px-8 py-4.5 text-xs font-bold tracking-[0.24em] text-zinc-950 uppercase transition-all hover:bg-zinc-200 active:scale-[0.99]"
                >
                  {justAdded ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Added to Bag — Size {selectedSize}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                      <span>Add to Cart — ${product.price}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className="flex w-full items-center justify-center gap-2.5 border border-zinc-800 bg-zinc-950 px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.2em] text-zinc-300 uppercase transition-colors hover:border-zinc-500 hover:text-zinc-50"
                >
                  <Heart
                    className={`h-4 w-4 ${saved ? 'fill-zinc-50 text-zinc-50' : ''}`}
                  />
                  <span>{saved ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
                </button>
              </div>

              {/* Product Details Accordion */}
              <div className="mt-9 border-t border-zinc-800">
                {accordionItems.map((item) => {
                  const isOpen = openAccordion === item.id;
                  return (
                    <div key={item.id} className="border-b border-zinc-800">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenAccordion(isOpen ? null : item.id)
                        }
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between py-4 text-left font-mono text-xs font-semibold tracking-[0.18em] text-zinc-200 uppercase transition-colors hover:text-zinc-50"
                      >
                        <span>{item.title}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-zinc-50' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pb-5 text-sm leading-relaxed text-zinc-400">
                              {item.content}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Related Pieces */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 border-t border-zinc-800/80 pt-14">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="font-mono text-xs tracking-[0.25em] text-zinc-500 uppercase">
                  SIMILAR ARCHIVE
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">
                  More {product.category}
                </h2>
              </div>
              <Link
                to="/shop"
                className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase hover:text-zinc-50"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/product/${rel.id}`}
                  className="group block border border-zinc-800/80 bg-zinc-900/25 transition-colors hover:border-zinc-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center border border-zinc-700 bg-zinc-950/90 text-zinc-50 opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="truncate font-display text-sm font-bold tracking-tight uppercase">
                      {rel.name}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-zinc-400">
                      ${rel.price} USD
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
}
