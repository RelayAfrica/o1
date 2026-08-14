import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const config={apiKey:import.meta.env.VITE_FIREBASE_API_KEY,authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,appId:import.meta.env.VITE_FIREBASE_APP_ID,measurementId:import.meta.env.VITE_FIREBASE_MEASUREMENT_ID};
export const firebaseConfigured=Object.values(config).filter((value)=>value !== undefined).every(Boolean);
export const app=firebaseConfigured?(getApps()[0]??initializeApp(config)):null;
export const auth=app?getAuth(app):null;
if(auth&&import.meta.env.VITE_USE_FIREBASE_EMULATORS==='true')connectAuthEmulator(auth,'http://127.0.0.1:9099',{disableWarnings:true});
export const analytics=app&&typeof window!=='undefined' ? (void isSupported().then((supported)=>supported?getAnalytics(app):null)) : null;
