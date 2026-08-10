interface Product{id:string;businessId:string;name:string;description:string;price:number;currency:string;images:string[];categoryId?:string;availability:boolean;inventoryQty:number;deletedAt?:string|null}
interface Category{id:string;businessId:string;name:string;sortOrder:number;parentId?:string|null}
interface Cart{id:string;businessId:string;sessionId?:string;customerId?:string;items:{productId:string;qty:number;priceAtAdd:number}[];expiresAt:string}
interface Order{id:string;businessId:string;customerId?:string;items:{productId:string;qty:number;priceAtAdd:number}[];subtotal:number;currency:string;paymentStatus:'pending'|'paid'|'failed'|'refunded';deliveryStatus:'pending'|'confirmed'|'cancelled';orderStatus:'pending'|'confirmed'|'cancelled';createdAt:string;updatedAt:string}

// Local repository used by the API until Firebase Admin credentials are supplied.
// All mutations are synchronous and grouped in one handler, which preserves the
// inventory check/decrement atomicity for the local development process.
export const products=new Map<string,Product>();
export const categories=new Map<string,Category>();
export const carts=new Map<string,Cart>();
export const orders=new Map<string,Order>();
export const storefronts=new Map<string,{businessId:string;slug:string;published:boolean;template?:string}>();
export const now=()=>new Date().toISOString();
