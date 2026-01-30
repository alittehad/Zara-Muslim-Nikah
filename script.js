// Firebase Config
function initFirebase(){
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
  window.auth = firebase.auth();
  window.db = firebase.database();
}

function loginWithGoogle(){
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then(res=>{
    window.location.href="dashboard.html";
  }).catch(err=>alert(err.message));
}

let currentUser=null;
auth.onAuthStateChanged(user=>{
  if(user) currentUser=user;
  else if(window.location.pathname.includes("dashboard.html")) window.location.href="index.html";
});

// ImageKit Upload
function uploadImages(){
  if(!currentUser || currentUser.email!=="ngogrant454@gmail.com") return alert("Only admin can add profile!");
  const files=document.getElementById("photo").files;
  if(files.length==0) return alert("Select images!");
  let uploadedURLs=[], count=0;
  for(let i=0;i<files.length;i++){
    const file=files[i];
    const formData=new FormData();
    formData.append("file", file);
    formData.append("fileName", "nikah_"+Date.now());
    formData.append("publicKey", "public_QUheEXPI+PMEgWzN/9uEKG5v1BQ=");
    formData.append("folder", "nikah_profiles");
    fetch("https://upload.imagekit.io/api/v1/files/upload",{method:"POST",body:formData})
    .then(res=>res.json())
    .then(data=>{
      uploadedURLs.push(data.url);
      count++;
      if(count===files.length) saveProfile(uploadedURLs);
    }).catch(err=>console.error(err));
  }
}

// Save profile
function saveProfile(images){
  const profileData={
    userId: currentUser.uid,
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    city: document.getElementById("city").value,
    marital: document.getElementById("marital").value,
    education: document.getElementById("education").value,
    profession: document.getElementById("profession").value,
    religion: document.getElementById("religion").value,
    phone: document.getElementById("phone").value,
    images: images
  };
  db.ref("profiles").push(profileData);
  alert("Profile Saved ✅");
  document.getElementById("photo").value="";
}

// Display profiles
db.ref("profiles").on("value",snap=>{
  const list=document.getElementById("profiles");
  if(!list) return;
  list.innerHTML="";
  snap.forEach(s=>{
    const p=s.val();
    const imgHTML=p.images.map(url=>`<img src="${url}">`).join("");
    list.innerHTML+=`<div class="profile-card">${imgHTML}<h3>${p.name}, ${p.age}</h3><p>${p.city} | ${p.gender}</p><p>${p.marital} | ${p.education} | ${p.profession} | ${p.religion}</p><p>${p.phone}</p></div>`;
  });
});
