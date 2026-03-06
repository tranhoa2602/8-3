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
  let startDate = new Date("2024-02-14");
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
/* ===== GIFT FLOWER EFFECT ===== */
let ctx, canvas;
let animationId;
let flowers = [];
let time = 0;

let bouquetMode = false;
let bouquetProgress = 0;

function openGift() {
  document.getElementById("giftPopup").classList.add("show");

  canvas = document.getElementById("flowerCanvas");
  ctx = canvas.getContext("2d");

  canvas.width = 500;
  canvas.height = 450;

  flowers = [];
  bouquetMode = false;
  bouquetProgress = 0;

  for (let i = 0; i < 24; i++) {
    flowers.push(createFlower(i, 24));
  }

  animate();
}

function closeGift() {
  document.getElementById("giftPopup").classList.remove("show");
  cancelAnimationFrame(animationId);
}

function createFlower(index, total) {
  let petalCount = 10 + Math.floor(Math.random() * 4);
  let petals = [];

  for (let i = 0; i < petalCount; i++) {
    petals.push({
      angle: ((Math.PI * 2) / petalCount) * i,
      stretch: 0.8 + Math.random() * 0.3,
    });
  }

  // vị trí trái tim khi bó
  let t = (index / total) * Math.PI * 2;
  let heartX = 16 * Math.pow(Math.sin(t), 3);
  let heartY =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);

  return {
    startX: 50 + Math.random() * 400,
    baseY: 430,
    targetY: 120 + Math.random() * 60,
    curve: (Math.random() - 0.5) * 60,
    growth: 0,
    size: 15 + Math.random() * 5,
    petals: petals,

    // vị trí khi bó
    bouquetX: canvas.width / 2 + heartX * 8,
    bouquetY: 220 - heartY * 6,
  };
}

function drawStem(f, ease) {
  let headY = f.baseY - (f.baseY - f.targetY) * ease;

  let wind = Math.sin(time * 0.002 + f.startX) * 8;

  // nội suy sang vị trí bó
  let currentX = f.startX + (f.bouquetX - f.startX) * bouquetProgress;

  let currentHeadY = headY + (f.bouquetY - headY) * bouquetProgress;

  ctx.beginPath();
  ctx.moveTo(currentX, f.baseY);

  let cpX = currentX + f.curve * (1 - bouquetProgress);
  let cpY = f.baseY - 260;

  ctx.quadraticCurveTo(cpX, cpY, currentX + wind, currentHeadY);

  ctx.strokeStyle = "#2e7d32";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.stroke();

  return { x: currentX + wind, y: currentHeadY };
}

function drawFlower(f, headPos) {
  ctx.save();

  ctx.translate(headPos.x, headPos.y);

  let scale = 1 + 0.2 * bouquetProgress;
  ctx.scale(scale, scale);

  f.petals.forEach((p) => {
    ctx.save();
    ctx.rotate(p.angle);

    let spread = f.size * p.stretch;

    let grad = ctx.createRadialGradient(0, -spread, 2, 0, -spread, spread);
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(1, "#ff1f5a");

    ctx.beginPath();
    ctx.ellipse(0, -spread, f.size * 0.6, spread, 0, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.restore();
  });

  ctx.beginPath();
  ctx.arc(0, 0, f.size * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = "#ffd54f";
  ctx.fill();

  ctx.restore();
}

function drawRibbon() {
  ctx.fillStyle = "#d6002a";

  ctx.beginPath();
  ctx.moveTo(220, 360);
  ctx.lineTo(280, 360);
  ctx.lineTo(260, 400);
  ctx.lineTo(240, 400);
  ctx.closePath();
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  time += 16;

  let allGrown = true;

  flowers.forEach((f) => {
    if (f.growth < 1) {
      f.growth += 0.004; // mọc chậm
      allGrown = false;
    }

    let ease = 1 - Math.pow(1 - f.growth, 3);

    let headPos = drawStem(f, ease);

    if (f.growth >= 1) {
      drawFlower(f, headPos);
    }
  });

  if (allGrown && bouquetProgress < 1) {
    bouquetProgress += 0.01;
  }

  if (bouquetProgress > 0.9) {
    drawRibbon();
  }

  animationId = requestAnimationFrame(animate);
}
