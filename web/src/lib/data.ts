export const MOCK_CUSTOMERS = [
  { id: '1', name: 'Amara Okafor', phone: '+234 801 234 5678', email: 'amara.o@example.com', avatar: 'AO', spent: 120000, loyaltyPoints: 450, walletBalance: 15000, lastOrder: '2 days ago', status: 'Hot', tags: ['VIP', 'Regular'], notes: 'Prefers mild spice. Allergic to peanuts.' },
  { id: '2', name: 'Chinedu Eze', phone: '+234 802 345 6789', email: 'chinedu.e@example.com', avatar: 'CE', spent: 45000, loyaltyPoints: 120, walletBalance: 0, lastOrder: '1 week ago', status: 'Permanent', tags: ['Regular'], notes: 'Usually orders on weekends.' },
  { id: '3', name: 'Fatima Abubakar', phone: '+234 803 456 7890', email: 'fatima.a@example.com', avatar: 'FA', spent: 210000, loyaltyPoints: 890, walletBalance: 50000, lastOrder: 'Just now', status: 'Hot', tags: ['VIP'], notes: '' },
  { id: '4', name: 'Oluwaseun Adeyemi', phone: '+234 804 567 8901', email: 'oluwaseun.a@example.com', avatar: 'OA', spent: 15000, loyaltyPoints: 45, walletBalance: 0, lastOrder: '3 weeks ago', status: 'New', tags: ['Discount seeker'], notes: 'Only buys with promos.' },
  { id: '5', name: 'Nneka Igwe', phone: '+234 805 678 9012', email: 'nneka.i@example.com', avatar: 'NI', spent: 85000, loyaltyPoints: 210, walletBalance: 5000, lastOrder: 'Yesterday', status: 'Permanent', tags: [], notes: '' },
  { id: '6', name: 'Ibrahim Musa', phone: '+234 806 789 0123', email: 'ibrahim.m@example.com', avatar: 'IM', spent: 5000, loyaltyPoints: 10, walletBalance: 0, lastOrder: '1 month ago', status: 'New', tags: [], notes: '' },
];

export const MOCK_ORDERS: { id: string, customer: string, amount: number, stage: string, date: string, time?: string, items: number }[] = [
  { id: 'ORD-001', customer: 'Amara Okafor', amount: 45000, stage: 'New', date: '10:42 AM', items: 3 },
  { id: 'ORD-002', customer: 'Fatima Abubakar', amount: 12000, stage: 'Confirmed', date: '09:15 AM', items: 1 },
  { id: 'ORD-003', customer: 'Chinedu Eze', amount: 8500, stage: 'Preparing', date: 'Yesterday', items: 2 },
  { id: 'ORD-004', customer: 'Nneka Igwe', amount: 32000, stage: 'Ready', date: 'Yesterday', items: 4 },
  { id: 'ORD-005', customer: 'Oluwaseun Adeyemi', amount: 15000, stage: 'Completed', date: '2 days ago', items: 1 },
  { id: 'ORD-006', customer: 'Adebayo Adekunle', amount: 21000, stage: 'New', date: '11:05 AM', items: 2 },
];

export const MOCK_PRODUCTS = [
  { id: 'P1', name: 'Jollof Rice Combo', price: 4500, stock: 45, status: 'Active', category: 'Food' },
  { id: 'P2', name: 'Grilled Chicken', price: 3000, stock: 12, status: 'Low Stock', category: 'Food' },
  { id: 'P3', name: 'Fresh Salad', price: 2500, stock: 30, status: 'Active', category: 'Food' },
  { id: 'P4', name: 'Iced Tea', price: 1200, stock: 0, status: 'Out of Stock', category: 'Drinks' },
];

export const MOCK_NOTIFICATIONS = [
  { id: '1', type: 'order', title: 'New order from Amara Okafor', time: '5m ago', read: false },
  { id: '2', type: 'stock', title: 'Grilled Chicken is low in stock', time: '1h ago', read: false },
  { id: '3', type: 'campaign', title: 'Weekend Promo campaign completed', time: '2h ago', read: true },
  { id: '4', type: 'appointment', title: 'New booking: Table for 4', time: '3h ago', read: true },
];

export const MOCK_TIMELINE = [
  { id: 'T1', type: 'order', title: 'Placed an order for ₦45,000', time: '2 days ago', icon: 'ShoppingBag' },
  { id: 'T2', type: 'visit', title: 'Visited your storefront', time: '3 days ago', icon: 'Globe' },
  { id: 'T3', type: 'campaign', title: 'Opened "Weekend Promo" email', time: '1 week ago', icon: 'Mail' },
  { id: 'T4', type: 'nfc', title: 'Tapped NFC menu at Table 4', time: '2 weeks ago', icon: 'Smartphone' },
];
