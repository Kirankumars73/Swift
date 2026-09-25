import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { groceries, trainRoutes, flightRoutes, generalProducts, cities } from '../data/mockData';
import CartModal from '../components/CartModal';

const categories = [
  { key: 'grocery', label: '🛒 Grocery', icon: '🛒' },
  { key: 'trains', label: '🚆 Trains', icon: '🚆' },
  { key: 'flights', label: '✈️ Flights', icon: '✈️' },
  { key: 'general', label: '🛍️ General', icon: '🛍️' },
];

export default function DashboardPage() {
  const { user, cart, addToCart, logout, buyMorePoints, setPage } = useApp();
  const [activeTab, setActiveTab] = useState('grocery');
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState(null);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const handleAdd = (item) => {
    addToCart(item);
    showToast(`${item.name} added to cart`);
  };

  if (!user?.isSubscribed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center border border-slate-200">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
            🔒
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Subscription Required</h2>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">
            The SubSwift marketplace is exclusive to members. Please choose a subscription plan to unlock groceries, tickets, and products.
          </p>
          <button
            onClick={() => setPage('subscription')}
            className="mt-6 w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/35 transition-all cursor-pointer"
          >
            Choose a Subscription Plan →
          </button>
          <button
            onClick={() => setPage('home')}
            className="mt-3 block mx-auto text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setPage('home')}
            title="Go to Home"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white text-sm font-bold">⚡</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm group-hover:text-violet-600 transition-colors">
                {user?.name || 'Member'}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setPage('home')}
              className="text-xs font-semibold text-slate-600 hover:text-violet-700 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              🏠 Home
            </button>
            <button
              onClick={buyMorePoints}
              className="hidden sm:flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium cursor-pointer"
            >
              + Buy Points
            </button>
            <div className="bg-violet-100 text-violet-700 px-3 py-1.5 rounded-full text-sm font-semibold">
              🎯 {user?.points} pts
            </div>
            <button
              onClick={() => setShowCart(true)}
              className="relative bg-gray-100 hover:bg-gray-200 p-2 rounded-xl transition-colors cursor-pointer"
            >
              <span className="text-lg">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-gray-600 text-sm cursor-pointer"
              title="Logout"
            >
              ↪ Exit
            </button>
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === cat.key
                    ? 'bg-violet-100 text-violet-700'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'grocery' && <GrocerySection onAdd={handleAdd} />}
        {activeTab === 'trains' && <TrainSection onAdd={handleAdd} />}
        {activeTab === 'flights' && <FlightSection onAdd={handleAdd} />}
        {activeTab === 'general' && <GeneralSection onAdd={handleAdd} />}
      </div>

      {/* Cart Modal */}
      {showCart && <CartModal onClose={() => setShowCart(false)} />}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium z-50 animate-[fadeIn_0.3s_ease-out]">
          ✓ {toast}
        </div>
      )}
    </div>
  );
}

/* ──── Grocery Section ──── */
function GrocerySection({ onAdd }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Fresh Groceries</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {groceries.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all overflow-hidden group"
          >
            <div className="bg-gray-50 p-6 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
              {item.image}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{item.weight}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-gray-900">₹{item.price}</span>
                <button
                  onClick={() => onAdd(item)}
                  className="px-3 py-1.5 bg-violet-600 text-white text-xs font-semibold rounded-lg hover:bg-violet-700 active:scale-95 transition-all cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──── Train Section ──── */
function TrainSection({ onAdd }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [searched, setSearched] = useState(false);

  const filteredResults = searched ? trainRoutes : [];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Book Train Tickets</h2>
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            >
              <option value="">Select city</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            >
              <option value="">Select city</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setSearched(true)}
              className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 active:scale-[0.98] transition-all cursor-pointer"
            >
              Search Trains
            </button>
          </div>
        </div>
      </div>

      {filteredResults.length > 0 && (
        <div className="space-y-3">
          {filteredResults.map((train) => (
            <div
              key={train.id}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{train.train}</p>
                  <p className="text-xs text-gray-500 mt-1">{train.class}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{train.dep}</p>
                    <p className="text-xs text-gray-400">{train.from}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">{train.duration}</p>
                    <div className="w-16 h-px bg-gray-300 my-1" />
                    <p className="text-xs text-gray-400">→</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{train.arr}</p>
                    <p className="text-xs text-gray-400">{train.to}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900">₹{train.price}</span>
                  <button
                    onClick={() =>
                      onAdd({ id: train.id, name: `${train.train} (${train.from} → ${train.to})`, price: train.price, image: '🚆' })
                    }
                    className="px-4 py-2 bg-violet-600 text-white text-xs font-semibold rounded-lg hover:bg-violet-700 active:scale-95 transition-all cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ──── Flight Section ──── */
function FlightSection({ onAdd }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [searched, setSearched] = useState(false);

  const filteredResults = searched ? flightRoutes : [];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Book Flights</h2>
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            >
              <option value="">Select city</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            >
              <option value="">Select city</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setSearched(true)}
              className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 active:scale-[0.98] transition-all cursor-pointer"
            >
              Search Flights
            </button>
          </div>
        </div>
      </div>

      {filteredResults.length > 0 && (
        <div className="space-y-3">
          {filteredResults.map((flight) => (
            <div
              key={flight.id}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{flight.airline}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{flight.flight}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{flight.dep}</p>
                    <p className="text-xs text-gray-400">{flight.from}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">{flight.duration}</p>
                    <div className="w-16 h-px bg-gray-300 my-1" />
                    <p className="text-xs text-gray-400">✈</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{flight.arr}</p>
                    <p className="text-xs text-gray-400">{flight.to}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900">₹{flight.price}</span>
                  <button
                    onClick={() =>
                      onAdd({ id: flight.id, name: `${flight.airline} ${flight.flight} (${flight.from} → ${flight.to})`, price: flight.price, image: '✈️' })
                    }
                    className="px-4 py-2 bg-violet-600 text-white text-xs font-semibold rounded-lg hover:bg-violet-700 active:scale-95 transition-all cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ──── General Section ──── */
function GeneralSection({ onAdd }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {generalProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all overflow-hidden group"
          >
            <div className="bg-gray-50 p-6 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
              {item.image}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-gray-900">₹{item.price}</span>
                <button
                  onClick={() => onAdd(item)}
                  className="px-3 py-1.5 bg-violet-600 text-white text-xs font-semibold rounded-lg hover:bg-violet-700 active:scale-95 transition-all cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
