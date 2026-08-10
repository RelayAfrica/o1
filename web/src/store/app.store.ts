import {create} from 'zustand'; import type {Business} from '../types';
interface State{business:Business|null;setBusiness:(business:Business|null)=>void}
export const useAppStore=create<State>(set=>({business:null,setBusiness:business=>set({business})}));

