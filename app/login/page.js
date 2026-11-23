"use client";
import {useEffect,useState} from "react";
import {useRouter,useSearchParams} from "next/navigation";
import {GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from "firebase/auth";
import {auth} from "../../lib/firebase";

export default function LoginPage(){
 const router=useRouter();
 const params=useSearchParams();
 const returnTo=params.get("returnTo")||"/";
 const safeReturn=returnTo.startsWith("/")&&!returnTo.startsWith("//")?returnTo:"/";
 const [user,setUser]=useState(null),[checking,setChecking]=useState(true),[busy,setBusy]=useState(false),[error,setError]=useState("");
 useEffect(()=>onAuthStateChanged(auth,u=>{setUser(u);setChecking(false)}),[]);
 useEffect(()=>{if(!checking&&user&&!user.isAnonymous)router.replace(safeReturn)},[checking,user,safeReturn,router]);
 async function login(){setBusy(true);setError("");try{const p=new GoogleAuthProvider();p.setCustomParameters({prompt:"select_account"});const result=await signInWithPopup(auth,p);if(result.user&&!result.user.isAnonymous)router.replace(safeReturn)}catch(e){setError(e?.message||"Google Login nahi ho saka. Dobara koshish karein.")}finally{setBusy(false)}}
 return <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:20,background:"linear-gradient(135deg,#fff7ed,#f5eaff)"}}><section style={{width:"100%",maxWidth:430,background:"#fff",padding:28,borderRadius:22,boxShadow:"0 12px 40px #32104418",textAlign:"center",color:"#241b35"}}><div style={{fontSize:42}}>🌙</div><h1>Zara Nikah Login</h1><p>Apna profile jodne ke liye pehle Google account se Login karein. Login ke baad aap wapas profile form par aa jayenge.</p>{checking?<p>Login status check ho raha hai...</p>:<button type="button" disabled={busy} onClick={login} style={{width:"100%",padding:14,border:0,borderRadius:12,background:"#6b21a8",color:"#fff",fontWeight:700,fontSize:16,cursor:"pointer"}}>{busy?"Login ho raha hai...":"🔐 Google se Login karein"}</button>}{error&&<p style={{marginTop:14,padding:12,background:"#fff1f2",color:"#be123c",borderRadius:10,overflowWrap:"anywhere"}}>{error}</p>}<button type="button" onClick={()=>router.push("/")} style={{marginTop:18,padding:10,border:0,background:"transparent",color:"#6b21a8",cursor:"pointer"}}>← Home par wapas</button></section></main>
}
