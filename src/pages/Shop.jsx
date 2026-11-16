import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  ArrowUpRight,
  Search,
  X,
  Heart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { products, CATEGORIES } from '../data/products';
import { useGlobal } from '../context/GlobalContext';

const PRODUCTS_PER_PAGE = 6;

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-250', label: 'Under $250', min: 0, max: 249 },
  { id: '250-450', label: '$250 – $450', min: 250, max: 450 },
  { id: 'over-450', label: '$450+', min: 451, max: Infinity },
];

export default function Shop() {
  const { isWishlisted, toggleWishlist } = useGlobal();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [maxPriceCap, setMaxPriceCap] = useState(1000);
  const [sortOrder, setSortOrder] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const categoryCounts = useMemo(() => {
    const counts = { All: products.length };
    CATEGORIES.slice(1).forEach((cat) => {
      counts[cat] = products.filter((p) => p.category === cat).length;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    const activeRange =
      PRICE_RANGES.find((r) => r.id === selectedPriceRange) || PRICE_RANGES[0];

    let result = products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesRange =
        product.price >= activeRange.min && product.price <= activeRange.max;
      const matchesCap = product.price <= maxPriceCap;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesRange && matchesCap && matchesSearch;
    });

    if (sortOrder === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, selectedPriceRange, maxPriceCap, sortOrder, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  );
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, safePage]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (rangeId) => {
    setSelectedPriceRange(rangeId);
    setCurrentPage(1);
  };

  const handleMaxCapChange = (val) => {
    setMaxPriceCap(Number(val));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedPriceRange('all');
    setMaxPriceCap(1000);
    setSearchQuery('');
    setSortOrder('featured');
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedPriceRange !== 'all' ||
    maxPriceCap < 1000 ||
    searchQuery !== '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-zinc-950 text-zinc-50"
    >
      {/* Page Header */}
      <div className="border-b border-zinc-800/80 bg-zinc-950">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
          <p className="font-mono text-xs tracking-[0.25em] text-zinc-500 uppercase">
            VÉLOIR // ARCHIVE CATALOG
          </p>
          <div className="mt-3 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-zinc-50 uppercase sm:text-6xl">
              All Garments
            </h1>
            <p className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">
              SHOWING [{paginatedProducts.length}] OF [{filteredProducts.length}] MATCHING PIECES
            </p>
          </div>
        </div>
      </div>

      {/* Main Content: Left Sidebar + Right Product Grid & Pagination */}
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Sidebar Filters */}
          <aside className="lg:col-span-3" aria-label="Catalog Filters">
            <div className="sticky top-24 space-y-7 border border-zinc-800/80 bg-zinc-900/25 p-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.2em] text-zinc-200 uppercase">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Filters</span>
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="font-mono text-[10px] tracking-[0.18em] text-zinc-400 uppercase underline transition-colors hover:text-zinc-50"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Search Input */}
              <div>
                <label
                  htmlFor="catalog-search"
                  className="block font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase"
                >
                  Search Archive
                </label>
                <div className="relative mt-2.5">
                  <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
                  <input
                    id="catalog-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Hoodie, Cargo, Retro..."
                    className="w-full border border-zinc-800 bg-zinc-950 py-2.5 pr-8 pl-9 text-xs text-zinc-100 placeholder-zinc-600 transition-colors focus:border-zinc-500 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setCurrentPage(1);
                      }}
                      className="absolute top-1/2 right-2.5 -translate-y-1/2 text-zinc-500 hover:text-zinc-200"
                      aria-label="Clear search"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter List */}
              <div>
                <h2 className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
                  Categories
                </h2>
                <ul className="mt-3 space-y-1.5">
                  {CATEGORIES.map((category) => {
                    const active = selectedCategory === category;
                    return (
                      <li key={category}>
                        <button
                          type="button"
                          onClick={() => handleCategoryChange(category)}
                          className={`flex w-full items-center justify-between border px-3.5 py-2.5 text-left text-xs font-medium tracking-[0.18em] uppercase transition-all ${
                            active
                              ? 'border-zinc-50 bg-zinc-50 font-bold text-zinc-950'
                              : 'border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-100'
                          }`}
                        >
                          <span>{category}</span>
                          <span
                            className={`font-mono text-[11px] ${
                              active ? 'text-zinc-800' : 'text-zinc-600'
                            }`}
                          >
                            {categoryCounts[category]}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Price Bracket Filters */}
              <div>
                <h2 className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
                  Price Tier
                </h2>
                <ul className="mt-3 space-y-1.5">
                  {PRICE_RANGES.map((range) => {
                    const active = selectedPriceRange === range.id;
                    return (
                      <li key={range.id}>
                        <button
                          type="button"
                          onClick={() => handlePriceRangeChange(range.id)}
                          className={`flex w-full items-center justify-between border px-3.5 py-2 text-left font-mono text-[11px] tracking-[0.15em] uppercase transition-all ${
                            active
                              ? 'border-zinc-300 bg-zinc-800 font-semibold text-zinc-50'
                              : 'border-zinc-800/70 bg-zinc-950/40 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                          }`}
                        >
                          <span>{range.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* Interactive Max Price Cap Slider */}
                <div className="mt-4 border-t border-zinc-800/70 pt-4">
                  <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400 uppercase">
                    <span>Max Price</span>
                    <span className="text-zinc-100">${maxPriceCap}</span>
                  </div>
                  <input
                    type="range"
                    min={150}
                    max={1000}
                    step={25}
                    value={maxPriceCap}
                    onChange={(e) => handleMaxCapChange(e.target.value)}
                    aria-label="Maximum price filter"
                    className="mt-2 h-1.5 w-full cursor-pointer appearance-none bg-zinc-800 accent-zinc-50"
                  />
                </div>
              </div>

              {/* Sort Control */}
              <div>
                <label
                  htmlFor="sort-order"
                  className="block font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase"
                >
                  Sort By
                </label>
                <select
                  id="sort-order"
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="mt-2.5 w-full border border-zinc-800 bg-zinc-950 px-3 py-2.5 font-mono text-xs text-zinc-200 uppercase focus:border-zinc-500 focus:outline-none"
                >
                  <option value="featured">Featured Order</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Right Side: Responsive Product Grid + Pagination */}
          <div className="lg:col-span-9">
            {paginatedProducts.length === 0 ? (
              <div className="flex min-h-[380px] flex-col items-center justify-center border border-zinc-800 bg-zinc-900/20 p-10 text-center">
                <p className="font-mono text-xs tracking-[0.25em] text-zinc-500 uppercase">
                  No Matching Pieces
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  Adjust your category, price tier, or search term to explore the archive.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-6 border border-zinc-600 px-6 py-2.5 text-xs font-semibold tracking-[0.2em] text-zinc-100 uppercase hover:border-zinc-50 hover:bg-zinc-50 hover:text-zinc-950"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedProducts.map((product) => {
                      const saved = isWishlisted(product.id);
                      return (
                        <motion.div
                          layout
                          key={product.id}
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.28 }}
                          className="group relative"
                        >
                          <Link
                            to={`/product/${product.id}`}
                            className="block border border-zinc-800/80 bg-zinc-900/25 transition-all duration-300 hover:border-zinc-500"
                          >
                            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              />

                              {product.secondaryImage && (
                                <img
                                  src={product.secondaryImage}
                                  alt=""
                                  aria-hidden="true"
                                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                />
                              )}

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
                                <span>{product.sizes.join(' / ')}</span>
                              </div>
                              <h3 className="mt-2 truncate font-display text-base font-bold tracking-tight text-zinc-50 uppercase">
                                {product.name}
                              </h3>
                              <div className="mt-3 flex items-center justify-between border-t border-zinc-800/80 pt-3">
                                <span className="font-mono text-sm font-semibold text-zinc-200">
                                  ${product.price} USD
                                </span>
                                <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase transition-colors group-hover:text-zinc-200">
                                  View Piece →
                                </span>
                              </div>
                            </div>
                          </Link>

                          {/* Wishlist Heart Button */}
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product)}
                            aria-label={
                              saved
                                ? `Remove ${product.name} from wishlist`
                                : `Save ${product.name} to wishlist`
                            }
                            className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center border border-zinc-800 bg-zinc-950/85 text-zinc-300 backdrop-blur-md transition-colors hover:border-zinc-500 hover:text-zinc-50"
                          >
                            <Heart
                              className={`h-3.5 w-3.5 ${
                                saved ? 'fill-zinc-50 text-zinc-50' : ''
                              }`}
                            />
                          </button>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>

                {/* Bottom Pagination Bar */}
                {totalPages > 1 && (
                  <nav
                    className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800/80 pt-8 sm:flex-row"
                    aria-label="Catalog Pagination"
                  >
                    <p className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
                      Page {safePage} of {totalPages}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={safePage === 1}
                        onClick={() => goToPage(safePage - 1)}
                        className="inline-flex items-center gap-1.5 border border-zinc-800 bg-zinc-950 px-4 py-2.5 font-mono text-xs tracking-[0.15em] text-zinc-300 uppercase transition-colors hover:border-zinc-500 hover:text-zinc-50 disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span>Prev</span>
                      </button>

                      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                        (pageNum) => {
                          const isCurrent = pageNum === safePage;
                          return (
                            <button
                              key={pageNum}
                              type="button"
                              onClick={() => goToPage(pageNum)}
                              aria-current={isCurrent ? 'page' : undefined}
                              className={`h-10 min-w-[40px] border px-3 font-mono text-xs font-bold transition-all ${
                                isCurrent
                                  ? 'border-zinc-50 bg-zinc-50 text-zinc-950'
                                  : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-500 hover:text-zinc-50'
                              }`}
                            >
                              {String(pageNum).padStart(2, '0')}
                            </button>
                          );
                        }
                      )}

                      <button
                        type="button"
                        disabled={safePage === totalPages}
                        onClick={() => goToPage(safePage + 1)}
                        className="inline-flex items-center gap-1.5 border border-zinc-800 bg-zinc-950 px-4 py-2.5 font-mono text-xs tracking-[0.15em] text-zinc-300 uppercase transition-colors hover:border-zinc-500 hover:text-zinc-50 disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        <span>Next</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
