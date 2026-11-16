import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

const GlobalContext = createContext(null);

const CART_STORAGE_KEY = 'veloir_cart_v2';
const WISHLIST_STORAGE_KEY = 'veloir_wishlist_v2';

export function GlobalProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota / privacy mode errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // Ignore storage quota / privacy mode errors
    }
  }, [wishlist]);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'success', detail = '') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev.slice(-3), { id, message, type, detail }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const addToCart = useCallback(
    (product, size = 'M', quantity = 1, openDrawer = true) => {
      if (!product) return;

      setCart((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.id === product.id && item.size === size
        );

        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }

        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            size,
            quantity,
          },
        ];
      });

      if (openDrawer) {
        setIsCartOpen(true);
      }

      showToast('Added to Cart!', 'cart', `${product.name} — Size ${size}`);
    },
    [showToast]
  );

  const removeFromCart = useCallback(
    (id, size) => {
      setCart((prev) =>
        prev.filter((item) =>
          size ? !(item.id === id && item.size === size) : item.id !== id
        )
      );
      showToast('Item removed from bag', 'info');
    },
    [showToast]
  );

  const updateQuantity = useCallback((id, size, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.size === size) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const isWishlisted = useCallback(
    (productId) => wishlist.some((item) => item.id === productId),
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (product) => {
      if (!product) return;
      const exists = wishlist.some((item) => item.id === product.id);
      if (exists) {
        setWishlist((prev) => prev.filter((item) => item.id !== product.id));
        showToast('Removed from Wishlist', 'info', product.name);
      } else {
        setWishlist((prev) => [product, ...prev]);
        showToast('Item saved to Wishlist', 'wishlist', product.name);
      }
    },
    [wishlist, showToast]
  );

  const removeFromWishlist = useCallback(
    (productId) => {
      setWishlist((prev) => prev.filter((item) => item.id !== productId));
      showToast('Removed from Wishlist', 'info');
    },
    [showToast]
  );

  const moveToCart = useCallback(
    (product, size = 'M') => {
      if (!product) return;
      addToCart(product, size, 1, true);
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    },
    [addToCart]
  );

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const wishlistCount = wishlist.length;

  const value = {
    cart,
    wishlist,
    isCartOpen,
    toasts,
    cartCount,
    cartTotal,
    wishlistCount,
    setIsCartOpen,
    openCart,
    closeCart,
    toggleCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isWishlisted,
    toggleWishlist,
    removeFromWishlist,
    moveToCart,
    showToast,
    dismissToast,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export function useGlobal() {
  const ctx = useContext(GlobalContext);
  if (!ctx) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return ctx;
}
