import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 border-b border-zinc-900 pb-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="font-display text-3xl font-extrabold tracking-tight text-zinc-50">
              VÉLOIR
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
              Architectural silhouettes crafted from heavyweight organic textiles, technical membranes, and distressed Japanese denim. Designed between Paris and Tokyo.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[11px] font-semibold tracking-[0.25em] text-zinc-500 uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="transition-colors hover:text-zinc-50">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition-colors hover:text-zinc-50">
                  Archive Shop
                </Link>
              </li>
              <li>
                <Link to="/lookbook" className="transition-colors hover:text-zinc-50">
                  AW26 Lookbook
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="transition-colors hover:text-zinc-50">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="transition-colors hover:text-zinc-50">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] font-semibold tracking-[0.25em] text-zinc-500 uppercase">
              Flagship Ateliers
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              <li className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span>Le Marais, Paris</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600" />
              </li>
              <li className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span>SoHo, New York</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600" />
              </li>
              <li className="flex items-center justify-between pb-1">
                <span>Minami-Aoyama, Tokyo</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600" />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 font-mono text-[11px] tracking-[0.2em] text-zinc-600 uppercase sm:flex-row sm:items-center">
          <span>© 2026 VÉLOIR STUDIO. ALL RIGHTS RESERVED.</span>
          <span>AW26 // BRUTALIST LUXURY READY-TO-WEAR</span>
        </div>
      </div>
    </footer>
  );
}
