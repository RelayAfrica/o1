export interface CheckoutRequest { orderId:string; amount:number; currency:string; customer?:{name?:string;email?:string;phone?:string}; }
export interface CheckoutHandoff { provider:'backs.io'; checkoutUrl:null; providerRef:null; status:'pending'; message:string; }
export interface PaymentProvider { initiateCheckout(request:CheckoutRequest):Promise<CheckoutHandoff>; verifyWebhook(payload:unknown,signature?:string):Promise<{orderId:string;status:'paid'|'failed'}>; }
export const backsIoProvider:PaymentProvider={
  async initiateCheckout(){return {provider:'backs.io',checkoutUrl:null,providerRef:null,status:'pending',message:'backs.io checkout is not configured yet.'}},
  async verifyWebhook(){throw new Error('backs.io webhook verification is not configured yet')},
};
