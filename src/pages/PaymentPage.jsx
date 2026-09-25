import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { banks } from '../data/mockData';

const tabs = ['Card', 'UPI', 'Net Banking'];

export default function PaymentPage() {
  const { selectedTier, completePayment, setPage } = useApp();
  const [activeTab, setActiveTab] = useState('Card');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bank, setBank] = useState('');

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => completePayment(), 1500);
    }, 2000);
  };

  if (!selectedTier) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={() => setPage('subscription')} className="text-violet-600 underline">
          Go back to select a plan
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full animate-[fadeIn_0.5s_ease-out]">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
          <p className="text-gray-500 mt-2">
            {selectedTier.points} points have been added to your account
          </p>
          <div className="mt-4 inline-block bg-violet-100 text-violet-700 px-4 py-2 rounded-full font-semibold">
            🎯 +{selectedTier.points} pts
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <button
          onClick={() => setPage('subscription')}
          className="text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-1 text-sm cursor-pointer"
        >
          ← Back to plans
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Order Summary */}
          <div className={`bg-gradient-to-br ${selectedTier.color} p-6 text-white`}>
            <h2 className="text-lg font-semibold opacity-90">Order Summary</h2>
            <div className="flex items-center justify-between mt-3">
              <div>
                <span className="text-2xl mr-2">{selectedTier.badge}</span>
                <span className="text-xl font-bold">{selectedTier.name} Plan</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">₹{selectedTier.price}</div>
                <div className="text-sm opacity-80">{selectedTier.points} points</div>
              </div>
            </div>
          </div>

          {/* Payment Method Tabs */}
          <div className="p-6">
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Card Form */}
            {activeTab === 'Card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCard(e.target.value))}
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      placeholder="•••"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            )}

            {/* UPI */}
            {activeTab === 'UPI' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@paytm"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 placeholder-gray-400"
                />
                <div className="flex gap-3 mt-4">
                  {['GPay', 'PhonePe', 'Paytm'].map((app) => (
                    <button
                      key={app}
                      onClick={() => setUpiId(`demo@${app.toLowerCase()}`)}
                      className="flex-1 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      {app}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Net Banking */}
            {activeTab === 'Net Banking' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 appearance-none cursor-pointer"
                >
                  <option value="">Choose your bank</option>
                  {banks.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={handlePay}
              disabled={processing}
              className="w-full mt-6 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] cursor-pointer"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                `Pay ₹${selectedTier.price}`
              )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              🔒 Secured by SubSwift • Demo payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
