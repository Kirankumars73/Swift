import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function CartModal({ onClose }) {
  const { cart, user, removeFromCart, updateQty, checkout } = useApp();
  const [pointsToUse, setPointsToUse] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const maxPoints = Math.min(user.points, subtotal);
  const discount = Math.min(pointsToUse, maxPoints);
  const total = subtotal - discount;

  const handleConfirm = () => {
    checkout(discount);
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Order Confirmed!</h2>
          <p className="text-gray-500 mt-2">
            Your order of ₹{total} has been placed successfully.
          </p>
          {discount > 0 && (
            <p className="text-emerald-600 font-medium mt-1">
              You saved ₹{discount} using {discount} points!
            </p>
          )}
          <button
            onClick={onClose}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Your Cart ({cart.reduce((s, i) => s + i.qty, 0)})
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <span className="text-4xl block mb-2">🛒</span>
              Your cart is empty
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-3">
                <span className="text-2xl w-10 text-center flex-shrink-0">
                  {item.image || '📦'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate text-sm">{item.name}</p>
                  <p className="text-violet-600 font-semibold text-sm">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600 cursor-pointer text-sm"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Checkout section */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-6 space-y-4">
            {/* Points discount */}
            {user.points > 0 && (
              <div className="bg-violet-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-violet-900">
                    🎯 Apply Points (1 pt = ₹1 off)
                  </span>
                  <span className="text-xs text-violet-600">
                    Available: {user.points} pts
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max={maxPoints}
                    value={pointsToUse}
                    onChange={(e) => setPointsToUse(Number(e.target.value))}
                    className="flex-1 accent-violet-600"
                  />
                  <span className="text-sm font-bold text-violet-700 w-16 text-right">
                    {pointsToUse} pts
                  </span>
                </div>
                {discount > 0 && (
                  <p className="text-xs text-emerald-600 mt-1 font-medium">
                    You save ₹{discount}!
                  </p>
                )}
              </div>
            )}

            {/* Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Points Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-500/25 active:scale-[0.98] cursor-pointer"
            >
              Confirm Purchase — ₹{total}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
