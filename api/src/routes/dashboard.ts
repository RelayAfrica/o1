import {Router} from 'express';
import {requireTenant} from '../middleware/auth';
import {adminDb} from '../services/firebase-admin';

export const dashboard=Router();
const day=(date:Date)=>new Date(date.getFullYear(),date.getMonth(),date.getDate());
const startOfWeek=(date:Date)=>{const value=day(date);const offset=(value.getDay()+6)%7;value.setDate(value.getDate()-offset);return value};
const startOfQuarter=(date:Date)=>new Date(date.getFullYear(),Math.floor(date.getMonth()/3)*3,1);
const endOfQuarter=(date:Date)=>{const start=startOfQuarter(date);return new Date(start.getFullYear(),start.getMonth()+3,0,23,59,59,999)};
const sum=(orders:any[])=>orders.filter(order=>order.paymentStatus==='paid').reduce((total,order)=>total+Number(order.subtotal||order.total||0),0);
const inRange=(value:string,start:Date,end:Date)=>{const date=new Date(value);return date>=start&&date<=end};

dashboard.get('/:businessId/dashboard',requireTenant,async(req,res,next)=>{
  try{
    const businessId=req.businessId!;const now=new Date();
    const [businessSnap,ordersSnap,productsSnap,inventorySnap,customersSnap,categoriesSnap]=await Promise.all([
      adminDb.collection('businesses').doc(businessId).get(),
      adminDb.collection('orders').where('businessId','==',businessId).get(),
      adminDb.collection('products').where('businessId','==',businessId).where('deletedAt','==',null).get(),
      adminDb.collection('inventory').where('businessId','==',businessId).get(),
      adminDb.collection('customers').where('businessId','==',businessId).get(),
      adminDb.collection('categories').where('businessId','==',businessId).get(),
    ]);
    const orders=ordersSnap.docs.map(doc=>doc.data()).sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime());
    const products=productsSnap.docs.map(doc=>doc.data());const productMap=new Map(products.map(product=>[product.id,product]));const categories=new Map(categoriesSnap.docs.map(doc=>[doc.id,doc.data()]));
    const monthStart=new Date(now.getFullYear(),now.getMonth(),1);const previousMonthStart=new Date(now.getFullYear(),now.getMonth()-1,1);const previousMonthEnd=new Date(monthStart.getTime()-1);
    const weekStart=startOfWeek(now);const previousWeekStart=new Date(weekStart);previousWeekStart.setDate(previousWeekStart.getDate()-7);const previousWeekEnd=new Date(weekStart.getTime()-1);
    const quarterStart=startOfQuarter(now);const quarterEnd=endOfQuarter(now);const paidMonth=orders.filter(order=>inRange(order.createdAt,monthStart,now));const paidWeek=orders.filter(order=>inRange(order.createdAt,weekStart,now));const paidQuarter=orders.filter(order=>inRange(order.createdAt,quarterStart,now));
    const previousMonth=sum(orders.filter(order=>inRange(order.createdAt,previousMonthStart,previousMonthEnd)));const previousWeek=sum(orders.filter(order=>inRange(order.createdAt,previousWeekStart,previousWeekEnd)));const previousQuarterStart=new Date(quarterStart.getFullYear(),quarterStart.getMonth()-3,1);const previousQuarterEnd=new Date(quarterStart.getTime()-1);const previousQuarterOrders=orders.filter(order=>inRange(order.createdAt,previousQuarterStart,previousQuarterEnd));
    const currentMonth=sum(paidMonth);const currentWeek=sum(paidWeek);const elapsedDays=Math.max(1,Math.ceil((now.getTime()-quarterStart.getTime())/86400000));const quarterDays=Math.ceil((quarterEnd.getTime()-quarterStart.getTime())/86400000)+1;const quarterRevenue=sum(paidQuarter);
    const comparison=(value:number,previous:number,period:string)=>previous>0?{value:((value-previous)/previous)*100,period}:undefined;
    const revenueTrend=Array.from({length:30},(_,index)=>{const date=new Date(now);date.setDate(now.getDate()-29+index);const next=new Date(date);next.setDate(date.getDate()+1);return {label:date.toISOString().slice(0,10),value:sum(orders.filter(order=>inRange(order.createdAt,date,next)))}});
    const weeklyActivity=Array.from({length:7},(_,index)=>{const date=new Date(weekStart);date.setDate(weekStart.getDate()+index);const next=new Date(date);next.setDate(date.getDate()+1);return {label:date.toLocaleDateString('en',{weekday:'short'}),value:sum(orders.filter(order=>inRange(order.createdAt,date,next)))}});
    const chartBucket=(start:Date,end:Date,label:string)=>{const bucket=orders.filter(order=>{const createdAt=new Date(order.createdAt);return order.paymentStatus==='paid'&&createdAt>=start&&createdAt<end});return {label,revenue:sum(bucket),orders:bucket.length}};
    const analyticTrend={
      day:Array.from({length:24},(_,index)=>{const start=new Date(now);start.setHours(now.getHours()-23+index,0,0,0);const end=new Date(start);end.setHours(end.getHours()+1);return chartBucket(start,end,start.toLocaleTimeString('en',{hour:'numeric'}))}),
      week:Array.from({length:7},(_,index)=>{const start=new Date(now);start.setHours(0,0,0,0);start.setDate(start.getDate()-6+index);const end=new Date(start);end.setDate(end.getDate()+1);return chartBucket(start,end,start.toLocaleDateString('en',{weekday:'short'}))}),
      month:Array.from({length:Math.max(1,now.getDate())},(_,index)=>{const start=new Date(now.getFullYear(),now.getMonth(),index+1);const end=new Date(start);end.setDate(end.getDate()+1);return chartBucket(start,end,String(index+1))}),
      quarter:Array.from({length:3},(_,index)=>{const start=new Date(quarterStart.getFullYear(),quarterStart.getMonth()+index,1);const end=new Date(start.getFullYear(),start.getMonth()+1,1);return chartBucket(start,end,start.toLocaleDateString('en',{month:'short'}))}),
    };
    const movers=new Map<string,{orders:number;revenue:number}>();for(const order of paidWeek)for(const item of order.items||[]){const product=productMap.get(item.productId);const current=movers.get(item.productId)||{orders:0,revenue:0};current.orders+=Number(item.qty||0);current.revenue+=Number(item.qty||0)*Number(item.priceAtAdd||product?.price||0);movers.set(item.productId,current)}
    const topMovers=[...movers.entries()].sort((a,b)=>b[1].revenue-a[1].revenue).slice(0,5).map(([id,value])=>({name:productMap.get(id)?.name||'Product',...value}));
    const needsAttention=(inventorySnap.docs.map(doc=>({id:doc.id,...doc.data()})) as any[]).filter(item=>Number(item.quantity??0)<=Number(item.lowStockThreshold??5)).map(item=>({id:item.productId||item.id,name:productMap.get(item.productId||item.id)?.name||'Product',condition:Number(item.quantity??0)===0?'Out of Stock':'Low Stock'}));
    const customerCount=customersSnap.size;const customers=customersSnap.docs.map(doc=>({id:doc.id,...doc.data()})) as any[];const customerOrders=new Map<string,any[]>();for(const order of orders){const customerId=order.customerId||order.customer?.id;if(customerId){const list=customerOrders.get(customerId)||[];list.push(order);customerOrders.set(customerId,list)}}const newCustomers=customers.filter(customer=>{const first=(customerOrders.get(customer.id)||[]).filter(order=>order.paymentStatus==='paid').sort((a,b)=>new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime())[0];return first&&inRange(first.createdAt,weekStart,now)}).length;const activeCustomers=customers.filter(customer=>(customerOrders.get(customer.id)||[]).some(order=>order.paymentStatus==='paid'&&inRange(order.createdAt,new Date(now.getTime()-90*86400000),now))).length;
    const categoryRevenue=new Map<string,number>();for(const order of paidQuarter)for(const item of order.items||[]){const categoryId=productMap.get(item.productId)?.categoryId;if(categoryId)categoryRevenue.set(categoryId,(categoryRevenue.get(categoryId)||0)+Number(item.qty||0)*Number(item.priceAtAdd||productMap.get(item.productId)?.price||0))}const categoryTotal=[...categoryRevenue.values()].reduce((total,value)=>total+value,0);const topCategories=[...categoryRevenue.entries()].sort((a,b)=>b[1]-a[1]).map(([id,value])=>({name:categories.get(id)?.name||'Category',share:categoryTotal?Math.round(value/categoryTotal*100):0})).slice(0,6);
    const target=businessSnap.data()?.revenueTarget;const targetValue=typeof target==='number'?target:Number(target?.value||0);
    return res.json({success:true,data:{businessName:businessSnap.data()?.name||'',hero:{currency:businessSnap.data()?.currency||'NGN',overview:currentMonth,weekly:currentWeek,projected:quarterRevenue?quarterRevenue/elapsedDays*quarterDays:undefined,comparison:comparison(currentMonth,previousMonth,'previous month'),weeklyComparison:comparison(currentWeek,previousWeek,'previous week'),analyticComparison:targetValue?comparison(quarterRevenue,targetValue,'quarter target'):undefined},revenueTrend,weeklyActivity,analyticTrend,recentOrders:orders.slice(0,6).map(order=>({id:order.id,customerName:order.customer?.name||'Customer',relativeTime:order.createdAt,itemCount:(order.items||[]).reduce((count:number,item:any)=>count+Number(item.qty||0),0),total:Number(order.subtotal||0),status:order.orderStatus||order.paymentStatus})),topMovers,needsAttention,target:targetValue?{value:targetValue,period:target?.period||'quarter',reached:quarterRevenue}:undefined,audience:{total:customerCount,active:activeCustomers,newCustomers,inactive:Math.max(0,customerCount-activeCustomers)},topCategories}});
  }catch(error){return next(error)}
});
