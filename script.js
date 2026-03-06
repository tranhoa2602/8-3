const correctPassword = "0302";
let input = "";

/* ===== PASSWORD ===== */

function press(num) {
  if (input.length >= 4) return;

  input += num;
  updateDots();

  if (input.length === 4) {
    if (input === correctPassword) {
      unlock();
    } else {
      setTimeout(() => {
        alert("Sai mật khẩu 😝");
        input = "";
        updateDots();
      }, 200);
    }
  }
}

function clearPass() {
  input = "";
  updateDots();
}

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i < input.length);
  });
}

/* ===== UNLOCK ===== */

const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");

function unlock() {
  document.getElementById("lockBox").classList.add("hide");

  setTimeout(() => {
    document.getElementById("menu").classList.add("show");
    startHearts();

    audio.play();
    playBtn.innerHTML = "⏸";
  }, 600);
}

/* ===== HEART EFFECT ===== */

let heartInterval;

function startHearts() {
  heartInterval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerHTML = "❤";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 7000);
  }, 400);
}

/* ===== DAYS ===== */

function openDays() {
  document.getElementById("daysPopup").classList.add("show");
  calculateDays();
}

function closeDays() {
  document.getElementById("daysPopup").classList.remove("show");
}

function calculateDays() {
  let startDate = new Date("2026-02-03");
  let today = new Date();

  let diff = today - startDate;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));

  document.getElementById("daysCount").innerText = days;
}

/* ===== MUSIC PLAYER ===== */

const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeBar = document.getElementById("volumeBar");

playBtn.addEventListener("click", () => {
  if (audio.paused) audio.play();
  else audio.pause();
});

audio.addEventListener("play", () => {
  playBtn.innerHTML = "⏸";
});

audio.addEventListener("pause", () => {
  playBtn.innerHTML = "▶";
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100;

  currentTimeEl.innerText = formatTime(audio.currentTime);
  durationEl.innerText = formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeBar.addEventListener("input", () => {
  audio.volume = volumeBar.value;
});

function formatTime(time) {
  if (!time) return "00:00";

  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

/* ===== LETTER ===== */

const letterContent = `Hé Nho Chị Iu 💖

Hôm nay là một ngày đặc biệt của phụ nữ.
Em chúc chị iu của em hôm nay thật tuyệt vời.
Thật nhiều phép màu và công việc thật suôn sẻ.
Mặc dù mình mới quen biết nhau nhưng em cảm thấy
1 cái gì đó rất cuốn hút.

Em mong mình có thể quen nhau lâu dài.

Mãi Yêu 💗`;

let typingIndex = 0;
let typingInterval;

const menuSong = "audio/Love Is.mp3";
const letterSong = "audio/MỘT ĐỜI.mp3";

function openLetter() {
  document.getElementById("letterPopup").classList.add("show");

  typingIndex = 0;
  document.getElementById("letterText").innerHTML = "";

  startTyping();

  audio.src = letterSong;
  audio.play();
}

function closeLetter() {
  document.getElementById("letterPopup").classList.remove("show");

  clearInterval(typingInterval);

  audio.src = menuSong;
  audio.pause();
}

function startTyping() {
  typingInterval = setInterval(() => {
    if (typingIndex < letterContent.length) {
      document.getElementById("letterText").innerHTML +=
        letterContent.charAt(typingIndex);
      typingIndex++;
    } else {
      clearInterval(typingInterval);
    }
  }, 80);
}

/* ===== IMAGE ===== */

const imageSong = "audio/Dạo Bước Hong Kong 1999.mp3";

const carouselImages = document.querySelectorAll(".carousel img");
const previewImage = document.getElementById("previewImage");

carouselImages.forEach((img) => {
  img.addEventListener("click", () => {
    previewImage.src = img.src;
  });
});

function openImage() {
  document.getElementById("imagePopup").classList.add("show");

  audio.src = imageSong;
  audio.load();
  audio.play();
}

function closeImage() {
  document.getElementById("imagePopup").classList.remove("show");

  audio.pause();
}

/* ===== GIFT FLOWER ===== */

let canvas, ctx;
let flowers = [];
let animationId;
let time = 0;

function openGift() {
  document.getElementById("giftPopup").classList.add("show");

  canvas = document.getElementById("flowerCanvas");
  ctx = canvas.getContext("2d");

  canvas.width = 500;
  canvas.height = 450;

  flowers = [];

  for (let i = 0; i < 25; i++) {
    flowers.push({
      x: Math.random() * canvas.width,
      y: canvas.height,
      targetY: 150 + Math.random() * 100,
      size: 10 + Math.random() * 10,
      growth: 0,
    });
  }

  animate();
}

function closeGift() {
  document.getElementById("giftPopup").classList.remove("show");
  cancelAnimationFrame(animationId);
}

function drawFlower(f) {
  ctx.beginPath();
  ctx.arc(f.x, f.y - f.growth, f.size, 0, Math.PI * 2);
  ctx.fillStyle = "#ff4d88";
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  time += 0.02;

  flowers.forEach((f) => {
    if (f.growth < f.y - f.targetY) {
      f.growth += 1.2;
    }

    drawFlower(f);
  });

  animationId = requestAnimationFrame(animate);
}
