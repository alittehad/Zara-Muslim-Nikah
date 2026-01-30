// Firebase references
const sliderDiv = document.getElementById("slider");
const adsDiv = document.getElementById("ads");

// Slider Images (auto-slide)
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
  }, 4000); // 4 seconds per slide
}

// Advertising banners auto-load
db.ref("ads_images").on("value", snap => {
  adsDiv.innerHTML = "";
  snap.forEach(s => {
    const img = document.createElement("img");
    img.src = s.val();
    adsDiv.appendChild(img);
  });
});
