import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext(null);

const loadState = () => {
  try {
    const saved = localStorage.getItem('subswift_state');
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => loadState()?.user || null);
  const [selectedTier, setSelectedTier] = useState(() => loadState()?.selectedTier || null);
  const [cart, setCart] = useState(() => loadState()?.cart || []);
  const [page, setPage] = useState(() => {
    const saved = loadState();
    if (saved?.user && saved?.selectedTier) return 'dashboard';
    if (saved?.user) return 'subscription';
    return 'login';
  });

  useEffect(() => {
    localStorage.setItem(
      'subswift_state',
      JSON.stringify({ user, selectedTier, cart })
    );
  }, [user, selectedTier, cart]);

  const login = (name, email) => {
    const u = { name, email, points: 0 };
    setUser(u);
    setPage('subscription');
  };

  const selectTier = (tier) => {
    setSelectedTier(tier);
    setPage('payment');
  };

  const completePayment = () => {
    setUser((prev) => ({
      ...prev,
      points: prev.points + selectedTier.points,
    }));
    setPage('dashboard');
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  };

  const checkout = (pointsUsed) => {
    setUser((prev) => ({
      ...prev,
      points: prev.points - pointsUsed,
    }));
    setCart([]);
  };

  const logout = () => {
    setUser(null);
    setSelectedTier(null);
    setCart([]);
    setPage('login');
    localStorage.removeItem('subswift_state');
  };

  const buyMorePoints = () => {
    setPage('subscription');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        selectedTier,
        cart,
        page,
        setPage,
        login,
        selectTier,
        completePayment,
        addToCart,
        removeFromCart,
        updateQty,
        checkout,
        logout,
        buyMorePoints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
