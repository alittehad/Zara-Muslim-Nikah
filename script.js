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
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Current User (replace with real Google login)
let currentUser = { email: "ngogrant454@gmail.com" };

// Show admin panel only for admin
if(currentUser.email === "ngogrant454@gmail.com"){
  document.getElementById("admin-section").style.display = "block";
}

// Slider
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

// Ads
const adsDiv = document.getElementById("ads");
db.ref("ads_images").on("value", snap => {
  adsDiv.innerHTML = "";
  snap.forEach(s => {
    const img = document.createElement("img");
    img.src = s.val();
    adsDiv.appendChild(img);
  });
});

// Admin ImageKit Upload Ads
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
      .then(data=>{ db.ref("ads_images").push(data.url); })
      .catch(err=>console.error(err));
  }
  alert("Ads uploaded ✅");
}

// Admin ImageKit Upload Profiles
function uploadProfile(){
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const city = document.getElementById("city").value;
  const marital = document.getElementById("marital").value;
  const education = document.getElementById("education").value;
  const profession = document.getElementById("profession").value;
  const religion = document.getElementById("religion").value;
  const phone = document.getElementById("phone").value;
  const photo = document.getElementById("profile-photo").files[0];
  if(!name || !photo) return alert("Name and Photo required!");

  const formData = new FormData();
  formData.append("file", photo);
  formData.append("fileName", "profile_" + Date.now());
  formData.append("publicKey", "public_QUheEXPI+PMEgWzN/9uEKG5v1BQ=");
  formData.append("folder", "profiles");

  fetch("https://upload.imagekit.io/api/v1/files/upload",{ method:"POST", body:formData })
    .then(res=>res.json())
    .then(data=>{
      const profileData = { name, age, gender, city, marital, education, profession, religion, phone, photo: data.url };
      db.ref("profiles").push(profileData);
      alert("Profile added ✅");
    })
    .catch(err=>console.error(err));
}

// Load Profiles Cards
const profilesDiv = document.getElementById("profiles");
db.ref("profiles").on("value", snap => {
  profilesDiv.innerHTML = "";
  snap.forEach(s=>{
    const p = s.val();
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<img src="${p.photo}"><h3>${p.name}</h3><p>${p.gender}, ${p.age} yrs</p><p>${p.city}</p><p>${p.marital}</p><p>${p.education}</p><p>${p.profession}</p><p>${p.religion}</p>`;
    profilesDiv.appendChild(card);
  });
});
