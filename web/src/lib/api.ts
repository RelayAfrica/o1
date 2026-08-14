import {auth} from './firebase';

export const apiBase=import.meta.env.VITE_API_URL||import.meta.env.VITE_API_BASE_URL||'http://localhost:4000';
export const currentBusinessId=()=>localStorage.getItem('relay_business_id')||import.meta.env.VITE_BUSINESS_ID||'';
export async function apiFetch(path:string,init:RequestInit={}){const token=auth?.currentUser?await auth.currentUser.getIdToken():'';const headers=new Headers(init.headers);if(token)headers.set('Authorization',`Bearer ${token}`);const businessId=currentBusinessId();if(businessId)headers.set('x-business-id',businessId);if(init.body&&!headers.has('content-type'))headers.set('content-type','application/json');try{return await fetch(`${apiBase}${path}`,{...init,headers})}catch(error){throw new Error(`Relay API is unavailable at ${apiBase}. Start the API server and try again.`)}}
export async function apiFetchChecked(path:string,init:RequestInit={}){const response=await apiFetch(path,init);if(response.ok)return response;let message=`Request failed (${response.status})`;try{const payload=await response.json();message=payload?.error?.message||message}catch{}throw new Error(`${path}: ${message}`)}
