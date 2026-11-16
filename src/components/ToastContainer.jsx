import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Heart, ShoppingBag, Info, X } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

const iconMap = {
  cart: ShoppingBag,
  wishlist: Heart,
  success: CheckCircle2,
  info: Info,
};

export default function ToastContainer() {
  const { toasts, dismissToast } = useGlobal();

  return (
    <div
      className="pointer-events-none fixed right-4 bottom-4 z-[60] flex w-full max-w-sm flex-col gap-2.5 sm:right-6 sm:bottom-6"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const Icon = iconMap[toast.type] || CheckCircle2;
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 48, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto relative overflow-hidden border border-zinc-700 bg-zinc-950/95 p-4 text-zinc-50 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-zinc-800 bg-zinc-900">
                  <Icon
                    className={`h-4 w-4 ${
                      toast.type === 'wishlist'
                        ? 'fill-zinc-50 text-zinc-50'
                        : 'text-zinc-50'
                    }`}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs font-semibold tracking-[0.15em] text-zinc-50 uppercase">
                    {toast.message}
                  </p>
                  {toast.detail && (
                    <p className="mt-1 truncate text-xs text-zinc-400">
                      {toast.detail}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  className="p-1 text-zinc-500 transition-colors hover:text-zinc-50"
                  aria-label="Dismiss notification"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Auto-dismiss progress bar */}
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 3.2, ease: 'linear' }}
                style={{ transformOrigin: 'left' }}
                className="absolute right-0 bottom-0 left-0 h-[2px] bg-zinc-400"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
