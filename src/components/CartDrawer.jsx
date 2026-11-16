import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useGlobal();

  const navigate = useNavigate();

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Slide-over Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-950 text-zinc-50 shadow-2xl"
            aria-label="Shopping Bag"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
              <div className="flex items-baseline gap-3">
                <h2 className="font-display text-lg font-extrabold tracking-tight uppercase">
                  Your Bag
                </h2>
                <span className="font-mono text-xs text-zinc-400">
                  [{cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'}]
                </span>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="border border-zinc-800 p-2 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-50"
                aria-label="Close bag"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center border border-zinc-800 bg-zinc-900/50">
                    <ShoppingBag className="h-6 w-6 text-zinc-500" />
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight uppercase">
                    Bag Is Empty
                  </h3>
                  <p className="mt-2 max-w-[240px] text-sm text-zinc-400">
                    Explore the AW26 collection and build your architectural uniform.
                  </p>
                  <Link
                    to="/shop"
                    onClick={closeCart}
                    className="mt-7 inline-flex items-center gap-2 border border-zinc-700 bg-zinc-900 px-6 py-3 text-xs font-semibold tracking-[0.2em] text-zinc-50 uppercase transition-colors hover:border-zinc-50 hover:bg-zinc-50 hover:text-zinc-950"
                  >
                    Explore Archive <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <ul className="space-y-5">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.li
                        key={`${item.id}-${item.size}`}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.22 }}
                        className="flex gap-4 border-b border-zinc-800/80 pb-5"
                      >
                        <Link
                          to={`/product/${item.id}`}
                          onClick={closeCart}
                          className="h-28 w-22 shrink-0 overflow-hidden border border-zinc-800 bg-zinc-900"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </Link>

                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                to={`/product/${item.id}`}
                                onClick={closeCart}
                                className="text-sm font-semibold tracking-tight text-zinc-50 hover:underline"
                              >
                                {item.name}
                              </Link>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id, item.size)}
                                className="p-1 text-zinc-500 transition-colors hover:text-red-400"
                                aria-label={`Remove ${item.name} size ${item.size}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="mt-1 flex items-center gap-3 font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
                              <span>Size: {item.size}</span>
                              <span>•</span>
                              <span>{item.category}</span>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center border border-zinc-800 bg-zinc-900/60">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.size, -1)}
                                className="px-2.5 py-1.5 text-zinc-400 transition-colors hover:text-zinc-50"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="min-w-[28px] text-center font-mono text-xs text-zinc-100">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.size, 1)}
                                className="px-2.5 py-1.5 text-zinc-400 transition-colors hover:text-zinc-50"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <span className="font-mono text-sm font-semibold text-zinc-50">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-zinc-800 bg-zinc-950 px-6 py-5">
                <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
                  <span className="uppercase tracking-[0.18em]">Express Courier</span>
                  <span className="font-mono text-zinc-300">COMPLIMENTARY</span>
                </div>
                <div className="mb-5 flex items-baseline justify-between">
                  <span className="text-xs font-semibold tracking-[0.2em] text-zinc-300 uppercase">
                    Subtotal
                  </span>
                  <span className="font-mono text-xl font-bold text-zinc-50">
                    ${cartTotal.toLocaleString()} USD
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="group flex w-full items-center justify-center gap-3 bg-zinc-50 px-6 py-4 text-xs font-bold tracking-[0.22em] text-zinc-950 uppercase transition-all hover:bg-zinc-200 active:scale-[0.99]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
