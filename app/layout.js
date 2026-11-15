import "./globals.css";
import AppAccessGate from "./components/AppAccessGate";
import PushTokenSync from "./components/PushTokenSync";
import Script from "next/script";

export const metadata={
 metadataBase:new URL("https://zaranikahservice.online"),
 title:{default:"Muslim Rishta & Nikah Service in India | Zara Nikah",template:"%s | Zara Nikah Service"},
 description:"Zara Nikah Service par Muslim nikah aur shaadi ke rishte dekhein. First marriage aur second marriage ke liye rishta profiles, biodata guidance aur online rishta safety tips.",
 applicationName:"Zara Nikah Service",
 verification:{google:"ghQJPyiHgmoIebzPQClppUAx51-TllRuw_ZJ1C5L3pM"},
 category:"Lifestyle",
 keywords:[
  "Muslim rishta",
  "Muslim marriage",
  "Nikah service",
  "Muslim matrimonial service India",
  "Muslim second marriage",
  "divorced Muslim rishta",
  "widow widower nikah",
  "Muslim marriage biodata",
  "online rishta service",
  "Zara Nikah Service"
 ],
 robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},
 openGraph:{
  title:"Muslim Rishta & Nikah Service in India | Zara Nikah",
  description:"Nikah aur shaadi ke liye Muslim rishta profiles dekhein. First marriage, second marriage, biodata guide aur safe online rishta search.",
  type:"website",
  url:"https://zaranikahservice.online/",
  siteName:"Zara Nikah Service",
  locale:"hi_IN"
 },
 twitter:{
  card:"summary",
  title:"Muslim Rishta & Nikah Service | Zara Nikah",
  description:"Muslim nikah profiles, second marriage guidance aur safe online rishta search."
 },
 icons:{icon:"/api/pwa-icon?size=192",apple:"/api/pwa-icon?size=192"},
 manifest:"/manifest.webmanifest?v=20260929-3"
};

const structuredData={
 "@context":"https://schema.org",
 "@graph":[
  {
   "@type":"Organization",
   "@id":"https://zaranikahservice.online/#organization",
   "name":"Zara Nikah Service",
   "url":"https://zaranikahservice.online/",
   "description":"Online Muslim nikah and rishta service with profile access information, marriage biodata guidance and online rishta safety resources.",
   "sameAs":[
    "https://whatsapp.com/channel/0029Vb7rnJSInlqVBIk0ze42",
    "https://www.facebook.com/share/14v4R6JaVNs/",
    "https://www.instagram.com/zaranikahservice?stkn=Ymt0MG0yd3pmdmpq"
   ]
  },
  {
   "@type":"WebSite",
   "@id":"https://zaranikahservice.online/#website",
   "url":"https://zaranikahservice.online/",
   "name":"Zara Nikah Service",
   "inLanguage":["hi","en"],
   "publisher":{"@id":"https://zaranikahservice.online/#organization"}
  }
 ]
};

export default function RootLayout({children}){
 return <html lang="hi"><head>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5611171707552414" crossOrigin="anonymous"></script>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}} />
 </head><body>
  <PushTokenSync />
  <AppAccessGate>{children}</AppAccessGate>
  <Script src="https://www.googletagmanager.com/gtag/js?id=G-N5V1PGKLWH" strategy="afterInteractive" />
  <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag("js", new Date()); gtag("config", "G-N5V1PGKLWH");`}</Script>
  <script dangerouslySetInnerHTML={{__html:`window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();window.__zaraInstallPrompt=e;window.dispatchEvent(new Event("zara-install-ready"))});if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").then(r=>r.update()).catch(()=>{}))}`}} />
 </body></html>
}