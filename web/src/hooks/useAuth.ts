import {useEffect,useState} from 'react'; import {onAuthStateChanged,type User as FirebaseUser} from 'firebase/auth'; import {auth} from '../lib/firebase';
export function useAuth(){const [user,setUser]=useState<FirebaseUser|null>(null);const [loading,setLoading]=useState(true);useEffect(()=>auth?onAuthStateChanged(auth,u=>{setUser(u);setLoading(false)}):(()=>{setLoading(false)}),[]);return {user,loading};}

