import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { tiers } from '../data/mockData';

export default function SubscriptionPage() {
  const { user, selectTier } = useApp();
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (tier) => {
    setSelectedId(tier.id);
    setTimeout(() => selectTier(tier), 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Choose Your Plan, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Subscribe to earn points and unlock exclusive benefits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              onMouseEnter={() => setHoveredId(tier.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col ${
                hoveredId === tier.id ? '-translate-y-2' : ''
              } ${
                selectedId === tier.id ? 'scale-95 opacity-50' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                  MOST POPULAR
                </div>
              )}

              <div className={`bg-gradient-to-br ${tier.color} p-6 text-white`}>
                <span className="text-3xl">{tier.badge}</span>
                <h3 className="text-xl font-bold mt-2">{tier.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">₹{tier.price}</span>
                  <span className="text-white/80 text-sm"> /month</span>
                </div>
                <div className="mt-1 text-white/90 text-sm font-medium">
                  {tier.points} points included
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <ul className="space-y-3 flex-1">
                  {tier.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelect(tier)}
                  className={`mt-6 w-full py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                    tier.popular
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } active:scale-[0.98]`}
                >
                  Select {tier.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
