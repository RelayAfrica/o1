export interface Product { id:string; businessId:string; name:string; description:string; price:number; currency:string; images:string[]; categoryId?:string; availability:boolean; inventoryQty:number; lowStockThreshold:number; channels:{web:boolean;whatsapp:boolean}; deletedAt?:string|null; }
export interface Category { id:string; businessId:string; name:string; sortOrder:number; parentId?:string|null; }
export interface CartItem { productId:string; qty:number; priceAtAdd:number; }
export interface Cart { id:string; businessId:string; sessionId?:string; customerId?:string; items:CartItem[]; expiresAt:string; }
export type OrderStatus = 'pending'|'confirmed'|'preparing'|'ready'|'completed'|'cancelled';
export interface Order { id:string; businessId:string; customerId?:string; items:CartItem[]; subtotal:number; currency:string; paymentStatus:'pending'|'paid'|'failed'|'refunded'; deliveryStatus:'pending'|'confirmed'|'cancelled'; orderStatus:OrderStatus; channel:'web'|'whatsapp'; createdAt:string; updatedAt:string; }
export interface Payment { id:string; orderId:string; provider:'backs.io'; providerRef?:string; amount:number; currency:string; status:'pending'|'paid'|'failed'; createdAt:string; updatedAt:string; }
