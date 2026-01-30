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
const auth = firebase.auth();

// Admin email
const adminEmail = "ngogrant454@gmail.com";

// Initialize Firebase
function initFirebase(){
  auth.onAuthStateChanged(user=>{
    if(user){
      console.log("Logged in as:", user.email);
      // Redirect to dashboard
      window.location.href = "dashboard.html";
      localStorage.setItem("currentUserEmail", user.email);
    }
  });
}

// Google Login
function loginWithGoogle(){
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
  .then(result => {
    const user = result.user;
    console.log("Logged in:", user.email);
    window.location.href = "dashboard.html";
    localStorage.setItem("currentUserEmail", user.email);
  })
  .catch(error=>{
    console.error(error.message);
    alert("Login failed: " + error.message);
  });
}

// Logout function (Dashboard me use karenge)
function logout(){
  auth.signOut().then(()=>{
    localStorage.removeItem("currentUserEmail");
    window.location.href = "index.html";
  });
}

// Admin check function
function isAdmin(){
  const email = localStorage.getItem("currentUserEmail");
  return email === adminEmail;
}
