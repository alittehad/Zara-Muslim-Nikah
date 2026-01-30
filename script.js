// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAhrYtSAdorLMYgBIPeEnXk2nFDG_M65Wc",
  authDomain: "zara-muslim-nikah.firebaseapp.com",
  databaseURL: "https://zara-muslim-nikah-default-rtdb.firebaseio.com",
  projectId: "zara-muslim-nikah",
  storageBucket: "zara-muslim-nikah.appspot.com",
  messagingSenderId: "690336186269",
  appId: "1:690336186269:web:8215c1d313c4273c1f7974"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
let currentUser = null;

// Example: Admin login (replace with actual Google Auth)
currentUser = { email: "ngogrant454@gmail.com" };

// Show admin upload section only for admin
if(currentUser.email === "ngogrant454@gmail.com"){
  document.getElementById("admin-ads").style.display = "block";
}

// Slider Images
const sliderDiv = document.getElementById("slider");
let sliderImages = [];
let currentIndex = 0;

db.ref("slider_images").on("value", snap => {
  sliderImages = [];
  sliderDiv.innerHTML = "";
  snap.forEach(s => {
    const url = s.val();
    sliderImages.push(url);
    const img = document.createElement("img");
    img.src = url;
    sliderDiv.appendChild(img);
  });
  startSlider();
});

function startSlider(){
  if(sliderImages.length <= 1) return;
  setInterval(()=>{
    currentIndex = (currentIndex + 1) % sliderImages.length;
    const width = sliderDiv.clientWidth;
    sliderDiv.style.transform = `translateX(-${currentIndex * width}px)`;
  }, 4000);
}

// Advertising banners
const adsDiv = document.getElementById("ads");
db.ref("ads_images").on("value", snap => {
  adsDiv.innerHTML = "";
  snap.forEach(s => {
    const img = document.createElement("img");
    img.src = s.val();
    adsDiv.appendChild(img);
  });
});

// Admin ImageKit Upload
function uploadAds(){
  const files = document.getElementById("ad-photo").files;
  if(files.length===0) return alert("Select images!");
  
  for(let i=0;i<files.length;i++){
    const file=files[i];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", "ad_" + Date.now());
    formData.append("publicKey", "public_QUheEXPI+PMEgWzN/9uEKG5v1BQ=");
    formData.append("folder", "nikah_ads");

    fetch("https://upload.imagekit.io/api/v1/files/upload", { method:"POST", body:formData })
      .then(res=>res.json())
      .then(data=>{
        db.ref("ads_images").push(data.url);
      })
      .catch(err=>console.error(err));
  }
  alert("Ads uploaded ✅");
}
