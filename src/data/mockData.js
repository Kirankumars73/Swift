export const tiers = [
  {
    id: 1,
    name: 'Starter',
    points: 200,
    price: 199,
    color: 'from-emerald-500 to-teal-600',
    badge: '🌱',
    benefits: [
      'Free delivery on orders above ₹500',
      '2% cashback on groceries',
      'Basic customer support',
    ],
  },
  {
    id: 2,
    name: 'Plus',
    points: 300,
    price: 299,
    color: 'from-blue-500 to-indigo-600',
    badge: '⚡',
    benefits: [
      'Free delivery on all orders',
      '5% cashback on groceries',
      'Priority customer support',
      '₹50 off on first train booking',
    ],
  },
  {
    id: 3,
    name: 'Premium',
    points: 400,
    price: 399,
    color: 'from-purple-500 to-violet-600',
    badge: '👑',
    benefits: [
      'Free express delivery',
      '8% cashback on everything',
      '24/7 priority support',
      '₹100 off on flights',
      'Early access to sales',
    ],
    popular: true,
  },
  {
    id: 4,
    name: 'Elite',
    points: 500,
    price: 499,
    color: 'from-amber-500 to-orange-600',
    badge: '💎',
    benefits: [
      'Free same-day delivery',
      '12% cashback on everything',
      'Dedicated account manager',
      '₹200 off on flights',
      'Exclusive member-only deals',
      'Free cancellation on bookings',
    ],
  },
];

export const groceries = [
  { id: 'g1', name: 'Organic Basmati Rice', price: 245, weight: '5 kg', category: 'grocery', image: '🍚' },
  { id: 'g2', name: 'Tata Gold Tea', price: 399, weight: '500 g', category: 'grocery', image: '🍵' },
  { id: 'g3', name: 'Amul Butter', price: 56, weight: '100 g', category: 'grocery', image: '🧈' },
  { id: 'g4', name: 'Aashirvaad Atta', price: 320, weight: '5 kg', category: 'grocery', image: '🌾' },
  { id: 'g5', name: 'Saffola Gold Oil', price: 189, weight: '1 L', category: 'grocery', image: '🫒' },
  { id: 'g6', name: 'Maggi Noodles Pack', price: 120, weight: '12 pcs', category: 'grocery', image: '🍜' },
  { id: 'g7', name: 'Fresho Almonds', price: 450, weight: '500 g', category: 'grocery', image: '🥜' },
  { id: 'g8', name: 'Dairy Milk Silk', price: 85, weight: '150 g', category: 'grocery', image: '🍫' },
];

export const trainRoutes = [
  { id: 't1', train: '12301 Rajdhani Express', from: 'New Delhi', to: 'Mumbai Central', dep: '16:55', arr: '08:35', duration: '15h 40m', price: 1450, class: 'AC 3-Tier' },
  { id: 't2', train: '12951 Mumbai Rajdhani', from: 'New Delhi', to: 'Mumbai Central', dep: '16:25', arr: '08:15', duration: '15h 50m', price: 2100, class: 'AC 2-Tier' },
  { id: 't3', train: '12627 Karnataka Express', from: 'New Delhi', to: 'Bangalore', dep: '21:15', arr: '06:40', duration: '33h 25m', price: 890, class: 'Sleeper' },
  { id: 't4', train: '12802 Purushottam Express', from: 'New Delhi', to: 'Puri', dep: '22:35', arr: '05:30', duration: '30h 55m', price: 780, class: 'Sleeper' },
  { id: 't5', train: '12259 Sealdah Duronto', from: 'New Delhi', to: 'Kolkata', dep: '20:10', arr: '10:05', duration: '13h 55m', price: 1680, class: 'AC 3-Tier' },
];

export const flightRoutes = [
  { id: 'f1', flight: 'AI-302', airline: 'Air India', from: 'Delhi (DEL)', to: 'Mumbai (BOM)', dep: '06:00', arr: '08:15', duration: '2h 15m', price: 4500 },
  { id: 'f2', flight: '6E-185', airline: 'IndiGo', from: 'Delhi (DEL)', to: 'Bangalore (BLR)', dep: '07:30', arr: '10:20', duration: '2h 50m', price: 3800 },
  { id: 'f3', flight: 'SG-723', airline: 'SpiceJet', from: 'Mumbai (BOM)', to: 'Goa (GOI)', dep: '09:15', arr: '10:30', duration: '1h 15m', price: 2900 },
  { id: 'f4', flight: 'UK-835', airline: 'Vistara', from: 'Delhi (DEL)', to: 'Chennai (MAA)', dep: '11:00', arr: '13:45', duration: '2h 45m', price: 5200 },
  { id: 'f5', flight: '6E-601', airline: 'IndiGo', from: 'Bangalore (BLR)', to: 'Kolkata (CCU)', dep: '14:20', arr: '17:05', duration: '2h 45m', price: 4100 },
];

export const generalProducts = [
  { id: 'p1', name: 'Boat Rockerz 450 Headphones', price: 1499, category: 'general', image: '🎧', desc: 'Wireless Bluetooth' },
  { id: 'p2', name: 'Kindle Paperwhite', price: 13999, category: 'general', image: '📱', desc: '16 GB, 6.8" display' },
  { id: 'p3', name: 'Nike Air Max Shoes', price: 5995, category: 'general', image: '👟', desc: 'Running shoes, size 8-12' },
  { id: 'p4', name: 'Prestige Induction Cooktop', price: 2199, category: 'general', image: '🍳', desc: '1600W, touch panel' },
  { id: 'p5', name: 'Wildcraft Backpack 35L', price: 1299, category: 'general', image: '🎒', desc: 'Water-resistant, laptop sleeve' },
  { id: 'p6', name: 'Noise ColorFit Watch', price: 2999, category: 'general', image: '⌚', desc: 'AMOLED, heart rate monitor' },
  { id: 'p7', name: 'JBL Go 3 Speaker', price: 2999, category: 'general', image: '🔊', desc: 'Portable, waterproof' },
  { id: 'p8', name: 'Pigeon Flask 1L', price: 599, category: 'general', image: '🧴', desc: 'Stainless steel, insulated' },
];

export const banks = [
  'State Bank of India (SBI)',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Kotak Mahindra Bank',
  'Yes Bank',
];

export const cities = [
  'New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata',
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Goa',
];
