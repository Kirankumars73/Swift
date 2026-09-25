import { useApp } from '../context/AppContext';
import { tiers } from '../data/mockData';

export default function HomePage() {
  const { user, setPage, logout } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-violet-500 selection:text-white">
      {/* ── Top Navigation Bar ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-500 flex items-center justify-center shadow-md shadow-violet-500/20 text-white font-black text-xl">
              ⚡
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">
                SubSwift
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-wider bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
                Members Only
              </span>
            </div>
          </div>

          {/* User info & Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-right hidden md:block">
              <p className="text-xs text-slate-400 font-medium">Logged in as</p>
              <p className="text-sm font-semibold text-slate-800">{user?.name || 'Member'}</p>
            </div>

            {user?.points > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                <span>🎯</span> {user.points} pts
              </div>
            )}

            {/* Top Subscribe Button */}
            <button
              onClick={() => setPage('subscription')}
              className="relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-violet-500/25 hover:shadow-lg hover:shadow-violet-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
            >
              <span className="animate-pulse">✨</span>
              <span>Subscribe</span>
              <span className="hidden sm:inline text-xs font-normal opacity-90">| Plans from ₹199</span>
            </button>

            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-xs font-medium"
              title="Sign Out"
            >
              Exit
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle Decorative Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-violet-400/20 to-indigo-300/30 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -top-24 right-10 w-72 h-72 bg-purple-300/20 blur-2xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200/80 text-violet-700 text-xs font-semibold mb-6 shadow-xs animate-bounce">
              <span>🚀</span>
              <span>Revolutionary Subscription-Powered Shopping</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Subscribe Once. <br />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Shop Everything
              </span>{' '}
              with Points.
            </h1>

            {/* Explanation */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Welcome to <span className="font-semibold text-slate-900">SubSwift</span>, {user?.name?.split(' ')[0]}! 
              Subscribe to a monthly plan to unlock our exclusive members marketplace and earn guaranteed reward points. Every point equals ₹1 INR discount, redeemable directly on groceries, travel, and electronics.
            </p>

            {/* Hero CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setPage('subscription')}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-bold text-base shadow-xl shadow-violet-500/30 hover:shadow-violet-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Subscribe to Unlock Marketplace</span>
                <span>→</span>
              </button>

              {user?.isSubscribed && (
                <button
                  onClick={() => setPage('dashboard')}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-base hover:bg-slate-50 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Go to Marketplace</span>
                  <span>🛒</span>
                </button>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-white/70 backdrop-blur-xs p-4 rounded-xl border border-slate-200/60 shadow-xs">
                <p className="text-2xl font-black text-violet-600">4 Tiers</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">From ₹199 to ₹499</p>
              </div>
              <div className="bg-white/70 backdrop-blur-xs p-4 rounded-xl border border-slate-200/60 shadow-xs">
                <p className="text-2xl font-black text-indigo-600">1 Pt = ₹1</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">Direct Cash Offset</p>
              </div>
              <div className="bg-white/70 backdrop-blur-xs p-4 rounded-xl border border-slate-200/60 shadow-xs">
                <p className="text-2xl font-black text-purple-600">4 Stores</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">Groceries, Travel, Tech</p>
              </div>
              <div className="bg-white/70 backdrop-blur-xs p-4 rounded-xl border border-slate-200/60 shadow-xs">
                <p className="text-2xl font-black text-emerald-600">Instant</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">Realtime Deduction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Explanatory Section: How It Works ── */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-2">
              Simple 4-Step Process
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              How SubSwift Transforms Your Shopping
            </h3>
            <p className="text-slate-500 mt-3 text-sm sm:text-base">
              A frictionless flow designed to maximize everyday savings on essentials & travel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="relative bg-slate-50/80 p-6 rounded-2xl border border-slate-200 hover:border-violet-300 transition-all hover:shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-700 font-black text-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Pick a Subscription</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Choose Starter (200 pts), Plus (300 pts), Premium (400 pts), or Elite (500 pts) based on your shopping appetite.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-slate-50/80 p-6 rounded-2xl border border-slate-200 hover:border-violet-300 transition-all hover:shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 font-black text-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Simulate Fast Payment</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Check out via Card, UPI, or Net Banking. Experience instant confirmation and get points added to your header balance.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-slate-50/80 p-6 rounded-2xl border border-slate-200 hover:border-violet-300 transition-all hover:shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 font-black text-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Browse & Add to Cart</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Select from fresh groceries, train routes, domestic flight connections, or trending electronics in our all-in-one store.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative bg-slate-50/80 p-6 rounded-2xl border border-slate-200 hover:border-violet-300 transition-all hover:shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 font-black text-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Burn Points at Checkout</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Use the interactive points slider at checkout. 1 point knocks off ₹1 rupee directly from your total bill!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Preview Tiers Section ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-1">
                Featured Tiers
              </h2>
              <h3 className="text-3xl font-extrabold text-slate-900">
                Choose the Right Tier for You
              </h3>
            </div>
            <button
              onClick={() => setPage('subscription')}
              className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-bold text-violet-700 hover:text-violet-800 cursor-pointer"
            >
              <span>View full comparison</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{tier.badge}</span>
                    {tier.popular && (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-violet-600 text-white px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mt-3">{tier.name}</h4>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-slate-900">₹{tier.price}</span>
                    <span className="text-xs text-slate-400 font-medium">/month</span>
                  </div>
                  <div className="mt-2 text-xs font-bold text-violet-700 bg-violet-50 inline-block px-2.5 py-1 rounded-md">
                    🎯 {tier.points} Points Included
                  </div>
                  <ul className="mt-4 space-y-2 text-xs text-slate-600">
                    {tier.benefits.slice(0, 3).map((b, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span className="truncate">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setPage('subscription')}
                  className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-violet-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom Call To Action Banner ── */}
      <section className="py-12 bg-gradient-to-r from-violet-700 via-indigo-700 to-purple-800 text-white mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-black">
            Ready to experience next-generation subscription shopping?
          </h3>
          <p className="mt-2 text-violet-100 text-sm max-w-xl mx-auto">
            Select your monthly subscription tier now to claim your welcome points and start shopping.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setPage('subscription')}
              className="px-8 py-3.5 rounded-xl bg-white text-violet-800 font-extrabold text-sm shadow-xl hover:bg-violet-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Get Started with a Subscription 🚀
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
