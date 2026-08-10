export type Category='food_beverage'|'fashion_retail'|'beauty_wellness'|'photography_events'|'general_services'|'other';
export interface Business{ id:string; name:string; category:Category; phone:string; logoUrl?:string|null; brandColor:string; status:'onboarding'|'active'; slug?:string; template?:string; }
export interface User{ id:string; displayName:string; email:string; }

