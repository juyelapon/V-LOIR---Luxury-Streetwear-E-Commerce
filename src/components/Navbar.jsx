import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobal } from '../context/GlobalContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/lookbook', label: 'Lookbook' },
  { to: '/wishlist', label: 'Wishlist' },
];

export default function Navbar() {
  const { cartCount, wishlistCount, openCart } = useGlobal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center p-2 text-zinc-400 transition-colors hover:text-zinc-50 md:hidden"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-baseline gap-2.5 tracking-tighter"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="font-display text-2xl font-extrabold tracking-tight text-zinc-50 sm:text-3xl">
            VÉLOIR
          </span>
          <span className="hidden font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase transition-colors group-hover:text-zinc-300 sm:inline-block">
            AW26
          </span>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative py-1 text-xs font-medium tracking-[0.22em] uppercase transition-colors ${
                  isActive
                    ? 'text-zinc-50'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="veloir-nav-underline"
                      className="absolute right-0 -bottom-1 left-0 h-[1.5px] bg-zinc-50"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Side: Wishlist & Cart Triggers */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            to="/wishlist"
            className="relative inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs font-medium tracking-[0.18em] text-zinc-200 uppercase transition-all hover:border-zinc-500 hover:bg-zinc-900"
            aria-label={`Wishlist (${wishlistCount} saved items)`}
          >
            <Heart
              className={`h-4 w-4 ${
                wishlistCount > 0 ? 'fill-zinc-50 text-zinc-50' : 'text-zinc-300'
              }`}
            />
            {wishlistCount > 0 && (
              <span className="font-mono text-[11px] font-bold text-zinc-50">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={openCart}
            className="group relative inline-flex items-center gap-2.5 border border-zinc-800 bg-zinc-900/70 px-3.5 py-2 text-xs font-medium tracking-[0.18em] text-zinc-100 uppercase transition-all hover:border-zinc-500 hover:bg-zinc-900"
            aria-label={`Open shopping bag (${cartCount} items)`}
          >
            <ShoppingBag className="h-4 w-4 text-zinc-200 transition-transform duration-200 group-hover:scale-110" />
            <span className="hidden sm:inline">Bag</span>
            <AnimatePresence mode="popLayout">
              {cartCount > 0 ? (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="inline-flex h-5 min-w-[20px] items-center justify-center bg-zinc-50 px-1.5 font-mono text-[11px] font-bold text-zinc-950"
                >
                  {cartCount}
                </motion.span>
              ) : (
                <span className="inline-flex h-5 min-w-[20px] items-center justify-center border border-zinc-700 px-1.5 font-mono text-[11px] text-zinc-400">
                  0
                </span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-zinc-800/80 bg-zinc-950/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col space-y-1 px-4 py-5" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `border-l-2 py-3 pl-4 font-display text-xl font-bold tracking-tight uppercase transition-colors ${
                      isActive
                        ? 'border-zinc-50 text-zinc-50'
                        : 'border-transparent text-zinc-500 hover:border-zinc-700 hover:text-zinc-200'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
